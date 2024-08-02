import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import ChatComponent from "../_components/ChatComponent";
import ChatSideBar from "../_components/ChatSideBar";
import PDFViewer from "../_components/PDFViewer";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = async ({ params: { id } }: Props) => {
  const user = await currentUser();
  if (!user) {
    return redirect("/login");
  }
  const _chats = await db.chats.findMany({
    where: {
      userId: user.id!,
    },
  });
  if (!_chats) {
    return redirect("/dashboard/chatpdf");
  }

  const currentChat = await db.chats.findFirst({
    where: {
      id,
    },
  });
  // const isPro = await checkSubscription();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="flex w-full">
        {/* chat sidebar */}
        <div className="max-w-xs flex-[1]">
          <ChatSideBar chats={_chats} id={id} />
        </div>
        {/* pdf viewer */}
        <div className="flex-[5] p-4">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-2 border-l-border">
          <ChatComponent id={id} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

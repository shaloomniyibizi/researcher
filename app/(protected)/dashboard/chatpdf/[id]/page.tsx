import { currentUser } from "@/lib/userAuth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import ChatComponent from "../_components/ChatComponent";
import ChatSideBar from "../_components/ChatSideBar";
import PDFViewer from "../_components/PDFViewer";
import { getManyChatsByUserId } from "../actions/chats.actions";

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = async ({ params: { id } }: Props) => {
  const queryClient = new QueryClient();
  const user = await currentUser();
  if (!user) {
    return redirect("/login");
  }
  const userId = user.id;

  await queryClient.prefetchQuery({
    queryKey: ["pdfchats", id],
    queryFn: async () => await getManyChatsByUserId(userId!),
  });

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="flex w-full">
        {/* chat sidebar */}
        <div className="max-w-xs flex-[1]">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ChatSideBar userId={userId!} id={id} />
          </HydrationBoundary>
        </div>
        {/* pdf viewer */}
        <div className="flex-[5] p-4">
          <PDFViewer id={id} />
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

import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/userAuth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FileUpload from "./_components/FileUpload";
import { getChatsByUserId } from "./actions/chats.actions";

async function ChatpdfPage() {
  const user = await currentUser();
  const chats = await getChatsByUserId(user?.id!);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center">
        <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
      </div>
      <p className="max-w-xl text-sm text-muted-foreground">
        Join millions of students, researchers and professionals to instantly
        answer questions and understand research with AI
      </p>
      <div className="mt-2 flex">
        <Button asChild>
          <Link href={`/dashboard/chatpdf/${chats?.id}`}>
            Go to Chats <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
      <div className="mt-4 w-full">
        <FileUpload />
      </div>
    </div>
  );
}

export default ChatpdfPage;

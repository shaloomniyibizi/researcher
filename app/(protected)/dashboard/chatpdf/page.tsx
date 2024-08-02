import { Button } from "@/components/ui/button";
import FileUpload from "./_components/FileUpload";

function ChatpdfPage() {
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
        <Button>Go go chats</Button>
      </div>
      <div className="mt-4 w-full">
        <FileUpload />
      </div>
    </div>
  );
}

export default ChatpdfPage;

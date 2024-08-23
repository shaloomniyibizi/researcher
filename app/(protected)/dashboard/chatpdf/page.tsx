import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/userAuth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserById } from "../users/_actions/user.actions";
import FileUpload from "./_components/FileUpload";
import { getChatsByUserId } from "./actions/chats.actions";

async function ChatpdfPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);

  if (!dbUser?.onboarded) {
    redirect("/onboarding");
  }
  const chats = await getChatsByUserId(user?.id!);

  return (
    <div className="flex min-h-[calc(100vh-3.6rem)] flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center">
        <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
      </div>
      <p className="mt-4 max-w-xl text-sm text-muted-foreground">
        Join millions of students, researchers and professionals to instantly
        answer questions and understand research with AI
      </p>
      <div className="mt-4 flex">
        <Button asChild>
          <Link href={`/dashboard/chatpdf/${chats?.id}`}>
            Go to Chats <ArrowRight className="ml-2 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-12 w-full max-w-3xl">
        <FileUpload />
      </div>
    </div>
  );
}

export default ChatpdfPage;

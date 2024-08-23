import { cn } from "@/lib/utils";
import type { Messages as NewMessage } from "@prisma/client";
import { Message } from "ai/react";
import { Bot, Loader2 } from "lucide-react";
import UserAvatar from "../../_components/UserAvatar";

type Props = {
  isLoading: boolean;
  messages: Message[] | NewMessage[];
  isThinking: boolean;
  error: any;
};

const MessageList = ({ messages, isLoading, error, isThinking }: Props) => {
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";
  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <p>ask any question related to this paper</p>;
  return (
    <div className="mt-4 h-full overflow-y-auto px-3">
      {messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
      {isThinking && lastMessageIsUser && (
        <ChatMessage
          message={{
            role: "assistant",
            content: "Thinking...",
          }}
        />
      )}
      {error && (
        <ChatMessage
          message={{
            role: "assistant",
            content: "Samething went wrong please try again",
          }}
        />
      )}
      {!error && messages.length === 0 && (
        <div className="flex h-full items-center justify-center gap-3">
          <Bot />
          Ask the AI a question about your project
        </div>
      )}
    </div>
  );
};

export default MessageList;

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  const isAIMessage = role === "assistant";
  return (
    <div
      className={cn(
        "mb-1 flex items-start",
        isAIMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAIMessage && <Bot className="mr-1 h-8 w-8 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded border px-3 py-2",
          isAIMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </p>
      {!isAIMessage && (
        <div className="ml-1">
          <UserAvatar className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}

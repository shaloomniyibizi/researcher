import { cn } from "@/lib/utils";
import type { Messages as NewMessage } from "@prisma/client";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";

type Props = {
  isLoading: boolean;
  messages: Message[] | NewMessage[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10":
                message.role === "user" || message.role === "USER",
              "justify-start pr-10":
                message.role === "assistant" || message.role === "SYSTEM",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 py-1 text-sm shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white":
                    message.role === "user" || message.role === "USER",
                  "border border-border":
                    message.role === "assistant" || message.role === "SYSTEM",
                },
              )}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;

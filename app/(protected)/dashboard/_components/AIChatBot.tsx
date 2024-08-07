"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, Trash, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import UserAvatar from "./UserAvatar";

type AIChatBotProps = {
  open: boolean;
  onClose: () => void;
};

const AIChatBot = ({ open, onClose }: AIChatBotProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({ api: "/api/aichat" });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <Button
        onClick={onClose}
        size={"icon"}
        variant={"ghost"}
        className="ms-auto flex items-center justify-center rounded-full"
      >
        <XCircle size={30} />
      </Button>
      <div className="flex h-[600px] flex-col rounded border bg-card text-card-foreground shadow-xl">
        <ScrollArea className="mt-3 h-full px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
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
        </ScrollArea>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            title="Clear chat"
            variant={"destructive"}
            size={"icon"}
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say same thing..."
            ref={inputRef}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default AIChatBot;

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  const user = useCurrentUser();

  const isAIMessage = role === "assistant";
  return (
    <div
      className={cn(
        "mb-1 flex items-center",
        isAIMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAIMessage && <Bot className="mr-1 shrink-0" />}
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
          <UserAvatar user={user!} />
        </div>
      )}
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Bot, Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import UserAvatar from "./UserAvatar";

const AIChatBot = () => {
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
    inputRef.current?.focus();
  }, []);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div className={cn("bottom-0 right-0 z-10 w-[500px] p-1 xl:right-36")}>
      <div className="flex h-[550px] flex-col rounded shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
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
              Start conversation with smart research assistant
            </div>
          )}
        </div>
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

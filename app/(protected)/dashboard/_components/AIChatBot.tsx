"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Message, useChat } from "ai/react";
import { Bot, Send, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteProjectMessageByUserId,
  getProjectMessageByUserId,
} from "../projects/_actions/projectMessage.actions";
import UserAvatar from "./UserAvatar";

interface Props {
  data?: Message[];
}
const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();

  const { data } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => await getProjectMessageByUserId(user?.id!),
  });

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({ api: "/api/aichat", initialMessages: data || [] });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteProjectMessageByUserId,
    onSuccess: async (data) => {
      toast.success(data.success);
      setMessages([]);
      queryClient.invalidateQueries({
        queryKey: ["chat"],
      });
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  inputRef.current?.focus();

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
            onClick={() => setOpen(true)}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say same thing..."
            ref={inputRef}
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action can not undone. This will permenently delete this chat
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteMutation.mutate(user?.id!);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

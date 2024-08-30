"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Message, useChat } from "ai/react";
import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";
import MessageList from "./MessageList";

type Props = { id: string };

const ChatComponent = ({ id }: Props) => {
  const { data, isLoading: isMessageLoading } = useQuery({
    queryKey: ["chatsMessages", id],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        id,
      });
      return response.data;
    },
  });

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      body: {
        id,
      },
      initialMessages: data || [],
    });
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  inputRef.current?.focus();
  return (
    <div className="relative h-[calc(100vh-3.7rem)]" ref={scrollRef}>
      {/* header */}
      <div className="sticky inset-x-0 top-0 h-fit p-2">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto">
          {/* message list */}
          <MessageList
            messages={messages}
            isLoading={isMessageLoading}
            error={error}
            isThinking={isLoading}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="sticky inset-x-0 bottom-0 px-2 py-4"
        >
          <div className="flex">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask any question..."
              className="w-full"
            />
            <Button className="ml-2 bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;

"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Chats } from "@prisma/client";
import { MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  chats: Chats[];
  id: string;
  isPro?: boolean;
};

const ChatSideBar = ({ chats, id, isPro }: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="soff h-full w-full bg-card p-4 text-card-foreground">
      <Link href="/dashboard/chatpdf">
        <Button className="w-full border border-dashed border-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </Link>

      <ScrollArea className="mt-4 flex h-full flex-col gap-2 pb-20">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/dashboard/chatpdf/${chat.id}`}>
            <div
              className={cn("flex items-center rounded-sm p-3", {
                "bg-primary text-primary-foreground": chat.id === id,
                "hover:bg-primary/75": chat.id !== id,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatSideBar;

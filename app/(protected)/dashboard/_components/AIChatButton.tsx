"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AIChatBot from "./AIChatBot";

function AIChatButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>AI CHAT</Button>
      <AIChatBot open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default AIChatButton;

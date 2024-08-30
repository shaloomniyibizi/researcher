"use client";
import { useQuery } from "@tanstack/react-query";
import { getChatsById } from "../actions/chats.actions";

type Props = { id: string };

const PDFViewer = ({ id }: Props) => {
  const { data: chat, isLoading: isMessageLoading } = useQuery({
    queryKey: ["chatDocument", id],
    queryFn: async () => await getChatsById(id),
  });
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${chat?.pdfUrl}&embedded=true`}
      className="h-full w-full"
    ></iframe>
  );
};

export default PDFViewer;

import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-3.6rem)] w-full items-center justify-center">
      <Loader className="h-64 w-64 animate-spin" />
    </div>
  );
}

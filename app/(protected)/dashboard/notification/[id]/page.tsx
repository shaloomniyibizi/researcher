import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import db from "@/lib/db";
import Link from "next/link";

async function NotificationPage({ params }: { params: { id: string } }) {
  if (!params.id) return "no such project";
  const notification = await db.notification.findUnique({
    where: { id: params.id },
  });
  return (
    <div className="grid min-h-[calc(100vh-3.6rem)] place-content-center">
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
          <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
            {notification?.title}
          </h1>

          <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
            {notification?.message}
          </p>

          <Button
            asChild
            className="rounded-lg border border-gray-500 px-4 py-1 text-gray-300"
          >
            <Link href={`/dashboard/projects/${notification?.projectId}`}>
              View project
            </Link>
          </Button>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;

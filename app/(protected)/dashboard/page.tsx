import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import NotificationCard from "./_components/NotificationCard";
import { StatsCards } from "./_components/StatsCards";
import { ProjectListCard } from "./projects/_components/ProjectListCard";

async function page() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {user.role === "FACULTY" && <StatsCards />}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ProjectListCard />
          <NotificationCard />
        </div>
      </main>
    </div>
  );
}

export default page;

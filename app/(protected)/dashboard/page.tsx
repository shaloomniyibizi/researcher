import { getUserById } from "@/lib/data/user.actions";
import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import NotificationCard from "./_components/NotificationCard";
import { ProjectListCard } from "./_components/ProjectListCard";
import { StatsCards } from "./_components/StatsCards";

async function page() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);
  if (!dbUser?.onboarded) redirect("/onboarding");
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <StatsCards />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ProjectListCard />
          <NotificationCard />
        </div>
      </main>
    </div>
  );
}

export default page;

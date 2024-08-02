import { getUserById } from "@/lib/data/user";
import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import DashboardStats from "./_components/DashboardStats";
import NotificationCard from "./_components/NotificationCard";
import { ProjectListCard } from "./_components/ProjectListCard";
import { getProjectDetails } from "./projects/_actions/project.actions";

async function page() {
  const projects = await getProjectDetails();
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);
  if (!dbUser?.onboarded) redirect("/onboarding");
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DashboardStats />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ProjectListCard projects={projects} />
          <NotificationCard />
        </div>
      </main>
    </div>
  );
}

export default page;

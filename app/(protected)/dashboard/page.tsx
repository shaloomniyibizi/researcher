import db from "@/lib/db";
import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import NotificationCard from "./_components/NotificationCard";
import { StatsCards } from "./_components/StatsCards";
import { getAllProjects } from "./projects/_actions/project.actions";
import { ProjectListCard } from "./projects/_components/ProjectListCard";
import { getUserById } from "./users/_actions/user.actions";

async function page() {
  const user = await currentUser();
  const notification = await db.notification.findMany({
    include: { user: true },
  });
  if (!user) redirect("/login");
  const dbuser = await getUserById(user.id!);
  const project = await getAllProjects();
  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {user.role === "FACULTY" && <StatsCards />}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <ProjectListCard />
          <NotificationCard
            project={project}
            user={dbuser!}
            notification={notification!}
          />
        </div>
      </main>
    </div>
  );
}

export default page;

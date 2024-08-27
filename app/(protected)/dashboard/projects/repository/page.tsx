import { currentUser } from "@/lib/userAuth";
import { getUserById } from "../../users/_actions/user.actions";
import ProjectTable from "../_components/ProjectTable";

async function RepositoryPage() {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id!);
  return (
    <main className="mt-4 grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProjectTable collegeId={dbUser?.collegeId!} />
    </main>
  );
}

export default RepositoryPage;

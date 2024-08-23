import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { getUserById } from "../users/_actions/user.actions";
import DepartmentPageWrapper from "./_components/DepartmentPageWrapper";

async function CollegePage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);
  if (dbUser?.role !== "FACULTY") {
    toast.success(`Unauthorized activity `);
    redirect("/dashboard");
  }
  if (!dbUser.onboarded) {
    redirect("/onboarding");
  }
  return (
    <main className="mt-4 grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8">
      <DepartmentPageWrapper />
    </main>
  );
}

export default CollegePage;

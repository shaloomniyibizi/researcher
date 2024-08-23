import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { getUserById } from "../_actions/user.actions";
import AddFaculityForm from "../_components/AddFaculityForm";

async function CollegePage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);
  if (dbUser?.onboarded) redirect("/onboarding");
  if (dbUser?.role !== "FACULTY") {
    toast("Sorry you can't perform this task");
    redirect("/dashboard");
  }
  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-clip">
      <AddFaculityForm />
    </div>
  );
}

export default CollegePage;

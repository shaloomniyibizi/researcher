import { currentRole } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import AddFaculityForm from "../_components/AddFaculityForm";

async function CollegePage() {
  const user = await currentRole();
  if (user !== "FACULTY") redirect("/dashboard");

  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-clip">
      <AddFaculityForm />
    </div>
  );
}

export default CollegePage;

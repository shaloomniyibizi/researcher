import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { getUserById } from "../../users/_actions/user.actions";
import AddProject from "../_components/AddProject";

const AddPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!); 
  if (dbUser?.role !== "STUDENT") {
    toast.error("Only student allowed to add new project");
    redirect("/dashboard");
  }
  return (
    <div className="overflow-x-clip">
      <AddProject />
    </div>
  );
};

export default AddPage;

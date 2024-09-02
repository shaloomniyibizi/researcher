import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import AddProject from "../_components/AddProject";

const AddPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/login");
  return (
    <div className="overflow-x-clip">
      <AddProject />
    </div>
  );
};

export default AddPage;

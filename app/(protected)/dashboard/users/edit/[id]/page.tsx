import { getUserById } from "@/lib/data/user.actions";
import AddFaculityForm from "../../_components/AddFaculityForm";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return "no such user";
  const user = await getUserById(params.id);
  return <AddFaculityForm user={user!} />;
};

export default page;

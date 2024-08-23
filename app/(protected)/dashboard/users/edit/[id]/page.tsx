import { getUserById } from "../../_actions/user.actions";
import AddFaculityForm from "../../_components/AddFaculityForm";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return "no such user";
  const user = await getUserById(params.id);
  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-clip">
      <AddFaculityForm user={user!} />
    </div>
  );
};

export default page;

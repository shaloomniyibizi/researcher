import { redirect } from "next/navigation";

function EditPage() {
  return <div>{redirect("/dashboard/users")}</div>;
}

export default EditPage;

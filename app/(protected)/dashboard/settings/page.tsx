import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import { getUserById } from "../users/_actions/user.actions";
import Settings from "./_components/Settings";

async function SettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);
  return <Settings user={dbUser!} />;
}

export default SettingsPage;

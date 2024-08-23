import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import UserPageWrapper from "./_components/UserPageWrapper";

async function FaculityPage() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return (
    <main className="mt-4 grid flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8">
      <UserPageWrapper />
    </main>
  );
}

export default FaculityPage;

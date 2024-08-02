import { getStudentByUserId, getUserById } from "@/lib/data/user";
import { currentUser } from "@/lib/userAuth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";

const OnboardingPage = async () => {
  const user = await currentUser();

  const userInfo = await getUserById(user?.id!);

  if (!userInfo) redirect("/login");
  const stdInfo = await getStudentByUserId(userInfo?.id);

  if (userInfo?.onboarded) {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  const userData = {
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || "",
    department: stdInfo?.department || "",
    year: stdInfo?.year || "",
    onboarded: true,
  };

  return <OnboardingForm user={userData} />;
};

export default OnboardingPage;

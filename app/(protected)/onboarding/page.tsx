import { getUserById } from "@/lib/data/user.actions";
import { currentUser } from "@/lib/userAuth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";

const OnboardingPage = async () => {
  const user = await currentUser();

  const userInfo = await getUserById(user?.id!);

  if (!userInfo) redirect("/login");

  if (userInfo?.onboarded) {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  const userData = {
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || "",
    collegeId: "",
    departmentId: "",
    fieldId: "",
    onboarded: true,
  };

  return <OnboardingForm user={userData} />;
};

export default OnboardingPage;

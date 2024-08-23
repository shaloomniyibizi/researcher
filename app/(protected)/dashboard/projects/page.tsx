import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";
import AIChatBot from "../_components/AIChatBot";
import { getUserById } from "../users/_actions/user.actions";
import { getProjectMessageByUserId } from "./_actions/projectMessage.actions";
import ChatHeader from "./_components/ChatHeader";
import ProjectCard from "./_components/ProjectCard";
async function page() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const dbUser = await getUserById(user.id!);
  if (!dbUser?.onboarded) redirect("/onboarding");

  const promessage = await getProjectMessageByUserId(dbUser.id);

  return (
    <div className="flex min-h-[calc(100vh-3.6rem)] flex-col">
      <main className="min-h-screen flex-1">
        {/* <Filters /> */}

        <ProjectCard />
        <Accordion
          type="single"
          collapsible
          className="relative z-40 bg-card shadow"
        >
          <AccordionItem value="item-1">
            <div className="fixed bottom-8 right-8 overflow-hidden rounded-md border border-border bg-card">
              <div className="flex h-full w-full min-w-80 flex-col">
                <AccordionTrigger className="border-b border-border bg-card px-6">
                  <ChatHeader />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex h-fit flex-col">
                    <AIChatBot />
                  </div>
                </AccordionContent>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default page;

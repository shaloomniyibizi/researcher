import Footer from "@/components/shared/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AIChatBot from "../_components/AIChatBot";
import { getAllProjects } from "./_actions/project.actions";
import ChatHeader from "./_components/ChatHeader";
import Filters from "./_components/Filters";
import ProjectCard from "./_components/ProjectCard";

async function page() {
  const projects = await getAllProjects();
  return (
    <div className="flex min-h-[calc(100vh-3.6rem)] flex-col">
      <main className="min-h-screen flex-1">
        <Filters />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {projects.map(
            (project) =>
              project.status === "accepted" && (
                <ProjectCard key={project.title} project={project} />
              ),
          )}
        </div>
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
      <Footer />
    </div>
  );
}

export default page;

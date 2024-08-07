import Footer from "@/components/shared/Footer";
import AIChatButton from "../_components/AIChatButton";
import { getAllProjects } from "./_actions/project.actions";
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
        <div className="fixed bottom-24 left-8 z-10">
          <AIChatButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;

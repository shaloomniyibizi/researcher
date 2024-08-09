import { getAllProjects } from "../_actions/project.actions";
import ProjectCard from "./ProjectCard";

const ProjectList = async () => {
  const projects = await getAllProjects();
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;

import { getProjectById } from "../_actions/project.actions";
import ProjectDetail from "../_components/ProjectDetail";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return "no such project";
  const project = await getProjectById(params.id);
  return <ProjectDetail project={project!} />;
};

export default page;

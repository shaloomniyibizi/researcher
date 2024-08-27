import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProjectById } from "../_actions/project.actions";
import ProjectDetail from "../_components/ProjectDetail";

const page = async ({ params }: { params: { id: string } }) => {
  const projectId = params.id;
  if (!projectId) return "no such project";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => await getProjectById(projectId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetail projectId={projectId} />
    </HydrationBoundary>
  );
};

export default page;

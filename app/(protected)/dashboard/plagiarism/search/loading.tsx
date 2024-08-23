import ProjectSkeleton from "../../projects/_components/ProjectSkeleton";

export default function Loading() {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <ProjectSkeleton isFetching={true} />
    </div>
  );
}

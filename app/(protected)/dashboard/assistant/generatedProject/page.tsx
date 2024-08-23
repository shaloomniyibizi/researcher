"use client";
import {
  getProjectByUserId,
  GetProjectByUserIdType,
} from "@/app/(protected)/dashboard/assistant/actions/assistants.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useQuery } from "@tanstack/react-query";
import ProjectSkeleton from "../../projects/_components/ProjectSkeleton";

const GeneratedPage = () => {
  const user = useCurrentUser();
  const { data: dbUser } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await db.user.findFirst({ where: { id: user?.id } }),
  });
  const { data: projects, isFetching } = useQuery<GetProjectByUserIdType>({
    queryKey: ["generated"],
    queryFn: async () => await getProjectByUserId(dbUser?.id!),
  });
  return (
    <main className="relative isolate min-h-[calc(100vh-3.5rem)] overflow-hidden border-b">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="mx-auto h-full max-w-7xl gap-16 px-6 pb-24 pt-10">
        {isFetching && (
          <div className="mt-24 grid place-content-center place-items-center md:grid-cols-3">
            <ProjectSkeleton isFetching={isFetching} />
          </div>
        )}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {projects?.map((project, index) => (
            <Card key={index} className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-2 flex flex-1 flex-col">
                  <div className="">Problem Statements: </div>
                  <p>{project.problemStatement}</p>
                  <div className="">Possible solution: </div>
                  <p>{project.solution}</p>
                  <div className="">Objectives: </div>

                  <ol className="ml-4 list-decimal">
                    {project
                      .objectives!.split(",")
                      .map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ol>

                  <div className="">Feactures:</div>
                  <ol className="ml-4 list-decimal">
                    {project
                      .feactures!.split(",")
                      .map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GeneratedPage;

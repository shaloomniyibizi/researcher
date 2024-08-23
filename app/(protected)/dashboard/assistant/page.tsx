"use client";

import {
  AddGeneratedProject,
  generateProjects,
} from "@/app/(protected)/dashboard/assistant/actions/assistants.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ProjectSkeleton from "../projects/_components/ProjectSkeleton";

function AssistantPage() {
  const user = useCurrentUser();
  if (!user) redirect("/login");
  const [preferences, setPreferences] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  async function onSubmit() {
    setIsLoading(true);
    let r = await generateProjects(preferences);
    console.log(r);
    setProjects(r);
    setIsLoading(false);
  }
  const queryClient = useQueryClient();
  const { mutate: addNewGeneratedProject, isPending } = useMutation({
    mutationFn: AddGeneratedProject,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
      }

      if (data?.success) {
        toast.success(data.success);
      }

      // After creating a transaction, we need to invalidate the overview query which will fetch data in the home page
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "projects"],
      });
    },

    onError: (e) => {
      toast.loading(`Error: ${e.message}`);
    },
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
        <div className="mx-auto mt-8 flex w-full min-w-64 max-w-2xl flex-col">
          <div className="mt-2 flex">
            <Button asChild>
              <Link href={`/dashboard/assistant/generatedProject`}>
                Go to Your Generated Project
                <ArrowRight className="ml-2 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative z-10 mt-4 h-14 rounded">
            <Input
              type="text"
              disabled={isLoading}
              placeholder="Specifies Your interest"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="absolute inset-0 h-full"
            />

            <Button
              onClick={() => onSubmit()}
              type="submit"
              disabled={isLoading}
              className="absolute inset-y-0 right-0 h-full rounded-l-none"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Generate Idea"
              )}
            </Button>
          </div>
        </div>
        {isLoading && (
          <div className="mt-24 grid place-content-center place-items-center md:grid-cols-3">
            <ProjectSkeleton isFetching={isLoading} />
          </div>
        )}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {projects.length > 0 &&
            projects.map((project, index) => (
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
                      {project.objectives
                        .split(",")
                        .map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                    </ol>

                    <div className="">Featuses:</div>
                    <ol className="ml-4 list-decimal">
                      {project.features
                        .split(",")
                        .map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                    </ol>
                  </div>
                  <Button
                    disabled={isPending}
                    onClick={() => addNewGeneratedProject(project)}
                  >
                    {isPending ? <BeatLoader /> : "Save"}
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </main>
  );
}

export default AssistantPage;

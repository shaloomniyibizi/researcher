"use client";
import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatTimeToNow } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAllProjects } from "../_actions/project.actions";

export function ProjectListCard() {
  const { data: projects, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getAllProjects(),
  });
  return (
    <ScrollArea className="max-h-[calc(100vh-8rem)] xl:col-span-2">
      <SkeletonWrapper isLoading={isFetching} fullWidth>
        <div className="flex min-h-96 flex-col gap-2 py-4 pt-0">
          {!projects
            ? "No project yet"
            : projects.map(
                (project) =>
                  project.status === "accepted" && (
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      key={project.id}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border bg-card p-3 text-left text-sm transition-all hover:bg-accent",
                        project.id === "1" && "bg-muted",
                        isFetching && "h-24 w-full",
                      )}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">{project.title}</div>
                            {!project.user.Department!.name && (
                              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                            )}
                          </div>
                          <div
                            className={cn(
                              "ml-auto text-xs",
                              project.id === "1"
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {formatTimeToNow(project.createdAt)}
                          </div>
                        </div>
                        <div className="text-xs font-medium">
                          {project.user.Department!.name}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "line-clamp-4 max-w-7xl text-justify text-muted-foreground",
                        )}
                        dangerouslySetInnerHTML={{
                          __html: project.description!,
                        }}
                      ></div>
                      {project.technologies.length ? (
                        <div className="flex items-center gap-2">
                          {project.technologies
                            .split(",")
                            .map((technology, index) => (
                              <Badge key={index} variant={"outline"}>
                                {technology}
                              </Badge>
                            ))}
                        </div>
                      ) : null}
                    </Link>
                  ),
              )}
        </div>
      </SkeletonWrapper>
    </ScrollArea>
  );
}

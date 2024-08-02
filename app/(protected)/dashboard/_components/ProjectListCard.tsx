import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtendedProject } from "@/lib/types/db";
import { cn, formatTimeToNow } from "@/lib/utils";
import Link from "next/link";

interface ProjectListCardProps {
  projects: ExtendedProject[];
}

export function ProjectListCard({ projects }: ProjectListCardProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] xl:col-span-2">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {projects.map((item) => (
          <Link
            href={`/dashboard/projects/${item.id}`}
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border bg-card p-3 text-left text-sm transition-all hover:bg-accent",
              item.id === "1" && "bg-muted",
            )}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.student.department && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    item.id === "1"
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {formatTimeToNow(item.createdAt)}
                </div>
              </div>
              <div className="text-xs font-medium">
                {item.student.department}
              </div>
            </div>
            <div
              className={cn("max-w-7xl text-justify text-muted-foreground")}
              dangerouslySetInnerHTML={{ __html: item.description! }}
            ></div>
            {item.technologies.length ? (
              <div className="flex items-center gap-2">
                {item.technologies.split(",").map((technology, index) => (
                  <Badge key={index} variant={"outline"}>
                    {technology}
                  </Badge>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}

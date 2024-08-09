"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExtendedProject } from "@/lib/types/db";
import { dateToUTCDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  project: ExtendedProject;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Card className="overflow-hidden">
      <Link
        className="flex h-full flex-col"
        href={`/dashboard/projects/${project.id}`}
      >
        <Image
          width={1200}
          height={1200}
          src={project.image || ""}
          alt={project.title}
          className="h-48 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>
            At {project.user.College!.name} in {project.user.Department!.name}{" "}
            Department {project.user.Field!.name} Field
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div
            className="line-clamp-3 text-justify"
            dangerouslySetInnerHTML={{ __html: project.description }}
          ></div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-4">
          <CardDescription className="flex w-full items-center justify-between">
            <span>By {project.user.name}</span>
            <span>
              {dateToUTCDate(project.createdAt).toLocaleString("default", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </CardDescription>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;

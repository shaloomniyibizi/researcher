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
import { cn, dateToUTCDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  project: ExtendedProject;
}

const ProjectCard = ({ project }: Props) => {
  const [more, setMore] = useState(false);
  return (
    <Card className="flex flex-col overflow-hidden">
      <Link href={`/dashboard/projects/${project.id}`}>
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
            At Tumba in {project.student.department} Department
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div
            className={cn(
              "text-justify",
              more ? "line-clamp-none" : "line-clamp-3",
            )}
            dangerouslySetInnerHTML={{ __html: project.description }}
          ></div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-4">
          <CardDescription className="flex w-full items-center justify-between">
            <span>By {project.student.user.name}</span>
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

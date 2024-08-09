import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { projectIndex } from "@/lib/newPinecone";
import { getEmbeddings } from "@/lib/openai";
import { dateToUTCDate } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const query = searchParams.query;

  if (Array.isArray(query) || !query) {
    return redirect("/dashboard/summarizer");
  }

  let projects = await db.project.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query.trim().toLowerCase(),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.trim().toLowerCase(),
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      user: {
        include: {
          College: true,
          Department: true,
          Field: true,
        },
      },
    },
    take: 3, // Limit to 3 results
  });

  if (projects.length < 3) {
    // search projects by semantic similarity
    const vector = await getEmbeddings(query);

    const res = await projectIndex.query({
      topK: 5,
      vector,
      includeMetadata: true,
    });

    const vectorProjects = await db.project.findMany({
      where: {
        id: {
          in: res.matches.map((match) => match.id),
        },
      },
      include: {
        user: {
          include: {
            College: true,
            Department: true,
            Field: true,
          },
        },
      },
    });

    projects.push(...vectorProjects);
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-b-md py-4 text-center shadow-md">
        <X className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold">No results</h3>
        <p className="mx-auto mt-1 max-w-prose text-sm text-muted-foreground">
          Sorry, we couldn't find any matches for{" "}
          <span className="font-medium text-primary">{query}</span>.
        </p>
      </div>
    );
  }

  return (
    <Card className="mt-4 overflow-hidden">
      {projects.slice(0, 3).map((project) => (
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
      ))}
    </Card>
  );
};

export default Page;

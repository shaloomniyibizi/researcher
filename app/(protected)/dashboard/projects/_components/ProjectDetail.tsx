"use client";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { ExtendedProject } from "@/lib/types/db";
import { cn, dateToUTCDate } from "@/lib/utils";
import { Download, Heart, Star } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CreateComment from "./CreateComment";
import PostComment from "./PostComment";

interface ProjectProps {
  project: ExtendedProject;
}

const ProjectDetail = ({ project }: ProjectProps) => {
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  const user = useCurrentUser();

  return (
    <div>
      <Head>
        <title>{project.title} | Smart Research</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <section className="flex flex-col gap-8 md:flex-row">
          <div className="h-full lg:flex-shrink-0">
            <Card>
              <CardContent className="flex items-center justify-center pt-6">
                <Image
                  src={project.image || ""}
                  alt={project.title}
                  width={1200}
                  height={1200}
                  className="h-full max-w-full object-cover lg:max-w-[480px]"
                />
              </CardContent>
            </Card>
            <div className="mt-2 hidden items-center justify-between gap-2 md:flex">
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={project.image || ""}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className="h-16 w-28 rounded-sm object-cover"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={project.image || ""}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className="h-16 w-28 rounded-sm object-cover"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={project.image || ""}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className="h-16 w-28 object-cover"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={project.image || ""}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className="h-16 w-28 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold lg:text-3xl">{project.title}</h1>
              <Heart className="hover:fill-red-700 hover:stroke-red-700" />
            </div>
            <div className="mt-2 flex flex-col">
              <p className="text-gray-600">Author: {project.user.name}</p>
              <p className="text-gray-600">
                Published on: {dateToUTCDate(project.createdAt).toDateString()}
              </p>
            </div>
            <div className="mt-2 flex gap-0.5">
              <Star className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
              <Star className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
              <Star className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
              <Star className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
              <Star className="h-4 w-4 stroke-yellow-600" />
              <span className="ml-2 text-xs italic text-muted-foreground">
                (320+ reviews)
              </span>
            </div>
            <Separator className="my-4" />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <div
                className={cn(
                  "text-justify",
                  readMore ? "line-clamp-none" : "line-clamp-3",
                )}
                dangerouslySetInnerHTML={{ __html: project.description! }}
              ></div>
              <Button type="button" size={"sm"} onClick={toggleReadMore}>
                Read {readMore ? "Less" : "More"}
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Technologies Used</h3>
              <p>{project.technologies}</p>
            </div>
            <Separator className="my-4" />
            <h2 className="mt-4 text-2xl font-semibold">Download Links</h2>
            <div className="mt-2 flex gap-8">
              <Button className="w-full" asChild>
                <Link target="_blank" href={project.pdf || ""}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Link>
              </Button>
              <Button className="w-full" asChild variant={"secondary"}>
                <Link target="_blank" href={project.codeLink || ""}>
                  <Download className="mr-2 h-4 w-4" />
                  View Code Repository
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="">
          <Tabs defaultValue="reviews" className=" ">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="objective">Objectives</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
              <ScrollArea className="h-[80vh] whitespace-nowrap rounded-md border p-4">
                <CreateComment projectId={project.id} authorId={user?.id!} />

                <div className="mt-4 flex flex-col gap-y-6">
                  {project.comments
                    .filter((comment) => !comment.replyToId)
                    .map((topLevelComment) => {
                      const topLevelCommentVotesAmt =
                        topLevelComment.votes.reduce((acc, vote) => {
                          if (vote.type === "UP") return acc + 1;
                          if (vote.type === "DOWN") return acc - 1;
                          return acc;
                        }, 0);

                      const topLevelCommentVote = topLevelComment.votes.find(
                        (vote) => vote.userId === user?.id,
                      );

                      return (
                        <div key={topLevelComment.id} className="flex flex-col">
                          <div className="mb-2">
                            <PostComment
                              authorId={user?.id!}
                              comment={topLevelComment}
                              currentVote={topLevelCommentVote}
                              votesAmt={topLevelCommentVotesAmt}
                              projectId={project.id}
                            />
                          </div>

                          {/* Render replies */}
                          {topLevelComment.replies
                            .sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
                            .map((reply) => {
                              const replyVotesAmt = reply.votes.reduce(
                                (acc, vote) => {
                                  if (vote.type === "UP") return acc + 1;
                                  if (vote.type === "DOWN") return acc - 1;
                                  return acc;
                                },
                                0,
                              );

                              const replyVote = reply.votes.find(
                                (vote) => vote.userId === user?.id,
                              );

                              return (
                                <div
                                  key={reply.id}
                                  className="ml-2 border-l-2 py-2 pl-4"
                                >
                                  <PostComment
                                    authorId={user?.id!}
                                    // @ts-ignore
                                    comment={reply}
                                    currentVote={replyVote}
                                    votesAmt={replyVotesAmt}
                                    projectId={project.id}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="objective">
              <div
                className={cn("max-w-7xl text-justify")}
                dangerouslySetInnerHTML={{ __html: project.objective! }}
              ></div>
            </TabsContent>
            <TabsContent value="details">
              <h2 className="mb-4 text-2xl font-semibold">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Methodology</h3>
                  <div
                    className={cn("max-w-7xl text-justify")}
                    dangerouslySetInnerHTML={{ __html: project.methodology! }}
                  ></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Challenges</h3>
                  <div
                    className={cn("max-w-7xl text-justify")}
                    dangerouslySetInnerHTML={{ __html: project.challenges! }}
                  ></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Results</h3>
                  <div
                    className={cn("text-justify")}
                    dangerouslySetInnerHTML={{ __html: project.results! }}
                  ></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

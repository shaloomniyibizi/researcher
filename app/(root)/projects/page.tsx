import Filters from "@/app/(protected)/dashboard/projects/_components/Filters";
import ProjectCard from "@/app/(protected)/dashboard/projects/_components/ProjectCard";
import Footer from "@/components/shared/Footer";
import db from "@/lib/db";
import Head from "next/head";

async function page() {
  const projects = await db.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      technologies: true,
      image: true,
      createdAt: true,
      student: {
        select: {
          field: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return (
    <div>
      <Head>
        <title>Explore Projects | Research Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Filters />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default page;

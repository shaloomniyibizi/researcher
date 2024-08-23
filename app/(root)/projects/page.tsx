import ProjectCard from "@/app/(protected)/dashboard/projects/_components/ProjectCard";
import Footer from "@/components/shared/Footer";

async function page() {
  return (
    <div>
      <main>
        {/* <Filters /> */}
        <ProjectCard />
      </main>
      <Footer />
    </div>
  );
}

export default page;

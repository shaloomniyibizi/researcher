import CallToActionSection from "@/components/layout/CallToActionSection";
import FeatureSection from "@/components/layout/FeatureSection";
import HeroSection from "@/components/layout/HeroSection";
import ProjectSection from "@/components/layout/ProjectSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import Footer from "@/components/shared/Footer";
import { TracingBeam } from "@/components/ui/trace-beams";
import { currentUser } from "@/lib/userAuth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) redirect("/dashboard");
  return (
    <div className="relative">
      <TracingBeam>
        <div className="">
          <HeroSection />
        </div>
        <div className="mx-auto max-w-7xl">
          <FeatureSection />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <ProjectSection />
        </div>
        <div className="">
          <CallToActionSection />
        </div>
        <div className="mx-auto max-w-7xl">
          <TestimonialsSection />
        </div>
      </TracingBeam>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

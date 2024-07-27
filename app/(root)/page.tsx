import CallToActionSection from '@/components/layout/CallToActionSection';
import FeatureSection from '@/components/layout/FeatureSection';
import HeroSection from '@/components/layout/HeroSection';
import ProjectSection from '@/components/layout/ProjectSection';
import TestimonialsSection from '@/components/layout/TestimonialsSection';
import Footer from '@/components/shared/Footer';
import { TracingBeam } from '@/components/ui/trace-beams';

export default function Home() {
  return (
    <div className='relative'>
      <TracingBeam>
        <div className=''>
          <HeroSection />
        </div>
        <div className='max-w-7xl mx-auto'>
          <FeatureSection />
        </div>
        <div className='relative max-w-7xl mx-auto'>
          <ProjectSection />
        </div>
        <div className=''>
          <CallToActionSection />
        </div>
        <div className='max-w-7xl mx-auto'>
          <TestimonialsSection />
        </div>
      </TracingBeam>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
}

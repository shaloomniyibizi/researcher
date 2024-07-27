import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import {
  FileBadge,
  MousePointerClick,
  Signature,
  TableColumnsSplit,
} from 'lucide-react';

const FeatureSection = () => {
  return (
    <div className='py-12 bg-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base text-primary font-semibold tracking-wide uppercase'>
            Features
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
            Tools to Empower Your Research
          </p>
          <p className='mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto'>
            Our platform offers a comprehensive suite of tools designed to
            streamline your research process and enhance the quality of your
            projects.
          </p>
        </div>
        <div className='mt-10'>
          <BentoGrid className='max-w-7xl mx-auto md:auto-rows-[20rem]'>
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
const Skeleton = () => (
  <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white bg-dot-black [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-border '></div>
);
const items = [
  {
    title: 'AI-Powered Research Assistant',
    description:
      'Summarize research papers, suggest relevant sources, and identify potential research gaps.',
    header: <Skeleton />,
    className: 'md:col-span-2',
    icon: <MousePointerClick className='h-4 w-4 text-neutral-500' />,
  },

  {
    title: 'Prevent Project Duplication',
    description:
      'Ensure originality with idea checks and alerts for similar existing projects.',
    header: <Skeleton />,
    className: 'md:col-span-1',
    icon: <FileBadge className='h-4 w-4 text-neutral-500' />,
  },

  {
    title: 'Record Past Projects for Future Reference',
    description:
      'Access a repository of completed student projects, including research papers, code, and presentations.',
    header: <Skeleton />,
    className: 'md:col-span-1',
    icon: <Signature className='h-4 w-4 text-neutral-500' />,
  },

  {
    title: 'Minimize Research Time',
    description:
      'Aggregate trustworthy resources and use efficient tools for information retrieval.',
    header: <Skeleton />,
    className: 'md:col-span-2',
    icon: <TableColumnsSplit className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: 'Improve Project Quality & Functionality',
    description:
      'Submit projects for peer reviews and build upon previous work with enhancements.',
    header: <Skeleton />,
    className: 'md:col-span-2',
    icon: <TableColumnsSplit className='h-4 w-4 text-neutral-500' />,
  },
  {
    title: 'Project Showcase',
    description:
      'Share your research, attract industry interest, and explore collaboration opportunities.',
    header: <Skeleton />,
    className: 'md:col-span-1',
    icon: <TableColumnsSplit className='h-4 w-4 text-neutral-500' />,
  },
];

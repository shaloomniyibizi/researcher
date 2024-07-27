import { projects } from '@/lib/constants';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  return (
    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;

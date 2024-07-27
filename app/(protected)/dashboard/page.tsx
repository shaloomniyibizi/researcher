import { projects } from '@/lib/constants';
import DashboardStats from './_components/DashboardStats';
import NotificationCard from './_components/NotificationCard';
import { ProjectListCard } from './_components/ProjectListCard';

function page() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <DashboardStats />
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <ProjectListCard items={projects} />
          <NotificationCard />
        </div>
      </main>
    </div>
  );
}

export default page;

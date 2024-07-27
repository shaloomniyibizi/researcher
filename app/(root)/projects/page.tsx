import Filters from '@/app/(protected)/dashboard/projects/_components/Filters';
import ProjectList from '@/app/(protected)/dashboard/projects/_components/ProjectList';
import Footer from '@/components/shared/Footer';
import Head from 'next/head';

function page() {
  return (
    <div>
      <Head>
        <title>Explore Projects | Research Platform</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Filters />
        <ProjectList />
      </main>
      <Footer />
    </div>
  );
}

export default page;

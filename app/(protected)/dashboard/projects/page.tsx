import Footer from '@/components/shared/Footer';
import Head from 'next/head';
import Filters from './_components/Filters';
import ProjectList from './_components/ProjectList';

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

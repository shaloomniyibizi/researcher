import { siteConfig } from '@/lib/config/siteConfig';
import type { Metadata, Viewport } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import AsideBar from './dashboard/_components/AsideBar';
import DashboardHeader from './dashboard/_components/DashboardHeader';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Research',
    'chat with PDF',
    'project idea',
  ],
  authors: [
    {
      name: 'Shaloom',
      url: 'https://shadcn.com',
    },
  ],
  creator: 'Shaloom',
  openGraph: {
    type: 'website',
    locale: 'en_RW',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@shaloomOnly',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <AsideBar />
      <div className='flex flex-col sm:pl-14'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

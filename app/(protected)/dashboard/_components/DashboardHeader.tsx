'use client';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mainSideBarMenu } from '@/lib/constants';
import { generateBreadcrumbItems } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Breadcrumbs from './Breadcrumb';
import { SearchForm } from './SearchForm';
import UserButton from './UserButton';

const DashboardHeader = () => {
  const pathname = usePathname();
  const breadcrumbItems = generateBreadcrumbItems(pathname);
  return (
    <header className='sticky top-0 z-50 flex py-2 items-center gap-4 px-4 sm:px-6 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden'
          >
            <svg
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
            >
              <path
                d='M3 5H11'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M3 12H16'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M3 19H21'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            {mainSideBarMenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumbs items={breadcrumbItems} />
      {/*  */}
      <div className='w-64 ml-auto'>
        <SearchForm />
      </div>
      <UserButton />
      <ThemeToggle />
    </header>
  );
};

export default DashboardHeader;

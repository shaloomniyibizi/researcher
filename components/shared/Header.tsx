import Link from 'next/link';

import { cn } from '@/lib/utils';
import { MainNav } from '@/components/shared/MainNav';
import { MobileNav } from '@/components/shared/MobileNav';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/siteConfig';
import { Icons } from './Icons';
import ThemeToggle from './ThemeToggle';

import React from 'react';
import { SearchForm } from '@/app/(protected)/dashboard/_components/SearchForm';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-border/80 shadow-sm shadow-border border-b-2 bg-background/95 backdrop-blur   supports-[backdrop-filter]:bg-background/60'>
      <div className='flex max-w-7xl mx-auto h-14 items-center'>
        <MainNav />
        <MobileNav />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <div className='w-64 ml-auto'>
              <SearchForm />
            </div>
          </div>
          <nav className='flex items-center'>
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0'
                )}
              >
                <Icons.gitHub className='h-4 w-4' />
                <span className='sr-only'>GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target='_blank'
              rel='noreferrer'
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0'
                )}
              >
                <Icons.twitter className='h-3 w-3 fill-current' />
                <span className='sr-only'>Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

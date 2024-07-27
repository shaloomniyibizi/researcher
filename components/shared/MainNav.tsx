'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config/siteConfig';
import { Icons } from '@/components/shared/Icons';
import { Button } from '../ui/button';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className='mr-4 hidden md:flex'>
      <Link href='/' className='mr-4 flex items-center space-x-2 lg:mr-6'>
        <Icons.logo className='h-6 w-6' />
        <span className='hidden font-bold lg:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      <nav className='flex items-center gap-4 text-sm lg:gap-6'>
        <Link
          href='/'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Home
        </Link>
        <Link
          href='/projects'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/home/projects') &&
              !pathname?.startsWith('/home/component/chart')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Projects
        </Link>
        <Link
          href='/contact'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/contact')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Contact
        </Link>
        <Button size={'sm'} asChild className='text-base capitalize font-bold'>
          <Link
            href='/login'
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname?.startsWith('/login') || pathname?.startsWith('/login')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Login
          </Link>
        </Button>
      </nav>
    </div>
  );
}

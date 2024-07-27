import React from 'react';
import { Icons } from './Icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-gray-800'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          <div className='px-5 py-2'>
            <Link href='#' className='text-base text-gray-300 hover:text-white'>
              Privacy Policy
            </Link>
          </div>
          <div className='px-5 py-2'>
            <Link href='#' className='text-base text-gray-300 hover:text-white'>
              Terms of Service
            </Link>
          </div>
          <div className='px-5 py-2'>
            <Link href='#' className='text-base text-gray-300 hover:text-white'>
              Contact Us
            </Link>
          </div>
        </nav>
        <div className='mt-8 flex justify-center space-x-6'>
          <Link href='#' className='text-gray-400 hover:text-gray-300'>
            <span className='sr-only'>Facebook</span>
            {/* Replace with actual Facebook icon */}
            <Icons.facebook className='h-6 w-6' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-gray-300'>
            <span className='sr-only'>Twitter</span>
            {/* Replace with actual Twitter icon */}
            <Icons.gitHub className='h-6 w-6' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-gray-300'>
            <span className='sr-only'>LinkedIn</span>
            {/* Replace with actual LinkedIn icon */}
            <Icons.linkedIn className='h-6 w-6' />
          </Link>
        </div>
        <p className='mt-8 text-center text-base text-gray-400'>
          &copy; 2024 Research Platform, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

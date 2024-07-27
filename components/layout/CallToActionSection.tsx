import Link from 'next/link';
import React from 'react';

const CallToActionSection = () => {
  return (
    <div className='bg-primary'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
        <div className='lg:flex lg:items-center lg:justify-between'>
          <h2 className='text-3xl font-extrabold text-foreground sm:text-4xl'>
            <span className='block'>Ready to get started?</span>
            <span className='block text-indigo-200'>Sign up today.</span>
          </h2>
          <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
            <div className='inline-flex rounded-md shadow'>
              <Link
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-pribg-primary bg-secondary hover:bg-secondary/45'
              >
                Get started
              </Link>
            </div>
            <div className='ml-3 inline-flex rounded-md shadow'>
              <Link
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-foreground '
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;

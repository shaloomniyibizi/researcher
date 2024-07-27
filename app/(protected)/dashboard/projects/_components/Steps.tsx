'use client';

import { StepsType } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StepsProps {
  STEPS: StepsType[];
}

const Steps = ({ STEPS }: StepsProps) => {
  return (
    <ol className='rounded-md bg-accent text-accent-foreground md:flex md:rounded-none md:border-l md:border-r md:text-sm '>
      {STEPS.map((step, i) => {
        return (
          <li key={step.name} className='relative overflow-hidden md:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-zinc-400 md:bottom-0 md:top-auto md:h-1 md:w-full',
                  {
                    'bg-red-900': step.isCurrent,
                    'bg-primary': step.isCompleted,
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'md:pl-4' : '',
                  'flex items-center px-4 py-2 text-sm font-medium'
                )}
              >
                <span className='flex-shrink-0 md:hidden lg:block'>
                  {step.imgPath}
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold ', {
                      'text-primary': step.isCompleted,
                      'text-accent-foreground': step.isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 md:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;

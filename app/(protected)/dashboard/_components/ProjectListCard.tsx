import { ComponentProps } from 'react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProjectData } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ProjectListCardProps {
  items: ProjectData[];
}

export function ProjectListCard({ items }: ProjectListCardProps) {
  return (
    <ScrollArea className='h-[calc(100vh-8rem)] xl:col-span-2'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 bg-card rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              item.id === '1' && 'bg-muted'
            )}
          >
            <div className='flex w-full flex-col gap-1'>
              <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                  <div className='font-semibold'>{item.title}</div>
                  {!item.field && (
                    <span className='flex h-2 w-2 rounded-full bg-blue-600' />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    item.id === '1'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className='text-xs font-medium'>{item.field}</div>
            </div>
            <div className='line-clamp-2 text-xs text-muted-foreground'>
              {item.description.substring(0, 300)}
            </div>
            {item.technologies.length ? (
              <div className='flex items-center gap-2'>
                {item.technologies.map((technology, index) => (
                  <Badge
                    key={index}
                    variant={getBadgeVariantFromTectechnology(technology)}
                  >
                    {technology}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromTectechnology(
  technology: string
): ComponentProps<typeof Badge>['variant'] {
  if (['ai'].includes(technology.toLowerCase())) {
    return 'default';
  }

  if (['personal'].includes(technology.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
}

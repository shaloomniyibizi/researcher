import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

const NotificationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        <Link
          href={'#'}
          className='flex items-center gap-4 transform transition duration-500 hover:scale-95'
        >
          <Avatar>
            <AvatarImage alt={'user'} />
            <AvatarFallback>
              {'Olivia Martin'
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              Add comment to your project
            </p>
          </div>
          <div className='ml-auto text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date('2024-07-12T17:30:00'), {
              addSuffix: true,
            })}
          </div>
        </Link>
        <Link
          href={'#'}
          className='flex items-center gap-4 transform transition duration-500 hover:scale-95'
        >
          <Avatar>
            <AvatarImage alt={'user'} />
            <AvatarFallback>
              {'Olivia Martin'
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              Add comment to your project
            </p>
          </div>
          <div className='ml-auto text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date('2024-07-12T17:30:00'), {
              addSuffix: true,
            })}
          </div>
        </Link>
        <Link
          href={'#'}
          className='flex items-center gap-4 transform transition duration-500 hover:scale-95'
        >
          <Avatar>
            <AvatarImage alt={'user'} />
            <AvatarFallback>
              {'Olivia Martin'
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              Add comment to your project
            </p>
          </div>
          <div className='ml-auto text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date('2024-07-12T17:30:00'), {
              addSuffix: true,
            })}
          </div>
        </Link>
        <Link
          href={'#'}
          className='flex items-center gap-4 transform transition duration-500 hover:scale-95'
        >
          <Avatar>
            <AvatarImage alt={'user'} />
            <AvatarFallback>
              {'Olivia Martin'
                .split(' ')
                .map((chunk) => chunk[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              Add comment to your project
            </p>
          </div>
          <div className='ml-auto text-xs text-muted-foreground'>
            {formatDistanceToNow(new Date('2024-07-12T17:30:00'), {
              addSuffix: true,
            })}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;

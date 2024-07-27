'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  project: {
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    date: string;
  };
}

const ProjectCard = ({ project }: Props) => {
  const [more, setMore] = useState(false);
  return (
    <Card className='overflow-hidden'>
      <Image
        width={1200}
        height={1200}
        src={project.thumbnail}
        alt={project.title}
        className='w-full h-48 object-cover'
      />
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>At Tumba in ICT department</CardDescription>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            'text-justify',
            more ? 'line-clamp-none' : 'line-clamp-3'
          )}
        >
          {project.description}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className='mt-4'>
        <CardDescription className='flex justify-between items-center w-full'>
          <span>By {project.author}</span>
          <span>{project.date}</span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

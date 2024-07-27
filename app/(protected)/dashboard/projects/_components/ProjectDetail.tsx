'use client';

import Footer from '@/components/shared/Footer';
import Head from 'next/head';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarFilledIcon } from '@radix-ui/react-icons';
import {
  CalendarDays,
  Download,
  Heart,
  MessageSquareReply,
  Star,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '@/lib/validations/reviews';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectProps {
  project: {
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    date: string;
    details: {
      objective: string;
      technologies: string;
      methodology: string;
      challenges: string;
      results: string;
    };
    downloadLinks: {
      pdf: string;
      code: string;
    };
    comments: {
      author: string;
      date: string;
      text: string;
    }[];
  };
}

const ProjectDetail = ({ project }: ProjectProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: '',
      name: '',
      email: '',
    },
  });
  // 2. Define a submit handler review.
  function onSubmit(values: z.infer<typeof reviewSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    toast.success('Thank for your review');
  }
  return (
    <div>
      <Head>
        <title>{project.title} | Smart Research</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-7xl mx-auto px-4 py-8'>
        <section className='flex gap-8 flex-col md:flex-row'>
          <div className='h-full lg:flex-shrink-0'>
            <Card>
              <CardContent className='pt-6 flex justify-center items-center'>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={1200}
                  height={1200}
                  className='max-w-full lg:max-w-[480px] h-full object-cover'
                />
              </CardContent>
            </Card>
            <div className='hidden md:flex justify-between gap-2 items-center mt-2'>
              <Card>
                <CardContent className='p-2'>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className='w-28 h-16 object-cover'
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-2'>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className='w-28 h-16 object-cover'
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-2'>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className='w-28 h-16 object-cover'
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-2'>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={1200}
                    height={1200}
                    className='w-28 h-16 object-cover'
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className='max-w-2xl'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl lg:text-3xl font-bold'>{project.title}</h1>
              <Heart className='hover:fill-red-700 hover:stroke-red-700' />
            </div>
            <div className='flex flex-col mt-2'>
              <p className='text-gray-600'>Author: {project.author}</p>
              <p className='text-gray-600'>Published on: {project.date}</p>
            </div>
            <div className='flex gap-0.5 mt-2'>
              <Star className='fill-yellow-600 stroke-yellow-600 w-4 h-4' />
              <Star className='fill-yellow-600 stroke-yellow-600 w-4 h-4' />
              <Star className='fill-yellow-600 stroke-yellow-600 w-4 h-4' />
              <Star className='fill-yellow-600 stroke-yellow-600 w-4 h-4' />
              <Star className=' stroke-yellow-600 w-4 h-4' />
              <span className='ml-2 text-xs text-muted-foreground italic'>
                (320+ reviews)
              </span>
            </div>
            <Separator className='my-4' />
            <div className='mt-4'>
              <h3 className='text-xl font-semibold'>Objective</h3>
              <p>{project.details.objective}</p>
            </div>
            <div className='mt-4'>
              <h3 className='text-xl font-semibold'>Technologies Used</h3>
              <p>{project.details.technologies}</p>
            </div>
            <Separator className='my-4' />
            <h2 className='text-2xl font-semibold  mt-4'>Download Links</h2>
            <div className='flex gap-8 mt-2'>
              <Button className='w-full' asChild>
                <Link href={project.downloadLinks.pdf}>
                  <Download className='mr-2 h-4 w-4' />
                  Download PDF
                </Link>
              </Button>
              <Button className='w-full' asChild variant={'secondary'}>
                <Link href={project.downloadLinks.code}>
                  <Download className='mr-2 h-4 w-4' />
                  View Code Repository
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Separator className='my-8' />

        <section className=''>
          <Tabs defaultValue='reviews' className=' '>
            <TabsList>
              <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              <TabsTrigger value='description'>Descriptions</TabsTrigger>
              <TabsTrigger value='details'>Details</TabsTrigger>
            </TabsList>
            <TabsContent value='reviews'>
              <ScrollArea className='p-4 whitespace-nowrap rounded-md border h-[80vh]'>
                {project.comments.map((comment, index) => (
                  <Card key={index} className='mb-4'>
                    <div className='flex '>
                      <Avatar className='border-border my-6 ml-6'>
                        <AvatarImage src='/images/PassPort.jpg' />
                        <AvatarFallback>SN</AvatarFallback>
                      </Avatar>

                      <div className=''>
                        <CardHeader>
                          <CardTitle>{comment.author}</CardTitle>
                          <div className='flex'>
                            <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                            <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                            <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                            <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                            <Star className='w-4 h-4 text-yellow-600' />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>{comment.text}</p>
                        </CardContent>
                        <CardFooter>
                          <CardDescription className='flex items-center gap-8'>
                            <span className='group flex justify-center items-center gap-1'>
                              <ThumbsUp className='w-4 h-4 group-hover:fill-primary' />{' '}
                              Like
                            </span>
                            <span className='flex group justify-center items-center gap-1'>
                              <MessageSquareReply className='w-4 h-4 group-hover:fill-primary ' />{' '}
                              Reply
                            </span>
                            <span className='flex justify-center items-center gap-1'>
                              <CalendarDays className='w-4 h-4' />
                              {comment.date}
                            </span>
                          </CardDescription>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
                <Card className='mt-8'>
                  <div className='flex '>
                    <Avatar className='border-border my-6 ml-6'>
                      <AvatarImage src='/images/PassPort.jpg' />
                      <AvatarFallback>SN</AvatarFallback>
                    </Avatar>

                    <div className='flex-1'>
                      <CardHeader>
                        <CardTitle>Comments and Feedback</CardTitle>
                        <CardDescription className='flex items-center gap-8'>
                          Comments and Feedback
                        </CardDescription>
                      </CardHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          <CardContent>
                            <div className='flex gap-8 mb-4'>
                              <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                  <FormItem className='w-full'>
                                    <FormControl>
                                      <Input
                                        placeholder='Enter your name'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                  <FormItem className='w-full'>
                                    <FormControl>
                                      <Input
                                        placeholder='Enter your email'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name='review'
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      placeholder='Add your comment'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                          <CardFooter className='flex justify-between items-center'>
                            <div className='flex'>
                              <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                              <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                              <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                              <StarFilledIcon className='w-4 h-4 text-yellow-600' />
                              <Star className='w-4 h-4 text-yellow-600' />
                            </div>
                            <Button type='submit'>Post Review</Button>
                          </CardFooter>
                        </form>
                      </Form>
                    </div>
                  </div>
                </Card>
              </ScrollArea>
            </TabsContent>
            <TabsContent value='description'>
              <p className='text-lg text-justify '>{project.description}</p>
            </TabsContent>
            <TabsContent value='details'>
              <ScrollArea className='p-4 whitespace-nowrap rounded-md border h-[80vh]'>
                <h2 className='text-2xl font-semibold mb-4'>Project Details</h2>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-xl font-semibold'>Methodology</h3>
                    <p>{project.details.methodology}</p>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold'>Challenges</h3>
                    <p>{project.details.challenges}</p>
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold'>Results</h3>
                    <p>{project.details.results}</p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

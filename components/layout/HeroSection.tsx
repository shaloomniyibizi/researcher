import Image from 'next/image';
import React from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Link from 'next/link';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { InfiniteMovingCards } from '@/components/ui/infinity-moving-card';
import { Card, CardContent } from '../ui/card';
import { Star } from 'lucide-react';

const people = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    image: '/PassPort.jpg',
  },
  {
    id: 2,
    name: 'Robert Johnson',
    designation: 'Product Manager',
    image: '/PassPort.jpg',
  },
  {
    id: 3,
    name: 'Jane Smith',
    designation: 'Data Scientist',
    image: '/PassPort.jpg',
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'UX Designer',
    image: '/PassPort.jpg',
  },
  {
    id: 5,
    name: 'Tyler Durden',
    designation: 'Soap Developer',
    image: '/PassPort.jpg',
  },
  {
    id: 6,
    name: 'Dora',
    designation: 'The Explorer',
    image: '/PassPort.jpg',
  },
];
const testimonials = [
  {
    // quote:
    //   'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
  },
  {
    // quote:
    //   "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: 'William Shakespeare',
    title: 'Hamlet',
  },
  {
    // quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
  },
  {
    // quote:
    //   'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    // quote:
    //   'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
  },
];

const HeroSection = () => {
  return (
    <section className='w-full min-h-full'>
      <div className='relative'>
        <div className='flex h-full'>
          <div className='flex flex-col justify-center container text-center items-center md:items-start md:text-start'>
            <div className='flex-1 flex flex-col justify-center'>
              <i className='text-sm text-muted-foreground italic ml-1.5 -mb-2 block'>
                AI-based Research Assistant
              </i>
              <h1 className='md:text-5xl sm:max-w-2xl sm:text-4xl lg:text-7xl text-2xl font-extrabold tracking-tight text-balance relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground '>
                Empower Your{' '}
                <span className='underline decoration-primary decoration-dashed underline-offset-4'>
                  Research
                </span>{' '}
                Journey
              </h1>
              <p className='mt-4 text-base text-muted-foreground text-justify md:border-l-2 pl-2 md:border-primary sm:mt-6 sm:max-w-2xl sm:mx-auto md:mt-8 md:text-lg lg:mx-0'>
                Welcome to the Research Platform, a transformative tool designed
                to revolutionize the way students conduct research projects. Our
                platform harnesses the power of artificial intelligence to
                provide an all-in-one solution that streamlines research
                processes, fosters originality, and enhances project quality.
              </p>
              <div className='mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='mt-3 sm:mt-0'>
                  <Link
                    href='#'
                    className='w-full flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/75 md:py-2 md:text-lg md:px-4'
                  >
                    Explore Past Projects
                  </Link>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-4'>
                  <Link
                    href='#'
                    className='w-full flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-secondary-foreground bg-secondary hover:bg-secondary/75 md:py-2 md:text-lg md:px-4'
                  >
                    Try AI Assistant
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex gap-8 items-center w-full'>
              <div className='  flex items-center flex-nowrap'>
                <AnimatedTooltip items={people} />
              </div>
              <div className='w-full'>
                <div className='flex gap-1 items-center'>
                  <Star className='w-4 h-4 fill-yellow-600 stroke-yellow-600' />
                  <Star className='w-4 h-4 fill-yellow-600 stroke-yellow-600' />
                  <Star className='w-4 h-4 fill-yellow-600 stroke-yellow-600' />
                  <Star className='w-4 h-4 fill-yellow-600 stroke-yellow-600' />
                  <Star className='w-4 h-4 fill-yellow-600 stroke-yellow-600' />
                </div>
                <p className=''>1,250 Happy students</p>
              </div>
            </div>
          </div>

          <div className='hidden z-30 flex-1 md:flex justify-center items-end min-w-[40vw] min-h-[32rem] max-w-3xl content-end bg-slate-400 rounded-bl-[12rem]'>
            <div className='relative h-full w-full'>
              <Image
                src={'/images/wow.avif'}
                width={1200}
                height={1200}
                alt='research'
                className='clip-polyi object-cover h-full w-full rounded-bl-[12rem]'
              />
              <div className='absolute top-8 flex gap-2 rounded px-6 py-4 justify-center items-center -left-24 bg-primary/45 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-primary/45 transition-transform'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={48}
                  height={48}
                  fill='currentColor'
                  viewBox='0 0 512 512'
                >
                  <path d='M242 36a99 99 0 0 1 8 7l4 4c4 0 4 0 6-2l2-2c7-7 16-12 26-16l3-1a74 74 0 0 1 91 49l1 6h2c20-4 40 0 57 11 15 11 26 26 30 44 2 17 1 34-7 49l2 1c11 10 20 23 21 38 1 11 1 21-4 31l-1 3c-8 14-19 23-34 29-7 2-14 1-21 1h-4a1252 1252 0 0 1-32 1 369 369 0 0 1-6 0h-3c-4-1-5-2-7-5v-4l-1-2c1-3 3-4 5-6l5-1h10a1331 1331 0 0 1 28 0c14 0 26-2 37-12 9-9 11-20 10-32 0-11-6-18-14-26-3 1-6 3-8 6a70 70 0 0 1-52 17c-11 0-19-5-27-13-9-10-10-21-9-34 1-11 7-19 15-26 11-7 22-8 34-7 5 1 10 3 14 6 1 4 2 5 1 9-1 3-1 3-4 5-4 1-8 1-11-1-6-2-12-2-17 0-6 2-10 7-13 12a24 24 0 0 0 15 31c15 1 28-2 40-11l2-1c9-7 16-21 18-32 2-17-1-30-11-44l-1-2c-7-9-21-16-32-18-9-1-17-1-26 1v2c-1 11-6 20-14 27-11 8-22 9-35 8-11-2-19-9-25-18-7-10-8-23-5-34 1-5 3-9 7-12h7c3 0 3 1 5 3 1 5 1 8-1 13-2 6-2 13 1 18 3 6 8 10 14 12 7 1 14 1 20-4 5-5 8-9 8-16 0-14-3-24-11-36l-1-2c-7-9-21-16-32-18-18-2-33 2-47 13-6 6-10 11-11 20v8a954 954 0 0 1 0 4 963 963 0 0 0 0 11 1621 1621 0 0 1 0 24v7c0 4-1 5-4 7h-8c-3-2-4-4-5-8a131 131 0 0 1 0-6v-16a1036 1036 0 0 1 0-24 282 282 0 0 1 0-6c0-8-1-12-7-18a58 58 0 0 0-42-16c-13 0-22 4-32 11l-2 1c-9 7-16 21-18 32-1 7-1 16 3 22s9 10 16 10c8 0 13 0 19-6 5-6 6-11 6-19 0-3 0-5-2-7V75l5-4c5 0 6 0 10 3l2 4 1 2c4 9 3 22 0 31-4 11-12 19-23 23-10 4-23 4-33-1-10-6-18-14-21-25l-1-9c-15-3-31-2-45 6a247 247 0 0 0-5 4l-2 1c-9 7-16 21-18 32-2 17 1 30 11 44l1 2c7 9 21 16 32 18 7 1 16 1 22-3s10-9 10-16c0-8 0-13-6-19-5-4-9-6-16-6h-3l-8 2h-9c-3-3-4-4-4-8s1-5 4-8c10-5 22-5 32-3a40 40 0 0 1 26 54c-4 11-12 19-23 23a68 68 0 0 1-69-21c-7 3-11 9-14 15-4 11-4 23 1 33s13 16 24 20c8 2 15 2 23 2h7a1810 1810 0 0 0 22 0h9c3 1 4 3 6 5l1 4v2c-1 3-3 4-5 6l-6 1h-21a867 867 0 0 0-11 0h-8a736 736 0 0 0-6 0c-14-1-29-5-39-15a59 59 0 0 1-17-42v-3c0-13 4-23 12-33l1-2 10-9-1-2-1-3-2-3c-6-18-5-39 3-56 9-19 25-31 45-39 11-4 26-4 38-1v-2c4-18 15-32 29-43 25-16 59-17 84 0z' />
                  <path d='M228 152c3 2 4 3 4 7v25h15v-15c0-6 0-11 3-16 3-2 7-2 10-1 3 2 4 3 4 7v25h15v-15c0-6 0-11 3-16 3-2 7-2 10-1 3 2 4 3 4 7v15a902 902 0 0 1 0 10h3c14-1 14-1 20 4 5 5 9 9 9 17a267 267 0 0 1 0 4v7h25c4 0 5 1 7 4l1 4v2c-1 3-3 4-5 6h-28v16h25c4 0 5 1 7 4l1 4v2c-1 3-3 4-5 6h-28v16h25c4 0 5 1 7 4l1 4v2c-1 3-3 4-5 6h-18a902 902 0 0 1-10 0v3c1 14 1 14-4 20-5 5-9 9-17 9a267 267 0 0 1-4 0h-7v25c0 4-1 5-4 7h-8c-3-2-4-4-5-8v-24h-15v25c0 4-1 5-4 7h-8c-3-2-4-4-5-8v-24h-15v25c0 4-1 5-4 7h-8c-3-2-4-4-5-8v-24h-3c-13 1-13 1-19-4-5-5-9-9-9-17v-11h-25c-4 0-5-1-7-4l-1-4v-2c1-3 3-4 5-6h28v-16h-25c-4 0-5-1-7-4l-1-4v-2c1-3 3-4 5-6h28v-16h-25c-4 0-5-1-7-4l-1-4v-2c1-3 3-4 5-6h28v-3c-1-14-1-14 4-20 5-5 9-9 17-9h10v-15c0-6 0-11 3-16 3-2 7-2 10-1zm-26 51-1 6v40a3931 3931 0 0 1 0 18 2880 2880 0 0 0 0 30l-1 3c0 5 0 5 3 10 4 3 9 2 14 2h18a8589 8589 0 0 0 60 0h2c5 0 9 0 13-3 3-4 2-9 2-14v-19a4983 4983 0 0 0 0-59v-2c0-5 0-9-3-13-4-3-9-2-14-2h-19a4983 4983 0 0 0-59 0h-2c-5 0-9 0-13 3zm-40 105c3 0 4 2 6 4l1 12v22c0 5-1 8-3 13l-6 1h-40v25l6 2c5 3 9 8 10 14 1 8 1 16-4 22-5 5-9 9-16 9-9 0-15 0-21-6-6-7-7-12-7-22 0-7 3-10 8-15l6-4v-3a1619 1619 0 0 1 0-22l1-2c0-5 1-9 3-13l6-1h40v-3a1204 1204 0 0 1 0-15 466 466 0 0 1 0-7v-4c0-3 0-3 2-5 3-3 5-3 8-2zm-55 95c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2zm183-28h4a2868 2868 0 0 1 48 0h3c4 1 5 2 7 5l1 10v7a9880 9880 0 0 0 0 31v4l1 9 6 4 3 3 2 2c4 6 4 14 3 21-2 7-6 11-12 15-6 3-15 3-21 1s-11-7-14-13c-2-7-2-15 1-21 2-5 7-9 12-12l1-49h-22a1198 1198 0 0 0-17 0h-10c-3 0-4-2-6-4v-4l-1-2c2-6 6-7 11-7zm49 84c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2zm-169-83h10a3734 3734 0 0 1 36 0 404 404 0 0 1 6 0h3c4 0 5 1 7 4l1 4v2c-1 3-3 4-5 6h-15a1362 1362 0 0 1-11 0 5963 5963 0 0 0-25 0 1788 1788 0 0 0 0 38v3l1 8 6 4 3 3 2 2c4 6 4 14 3 21-2 7-6 11-12 15-6 3-15 3-21 1s-11-7-14-13c-2-7-2-15 1-21 2-5 7-9 12-12v-2a4365 4365 0 0 1 0-42l1-4c0-6 0-11 3-16l8-1zm-7 83c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2zm189-151 2-1c3 1 4 3 6 5v10a526 526 0 0 1 0 6 2321 2321 0 0 0 0 16h19a918 918 0 0 0 6 0h12c6 0 6 0 10 2 2 4 2 8 2 13v5a458 458 0 0 1 0 14v2l1 5 6 4 3 3 2 2c4 6 4 14 3 21-2 7-6 11-12 15-6 3-15 3-21 1s-11-7-14-13c-2-7-2-15 1-21s8-10 14-12v-25h-9a3447 3447 0 0 1-25 0h-3l-10-1c-2-4-2-8-2-13v-3a619 619 0 0 1 0-21v-3l3-10 6-2zm43 95c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2z' />
                  <path d='M387 303h2a509 509 0 0 1 7 0h5a1346 1346 0 0 1 44 0h4c4 1 5 2 7 5 2 5 1 10 1 15l1 6 6 4 3 3 2 2c4 6 4 14 3 21-2 7-6 11-12 15-6 3-15 3-21 1s-11-7-14-13c-2-7-2-15 1-21s8-10 14-12v-9h-2a3590 3590 0 0 1-42 0h-13c-4 0-5-1-7-4v-4l-1-2c2-6 7-7 12-7zm56 44c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2zM234 223h10a1011 1011 0 0 1 28 0h9c4 1 5 2 7 5l1 9v35c0 6 0 10-3 15l-7 1h-11a3400 3400 0 0 1-27 0h-10c-4 0-5-1-7-4l-1-6v-10a1011 1011 0 0 1 0-28v-9c2-6 5-7 11-8zm7 17v32h31v-32h-31zM67 303h2a509 509 0 0 1 7 0h5a1346 1346 0 0 1 44 0h4c4 1 5 2 7 5l1 4v2c-1 3-3 4-5 6h-18a1278 1278 0 0 1-10 0H72v9l3 1c5 2 9 6 12 11 2 7 2 16-1 22s-8 11-15 13c-8 1-16 1-22-4-5-5-9-9-9-16 0-9 0-15 6-21 3-3 6-5 10-6v-19c1-6 5-7 11-7zm-8 44c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2zm201 29c3 2 4 3 4 7v11a1391 1391 0 0 0 0 15v32l3 1c6 2 9 6 12 11 2 7 2 16 0 22-4 6-9 11-16 13-8 1-16 1-22-4-5-5-9-9-9-16 0-13 0-13 4-19l10-8v-2a4365 4365 0 0 1 0-42l1-4c0-6 0-11 3-16 3-2 7-2 10-1zm-9 83c-2 3-3 4-2 8l4 4c4 1 5 0 8-2 2-3 3-4 2-8l-4-4c-4-1-5 0-8 2zm153-3 4 4c1 4 1 7-1 11-4 2-7 2-11 1l-4-4c-1-4-1-7 2-10s6-3 10-2zm-288 0 4 4c1 4 1 7-1 11-4 2-7 2-11 1l-4-4c-1-4-1-7 2-10s6-3 10-2zM404 48l4 4c1 4 1 7-1 11-4 2-7 2-11 1l-4-4c-1-4-1-7 2-10s6-3 10-2zm-288 0 4 4c1 4 1 7-1 11-4 2-7 2-11 1l-4-4c-1-4-1-7 2-10s6-3 10-2z' />
                </svg>
                Project Idea Generator
              </div>
              <div className='absolute bottom-8 flex gap-2 rounded px-6 py-4 justify-center items-center -left-32 bg-primary/45 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-primary/45 transition-transform'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 512 512'
                  width={48}
                  height={48}
                >
                  <path d='M300 7c41-1 80 14 111 42l2 1a158 158 0 0 1 48 129v7c-2 8 1 12 5 19l3 7 2 3 8 15 3 5 2 3 2 4 2 3 1 2c2 3 2 6 1 9-2 4-6 4-10 6a2860 2860 0 0 0-12 4c-12 4-12 4-20 13l-1 9v27l-1 12v3c0 10-1 17-8 24-5 3-10 4-16 4h-42v40l9 2c5 3 9 6 11 11 2 7 2 13 1 20l4 1c7 2 11 6 15 12 2 5 2 12 0 17-2 6-6 9-11 12l-8 1h-30a17100 17100 0 0 1-75 0h-5a1397225 1397225 0 0 0-8 0 27890 27890 0 0 0-148 0h-9c-3 0-3-1-5-3-1-5-1-5 1-8l7-1h29a5487 5487 0 0 1 85-1h43a43859 43859 0 0 0 105 0h9l6-2c2-3 2-4 2-8l-3-5-8-1h-9a2644 2644 0 0 0-18 0h-14a11064 11064 0 0 0-117 0h-4a404073 404073 0 0 0-52-1h-3a51856 51856 0 0 1-144 0 670 670 0 0 0-4 0H22c-3 0-5-1-7-3-1-4 0-6 2-9h10l9-1h65l-1-5c-2-2-2-2-5-2l-2-1c-4-1-4-1-7 1l-3 2c-4 2-6 3-10 2l-6-6-2-1a291 291 0 0 1-3-4 111 111 0 0 0-3-3l-5-8 4-9c3-4 3-4 3-8l-4-7v-2h-2c-9-1-9-1-13-4-2-4-1-10-1-15v-11c0-3 1-5 3-7l4-1 3-1h6l1-2v-3l1-3 2-5-3-4-4-9c1-4 3-6 7-9l7-8 8-6c5 1 7 3 10 6l5 1 2-1 4-1c2 0 2 0 3-2l2-11c1-3 1-3 4-5h25l5 1 2 7 1 3v6h3l6 2h5a598 598 0 0 0 5-4l5-2c4 1 5 3 8 6a497 497 0 0 0 3 3l4 3 2 2c2 3 4 5 5 9 0 4-1 5-3 8-3 3-3 3-3 8l3 6 1 3 6 2c7 1 7 1 9 4v19c0 10 0 10-2 13l-6 1c-5 1-5 1-9 4-1 4-3 8-1 12l4 6c2 3 1 5 0 9l-7 7-2 2a400 400 0 0 1-3 3l-4 4-5 3-7-4c-4-3-4-3-7-3l-5 2-5 1-1 6 63-1-1-3c-1-8 0-15 4-21 5-4 8-6 14-8h3a2829 2829 0 0 0 1-80c0-11 0-11-3-21l-13-8-4-3-2-2-1-1-2-1-7-7c-2-4-4-7-9-8a125 125 0 0 0-16 0 682 682 0 0 0-30 0 376 376 0 0 0-7 0l-4 1h-3c-5-1-7-4-9-8l-1-1-2-2-1-2a3846 3846 0 0 0-3-5l-1-2-8-10a3715 3715 0 0 1-15-22 826 826 0 0 0-8-11l-2-2a612 612 0 0 0-2-4l-3-6h-3a2016 2016 0 0 1-26 0h-2l-8-1c-2-3-1-6 0-9 3-2 4-2 7-2h8a992 992 0 0 1 5 0 648 648 0 0 0 9-1h8c5 0 6 1 10 3l2 3 1 2 2 1 1 2 1 2 2 2a730 730 0 0 1 25 37l9 11 1 3 2 2 1 1 3 5h52a13675 13675 0 0 0 128 0l1-2 1-2 1-2c2-5 6-7 11-9 8-2 14-2 22 2 4 4 7 8 9 13 1 8 1 15-4 22-4 5-10 8-16 8-7 0-12-1-18-5l-7-11h-45l12 19 5 6 6 9 1 3 2 3 2 2 2 3h9l4 1h12l1-3c2-7 7-10 13-13 6-2 12-1 18 1 5 3 9 6 12 11 2 9 2 16-3 24-3 5-7 8-13 9-7 1-14 1-20-4-4-4-6-7-8-13h-3a529 529 0 0 1-21 1h-4c-6-2-8-5-11-10l-2-2-5-8-2-3a5418 5418 0 0 1-15-24l-2-3-2-2a76 76 0 0 0-3-4l-1-4-41 1 18 15 3 2 3 2 8 7v104h134v-50c3-3 4-2 7-2h11a2994 2994 0 0 1 27-1h9l8-2c2-3 2-5 2-8v-15a2485 2485 0 0 0 0-24v-4c1-11 3-19 10-27 6-6 13-8 21-11l3-1 9-3c-7-13-13-26-21-38a721 721 0 0 1-3-6 204 204 0 0 0-2-4c-3-5-3-8-2-14A148 148 0 0 0 323 21c-17-1-35-1-52 3l-2 1c-14 3-26 9-38 16l-3 1-5 3h4a1177 1177 0 0 1 20 0c15 0 25 2 38 8l6 3 9 4c5 3 5 3 11 2l5-3a24 24 0 0 1 30 12c3 7 2 14-1 21-2 6-7 8-12 11-8 2-14 1-21-2-5-3-8-7-10-13V74h-2l-9-4c-18-9-34-12-55-12h-9a1334 1334 0 0 0-43-1 697 697 0 0 0-19 0h-11c-16-1-16-1-30 5-5 6-8 13-12 20-1 4-3 7-6 10l-1 3-4 6a2206 2206 0 0 0-10 15l-2 4-4 5-1 3-2 2-3 3a82 82 0 0 1-5 0h-9a2714 2714 0 0 1-25 0h-9l-4-1-1-6c1-3 1-3 4-5h43l1-2 4-8 2-3 2-3 3-5 4-6 8-13 6-9a992 992 0 0 0 7-11l2-3 2-4c3-4 5-6 9-8a61 61 0 0 1 8 0h2a598 598 0 0 1 53 0c8 0 14 0 21-5a473 473 0 0 0 5-5l9-6 2-1c24-14 49-21 77-22zm17 66c-2 3-3 4-3 8s1 6 4 9c3 2 5 2 8 2 4-1 5-3 8-6 2-3 1-6 1-9-2-4-5-6-9-7-4 0-6 1-9 3zm0 182c-2 3-2 6-1 10 2 3 3 5 6 6h9c4-3 6-5 6-10 0-4-1-5-3-8-7-4-11-4-17 2zm-203 37-1 3-1 4-1 3c-1 4-3 4-6 6h-2l-11 5c-5 1-7 0-11-2l-2-2-3-1-4 4-2 2-1 2 4 7c2 3 1 5 1 9l-4 8-2 7-2 4-12 3v14l6 1c6 1 6 1 7 4l1 4 5 10 1 9-4 6v4l5 5 2 2 1 1 1-1 2-1 2-2 6-2 4 1 2 1 2 1 3 1 11 6 1 6 2 6h12v-3c1-3 1-7 3-10 4-3 8-4 12-5a177 177 0 0 0 5-2c3-2 4-2 7-1l8 5c4-2 6-4 9-8 0-4-2-6-4-9-2-5 1-10 2-14l4-9c1-3 1-3 4-4l3-1c4 0 4 0 7-2v-13h-2c-9-2-9-2-12-5l-2-7a404 404 0 0 0-3-6c-2-4-3-7-1-12l5-8-8-8-7 4c-3 2-5 1-8 1l-8-4-7-2-4-2c-2-4-2-9-3-13h-12zm213 22c-2 3-2 6-1 10 2 3 3 5 7 7 4 0 6 0 9-2 4-2 4-2 5-6 0-5 0-7-4-11-6-4-11-3-16 2zM213 416v10c2 4 4 4 8 6h43a8411 8411 0 0 0 110 1h4c4-1 6-3 9-5 2-4 2-6 2-10-2-4-3-5-6-7h-15a3388 3388 0 0 0-18 0 7446 7446 0 0 1-124-1h-4c-4 1-6 3-9 6z' />
                  <path d='M252 79c6 3 10 7 12 13 2 7 1 14-3 20s-9 10-16 11c-8 1-13-1-19-6-4-3-5-5-7-10l-73-1-2 4a140 140 0 0 1-3 4l-1 2-2 3-2 2a1557 1557 0 0 1-13 19l-1 2-2 2-5 8 79-1 4-8a24 24 0 0 1 36-1c6 7 6 14 5 23-1 6-5 9-10 13-6 3-11 4-18 3-7-2-12-6-16-13l-1-3-79-1a929 929 0 0 0 31 46h94l2-5a91 91 0 0 1 3-4l1-3 2-3 2-2 6-9 4-6 9-13a108 108 0 0 0 4-6c4-7 4-7 7-8h10a290 290 0 0 1 26 1l1-3c2-7 6-11 13-14a24 24 0 1 1 15 45c-8 1-14 0-21-4-4-3-5-7-7-12-10-2-22-4-32 1-10 8-16 21-22 32l-5 9-2 2-1 2a5344 5344 0 0 0 92 0h3l7-1 4-6c2-4 7-7 11-9 8-1 16-1 22 4 5 4 8 9 8 15 0 8 0 14-6 20a23 23 0 0 1-35-1l-4-8h-3a36950 36950 0 0 1-204 0h-3c-4 0-6-1-9-3l-4-6-2-2-1-2a3846 3846 0 0 0-3-5l-1-2-8-10-3-4-1-3-10-13-1-2a585 585 0 0 1-4-5 226 226 0 0 0-3-5v-8l5-8 3-4 2-3 9-12 4-5a7551 7551 0 0 0 10-14l1-2c8-12 8-12 12-13h77v-2c1-5 5-8 9-11 7-4 16-5 23-1zm-19 14c-2 4-2 6-2 10 1 3 2 4 5 6 3 1 6 2 10 1l6-7c0-5 0-8-3-11-7-4-10-4-16 1zm96 59c-2 3-1 6-1 9 2 3 3 5 7 7l9-1c3-3 5-5 5-9 0-5-2-7-5-10-6-3-11 0-15 4zm-122 1c-2 4-1 7 0 11l8 5c5 0 7-1 10-4 2-4 2-6 2-10-2-4-3-5-6-7-6-1-10 0-14 5zm163 58c-2 3-2 6-1 10l5 5 1 1c5 1 7 1 11-2 3-3 4-5 4-9 0-3-2-5-4-8-6-4-11-2-16 3zM178 492h36a26195 26195 0 0 1 57 0 9271 9271 0 0 1 24 0 3946 3946 0 0 0 32 0 644 644 0 0 1 7 0h4c3 0 5 1 7 3l1 4c-2 5-2 5-5 6h-43a26195 26195 0 0 1-113 0 644 644 0 0 1-7 0h-4c-3 0-5-1-7-3l-1-4c3-6 5-6 12-6zm-43-162c8 5 15 12 17 22s1 20-5 29c-5 7-12 12-21 14-9 1-17 0-25-6s-13-13-14-24 2-20 9-29c10-10 26-12 39-6zm-31 16c-4 6-6 12-5 20 2 7 5 11 12 15 5 2 11 3 17 1 6-4 10-8 12-15 1-7 1-14-4-20-5-5-9-8-16-8s-11 2-16 7zM371 52c9 5 16 11 23 18l3 3c23 22 36 53 38 85v2l-1 10-5 2c-4-1-5-2-7-5l-1-7c0-27-11-51-28-72l-2-2c-6-8-14-14-23-20l-3-2-2-2c-2-1-2-1-2-4 0-4 0-4 2-6h8zm76 380h10a1762 1762 0 0 1 25 0h10c2 0 3 1 5 3 1 5 1 5-1 8l-7 1h-10a1050 1050 0 0 1-25 0l-3 1h-6c-3-1-4-2-6-5 0-6 2-8 8-8zM72 152h7l3-1c4 1 5 2 7 5 0 4 0 5-3 8H61l-5-1c-2-3-1-5-1-8 5-5 11-3 17-3zM351 43c3 0 5 1 8 3l1 8-4 3c-5 0-9-2-14-4-2-3-1-6-1-9 4-3 5-2 10-1zm-28-8h3l7 4v7c-3 2-4 3-8 3l-3-1h-3l-5-3c-1-6-1-6 1-9 3-2 5-1 8-1zM101 463c2 2 2 2 2 5l-1 5c-3 2-6 1-9 1-2-3-2-5-2-9 2-4 6-3 10-2zm23-59 1 4v4c-3 2-4 2-8 2l-3-3 1-7c3-3 5-2 9 0zm-51-48 5 1 1 7-3 3h-6l-3-4c0-4 1-7 6-7zm51-46 1 4c0 4 0 4-2 6-3 1-5 0-8-1v-9c3-2 6-1 9 0zm32 79c2 2 2 2 2 6 0 3 0 3-2 5l-8-1c-2-3-1-6 0-9l8-1zm-66 0c2 2 2 2 2 6 0 3 0 3-2 5l-8-1c-2-3-1-6 0-9l8-1zm76-33 5 1c2 3 1 6 0 9l-8 1c-2-2-2-2-2-5 0-5 1-6 5-6zm-10-33c2 2 2 2 2 6 0 3 0 3-2 5l-8-1c-2-3-1-6 0-9l8-1zm-66 0c2 2 2 2 2 6 0 3 0 3-2 5l-8-1c-2-3-1-6 0-9l8-1z' />
                </svg>
                Chat with Any PDF
              </div>
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
      <Card className='bg-background  relative overflow-hidden mt-8 shadow-none border-x-0'>
        <CardContent className='py-1'>
          <InfiniteMovingCards
            items={testimonials}
            direction='right'
            speed='slow'
          />
          <InfiniteMovingCards
            items={testimonials}
            direction='left'
            speed='slow'
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default HeroSection;

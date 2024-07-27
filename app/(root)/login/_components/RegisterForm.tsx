'use client';
import Link from 'next/link';

import CustomFormField, {
  FormFieldType,
} from '@/components/shared/CustomFormField';
import { Social } from '@/components/shared/Social';
import SubmitButton from '@/components/shared/SubmitButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { register } from '@/lib/actions/register.actions';
import { RegisterSchema, RegisterSchemaType } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const RegisterForm = () => {
  const [isPending, startTransition] = React.useTransition();

  // 1. Define your form.
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RegisterSchemaType) {
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error);
          }

          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => toast.error('Something went wrong'));
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='name'
              placeholder='Enter full name'
              label='Full name'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              placeholder='Enter your email'
              label='Email'
              type='email'
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phoneNumber'
              label='Phone Number'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='password'
              placeholder='Enter your password'
              label='Password'
              type='password'
            />
            <SubmitButton isLoading={isPending} className='mt-4'>
              Register
            </SubmitButton>
          </CardContent>
          <CardFooter className='grid gap-4'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
            <Social />
            <div className='text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='#' className='underline'>
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterForm;

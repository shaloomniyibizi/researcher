'use client';

import { SecuritySettings } from '@/app/(protected)/dashboard/settings/_actions/securitySettings.actions';
import CustomFormField, {
  FormFieldType,
} from '@/components/shared/CustomFormField';
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
import {
  SecuritySettingsSchema,
  SecuritySettingsSchemaType,
} from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SecuritySettingForm = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<SecuritySettingsSchemaType>({
    resolver: zodResolver(SecuritySettingsSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SecuritySettingsSchemaType) {
    startTransition(async () => {
      SecuritySettings(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            update();
            router.refresh();
            toast.success(data.success);
            router.back();
          }
        })
        .catch(() => toast.error('Something went wrong!'));
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='password'
              placeholder='password'
              label='Password'
              type='password'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='newPassword'
              placeholder='Enter New Password'
              label='New Password'
              type='password'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='confirmPassword'
              placeholder='Enter confirmation Password '
              label='Confirm Password '
              type='password'
            />
          </CardContent>
          <CardFooter className='border-t px-6 py-4'>
            <SubmitButton isLoading={isPending}>Update</SubmitButton>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SecuritySettingForm;

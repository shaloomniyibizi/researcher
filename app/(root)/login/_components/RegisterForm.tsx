"use client";
import Link from "next/link";

import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";
import { Social } from "@/components/shared/Social";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { register } from "@/lib/actions/register.actions";
import { RegisterSchema, RegisterSchemaType } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
const RegisterForm = () => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  // 1. Define your form.
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RegisterSchemaType) {
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isPending}
              placeholder="Enter full name"
              label="Full name"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              placeholder="Enter your email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              label="Email"
              type="email"
              disabled={isPending}
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phoneNumber"
              label="Phone Number"
              disabled={isPending}
              autoCapitalize="none"
              autoComplete="phone"
              autoCorrect="off"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
              disabled={isPending}
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="mt-4 w-full">
              {isPending ? <BeatLoader /> : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Social />
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;

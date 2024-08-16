"use client";

import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import {
  OnboardingSchema,
  OnboardingSchemaType,
} from "@/lib/validations/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ImageIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getColleges } from "../../dashboard/college/_actions/collage.actions";
import { getDepartments } from "../../dashboard/college/_actions/department.actions";
import { getFields } from "../../dashboard/college/_actions/field.actions";
import { onboarding } from "../_actions/onboarding.actions";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  user: OnboardingSchemaType;
}

const OnboardingForm = ({ user }: Props) => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const [files, setFiles] = useState<File[]>([]);

  const { data: colleges } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => await getColleges(),
  });
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => await getDepartments(),
  });
  const { data: fields } = useQuery({
    queryKey: ["fields"],
    queryFn: async () => await getFields(),
  });

  // 1. Define your form.
  const form = useForm<OnboardingSchemaType>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user?.email || undefined,
      collegeId: "",
      departmentId: "",
      fieldId: "",
      onboarded: true,
      image: user?.image || undefined,
      bio: user?.bio || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: OnboardingSchemaType) {
    startTransition(async () => {
      const blob = values.image as string;
      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url;
        }
      }
      console.log(values);

      onboarding(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            update();
            router.refresh();
            toast.success(data.success);
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          console.error(`Something went wrong!${error}`);
          toast.error("Something went wrong!");
        });
    });
  }
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-lg mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">
              ⚙️ Onboarding
            </CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel>
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="profile_icon"
                        width={96}
                        height={96}
                        priority
                        className="h-28 w-28 rounded-full object-contain"
                      />
                    ) : (
                      <ImageIcon />
                    )}
                  </FormLabel>
                  <FormControl className="text-base-semibold flex-1 text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Edit profile image"
                      className=""
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              placeholder="Enter Full Name"
              label="Full Name"
              disabled
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              placeholder="Enter email address"
              label="Email address"
              disabled
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="collegeId"
              placeholder="Select College"
              label="College"
            >
              {colleges?.map((college, i) => (
                <SelectItem key={college.name + i} value={college.id}>
                  <p>{college.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="departmentId"
              placeholder="Select Department"
              label="Department"
            >
              {departments?.map((department, i) => (
                <SelectItem key={department.name + i} value={department.id}>
                  <p>{department.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="fieldId"
              placeholder="Select Field"
              label="Field"
            >
              {fields?.map((field, i) => (
                <SelectItem key={field.name + i} value={field.id}>
                  <p>{field.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>

            <FormField
              control={form.control}
              name="bio"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      className="account-form_input no-focus"
                      {...field}
                      placeholder="Tell us a little about yourself"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <SubmitButton isLoading={isPending}>Save</SubmitButton>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default OnboardingForm;

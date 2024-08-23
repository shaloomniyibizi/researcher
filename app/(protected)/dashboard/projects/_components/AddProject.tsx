"use client";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { STEPS } from "@/lib/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { cn, isBase64Image, isBase64PDF } from "@/lib/utils";
import { ProjectSchema, ProjectSchemaType } from "@/lib/validations/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, Text } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addProject } from "../_actions/project.actions";
import Steps from "./Steps";

const AddProject = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<File[]>([]);
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const newImage = useUploadThing("imageUploader");
  const newPDF = useUploadThing("pdfUploader");
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: addNewProject, isPending } = useMutation({
    mutationFn: async (values: ProjectSchemaType) => {
      const blob = values.image as string;
      const pdf = values.pdf as string;
      const hasImageChanged = isBase64Image(blob);
      const hasPdfChanged = isBase64PDF(pdf);
      if (hasImageChanged) {
        const { startUpload } = newImage;
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url;
        }
      }
      if (hasPdfChanged) {
        const { startUpload } = newPDF;
        const pdfRes = await startUpload(pdfUrl);
        if (pdfRes && pdfRes[0].url) {
          values.pdf = pdfRes[0].url;
        }
      }
      console.log(values);

      return await addProject(values);
    },
    onSuccess: (data) => {
      if (data?.error) {
        form.reset();
        toast.error(data.error);
      }

      if (data?.success) {
        form.reset();
        toast.success(data.success);
        router.back();
      }

      // After creating a transaction, we need to invalidate the overview query which will fetch data in the home page
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "projects"],
      });
    },

    onError: (e) => {
      toast.loading(`Error: ${e.message}`);
    },
  });

  // 1. Define your form.
  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      objective: "",
      technologies: "",
      methodology: "",
      challenges: "",
      results: "",
      pdf: "",
      codeLink: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ProjectSchemaType) {
    addNewProject(values);
    // startTransition(async () => {
    //   const blob = values.image as string;
    //   const pdf = values.pdf as string;
    //   const hasImageChanged = isBase64Image(blob);
    //   const hasPdfChanged = isBase64PDF(pdf);
    //   if (hasImageChanged) {
    //     const { startUpload } = newImage;
    //     const imgRes = await startUpload(files);
    //     if (imgRes && imgRes[0].url) {
    //       values.image = imgRes[0].url;
    //     }
    //   }
    //   if (hasPdfChanged) {
    //     const { startUpload } = newPDF;
    //     const pdfRes = await startUpload(pdfUrl);
    //     if (pdfRes && pdfRes[0].url) {
    //       values.pdf = pdfRes[0].url;
    //     }
    //   }
    //   console.log(values);
    //   addProject(values)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setIsLoading(false);
    //         toast.error(data.error);
    //       }

    //       if (data?.success) {
    //         form.reset();
    //         setIsLoading(false);
    //         toast.success(data.success);
    //         router.back();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(`Something went wrong! ${error}`);
    //       toast.error(`Something went wrong!`);
    //     });
    // });
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
        const pdfUrlUrl = event.target?.result?.toString() || "";
        fieldChange(pdfUrlUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  const handlePDF = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPdfUrl(Array.from(e.target.files));

      if (!file.type.includes("pdf")) return;

      fileReader.onload = async (event) => {
        const fileDataUrl = event.target?.result?.toString() || "";
        fieldChange(fileDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <main className="grid items-start gap-4 overflow-x-clip px-4 py-8 sm:px-6 md:gap-8 md:pt-0">
      <div className="sticky top-14 hidden md:block">
        <Steps STEPS={STEPS} />
      </div>
      <div className="mx-auto flex h-full min-h-[calc(100vh-13rem)] min-w-full max-w-5xl flex-col items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-8 md:grid-cols-3">
              {step === 1 && (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Add project image to identify your work
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="grid min-w-64 gap-2">
                          <FormLabel className="flex h-48 w-full flex-1 flex-col items-center justify-center rounded-md border border-dashed p-2 text-center">
                            {field.value ? (
                              <Image
                                src={field.value}
                                alt="profile_icon"
                                width={96}
                                height={96}
                                priority
                                className="h-[11.5rem] w-full rounded-md object-cover"
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
                              className="sr-only"
                              onChange={(e) => handleImage(e, field.onChange)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}
              <div
                className={cn(
                  "grid lg:gap-8",
                  step === 1 ? "md:col-span-2" : "w-full md:col-span-3",
                )}
              >
                <Card className="w-full max-w-3xl">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Add more details to your project such as title and
                      describtions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:gap-8">
                    {step === 1 && (
                      <>
                        {(STEPS[0].isCurrent = true)}
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="title"
                          placeholder="Project title"
                          label="Title"
                        />
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={form.control}
                          name="description"
                          description="provide project description"
                          label="Description"
                        />
                      </>
                    )}
                    {step === 2 && (
                      <>
                        {(STEPS[0].isCompleted = true)}
                        {(STEPS[1].isCurrent = true)}
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={form.control}
                          name="objective"
                          label="Project Objective"
                        />
                        <CustomFormField
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="technologies"
                          placeholder="Provide tech used to develop this project with comma separetor"
                          label="Technology used"
                        />
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={form.control}
                          name="methodology"
                          label="Methodology"
                        />
                      </>
                    )}
                    {step === 3 && (
                      <>
                        {(STEPS[0].isCompleted = true)}
                        {(STEPS[1].isCompleted = true)}
                        {(STEPS[2].isCurrent = true)}
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <CustomFormField
                              fieldType={FormFieldType.TEXTAREA}
                              control={form.control}
                              name="challenges"
                              label="Challenge / Problem statement"
                            />
                          </div>
                          <div className="grid gap-3">
                            <CustomFormField
                              fieldType={FormFieldType.TEXTAREA}
                              control={form.control}
                              name="results"
                              label="Result / Possible solution"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {step === 4 && (
                      <>
                        {(STEPS[0].isCompleted = true)}
                        {(STEPS[1].isCompleted = true)}
                        {(STEPS[2].isCurrent = true)}
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="pdf"
                              render={({ field }) => (
                                <FormItem className="grid min-w-64 gap-2">
                                  <FormLabel className="flex h-48 w-full flex-1 flex-col items-center justify-center rounded-md border border-dashed p-2 text-center">
                                    {field.value ? (
                                      "Success PDF added \n Click to change"
                                    ) : (
                                      <>
                                        <span>
                                          Click to Project pdf document
                                        </span>{" "}
                                        <Text />
                                      </>
                                    )}
                                  </FormLabel>
                                  <FormControl className="text-base-semibold flex-1 text-gray-200">
                                    <Input
                                      type="file"
                                      accept="application/pdf"
                                      placeholder="Edit profile image"
                                      className="sr-only"
                                      onChange={(e) =>
                                        handlePDF(e, field.onChange)
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={form.control}
                              name="codeLink"
                              placeholder="Code link"
                              label="Link to project source code"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant={"secondary"}
                  className="rounded px-4 py-2"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              ) : (
                <Button
                  disabled
                  type="button"
                  className="rounded px-4 py-2"
                  variant={"secondary"}
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              {step < 4 && (
                <Button
                  type="button"
                  className="rounded px-4 py-2"
                  onClick={nextStep}
                >
                  Next
                </Button>
              )}
              {step === 4 && (
                <SubmitButton isLoading={isPending} className="w-fit rounded">
                  Add Project
                </SubmitButton>
              )}
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default AddProject;

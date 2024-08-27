"use client";

import React, { ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import {
  departmentSchema,
  departmentSchemaType,
} from "@/lib/validations/college";
import { zodResolver } from "@hookform/resolvers/zod";
import { Department } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusSquare } from "lucide-react";
import { toast } from "react-toastify";
import { getUserById } from "../../users/_actions/user.actions";
import { getCollegesByUserId } from "../_actions/collage.actions";
import { addDepartment } from "../_actions/department.actions";

interface DepartmentDialogProps {
  trigger?: ReactNode;
}

function DepartmentDialog({ trigger }: DepartmentDialogProps) {
  const [open, setOpen] = React.useState(false);

  const user = useCurrentUser();
  const { data: dbUser, isFetching } = useQuery({
    queryKey: ["userSession", "depart"],
    queryFn: async () => await getUserById(user?.id!),
  });

  const { data: colleges } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => await getCollegesByUserId(dbUser?.id!),
  });

  const form = useForm<departmentSchemaType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      collegeId: dbUser?.collegeId!,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addDepartment,
    onSuccess: async (data: Department) => {
      form.reset({
        name: "",
        collegeId: "",
      });

      toast.success(`Department ${data.name} created successfully 👍`);

      await queryClient.invalidateQueries({
        queryKey: ["department"],
      });

      setOpen((prev) => !prev);
    },

    onError: (e) => {
      toast.success(`Error: ${e.message}`);
    },
  });

  const onSubmit = useCallback(
    (values: departmentSchemaType) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant={"ghost"}
            className="flex border-separate items-center justify-start rounded-none border-b p-3 text-muted-foreground"
          >
            <PlusSquare className="mr-2 h-4 w-4" />
            Create new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create department</DialogTitle>
          <DialogDescription>
            Department are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="collegeId"
              placeholder="Select College"
              label="College"
              disabled={isPending}
            >
              {colleges?.map((college, i) => (
                <SelectItem key={college.name + i} value={college.id}>
                  <p>{college.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                form.reset;
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            isLoading={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Department"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DepartmentDialog;

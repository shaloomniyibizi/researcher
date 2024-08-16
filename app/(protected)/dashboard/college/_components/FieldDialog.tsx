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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/lib/data/user.actions";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { fieldSchema, fieldSchemaType } from "@/lib/validations/college";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusSquare } from "lucide-react";
import { toast } from "react-toastify";
import { CreateField } from "../_actions/field.actions";
import DepartmentPicker from "./DepartmentPicker";

interface FieldDialogProps {
  trigger?: ReactNode;
}

function FieldDialog({ trigger }: FieldDialogProps) {
  const [open, setOpen] = React.useState(false);
  const user = useCurrentUser();
  const { data: dbUser, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUserById(user?.id!),
  });

  const form = useForm<fieldSchemaType>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: "",
      departmentId: "",
    },
  });

  const handleDepartmentChange = useCallback(
    (value: string) => {
      form.setValue("departmentId", value);
    },
    [form],
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateField,
    onSuccess: async (data: Field) => {
      form.reset({
        name: "",
        departmentId: "",
      });

      toast.success(`Field ${data.name} created successfully 👍`);

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setOpen((prev) => !prev);
    },

    onError: (e) => {
      toast.success(`Error: ${e.message}`);
    },
  });

  const onSubmit = useCallback(
    (values: fieldSchemaType) => {
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
          <DialogTitle>Create field</DialogTitle>
          <DialogDescription>
            Field are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="sr-only">Category</FormLabel>
                  <FormControl>
                    <DepartmentPicker
                      collegeId={dbUser?.collegeId!}
                      onChange={handleDepartmentChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Select Department for this Field
                  </FormDescription>
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
            {!isPending && "Create Field"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FieldDialog;

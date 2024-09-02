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
import { fieldSchema, fieldSchemaType } from "@/lib/validations/college";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusSquare } from "lucide-react";
import { toast } from "react-toastify";
import { getUserById } from "../../users/_actions/user.actions";
import { getDepartmentsByCollegeId } from "../_actions/department.actions";
import { CreateField } from "../_actions/field.actions";

interface FieldDialogProps {
  trigger?: ReactNode;
}

function FieldDialog({ trigger }: FieldDialogProps) {
  const [open, setOpen] = React.useState(false);

  const user = useCurrentUser();

  const form = useForm<fieldSchemaType>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: "",
      departmentId: "",
    },
  });

  const { data: dbUser, isFetching } = useQuery({
    queryKey: ["userSession", "depart"],
    queryFn: async () => await getUserById(user?.id!),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => await getDepartmentsByCollegeId(dbUser?.collegeId!),
  });

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
        queryKey: ["colleges"],
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
      console.log(values);
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
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="departmentId"
              placeholder="Select Department"
              label="Department"
              disabled={isPending}
            >
              {departments?.map((department, i) => (
                <SelectItem key={department.name + i} value={department.id}>
                  <p>{department.name}</p>
                </SelectItem>
              ))}
            </CustomFormField>
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
            {isPending ? <Loader2 className="animate-spin" /> : "Create Field"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FieldDialog;

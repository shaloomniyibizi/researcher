"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeleteDepartment } from "../_actions/department.actions";

interface DeleteDepartmentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  departmentId: string;
}
function DeleteDepartmentDialog({
  open,
  setOpen,
  departmentId,
}: DeleteDepartmentDialogProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: DeleteDepartment,
    onSuccess: async (data) => {
      toast.success(data.success);

      queryClient.invalidateQueries({
        queryKey: ["repository", "departments"],
      });
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not ne undone. This will permenently delete this
            department
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteMutation.mutate(departmentId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDepartmentDialog;

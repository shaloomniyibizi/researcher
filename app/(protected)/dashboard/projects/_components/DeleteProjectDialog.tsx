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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DeleteProject } from "../_actions/project.actions";

interface DeleteProjectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
}
function DeleteProjectDialog({
  open,
  setOpen,
  projectId,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: DeleteProject,
    onSuccess: async (data) => {
      toast.success(data.success);
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["repository"],
      });
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
  return (
    <AlertDialog open={open || deleteMutation.isPending} onOpenChange={setOpen}>
      <AlertDialogContent>
        {deleteMutation.isPending && (
          <div className="flex h-64 items-center justify-center">
            <Loader className="h-48 w-48 animate-spin" />
          </div>
        )}
        {!deleteMutation.isPending && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action can not ne undone. This will permenently delete this
                project
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteMutation.mutate(projectId);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProjectDialog;

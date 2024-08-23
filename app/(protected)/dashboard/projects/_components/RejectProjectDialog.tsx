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
import { RejectProject } from "../_actions/project.actions";

interface RejectProjectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
}
function RejectProjectDialog({
  open,
  setOpen,
  projectId,
}: RejectProjectDialogProps) {
  const queryClient = useQueryClient();
  const rejectMutation = useMutation({
    mutationFn: RejectProject,
    onSuccess: async (data) => {
      toast.success(data.success);

      queryClient.invalidateQueries({
        queryKey: ["rejectedProject", "projects"],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not ne undone. This will permenently reject this
            project
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // toast.success("Deleting Project....  ", {
              //   id: projectId,
              // });
              rejectMutation.mutate(projectId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RejectProjectDialog;

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
import { AcceptProject } from "../_actions/project.actions";

interface AcceptProjectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
}
function AcceptProjectDialog({
  open,
  setOpen,
  projectId,
}: AcceptProjectDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const acceptMutation = useMutation({
    mutationFn: AcceptProject,
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
    <AlertDialog open={open || acceptMutation.isPending} onOpenChange={setOpen}>
      <AlertDialogContent>
        {acceptMutation.isPending && (
          <div className="flex h-64 items-center justify-center">
            <Loader className="h-48 w-48 animate-spin" />
          </div>
        )}
        {!acceptMutation.isPending && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action can not undone. This will permenently accept this
                project
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  acceptMutation.mutate(projectId);
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

export default AcceptProjectDialog;

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommentSchema, CommentSchemaType } from "@/lib/validations/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addComment } from "../_actions/comments.actions";

interface CreateCommentProps {
  projectId: string;
  replyToId?: string;
  authorId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({
  projectId,
  replyToId,
  authorId,
}) => {
  const router = useRouter();

  const { mutate: comment, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: async () => {
      router.refresh();
      toast.success("Your comment saved successfuly");
    },
    onError: (error) => {
      toast.success("Error while creating comment");
      console.log(error);
    },
  });

  // 1. Define your form.
  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      authorId: authorId,
      projectId: projectId,
      replyToId: replyToId,
      text: "",
    },
  });
  // 2. Define a submit handler review.
  function onSubmit(values: CommentSchemaType) {
    comment(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mt-8">
          <div className="flex">
            <Avatar className="my-6 ml-6 border-border">
              <AvatarImage src="/images/PassPort.jpg" />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <CardHeader>
                <CardTitle>Comments and Feedback</CardTitle>
                <CardDescription className="flex items-center gap-8">
                  Comments and Feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Add your comment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex items-center justify-end">
                <Button type="submit" isLoading={isPending} className="w-fit">
                  Post Review
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default CreateComment;

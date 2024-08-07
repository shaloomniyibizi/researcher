"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExtendedComment } from "@/lib/types/db";
import { formatTimeToNow } from "@/lib/utils";
import { CommentVote } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";
import UserAvatar from "../../_components/UserAvatar";
import { addComment } from "../_actions/comments.actions";
import CommentVotes from "./CommentVotes";

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  projectId: string;
  authorId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  projectId,
  authorId,
}) => {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(`@${comment.author.name} `);
  const router = useRouter();

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: async () => {
      router.refresh();
      setIsReplying(false);
      toast.success("Your comment saved successfuly");
    },
    onError: (error) => {
      toast.success("Error while creating comment");
      console.log(error);
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-accent-foreground">
            {comment.author.name}
          </p>

          <p className="max-h-40 truncate text-xs text-muted-foreground">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="mt-2 text-sm">{comment.text}</p>

      <div className="flex items-center gap-2">
        <CommentVotes
          projectId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) return router.push("/login");
            setIsReplying(true);
          }}
          variant="ghost"
          size="sm"
        >
          <MessageSquare className="mr-1.5 h-4 w-4" />
          Reply
        </Button>
      </div>

      {isReplying ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment">Your comment</Label>
          <div className="mt-2">
            <Textarea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length,
                )
              }
              autoFocus
              id="comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="What are your thoughts?"
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button
                tabIndex={-1}
                variant="default"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                isLoading={isPending}
                onClick={() => {
                  if (!input) return;
                  postComment({
                    authorId,
                    projectId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  });
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;

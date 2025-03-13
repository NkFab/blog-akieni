"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import type { Comment } from "@/lib/types";

interface CommentSectionProps {
  comments: Comment[];
  postSlug: string;
}

export function CommentSection({
  comments: initialComments,
  postSlug,
}: CommentSectionProps) {
  const { data: session, status } = useSession();

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    if (!session) {
      // Store the current URL and comment in sessionStorage
      sessionStorage.setItem("pendingComment", newComment);
      sessionStorage.setItem("redirectAfterLogin", `/blog/${postSlug}`);

      // Redirect to login
      signIn();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newCommentData = await response.json();

      setComments([newCommentData, ...comments]);
      setNewComment("");

      toast("Comment posted", {
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      toast("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to post your comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check for pending comment after login
  useEffect(() => {
    const pendingComment = sessionStorage.getItem("pendingComment");
    const redirectPath = sessionStorage.getItem("redirectAfterLogin");

    if (session && pendingComment && redirectPath === `/blog/${postSlug}`) {
      setNewComment(pendingComment);
      sessionStorage.removeItem("pendingComment");
      sessionStorage.removeItem("redirectAfterLogin");

      toast("Welcome back!", {
        description: "You can now post your comment.",
      });
    }
  }, [session, postSlug]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      <div className="mb-8">
        {status === "loading" ? (
          <div className="space-y-4">
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : (
          <>
            <Textarea
              placeholder={session ? "Add a comment..." : "Sign in to comment"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4 min-h-[100px]"
              disabled={!session || isSubmitting}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting || !session}
            >
              {isSubmitting
                ? "Posting..."
                : session
                ? "Post Comment"
                : "Sign in to comment"}
            </Button>
          </>
        )}
      </div>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={comment.user.profile_pic}
                  alt={comment.user.username}
                />
                <AvatarFallback>{comment.user.username?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{comment.user.username}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(comment.created_at || new Date().toISOString())}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

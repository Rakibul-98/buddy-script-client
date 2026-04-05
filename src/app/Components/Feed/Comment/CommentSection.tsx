/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCreateCommentMutation, useDeleteCommentMutation, useGetCommentsByPostIdQuery, useUpdateCommentMutation } from "../../../../redux/features/comment/commentApi";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface CommentsSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading, refetch } = useGetCommentsByPostIdQuery(postId);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleCreateComment = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!newComment.trim()) {
        toast.error("Please enter a comment");
        return;
      }

      try {
        await createComment({
          postId,
          content: newComment,
        }).unwrap();
        toast.success("Comment added successfully!");
        setNewComment("");
        refetch();
      } catch (err: any) {
        toast.error(err.data?.message || "Failed to add comment");
      }
    }
  };

  const handleReply = async (postId: string, content: string, parentId: string) => {
    try {
      await createComment({
        postId,
        content,
        parentId,
      }).unwrap();
      toast.success("Reply added successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to add reply");
    }
  };

  const handleEdit = async (commentId: string, content: string) => {
    try {
      await updateComment({
        id: commentId,
        content,
      }).unwrap();
      toast.success("Comment updated successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update comment");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success("Comment deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to delete comment");
    }
  };

  if (isLoading) {
    return (
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const comments = data?.data || [];
  const latestComment = comments[comments.length - 1];
  const previousCount = comments.length - 1;
  const visibleComments = showAll ? comments : latestComment ? [latestComment] : [];

  return (
    <div className=" pt-4">
      <CommentInput
        newComment={newComment}
        setNewComment={setNewComment}
        handleCreateComment={handleCreateComment}
        isCreating={isCreating}
      />

      {comments.length > 1 && (
        <p
          onClick={() => setShowAll(!showAll)}
          className="mt-6 text-muted-foreground cursor-pointer font-semibold"
        >
          {showAll
            ? "Hide comments"
            : `View ${previousCount} previous comment${previousCount > 1 ? "s" : ""}`}
        </p>
      )}

      <div className="space-y-2">
        {visibleComments.length > 0 && (
          visibleComments.map((comment: any) => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
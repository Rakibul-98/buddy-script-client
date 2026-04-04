/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCreateCommentMutation, useDeleteCommentMutation, useGetCommentsByPostIdQuery, useUpdateCommentMutation } from "../../../../redux/features/comment/commentApi";
import Comment from "./Comment";

interface CommentsSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");

  const { data, isLoading, refetch } = useGetCommentsByPostIdQuery(postId);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

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
  const totalComments = comments.length;

  return (
    <div className=" pt-4">
      <h3 className="text-lg font-semibold mb-3">
        Comments ({totalComments})
      </h3>

      {/* Add Comment Input */}
      <div className="mb-4">
        <textarea
          placeholder="Write a comment... (Press Enter to submit)"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleCreateComment}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          rows={2}
          disabled={isCreating}
        />
      </div>

      {/* Comments List */}
      <div className="space-y-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment: any) => (
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
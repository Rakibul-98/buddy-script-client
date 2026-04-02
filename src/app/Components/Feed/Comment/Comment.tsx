/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useToggleLikeMutation } from "../../../../redux/features/like/likeApi";


interface CommentProps {
  comment: any;
  postId: string;
  onReply: (postId: string, content: string, parentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  level?: number;
}


function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export default function Comment({
  comment,
  postId,
  onReply,
  onEdit,
  onDelete,
  level = 0
}: CommentProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [toggleLike, { isLoading: isTogglingLike }] = useToggleLikeMutation();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment._count?.likes || 0);

  useEffect(() => {
    if (comment.likes && user?.id) {
      const userLiked = comment.likes.some((like: any) => like.userId === user.id);
      setIsLiked(userLiked);
    }
  }, [comment.likes, user?.id]);

  const handleLike = async () => {
    try {
      const response = await toggleLike({
        targetId: comment.id,
        targetType: "COMMENT",
      }).unwrap();

      if (response.data?.liked) {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
        toast.success("Comment liked!");
      } else {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
        toast.success("Comment unliked!");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to toggle like");
    }
  };

  const handleReplySubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (replyContent.trim()) {
        onReply(postId, replyContent, comment.id);
        setReplyContent("");
        setIsReplying(false);
      } else {
        toast.error("Please enter a reply");
      }
    }
  };

  const handleEditSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editContent.trim()) {
        onEdit(comment.id, editContent);
        setIsEditing(false);
      } else {
        toast.error("Please enter content");
      }
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-8 mt-3' : 'mt-4'}`}>
      <div className="bg-gray-50 rounded-lg p-3">
        {/* Comment Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-gray-900">
              {comment.author.firstName} {comment.author.lastName}
            </span>
            <span className="text-xs text-gray-500">
              {timeAgo(comment.createdAt)}
            </span>
            {comment._count?.likes > 0 && (
              <span className="text-xs text-gray-500">
                ❤️ {comment._count.likes} likes
              </span>
            )}
          </div>

          {/* Comment Actions */}
          {user?.email === comment.author.email && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleEditSubmit}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            rows={2}
            autoFocus
          />
        ) : (
          <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
        )}

        {/* Comment Actions Buttons */}
        <div className="flex gap-3">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isTogglingLike}
            className={`text-xs transition-colors ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
          >
            {isLiked ? "❤️" : "🤍"} {likesCount > 0 && likesCount}
          </button>

          {/* Reply Button */}
          {!isEditing && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              {isReplying ? "Cancel" : "Reply"}
            </button>
          )}
        </div>
      </div>

      {/* Reply Input */}
      {isReplying && (
        <div className="mt-2 ml-8">
          <textarea
            placeholder="Write a reply... (Press Enter to submit)"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={handleReplySubmit}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            rows={2}
            autoFocus
          />
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply: any) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
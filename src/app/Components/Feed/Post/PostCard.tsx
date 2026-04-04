/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useToggleLikeMutation } from "@/redux/features/like/likeApi";
import { toast } from "sonner";
import CommentSection from "../Comment/CommentSection";

interface PostCardProps {
  post: any;
  onEdit: (id: string, content: string, visibility: "PUBLIC" | "PRIVATE", image?: File) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
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

export default function PostCard({ post, onEdit, onDelete, isDeleting }: PostCardProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [toggleLike, { isLoading: isTogglingLike }] = useToggleLikeMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post._count?.likes || 0);

  // Check if current user has liked the post
  useState(() => {
    if (post.likes && user?.id) {
      const userLiked = post.likes.some((like: any) => like.userId === user.id);
      setIsLiked(userLiked);
    }
  });

  const handleLike = async () => {
    try {
      const response = await toggleLike({
        targetId: post.id,
        targetType: "POST",
      }).unwrap();

      if (response.data?.liked) {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
        toast.success("Post liked!");
      } else {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
        toast.success("Post unliked!");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to toggle like");
    }
  };

  return (
    <div className="bg-white rounded-md shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">
              {post.author.firstName} {post.author.lastName}
            </span>
            <span className="text-xs text-gray-500">
              {timeAgo(post.createdAt)}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {post.visibility === "PUBLIC" ? "Public" : "Private"}
            </span>
          </div>
        </div>

        {/* {user?.id === post.authorId && (
          <PostMenu
            postId={post.id}
            postContent={post.content}
            postImageUrl={post.imageUrl}
            postVisibility={post.visibility}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        )} */}
      </div>

      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.imageUrl && (
        <div className="mb-4">
          <img
            src={post.imageUrl}
            alt="Post image"
            className="rounded-lg max-h-96 w-full object-cover"
          />
        </div>
      )}

      <div className="flex gap-6 pt-4 border-t text-sm text-gray-500">
        <button
          onClick={handleLike}
          disabled={isTogglingLike}
          className={`flex items-center gap-1 transition-colors ${isLiked ? "text-red-500" : "hover:text-red-500"
            }`}
        >
          <span>{isLiked ? "❤️" : "🤍"}</span>
          <span>{likesCount} {likesCount === 1 ? "like" : "likes"}</span>
        </button>
        <div className="flex items-center gap-1">
          <span>💬</span>
          <span>{post._count.comments} {post._count.comments === 1 ? "comment" : "comments"}</span>
        </div>
      </div>

      <CommentSection postId={post.id} />
    </div>
  );
}
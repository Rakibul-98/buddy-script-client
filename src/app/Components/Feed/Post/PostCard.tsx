/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useToggleLikeMutation } from "@/redux/features/like/likeApi";
import { toast } from "sonner";
import CommentSection from "../Comment/CommentSection";
import Image from "next/image";
import PostMenu from "./PostMenu";
import { useDeletePostMutation, useUpdatePostMutation } from "../../../../redux/features/post/postApi";
import { timeAgo } from "../../../utils";
import LikedUserGroup from "./LikedUserGroup";
import { CgSmileMouthOpen } from "react-icons/cg";
import { MdOutlineComment } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";

export default function PostCard({ post, refetch }: any) {
  const { user } = useAppSelector((state) => state.auth);

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [toggleLike, { isLoading: isTogglingLike }] = useToggleLikeMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post._count?.likes || 0);

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

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await deletePost(post.id).unwrap();
      toast.success("Deleted!");
      refetch();
    } catch (err: any) {
      toast.error("Failed to delete");
    }
  };

  const handleToggleVisibility = async () => {
    const newVisibility =
      post.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";

    try {
      await updatePost({
        id: post.id,
        data: { visibility: newVisibility },
      }).unwrap();

      toast.success("Updated!");
      refetch();
    } catch {
      toast.error("Failed");
    }
  };

  const handleEdit = async () => {
    const newContent = prompt("Edit post", post.content);
    if (!newContent) return;

    try {
      await updatePost({
        id: post.id,
        data: { content: newContent },
      }).unwrap();

      toast.success("Updated!");
      refetch();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className=" w-full flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/post_img.png"
              alt="txt img"
              height={44}
              width={44}
              priority
            />
            <div>
              <span className="text-lg">
                {post.author.firstName} {post.author.lastName}
              </span>
              <div className="text-muted-foreground text-sm">
                <span>
                  {timeAgo(post.createdAt)}
                </span>
                <span className="px-1">.</span>
                <span>
                  {post.visibility === "PUBLIC" ? "Public" : "Private"}
                </span>
              </div>
            </div>
          </div>
          {user?.email === post.author.email && (
            <PostMenu
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleVisibility={handleToggleVisibility}
              isPrivate={post.visibility === "PRIVATE"}
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.imageUrl && (
        <div className="mb-4">
          <Image
            src={post.imageUrl}
            alt="Post image"
            width={800}
            height={600}
            className="rounded-lg max-h-96 w-full object-cover"
          />
        </div>
      )}

      <div className="flex justify-between gap-6 pt-2 text-sm text-muted-foreground">
        <LikedUserGroup likesCount={likesCount} />
        <div className="flex items-center gap-3">
          <span>{post._count.comments} {post._count.comments === 1 ? "comment" : "comments"}</span>
          <span>122 Shares</span>
        </div>
      </div>

      <div className="bg-[#fbfcfd] p-2 flex justify-between mt-6 gap-1">
        <button
          onClick={handleLike} className={`w-full hover:bg-[#e4f1fd] ${isLiked && "bg-[#e4f1fd]"}  py-2 flex justify-center items-center gap-1`}>
          <span className="text-2xl">😆</span>
          Haha
        </button>
        <button className="w-full hover:bg-[#e4f1fd] flex justify-center items-center gap-1"><MdOutlineComment size={25} /> Comment</button>
        <button className="w-full hover:bg-[#e4f1fd] flex justify-center items-center gap-1"><PiShareFat size={25} /> Share</button>
      </div>

      <CommentSection postId={post.id} />
    </div>
  );
}
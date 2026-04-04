/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/redux/features/post/postApi";
import PostCard from "./Post/PostCard";
import Navbar from "./Navbar/Navbar";
import ExploreSection from "./LeftBar/ExploreSection";
import FriendsSection from "./RightBar/FriendsSection";
import SuggestedPeople from "./LeftBar/SuggestedPeople";
import Events from "./LeftBar/Events";
import YourFriends from "./RightBar/YourFriends";

export default function Feed() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const { data, isLoading, refetch } = useGetPostsQuery({ limit: 10 });
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();


  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) {
      toast.error("Please add some content or an image");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("visibility", visibility);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createPost(formData).unwrap();
      toast.success("Post created successfully!");
      setContent("");
      setImageFile(null);
      setVisibility("PUBLIC");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create post");
    }
  };

  const handleEditPost = async (
    postId: string,
    content: string,
    visibility: "PUBLIC" | "PRIVATE",
    image?: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("visibility", visibility);
      if (image) {
        formData.append("image", image);
      }

      await updatePost({ id: postId, data: formData }).unwrap();
      toast.success("Post updated successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update post");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId).unwrap();
        toast.success("Post deleted successfully");
        refetch();
      } catch (err: any) {
        toast.error(err.data?.message || "Failed to delete post");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading feed...</p>
        </div>
      </div>
    );
  }

  const posts = data?.data || [];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-4.5 xl:px-0 grid grid-cols-4 gap-6">
        <div className="space-y-4.5">
          <ExploreSection />
          <SuggestedPeople />
          <Events />
        </div>
        <main className="col-span-2">
          {/* Create Post Form */}
          <div className="bg-white rounded-md shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="PUBLIC"
                    checked={visibility === "PUBLIC"}
                    onChange={(e) => setVisibility(e.target.value as "PUBLIC")}
                  />
                  <span>Public</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="PRIVATE"
                    checked={visibility === "PRIVATE"}
                    onChange={(e) => setVisibility(e.target.value as "PRIVATE")}
                  />
                  <span>Private</span>
                </label>
              </div>

              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Post"}
              </Button>
            </form>
          </div>

          {/* Posts Display */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">All Posts</h2>

            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No posts yet. Be the first to create a post!</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </div>
        </main>
        <div className="space-y-4.5">
          <FriendsSection />
          <YourFriends />
        </div>
      </div>
    </div>
  );
}
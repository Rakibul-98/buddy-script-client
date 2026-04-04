/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import {
  useGetPostsQuery,
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
import CreatePostSection from "./Feed/CreatePostSection";

export default function Feed() {

  const { data, isLoading, refetch } = useGetPostsQuery({ limit: 10 });
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

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
        <main className="col-span-2 space-y-4.5">
          <CreatePostSection onPostCreated={refetch} />

          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
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
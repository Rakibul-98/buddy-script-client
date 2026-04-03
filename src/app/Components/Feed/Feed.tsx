/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/redux/features/post/postApi";
import { useAppSelector } from "@/redux/hooks";
import PostCard from "./Post/PostCard";
import Navbar from "./Navbar";

export default function Feed() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const { data, isLoading, refetch } = useGetPostsQuery({ limit: 10 });
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
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
              // <div key={post.id} className="bg-white rounded-lg shadow p-6">
              //   {/* Post Header */}
              //   <div className="flex justify-between items-start mb-4">
              //     <div>
              //       <div className="flex items-center gap-2">
              //         <span className="font-semibold text-gray-900">
              //           {post.author.firstName} {post.author.lastName}
              //         </span>
              //         <span className="text-xs text-gray-500">
              //           {timeAgo(post.createdAt)}
              //         </span>
              //         <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              //           {post.visibility === "PUBLIC" ? "Public" : "Private"}
              //         </span>
              //       </div>
              //     </div>

              //     {/* Delete Button (only show for post owner) */}
              //     {user?.email === post.author.email && (
              //       <Button
              //         onClick={() => handleDeletePost(post.id)}
              //         variant="outline"
              //         size="sm"
              //         disabled={isDeleting}
              //         className="text-red-600 hover:bg-red-50"
              //       >
              //         Delete
              //       </Button>
              //     )}
              //   </div>

              //   {/* Post Content */}
              //   <div className="mb-4">
              //     <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              //   </div>

              //   {/* Post Image */}
              //   {post.imageUrl && (
              //     <div className="mb-4">
              //       <img
              //         src={post.imageUrl}
              //         alt="Post image"
              //         className="rounded-lg max-h-96 w-full object-cover"
              //       />
              //     </div>
              //   )}

              //   {/* Post Stats */}
              //   <div className="flex gap-6 pt-4 border-t text-sm text-gray-500">
              //     <div className="flex items-center gap-1">
              //       <span>❤️</span>
              //       <span>{post._count.likes} likes</span>
              //     </div>
              //     <div className="flex items-center gap-1">
              //       <span>💬</span>
              //       <span>{post._count.comments} comments</span>
              //     </div>
              //   </div>
              //   <CommentSection postId={post.id} />
              // </div>
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
    </div>
  );
}
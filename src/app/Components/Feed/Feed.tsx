"use client";

import {
  useGetPostsQuery,
} from "@/redux/features/post/postApi";
import PostCard from "./Post/PostCard";
import Navbar from "./Navbar/Navbar";
import ExploreSection from "./LeftBar/ExploreSection";
import FriendsSection from "./RightBar/FriendsSection";
import SuggestedPeople from "./LeftBar/SuggestedPeople";
import Events from "./LeftBar/Events";
import YourFriends from "./RightBar/YourFriends";
import CreatePostSection from "./Post/CreatePostSection";
import StorySection from "./Feed/StorySection";
import { useEffect, useRef, useState } from "react";
import PostSkeleton from "./Post/PostSkeleton";


export default function Feed() {

  const [cursor, setCursor] = useState<string | null>(null);
  const { data, isLoading, refetch, isFetching } = useGetPostsQuery({ limit: 3, cursor });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.querySelector("main");

    if (!observerRef.current || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data?.nextCursor) {
          setCursor(data.nextCursor);
        }
      },
      {
        root: container,
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [data?.nextCursor]);

  const posts = data?.data || [];

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5] overflow-hidden">
      <Navbar />
      <div className="flex-1 mx-auto max-w-lg md:max-w-2xl lg:max-w-7xl px-4 pt-4.5 pb-4.5 xl:px-0 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        <div className="hidden lg:block space-y-4.5 overflow-y-auto">
          <ExploreSection />
          <SuggestedPeople />
          <Events />
        </div>
        <main className="col-span-2 space-y-4.5 overflow-y-auto pb-16 sm:pb-0">
          <StorySection />
          <CreatePostSection onPostCreated={refetch} />

          <div className="space-y-6">
            {
              isLoading && (
                <PostSkeleton />
              )
            }
            {posts.length === 0 && !isLoading ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No posts yet. Be the first to create a post!</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  refetch={refetch}
                  isFetching={isFetching}
                />
              ))
            )}
            <div ref={observerRef} className="h-10 w-full" />
            {isFetching && posts.length > 0 && <PostSkeleton />}
          </div>
        </main>
        <div className="hidden lg:block space-y-4.5 overflow-y-auto">
          <FriendsSection />
          <YourFriends />
        </div>
      </div>
    </div>
  );
}
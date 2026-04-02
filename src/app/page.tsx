"use client";

import { useAppSelector } from "@/redux/hooks";
import FeedPage from "./(private)/feed/page";
import Login from "./Components/Auth/Login";

export default function HomePage() {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user && !!accessToken;

  if (isAuthenticated) {
    return <FeedPage />;
  }

  return <Login />;
}
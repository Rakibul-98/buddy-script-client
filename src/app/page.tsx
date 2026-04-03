"use client";

import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user && !!accessToken;

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/feed");
    } else {
      redirect("/login");
    }
  }, [isAuthenticated]);

  return null;
}
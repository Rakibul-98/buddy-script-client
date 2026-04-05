"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !accessToken) {
      router.push("/login");
    }
  }, [user, accessToken, router]);

  if (!user || !accessToken) {
    return;
  }

  return <>{children}</>;
}
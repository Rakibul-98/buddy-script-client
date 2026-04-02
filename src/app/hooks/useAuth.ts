// hooks/useAuth.ts
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = (redirectTo: string = "/login") => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || !accessToken) {
      router.push(redirectTo);
    }
  }, [user, accessToken, router, redirectTo]);

  return { user, accessToken, isAuthenticated: !!user && !!accessToken };
};

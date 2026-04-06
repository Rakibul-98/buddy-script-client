/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface GoogleLoginButtonProps {
  mode?: "login" | "register";
  className?: string;
  buttonText?: string;
}

export default function GoogleSignInButton({
  mode = "login",
  className = "",
  buttonText
}: GoogleLoginButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [googleLoginMutation, { isLoading }] = useGoogleLoginMutation();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await googleLoginMutation({
          token: tokenResponse.access_token
        }).unwrap();

        if (response.success) {
          dispatch(
            setCredentials({
              user: response.data.user,
              token: response.data.token,
            })
          );
          toast.success(`Google ${mode === "login" ? "login" : "sign up"} successful!`);
          router.push("/");
        } else {
          toast.error(response.message || "Google authentication failed");
        }
      } catch (err: any) {
        console.error("Google login error:", err);
        toast.error(err.data?.message || "An error occurred during Google authentication");
      }
    },
    onError: () => {
      toast.error("Google login failed. Please try again.");
    },
  });

  const defaultText = mode === "login" ? "Or sign-in with Google" : "Register with Google";
  const displayText = buttonText || defaultText;

  return (
    <div className="flex justify-center">
      <button
        onClick={() => login()}
        disabled={isLoading}
        className={`
        flex items-center justify-center gap-2 
        w-72 px-4 py-2 
        border border-[#F5F5F5] rounded-sm cursor-pointer
        hover:shadow
        ${className}
      `}
      >
        <Image
          src="/assets/google.svg"
          alt="Google Icon"
          width={20}
          height={20}
        />
        <span className=" font-medium">{isLoading ? "Authenticating..." : displayText}</span>
      </button>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useGoogleLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GoogleLoginButtonProps {
  mode?: "login" | "register";
}

export default function GoogleSignInButton({ mode = "login" }: GoogleLoginButtonProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [googleLoginMutation, { isLoading }] = useGoogleLoginMutation();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        toast.error("No ID token received");
        return;
      }

      const response = await googleLoginMutation({ token: idToken }).unwrap();

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
  };

  const handleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap={false}
      theme="outline"
      size="large"
      text="continue_with"
      shape="rectangular"
    />
  );
}
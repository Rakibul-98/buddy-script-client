/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthCard from "../../../components/AuthCard";
import FormInput from "../../../components/FormInput";
import Checkbox from "../../../components/Checkbox";
import AuthButton from "../../../components/AuthButton";
import AuthImage from "../../../components/AuthImage";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    defaultValues: {
      email: 'rakibul@test2.com',
      password: '123456',
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        );
        toast.success("Log in successful.")
        reset()
        router.push("/feed");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 justify-between items-center">

      <AuthImage src="/assets/login_img.png"
        alt="Login Image" />

      <AuthCard
        title="Login to your account"
        subtitle="Welcome back"
        footerText="Dont have an account?"
        footerLinkText="Create New Account"
        footerLinkHref="/registration"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <FormInput
            id="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email?.message}
            required
            validation={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              }
            }}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            register={register}
            error={errors.password?.message}
            required
            validation={{
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              }
            }}
          />

          <div className="md:flex justify-between items-center gap-3 mb-10">
            <Checkbox label="Remember me" />
            <p className="text-[#1890FF] text-center text-sm">Forgot password?</p>
          </div>

          <AuthButton
            isLoading={isLoading}
            loadingText="Logging in..."
            buttonText="Login now"
          />
        </form>
      </AuthCard>
    </div>
  );
}
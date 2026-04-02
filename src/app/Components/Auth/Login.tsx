/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import Image from "next/image";

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
    <div className=" flex flex-col md:flex-row gap-10 justify-between items-center">
      <div className="hidden lg:block relative w-full lg:w-1/2 h-150">
        <Image
          src="/assets/login_img.png"
          alt="Login Image"
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      <div className="w-100 mx-auto lg:mx-0 bg-white z-50 p-12 rounded-sm">
        <div className="mb-12.5">
          <div className="relative w-40 h-10 mx-auto mb-7">
            <Image
              src="/assets/logo.svg"
              alt="logo Image"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <p className="text-xl text-center mb-2">Welcome back</p>
          <h2 className="text-center text-2xl sm:text-3xl font-bold">Sign in to your account</h2>
        </div>
        <div className="mb-10">
          <GoogleSignInButton mode="login" />
        </div>

        <div className="flex items-center gap-10 mb-10">
          <div className="border h-0.5 w-full"></div>
          <p className="text-muted-foreground">Or</p>
          <div className="border h-0.5 w-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className=" block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF] text-lg"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF] text-lg"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center gap-3 mb-10">
            <div className="flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full border border-[#1890FF] p-0.75">
                <div className="h-full w-full rounded-full bg-[#1890FF]" />
              </div>
              <p>Remember me</p>
            </div>
            <p className="text-[#1890FF]">Forgot password?</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-sm bg-[#1890FF] px-4 py-3 text-white hover:bg-[#1890FF]/95 hover:shadow-lg focus:outline-none "
          >
            {isLoading ? "Logging in..." : "Login now"}
          </button>
        </form>

        <div className="mt-6 text-center text-muted-foreground">Dont have an account? {" "}
          <Link href="/registration" className="text-[#1890FF] hover:text-[#1890FF]/95 font-medium">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";
import Image from "next/image";

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const { confirmPassword, ...registrationData } = data;

      const response = await registerUser(registrationData).unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        );
        toast.success("Registration successful!");
        reset();
        router.push("/");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 justify-between items-center">
      <div className="relative w-full lg:w-1/2 h-110">
        <Image
          src="/assets/registration_img.png"
          alt="Registration Image"
          fill
          className="object-contain object-center"
          priority
        />
      </div>
      <div className="w-full lg:w-100 mx-auto lg:mx-0 bg-white z-50 p-12 rounded-sm">
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
          <p className="text-xl text-center mb-2">Get Started Now</p>
          <h2 className="text-center text-2xl sm:text-3xl font-bold">Registration</h2>
        </div>

        <div className="mb-10">
          <GoogleSignInButton mode="register" />
        </div>

        <div className="flex items-center gap-10 mb-10">
          <div className="border h-0.5 w-full"></div>
          <p className="text-muted-foreground">Or</p>
          <div className="border h-0.5 w-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-center lg:text-left">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF]"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-center lg:text-left">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF]"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-center lg:text-left">
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
              className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF]"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-center lg:text-left">
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
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)/,
                  message: "Password must contain at least one letter and one number",
                },
              })}
              className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF]"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-center lg:text-left">
              Repeat Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="block w-full rounded-sm border border-[#F5F5F5] p-3 focus:border-[#1890FF] focus:outline-none focus:ring-[#1890FF]"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-center md:justify-start mb-10">
            <div className="flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full border border-[#1890FF] p-0.75">
                <div className="h-full w-full rounded-full bg-[#1890FF]" />
              </div>
              <p>I agree to terms & conditions</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-49 lg:w-full rounded-sm bg-[#1890FF] px-4 py-3 text-white hover:bg-[#1890FF]/95 hover:shadow-lg focus:outline-none"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

        </form>

        <div className="mt-15 text-center text-muted-foreground">
          <span>Already have an account? {" "}</span>
          <Link
            href="/login"
            className="text-[#1890FF] hover:text-[#1890FF]/95 font-medium"
          >
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
}
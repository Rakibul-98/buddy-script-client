/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthCard from "../../../components/AuthCard";
import FormInput from "../../../components/FormInput";
import Checkbox from "../../../components/Checkbox";
import AuthButton from "../../../components/AuthButton";
import AuthImage from "../../../components/AuthImage";

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

      <AuthImage src="/assets/registration_image.png" alt="Registration Image" variant="registration" />

      <AuthCard
        title="Registration"
        subtitle="Get Started Now"
        footerText="Already have an account?"
        footerLinkText="Login now"
        footerLinkHref="/login"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="firstName"
              label="First Name"
              type="text"
              register={register}
              error={errors.firstName?.message}
              required
              validation={{
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                }
              }}
            />

            <FormInput
              id="lastName"
              label="Last Name"
              type="text"
              register={register}
              error={errors.lastName?.message}
              required
              validation={{
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                }
              }}
            />
          </div>

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
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)/,
                message: "Password must contain at least one letter and one number",
              }
            }}
          />

          <FormInput
            id="confirmPassword"
            label="Repeat Password"
            type="password"
            register={register}
            error={errors.confirmPassword?.message}
            required
            validation={{
              validate: (value: string) =>
                value === watch("password") || "Passwords do not match",
            }}
          />

          <div className="flex justify-center md:justify-start mb-10">
            <Checkbox label="I agree to terms & conditions" />
          </div>

          <AuthButton
            isLoading={isLoading}
            loadingText="Creating account..."
            buttonText="Sign up"
          />
        </form>
      </AuthCard>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import { AuthResponse } from "./auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, any>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts", "Comments", "User"],
    }),
    googleLogin: builder.mutation<AuthResponse, { token: string }>({
      query: (data) => ({
        url: "/auth/google",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts", "Comments", "User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGoogleLoginMutation } =
  authApi;

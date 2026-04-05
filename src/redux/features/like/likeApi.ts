/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleLike: builder.mutation<
      any,
      { targetId: string; targetType: "POST" | "COMMENT" }
    >({
      query: (data) => ({
        url: "/likes/toggle",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts", "Comments", "User"],
    }),
  }),
});

export const { useToggleLikeMutation } = likeApi;

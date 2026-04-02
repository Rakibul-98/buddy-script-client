/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import { PostResponse, Post } from "./post.types";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostResponse, { limit?: number; cursor?: string }>({
      query: (params) => ({
        url: "/posts",
        method: "GET",
        params,
      }),
      providesTags: ["Posts"],
    }),

    getPostById: builder.query<{ success: boolean; data: Post }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),

    createPost: builder.mutation<{ success: boolean; data: Post }, FormData>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),

    // Update an existing post
    updatePost: builder.mutation<
      { success: boolean; data: Post },
      { id: string; data: FormData | any }
    >({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Posts",
        { type: "Posts", id },
      ],
    }),

    deletePost: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Posts"],
      },
    ),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

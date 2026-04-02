/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<
      any,
      { postId: string; content: string; parentId?: string }
    >({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),

    getCommentsByPostId: builder.query<any, string>({
      query: (postId) => ({
        url: `/comments/post/${postId}`,
        method: "GET",
      }),
      providesTags: (postId) => [{ type: "Posts", id: postId }],
    }),

    updateComment: builder.mutation<any, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: ["Posts"],
    }),

    deleteComment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsByPostIdQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

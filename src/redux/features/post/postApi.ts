/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";
import { PostResponse, Post } from "./post.types";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      { data: Post[]; nextCursor: string | null },
      { limit?: number; cursor?: string | null }
    >({
      query: ({ limit, cursor }) => ({
        url: "/posts",
        method: "GET",
        params: {
          limit,
          ...(cursor ? { cursor } : {}),
        },
      }),

      transformResponse: (response: PostResponse) => {
        console.log("RAW API:", response);
        return {
          data: response?.data?.data || [],
          nextCursor: response?.data?.nextCursor || null,
        };
      },

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        if (!currentCache.data || currentCache.data.length === 0) {
          currentCache.data = newItems.data;
          currentCache.nextCursor = newItems.nextCursor;
          return;
        }

        const existingIds = new Set(currentCache.data.map((p) => p.id));

        const filtered = newItems.data.filter((p) => !existingIds.has(p.id));

        currentCache.data.push(...filtered);
        currentCache.nextCursor = newItems.nextCursor;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },

      providesTags: ["Posts"],
    }),

    getPostById: builder.query<{ success: boolean; data: Post }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["Posts", "Comments"],
    }),

    createPost: builder.mutation<{ success: boolean; data: Post }, FormData>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),

    updatePost: builder.mutation<
      { success: boolean; data: Post },
      { id: string; data: FormData | any }
    >({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),

    deletePost: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Posts", "Comments"],
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

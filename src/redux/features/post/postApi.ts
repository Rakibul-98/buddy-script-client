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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              if (!draft?.data) return;

              draft.data.unshift(data.data);
            }),
          );
        } catch {}
      },
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
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const index = draft.data.findIndex((p) => p.id === id);
              if (index !== -1) {
                draft.data[index] = data.data;
              }
            }),
          );
        } catch {}
      },
    }),

    deletePost: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;

            dispatch(
              postApi.util.updateQueryData("getPosts", undefined, (draft) => {
                draft.data = draft.data.filter((p) => p.id !== id);
              }),
            );
          } catch {}
        },
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

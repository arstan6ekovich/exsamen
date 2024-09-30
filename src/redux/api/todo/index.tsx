import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query<TODO.getResponse, TODO.getRequest>({
      query: () => ({
        url: "/a3a8d3e8733a61a3521a4cecee1362a4/todo-v1",
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: build.mutation({
      query: (newData) => ({
        url: "/a3a8d3e8733a61a3521a4cecee1362a4/todo-v1",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["todo"],
    }),
    uploadFile: build.mutation({
      query: (newData) => ({
        url: "/upload/file",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: build.mutation({
      query: (_id) => ({
        url: `/a3a8d3e8733a61a3521a4cecee1362a4/todo-v1/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: build.mutation({
      query: ({ _id, newData }) => ({
        url: `/a3a8d3e8733a61a3521a4cecee1362a4/todo-v1/${_id}`,
        method: "PATCH",
        body: newData,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteAll: build.mutation({
      query: () => ({
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodoQuery,
  usePostTodoMutation,
  useUploadFileMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useDeleteAllMutation
} = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mangaApi = createApi({
  reducerPath: "mangaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`,
  }),
  tagTypes: ["Library"],

  endpoints: (builder) => ({
    getAllSeries: builder.query({
      query: () => `/all`,
      providesTags: ["Series"],
    }),
    getSeries: builder.query({
      query: (id) => `/series/${id}`,
    }),
    getBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    getLibrary: builder.query({
      query: (id) => `/library/${id}`,
    }),
    getAllLibraries: builder.query({
      query: () => `/libraries`,
      providesTags: ["Library"],
    }),
    getPage: builder.query({
      query: (id) => `/page/${id}`,
    }),
    addNewLibrary: builder.mutation({
      query: (initialPost) => ({
        url: `/library`,
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Library"],
    }),
    deleteLibrary: builder.mutation({
      query: (id) => ({
        url: `/library/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Library"],
    }),
    patchLibrary: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/library/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Library"],
    }),
    deleteSeries: builder.mutation({
      query: (id) => ({
        url: `series/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Series"],
    }),
    patchSeries: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `series/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Series"],
    }),
  }),
});

export const {
  useGetAllSeriesQuery,
  useGetSeriesQuery,
  useGetBookQuery,
  useGetLibraryQuery,
  useGetAllLibrariesQuery,
  useGetPageQuery,
  useAddNewLibraryMutation,
  useDeleteLibraryMutation,
  usePatchLibraryMutation,
} = mangaApi;

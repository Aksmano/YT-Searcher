import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { searchListResponse, videoListResponse } from "./types";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube.googleapis.com/youtube/v3/",
  }),
  endpoints: (builder) => ({
    getListVideosResult: builder.query<videoListResponse, string>({
      query: (queryParams) =>
        `videos?key=${process.env.REACT_APP_API_KEY}${queryParams}`,
    }),
    getListSearchResult: builder.query<searchListResponse, string>({
      query: (queryParams) =>
        `search?key=${process.env.REACT_APP_API_KEY}${queryParams}`,
    }),
    getVideo: builder.query<videoListResponse, string>({
      query: (queryParams) =>
        `videos?key=${process.env.REACT_APP_API_KEY}${queryParams}`,
    }),
  }),
});

export const {
  useGetListVideosResultQuery,
  useGetListSearchResultQuery,
  useGetVideoQuery,
} = apiSlice;

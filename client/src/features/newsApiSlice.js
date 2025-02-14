import {} from "../constants";
import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getSearchNews: builder.query({
      query: ({ keyword, pageNumber, fromDate, toDate }) => ({
        url: `${BASE_URL}/api/news/searchnews`,
        params: {
          keyword,
          pageNumber,
          fromDate,
          toDate,
        },
        method: "GET",
      }),
    }),
    getDetailNews: builder.query({
      query: ({ newsId }) => ({
        url: `${BASE_URL}/api/news/detailnews/${newsId}`,
        method: "GET",
      }),
    }),
    getNewsByProvince: builder.query({
      query: ({ province, pageNumber }) => ({
        url: `${BASE_URL}/api/news/province`,
        params: {
          province,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getSimilarNews: builder.query({
      query: ({ newsId }) => ({
        url: `${BASE_URL}/api/news/similar/${newsId}`,
        method: "GET",
      }),
    }),
    getNewsByPolitics: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/politics`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsByMarketEconomy: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/marketeconomy`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsByIdea: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/idea`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsByNepaliBrand: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/nepalibrand`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsBySociety: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/society`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsByArt: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/art`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsBySports: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/sports`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsByBlog: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/blog`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    getNewsByGlobal: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${BASE_URL}/api/news/global`,
        params: {
          keyword,
          pageNumber,
        },
        method: "GET",
      }),
    }),
    deleteNews: builder.mutation({
      query: ({ newsId, token }) => ({
        url: `${BASE_URL}/api/news/${newsId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetNewsByPoliticsQuery,
  useGetNewsByMarketEconomyQuery,
  useGetNewsByIdeaQuery,
  useGetNewsByNepaliBrandQuery,
  useGetNewsBySocietyQuery,
  useGetNewsByArtQuery,
  useGetNewsBySportsQuery,
  useGetNewsByBlogQuery,
  useGetNewsByGlobalQuery,
  useDeleteNewsMutation,
  useGetDetailNewsQuery,
  useGetSearchNewsQuery,
  useGetNewsByProvinceQuery,
  useGetSimilarNewsQuery,
} = newsApiSlice;

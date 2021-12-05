import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeader = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': import.meta.env.VITE_APP_NEWS_RAPIDAPI_HOST,
  'x-rapidapi-key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: any) => ({ url, headers: cryptoNewsApiHeader });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      // @ts-ignore
      query: ({ newsCategory, count }) =>
        createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

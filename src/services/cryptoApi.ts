import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Crypto } from '../types/models';

const cryptoApiHeader = {
  'x-rapidapi-host': import.meta.env.VITE_APP_CRYPTO_RAPIDAPI_HOST,
  'x-rapidapi-key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeader });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      // @ts-ignore
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      // @ts-ignore
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      // @ts-ignore
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      // @ts-ignore
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } =
  cryptoApi;

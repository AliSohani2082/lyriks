/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable arrow-parens */
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react' 

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f6f1f4d94cmsha8e8c405c983254p148569jsnbefc589959f1',
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  },
};

fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'f6f1f4d94cmsha8e8c405c983254p148569jsnbefc589959f1');
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: '/charts/world' }),
  }),
});

export const {
  useGetTopChartsQuery,
} = shazamCoreApi;

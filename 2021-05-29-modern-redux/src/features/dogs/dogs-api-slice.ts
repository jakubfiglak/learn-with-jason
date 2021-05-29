import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const dogsApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', import.meta.env.VITE_DOGS_API_KEY as string);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = dogsApiSlice;

import { CATEGORY_URL } from '../../constants/apiEndpoints';
import { apiSlice } from './apiSlice';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
      }),
      keepUnusedDataFor: 5,
      // @ts-ignore
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;

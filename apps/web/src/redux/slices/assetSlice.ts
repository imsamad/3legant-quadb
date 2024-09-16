import { ASSETS_URL } from '../../constants/apiEndpoints';
import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation({
      query: (formData) => ({
        url: ASSETS_URL,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useUploadPhotoMutation } = orderApiSlice;

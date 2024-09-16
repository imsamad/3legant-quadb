import { PRODUCTS_URL } from '../../constants/apiEndpoints';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber, minPrice, maxPrice, categoryId }: any) => {
        const params: Record<string, any> = {
          keyword,
          pageNumber,
          minPrice,
          maxPrice,
          categoryId,
        };

        // Filter out undefined values
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined)
        );
        console.log('filteredParams:', filteredParams);
        return {
          url: PRODUCTS_URL,
          params: filteredParams,
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...rest }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    getAllProducts: builder.query({
      query: () => ({ url: `${PRODUCTS_URL}/allProducts` }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetAllProductsQuery,
} = productsApiSlice;

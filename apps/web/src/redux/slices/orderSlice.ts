import { ORDERS_URL } from '../../constants/apiEndpoints';
import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    setOrderPaid: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/setOrderAsPaid/${orderId}`,
        method: 'PUT',
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    changeOrderStatus: builder.mutation({
      query: ({ orderId, statuses }) => ({
        url: `${ORDERS_URL}/change_status/${orderId}`,
        method: 'PUT',
        body: statuses,
      }),
    }),

    getStripeUrl: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/getStripePaymentUrl/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  // useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useSetOrderPaidMutation,
  useGetStripeUrlQuery,
  useChangeOrderStatusMutation,
} = orderApiSlice;

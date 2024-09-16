import { useGetMyOrdersQuery } from '../redux/slices/orderSlice';

import StripePaymentButton from './StripePaymentButton';
import { extractDMY } from '../utils/lib';
import { Link } from 'react-router-dom';

export const MyOrders = () => {
  const { data, isLoading } = useGetMyOrdersQuery({});

  if (isLoading) return null;

  if (!data.orders.length) {
    <div>
      <h6 className='mx-auto my-14'>Have not placed any order</h6>
    </div>;
  }

  return (
    <div>
      <h6>Your Orders</h6>

      <OrdersTable orders={data.orders} />
    </div>
  );
};

export function OrdersTable({ orders }: { orders: any }) {
  return (
    <div className='overflow-x-auto'>
      <table className='table-auto border-2 border-gray-600 rounded-lg shadow-lg p-4'>
        <thead>
          <tr className='border-b-2 border-b-gray-800 py-8'>
            <th className='p-4 w-max'>ID</th>
            <th className='p-4 w-max'>Items</th>
            <th className='p-4 w-max'>Total Price</th>
            <th className='p-4 w-max'>Mode</th>
            <th className='p-4 w-max'>Placed At</th>
            <th className='p-4 w-max'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => {
            return (
              <tr key={order.id} className='border-b-2 border-gray-400 py-8'>
                <td className=''>
                  <Link to={`/orders/${order.id}`} className='underline'>
                    {order.id}
                  </Link>
                </td>
                <td className=''>
                  <div className='flex justify-center space-x-4'>
                    {/* Replace images with actual product images */}
                    {order.items.map((item: any) => (
                      <div className='relative' key={item?.productId}>
                        {item?.product?.medias?.[0]?.url ? (
                          <img
                            src={item.product.medias[0].url}
                            alt={item.product.title}
                            className='w-24 h-24 object-cover rounded'
                          />
                        ) : null}
                        <span className='absolute -top-2 -right-2 bg-black text-[#ffff] rounded-full w-6 h-6 flex items-center justify-center'>
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className=''>${order.totalPrice}</td>
                <td className=''>
                  <div className='flex flex-col items-center gap-4'>
                    <div>{order.paymentMode}</div>
                    {order.paymentMode == 'ONLINE' && !order.paidAt ? (
                      <StripePaymentButton orderId={order.id} label={`Pay`} />
                    ) : null}
                  </div>
                </td>
                <td className=''>{extractDMY(new Date(order.createdAt))}</td>
                <td className=''>
                  {order.deliveredAt
                    ? 'Delivered'
                    : order.outOfDeliveryAt
                      ? 'Out For Delivery'
                      : order.cancelledAt
                        ? 'Cancelled'
                        : 'Under Processing'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { Link } from 'react-router-dom';

import { TOrderItemSchema, TOrderSchema, TProductSchema } from '../zodSchema';
import { extractDMY } from '../utils/lib';
import { useGetOrdersQuery } from '../redux/slices/orderSlice';
import { OrderStatusModal } from './OrderStatusModal';

export const OrdersTable = () => {
  const { data, isLoading, refetch } = useGetOrdersQuery({});
  if (isLoading) return null;

  return <AllOrdersTable orders={data.orders} refetch={refetch} />;
};

interface OrderProps extends Omit<TOrderSchema, 'items'> {
  items: TOrderItemSchema & { product: TProductSchema };
}

export function AllOrdersTable({
  orders,
  refetch,
}: {
  // id: string;
  orders: OrderProps[];
  refetch: any;
}) {
  return (
    <div className='overflow-x-auto'>
      <table className='table-auto border-2 border-gray-600 rounded-lg shadow-lg p-4'>
        <thead>
          <tr className='border-b-2 border-b-gray-800 py-8'>
            <th className='p-4 w-max'>ID</th>
            <th className='p-4 w-max'>Total Price</th>
            <th className='p-4 w-max'>Mode</th>
            <th className='p-4 w-max'>Actions</th>
            <th className='p-4 w-max'>Created At</th>
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

                <td className=''>${order.totalPrice}</td>
                <td className=''>{order.paymentMode}</td>
                <td>
                  {/* <div className='flex flex-col gap-2'>
                    <button
                      onClick={() => {
                        handleDeleteProduct(order.id);
                      }}
                      className='px-4 py-1 rounded-md bg-red-400 flex items-center justify-center'
                    >
                      Change Status
                    </button>{' '}
                  </div> */}
                  <OrderStatusModal order={order} />
                </td>

                <td className=''>{extractDMY(new Date(order.createdAt))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

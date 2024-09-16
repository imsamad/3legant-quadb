import { Link } from 'react-router-dom';
import { extractDMY } from '../utils/lib';
import { PageHeader } from './CartPageComponent';
import { LoadingOverlay } from './ScreenOverlay';
import StripePaymentButton from './StripePaymentButton';
import { Stepper } from './Stepper';

const OrderConfirmationDisplay = ({ order }: { order: any }) => {
  return (
    <div className='bg-[#ffff] shadow-lg rounded-lg p-8 max-w-md text-center '>
      <h1 className='text-xl font-medium text-gray-500 mb-2'>
        Thank you!{' '}
        <span role='img' aria-label='celebration'>
          🎉
        </span>
      </h1>
      <p className='text-3xl font-extrabold text-gray-800 mb-4'>
        Your order has been received
      </p>

      <div className='flex justify-center space-x-4 mb-6'>
        {/* Replace images with actual product images */}
        {order.items.map((item: any) => (
          <div className='relative' key={item.productId}>
            <img
              src={item.product.medias[0].url}
              alt={item.product.title}
              className='w-24 h-24 object-cover rounded'
            />
            <span className='absolute -top-2 -right-2 bg-black text-[#ffff] rounded-full w-6 h-6 flex items-center justify-center'>
              {item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className='text-left mb-6 w-3/4 mx-auto'>
        <p className='text-gray-600 flex justify-between items-center '>
          <span className='font-bold'>Order code: </span>
          <span> #{order.id.slice(0, 8)}</span>
        </p>

        <p className='text-gray-600 flex justify-between items-center '>
          <span className='font-bold'>Date: </span>
          <span> {extractDMY(new Date(order.createdAt))}</span>
        </p>
        <p className='text-gray-600 flex justify-between items-center '>
          <span className='font-bold'>Total: </span>
          <span>${order.totalPrice}</span>
        </p>
        <p className='text-gray-600 flex justify-between items-center '>
          <span className='font-bold'>Payment method: </span>
          <span> {order.paymentMode == 'ONLINE' ? 'Online' : 'COD'}</span>
        </p>
      </div>
      {order.paymentMode == 'ONLINE' && !order.paidAt ? (
        <StripePaymentButton orderId={order.id} label='Pay Now' />
      ) : null}

      {/* <span>
            {order.paymentMode != 'ONLINE' ? (
              'COD'
            ) : !order.paidAt ? (
              <StripePaymentButton orderId={order.id} />
            ) : (
              'Stripe'
            )} */}

      <Link to='/dashboard'>
        <button className='bg-black mt-4 text-[#ffff] py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300'>
          Purchase history
        </button>
      </Link>
    </div>
  );
};

export const OrderConfirmation = ({
  order,
  isLoading,
}: {
  order: any;
  isLoading: boolean;
}) => {
  return (
    <div className='container mx-auto p-6'>
      <PageHeader label='Complete' />
      <Stepper currentStep='step3' />
      <div className='flex flex-col items-center justify-center  p-6'>
        {isLoading ? (
          <LoadingOverlay />
        ) : order ? (
          <OrderConfirmationDisplay order={order} />
        ) : null}
      </div>
    </div>
  );
};

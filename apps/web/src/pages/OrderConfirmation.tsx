import { Footer, Nav } from '../components';
import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../redux/slices/orderSlice';
import { OrderConfirmation } from '../components/OrderConfirmation';

export const OrderConfirmationPage = ({ orderId }: any) => {
  const { data, isLoading, isError } = useGetOrderDetailsQuery(orderId);
  if (isLoading) return null;
  return (
    <>
      <Nav />
      <OrderConfirmation order={data?.order} isLoading={isLoading} />
      <Footer />
    </>
  );
};

export const OrderConfirmationPageWrapper = () => {
  const { orderId } = useParams();

  if (!orderId) return;
  return <OrderConfirmationPage orderId={orderId} />;
};

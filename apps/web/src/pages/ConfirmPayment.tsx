import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetOrderPaidMutation } from '../redux/slices/orderSlice';

import { Footer, Nav } from '../components';

import { TOrderSchema } from '../zodSchema';

import { OrderConfirmation } from '../components/OrderConfirmation';

const ConfirmPayment = () => {
  const { orderId } = useParams();
  const [setOrderPaid, { isLoading }] = useSetOrderPaidMutation();

  const [order, setOrder] = useState<TOrderSchema>();

  useEffect(() => {
    (async () => {
      try {
        const res = await setOrderPaid(orderId);

        setOrder(res.data.order);
      } catch (error) {
      } finally {
        // navigate('/orders/' + orderId);
      }
    })();
  }, []);
  return (
    <>
      <Nav />
      <OrderConfirmation isLoading={isLoading} order={order} />

      <Footer />
    </>
  );
};

export default ConfirmPayment;

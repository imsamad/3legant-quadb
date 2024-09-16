import { useGetStripeUrlQuery } from '../redux/slices/orderSlice';
import { PayNowButton } from './CheckoutPageComponent';

const StripePaymentButton = ({ orderId, label }: any) => {
  const { data, isLoading } = useGetStripeUrlQuery(orderId);

  const handleClick = async () => {
    window.location = data.stripePaymentUrl;
  };

  return <PayNowButton onClick={handleClick} label={label} />;
};

export default StripePaymentButton;

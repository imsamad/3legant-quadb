import CheckoutPageComponent from '../components/CheckoutPageComponent';
import { Footer, Nav } from '../components';
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length == 0) {
      navigate('/shop');
    }
  }, [cartItems]);
  return (
    <>
      <Nav />
      <CheckoutPageComponent />
      <Footer />
    </>
  );
};

export default CheckoutPage;

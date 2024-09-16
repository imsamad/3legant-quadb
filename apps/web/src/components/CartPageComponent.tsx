import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  CartItem,
  removeFromCart,
  updateCartItemQty,
} from '../redux/slices/cartSlice';
import { QuantityCounter } from './CartDrawer';
import { GiTireIronCross } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { Stepper } from './Stepper';

export const calculateSubtotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const CartPageComponent = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const subtotal = calculateSubtotal(cartItems);

  return (
    <div className='container mx-auto p-6'>
      <PageHeader label='Cart' />

      <Stepper currentStep={'step1'} />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <CartItems cartItems={cartItems} />

        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
};

export const PageHeader = ({ label }: { label: string }) => (
  <p className='text-3xl font-bold mb-8 text-center'>{label}</p>
);

// CartItems Component
const CartItems = ({ cartItems }: { cartItems: CartItem[] }) => {
  const dispatch = useAppDispatch();

  const handleQty = (productId: string, quantity: number) => {
    dispatch(updateCartItemQty({ productId: productId, quantity }));
  };
  return (
    <div className='col-span-2 bg-[#ffff] p-6 rounded-lg shadow-md'>
      <table className='w-full overflow-auto'>
        <thead>
          <tr>
            <th className='text-left text-gray-700  font-semibold  text-xs '>
              Product
            </th>
            <th className='text-left text-gray-700  font-semibold  text-xs '>
              Quantity
            </th>
            <th className='text-left text-gray-700  font-semibold  text-xs '>
              Price
            </th>
            <th className='text-left text-gray-700  font-semibold  text-xs '>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cart) => (
            <tr className='border-b' key={cart.productId}>
              <td className='py-4 flex items-center'>
                <img
                  src={cart.image}
                  alt='product'
                  className='w-12 h-12 mr-4'
                />
                <div>
                  <p className='font-semibold'>{cart.title}</p>
                  <p className='text-sm text-gray-500'>Color: Black</p>
                  <div
                    className='flex items-center text-xs gap-2'
                    onClick={() => {
                      dispatch(removeFromCart(cart.productId));
                    }}
                  >
                    <GiTireIronCross size='10' /> Remove
                  </div>
                </div>
              </td>
              <td>
                <QuantityCounter
                  quantity={cart.quantity}
                  onIncrement={() =>
                    handleQty(cart.productId, cart.quantity + 1)
                  }
                  onDecrement={() =>
                    handleQty(cart.productId, cart.quantity - 1)
                  }
                />{' '}
              </td>
              <td className='py-4'>${cart.price.toFixed(2)}</td>
              <td className='py-4'>
                ${(cart.price * cart.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coupon Input */}
      <div className='mt-6 w-1/2'>
        <p>Have a coupon?</p>
        <div className='flex mt-2'>
          <input
            type='text'
            placeholder='Coupon Code'
            className='border p-2 rounded-l w-full'
            disabled={true}
          />
          <button className='bg-black text-[#ffff] px-4 rounded-r'>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const CartSummary = ({ subtotal }: { subtotal: number }) => {
  const [selectedShipping, setSelectedShipping] = useState('free');

  const shippingOptions = [
    { id: 'free', label: 'Free shipping', price: 0 },
    { id: 'express', label: 'Express shipping', price: 0 },
    { id: 'pickup', label: 'Pick Up', price: 0 },
  ];

  const handleShippingChange = (id: string) => {
    setSelectedShipping(id);
  };

  return (
    <div className='bg-[#ffff] p-6 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Cart summary</h2>
      <ul>
        {shippingOptions.map((option) => (
          <li
            key={option.id}
            className='flex justify-between items-center mb-2 border-2 border-gray-500 px-4 py-2 rounded-md '
          >
            <div className='flex items-center'>
              <input
                type='radio'
                id={option.id}
                name='shipping'
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={() => handleShippingChange(option.id)}
                className='mr-2'
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
            <span>${option.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className='flex justify-between font-semibold text-lg border-t pt-4 mt-4'>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className='flex justify-between font-semibold text-xl mt-2'>
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <Link to='/checkout'>
        <button className='bg-black text-[#ffff] w-full mt-6 py-2 rounded-lg'>
          Checkout
        </button>
      </Link>
    </div>
  );
};

import { useState } from 'react';
import { shoppingBag } from '../assets';
import Drawer from './Drawer';
import { ImCross } from 'react-icons/im';
import { TbXboxX } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  CartItem,
  removeFromCart,
  updateCartItemQty,
} from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { calculateSubtotal } from './CartPageComponent';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <>
      <div
        className='flex items-center justify-center gap-2'
        onClick={() => setIsOpen((p) => !p)}
      >
        <img src={shoppingBag} alt='shopping bag' />
        <div className='w-5 h-5 bg-[#000000] grid place-items-center rounded-full text-[#ffff] text-center font-inter font-bold text-sm'>
          {cartItems.length}
        </div>
      </div>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div
          className='h-full overflow-hidden flex flex-col pl-4 pt-4 drawer'
          style={{
            background: 'rgba(255,255,255,1)',
            opacity: 1,
            zIndex: 22,
          }}
        >
          <div className='flex item-center justify-between p-4'>
            <header className='font-bold text-3xl'>Cart</header>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className='border-2 border-gray-700 rounded-full size-10 flex items-center justify-center'
            >
              <ImCross className='text-xl' />
            </button>
          </div>
          {cartItems.length ? (
            <>
              <div
                className='flex-1 overflow-auto'
                style={{
                  zIndex: 11111111,
                }}
              >
                <div className='border-b-2 border-gray-500'>
                  <CartItemsShow cartItems={cartItems} />
                </div>
              </div>
              <div>
                <CartSummary cartItems={cartItems} />
              </div>
            </>
          ) : (
            <div className='flex-1 flex items-center justify-center bg-white   z-[10000]   text-red-500 italic'>
              <h4>Cart is empty</h4>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}

export const CartItemsShow = ({ cartItems }: { cartItems: CartItem[] }) => {
  const dispatch = useAppDispatch();

  const handleQty = (productId: string, quantity: number) => {
    dispatch(updateCartItemQty({ productId: productId, quantity }));
  };

  return cartItems.map((cart) => (
    <div className='flex p-4 bg-white gap-2' key={cart.productId}>
      <img
        src={cart.image}
        style={{
          width: 120,
          height: 140,
        }}
        className='rounded-md '
        alt='cart'
      />
      <div className='flex flex-col gap-2 flex-1'>
        <p>{cart.title}</p>
        <p>Color: Black</p>
        <QuantityCounter
          quantity={cart.quantity}
          onIncrement={() => handleQty(cart.productId, cart.quantity + 1)}
          onDecrement={() => handleQty(cart.productId, cart.quantity - 1)}
        />
      </div>
      <div className='flex flex-col  items-center'>
        <p>${cart.price * cart.quantity}</p>
        <button
          onClick={() => {
            dispatch(removeFromCart(cart.productId));
          }}
          className='border-2 border-grady-700 rounded-full size-4 flex items-center justify-center '
        >
          <ImCross className='text-red-400' />
        </button>
      </div>
    </div>
  ));
};

export const QuantityCounter = ({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  return (
    <div className='flex items-center justify-center gap-2 border rounded-md shadow w-fit px-2'>
      <button
        className={`text-2xl flex items-center justify-center ${
          quantity === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
        }`}
        onClick={() => {
          if (quantity === 1) return; // Disable decrement if quantity is 1
          onDecrement();
        }}
        disabled={quantity === 1}
      >
        <span>-</span>
      </button>
      <span className='text-xl'>{quantity}</span>
      <button
        className='text-2xl flex items-center justify-center text-black'
        onClick={onIncrement}
      >
        <span>+</span>
      </button>
    </div>
  );
};

const CartSummary = ({ cartItems }: { cartItems: CartItem[] }) => {
  return (
    <div className='border p-4 rounded-md w-full max-w-md mx-auto'>
      {/* Subtotal and Total */}
      <table className='w-full mb-4'>
        <tbody>
          <tr>
            <td className='text-left text-gray-600'>Subtotal</td>
            <td className='text-right font-semibold'>
              ${calculateSubtotal(cartItems)}
            </td>
          </tr>
          <tr>
            <td className='text-left text-gray-600'>Total</td>
            <td className='text-right text-xl font-bold'>
              ${calculateSubtotal(cartItems)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Checkout Button */}
      <Link to='/checkout'>
        <button className='w-full bg-black text-[#ffff] py-3 rounded-md text-lg font-semibold'>
          Checkout
        </button>
      </Link>

      {/* View Cart Link */}
      <div className='mt-3 text-center'>
        <Link to='/cart' className='text-black underline'>
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;

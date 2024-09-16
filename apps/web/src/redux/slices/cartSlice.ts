import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAddressSchema } from '../../zodSchema';

// Define the cart item type
export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  quantityInStock: number;
}

// Define the cart state structure
interface CartState {
  cartItems: CartItem[];
  shippingAddress: TAddressSchema | {};
  paymentMethod: 'COD' | 'STRIPE';
}

// Retrieve initial state from localStorage or set default values
const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') || '')
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'COD' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItem) {
        // If the item already exists, update its quantity
        existingItem.quantity += item.quantity;
      } else {
        // Add the new item to the cart
        state.cartItems.push(item);
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateCartItemQty: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.productId === productId
      );

      if (existingItem) {
        // Update the quantity if the item is found
        existingItem.quantity = quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.productId !== productId
      );

      localStorage.setItem('cart', JSON.stringify(state));
    },

    saveShippingAddress: (state, action: PayloadAction<TAddressSchema>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },

    savePaymentMethod: (state, action: PayloadAction<'COD' | 'STRIPE'>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = 'COD';
      localStorage.removeItem('cart'); // Reset local storage as well
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
  updateCartItemQty,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

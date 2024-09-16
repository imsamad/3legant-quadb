import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../reduxStore';

interface UserInfo {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

interface AuthState {
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  userInfo: (() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (e) {
      console.error('Error parsing userInfo from localStorage', e);
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;

      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      // Remove specific keys from localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cart');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.userInfo;

export const authReducer = authSlice.reducer;

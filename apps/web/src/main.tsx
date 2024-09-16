import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home, Shop, SignIn, SignUp } from './pages';
import { Provider } from 'react-redux';
import { reduxStore } from './redux/reduxStore';
import Cart from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmPayment from './pages/ConfirmPayment';
import { OrderConfirmationPageWrapper } from './pages/OrderConfirmation';
import Dashboard from './pages/Dashboard';
import { AdminRoute, PrivateRoute } from './components/PrivateRoute';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/products' element={<Shop />} />
      <Route path='/cart' element={<Cart />} />
      {/* these are auth protected rputes */}
      <Route path='' element={<AdminRoute />}>
        <Route
          path='/admin'
          element={<AdminDashboardPage link='allProducts' />}
        />
        <Route
          path='/admin/allOrders'
          element={<AdminDashboardPage link='allOrders' />}
        />
        <Route
          path='/admin/addProduct'
          element={<AdminDashboardPage link='addProduct' />}
        />
        <Route
          path='/admin/allProducts'
          element={<AdminDashboardPage link='allProducts' />}
        />

        <Route
          path='/admin/allProducts/:productId'
          element={<AdminDashboardPage link='editProduct' />}
        />
      </Route>

      <Route path='' element={<PrivateRoute />}>
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route
          path='/setOrderPaid/:orderId/stripepayment_success_cb'
          element={<ConfirmPayment />}
        />
        <Route
          path='/setOrderPaid/:orderId/stripepayment_cancel_cb'
          element={<OrderConfirmationPageWrapper />}
        />
        <Route
          path='/orders/confirmation/:orderId'
          element={<OrderConfirmationPageWrapper />}
        />
        <Route
          path='/orders/:orderId'
          element={<OrderConfirmationPageWrapper />}
        />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

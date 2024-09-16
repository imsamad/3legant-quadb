import { Footer, Nav } from '../components';
import { ProductEditForm, ProductForm } from '../components/ProductForm';
import { AdminDashboardNav } from '../components/AdminDashboard';
import { OrdersTable } from '../components/OrdersTable';
import { ProductsTable } from '../components/ProductsTable';

export const AdminDashboardPage = ({
  link,
}: {
  link: 'allProducts' | 'allOrders' | 'addProduct' | 'editProduct';
}) => {
  return (
    <>
      <Nav />
      <div className='min-h-screen max-w-screen-lg mx-auto py-10'>
        <h6 className='text-3xl font-semibold'>
          Hi, Welcome to Admin Dashboard
        </h6>
        <AdminDashboardNav />
        {link == 'addProduct' ? (
          <ProductForm />
        ) : link == 'allOrders' ? (
          <OrdersTable />
        ) : link == 'editProduct' ? (
          <ProductEditForm />
        ) : (
          <ProductsTable />
        )}
      </div>

      <Footer />
    </>
  );
};

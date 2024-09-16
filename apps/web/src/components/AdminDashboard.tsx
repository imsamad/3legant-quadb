import { Link } from 'react-router-dom';

export const AdminDashboardNav = () => (
  <div className='flex w-full items-center gap-8 justify-stretch my-2'>
    <Link to='/admin/allOrders'>
      <button className='px-6 py-2 rounded-md shadow-md bg-sky-400'>
        All Order
      </button>
    </Link>
    <Link to='/admin/addProduct'>
      <button className='px-6 py-2 rounded-md shadow-md bg-sky-400'>
        Add Product
      </button>
    </Link>
    <Link to='/admin/allProducts'>
      <button className='px-6 py-2 rounded-md shadow-md bg-sky-400'>
        All Products
      </button>
    </Link>
  </div>
);

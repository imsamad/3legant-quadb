import { Link } from 'react-router-dom';
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from '../redux/slices/productApiSlices';
import { TProductSchema } from '../zodSchema';
import { extractDMY } from '../utils/lib';

export const ProductsTable = () => {
  const { data, isLoading, refetch } = useGetAllProductsQuery({});
  if (isLoading) return null;

  return <AllProductsTable products={data.products} refetch={refetch} />;
};

export function AllProductsTable({
  products,
  refetch,
}: {
  products: TProductSchema[];
  refetch: any;
}) {
  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      refetch();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table-auto border-2 border-gray-600 rounded-lg shadow-lg p-4'>
        <thead>
          <tr className='border-b-2 border-b-gray-800 py-8'>
            <th className='p-4 w-max'>ID</th>
            <th className='p-4 w-max'>Media</th>
            <th className='p-4 w-max'>Title</th>
            <th className='p-4 w-max'>Price</th>
            <th className='p-4 w-max'>Status</th>
            <th className='p-4 w-max'>Actions</th>
            <th className='p-4 w-max'>Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => {
            return (
              <tr key={product.id} className='border-b-2 border-gray-400 py-8'>
                <td className=''>
                  <Link
                    to={`/admin/allProducts/${product.id}`}
                    className='underline'
                  >
                    {product.id}
                  </Link>
                </td>
                <td className=''>
                  <img
                    src={product.medias[0].url}
                    alt={product.title}
                    className='w-36 h-24 object-cover rounded'
                  />
                </td>

                <td className=''>{product.title}</td>
                <td className=''>${product.price}</td>
                <td>
                  <div className='flex flex-col gap-2'>
                    <Link to={`/admin/allProducts/${product.id}`}>
                      <button className='px-4 py-1 rounded-md bg-sky-400 flex items-center justify-center'>
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        handleDeleteProduct(product.id);
                      }}
                      className='px-4 py-1 rounded-md bg-red-400 flex items-center justify-center'
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td className=''>{product.status}</td>
                <td className=''>{extractDMY(new Date(product.createdAt))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

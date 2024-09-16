import { useState } from 'react';
import { star } from '../assets';
import { useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/slices/cartSlice';
import { useGetProductsQuery } from '../redux/slices/productApiSlices';
import { TProductSchema } from '../zodSchema';
import { Toast } from './Toast';

const NewLabel = () => {
  return (
    <div className='flex justify-start items-start flex-col z-10 font-inter font-bold py-2'>
      <p className='text-sm text--[#FFAB00] bg-[#ffff]rounded-sm'>NEW</p>
      <p className='text-sm text-[#ffff] bg-[#38CB89] rounded-sm'>-50%</p>
    </div>
  );
};

const Star = () => {
  const stars = Array(5).fill(1); // Create an array with 5 elements

  return (
    <div className='flex'>
      {stars.map((_, index) => (
        <img key={index} src={star} alt='star' />
      ))}
    </div>
  );
};

export const ProductCard = ({
  img,
  title,
  price,
  discountPrice,
  product,
}: any) => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);

  const dispatch = useAppDispatch();
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        image: product.medias[0].url,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        quantityInStock: product.quantityInStock,
      })
    );
    handleShowToast();
  };

  return (
    <div
      className='flex flex-col justify-start items-start'
      style={{
        zIndex: 1,
      }}
    >
      {showToast && (
        <Toast
          message='Added to cart!'
          type='success'
          onClose={handleCloseToast}
        />
      )}
      <div className='  bg-[#F3F5F7] px-8  w-full flex flex-col items-stretch'>
        <NewLabel />
        <img
          src={img}
          alt={title}
          style={{ mixBlendMode: 'multiply' }}
          className='flex h-48  w-48 m-auto'
        />
        <div className='opacity-0 hover:opacity-100  mx-auto '>
          <button
            className='py-2 px-6 my-2 rounded-md bg-black text-white '
            onClick={() => {
              addToCartHandler();
            }}
          >
            Add To cart
          </button>
        </div>
      </div>
      <div className='flex flex-col font-inter p-4 '>
        <Star />
        <p className='font-poppins font-semibold text-xl'>{title}</p>
        <div className='flex'>
          <p className='text-sm mr-3'>{price}</p>
          <p className='text-sm text-[#6C7275] line-through'>{discountPrice}</p>
        </div>
      </div>
    </div>
  );
};

const SlideItems = () => {
  const { data, isLoading } = useGetProductsQuery({
    keyword: '',
    pageNumber: 1,
  });
  if (isLoading) return null;

  return (
    <>
      <main className='flex flex-col justify-between bg-[#ffff] overflow-hidden mt-8 mb-8 mx-8 2xl:mx-60'>
        <div className='flex overflow-x-scroll gap-4 py-2'>
          {data.products.map((product: TProductSchema) => (
            <div className='min-w-[300px]'>
              <ProductCard
                key={product.id}
                img={product.medias[0].url}
                title={product.title}
                price={product.price}
                discountPrice={product.price + 30}
                product={product}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default SlideItems;

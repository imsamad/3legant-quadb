import { useGetProductsQuery } from '../redux/slices/productApiSlices';
import { useEffect, useState } from 'react';

const Slider = () => {
  const { data, isLoading } = useGetProductsQuery({});

  if (isLoading) return null;

  return (
    <div className='h-56 sm:h-64 lg:h-[536px] lg:w-auto mx-8 2xl:mx-60 object-cover '>
      <CarouselX products={data.products} />
    </div>
  );
};

export default Slider;

export const CarouselX = ({ products }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Use useEffect to automate the slider every 200ms
  useEffect(() => {
    const interval = setInterval(nextSlide, 1500); // 200ms interval

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [products.length]); // Only run once when the component mounts and when products length changes

  const goToSlide = (index: any) => {
    setActiveIndex(index);
  };

  return (
    <div className='w-full h-[536px] flex flex-col'>
      {/* Carousel items using background images */}
      <div className='w-full h-full flex justify-center'>
        {products.map((product: any, index: any) => (
          <div
            key={product.id}
            className={`transition-opacity duration-500 ease-in-out w-full h-full grid place-items-center ${
              activeIndex === index ? 'block' : 'hidden'
            }`}
            style={{
              backgroundImage: `url(${product.medias[0].url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>
    </div>
  );
};

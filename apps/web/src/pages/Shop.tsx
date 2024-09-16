import { useState } from 'react';
import { Nav, Slider } from '../components';
import { PriceRange } from '../components/PriceRange';
import { ProductCard } from '../components/ProductSlider';
import { Select } from '../components/Select';
import { useGetCategoriesQuery } from '../redux/slices/categoryApiSlices';

import { useGetProductsQuery } from '../redux/slices/productApiSlices';
import { TProductSchema } from '../zodSchema';
import { SearchInput } from '../components/SearchInput';

const Shop = () => {
  return (
    <>
      <Nav />
      <Slider />
      <div className=' lg:w-auto mx-8 2xl:mx-60 '>
        <ProductGrid />
      </div>
    </>
  );
};

export default Shop;

const ProductGrid = () => {
  const [searchUrl, setSearchUrl] = useState<any>({});

  const { data: productData, isLoading } = useGetProductsQuery(searchUrl);

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({});

  if (isLoading || isLoadingCategories) return null;

  const categories = categoriesData.categories,
    products = productData.products;
  return (
    <div className='mx-auto p-4'>
      <div className='flex items-center gap-4 py-4'>
        {isLoadingCategories ? null : (
          <Select
            options={categories}
            value={searchUrl.categoryId}
            onChange={(id) => {
              if (id == 'Select a category') {
                let { categoryId, ...rest } = searchUrl;

                setSearchUrl(rest || {});
              } else setSearchUrl((p: any) => ({ ...p, categoryId: id }));
            }}
            label='Select a category'
          />
        )}
        <PriceRange
          minPrice={searchUrl.minPrice || 0}
          maxPrice={searchUrl.maxPrice || 0}
          onChange={(minPrice, maxPrice) => {
            setSearchUrl((p: any) => ({ ...p, minPrice, maxPrice }));
          }}
        />
        <SearchInput
          value={searchUrl.keyword}
          onChange={(keyword) => {
            setSearchUrl((p) => ({ ...p, keyword }));
          }}
        />
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {products.slice(0).map((product: TProductSchema) => (
          <ProductCard
            key={product.id}
            img={product.medias[0].url}
            title={product.title}
            price={product.price}
            discountPrice={product.price + 30}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

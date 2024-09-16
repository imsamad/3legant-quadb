import React, { useState } from 'react';

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  onChange: (minPrice: number, maxPrice: number) => void;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const [localMinPrice, setLocalMinPrice] = useState<number>(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(maxPrice);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setLocalMinPrice(value);
    onChange(value, localMaxPrice);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setLocalMaxPrice(value);
    onChange(localMinPrice, value);
  };

  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        Price Range
      </label>
      <div className='flex space-x-4'>
        <input
          type='number'
          value={localMinPrice}
          onChange={handleMinPriceChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          placeholder='Min Price'
        />
        <input
          type='number'
          value={localMaxPrice}
          onChange={handleMaxPriceChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
          placeholder='Max Price'
        />
      </div>
    </div>
  );
};

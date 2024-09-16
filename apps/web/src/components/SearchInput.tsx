import React, { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='relative self-end '>
      <label
        htmlFor='generic-select'
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        Search
      </label>
      <input
        type='search'
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
      />
    </div>
  );
};

import React, { ChangeEvent } from 'react';

// Define the option type
interface SelectOption {
  id: string;
  title: string;
}

// Props for the Select component
interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

// Generic Select component
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor='generic-select'
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        {label}
      </label>
      <select
        id='generic-select'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
        value={value}
        onChange={handleSelectChange}
      >
        {label ? <option>{label}</option> : null}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

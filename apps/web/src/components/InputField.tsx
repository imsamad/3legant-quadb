import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = 'text', placeholder, error, ...rest }, ref) => (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`block w-full border rounded-md text-xs p-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  )
);

export const ErrorMessage = ({ error }: { error?: string }) => (
  <p className='line-clamp-0 p-0 m-0 leading-0 text-sm italic text-red-500'>
    {error ? (Array.isArray(error) ? error.join(', ') : error) : ''}
  </p>
);

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, placeholder, error, ...rest }, ref) => (
  <div className='space-y-2'>
    <label className='block text-sm font-medium text-gray-700'>{label}</label>
    <textarea
      ref={ref}
      placeholder={placeholder}
      className={`block w-full border rounded-md text-xs p-2 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      {...rest}
    />
    {error && <ErrorMessage error={error} />}
  </div>
));

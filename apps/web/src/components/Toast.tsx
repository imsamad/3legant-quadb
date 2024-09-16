// Toast.tsx
import React, { useEffect, useRef } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
}) => {
  const baseStyles =
    'fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white z-[10000000]';
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  const timeeRef = useRef<any>();
  useEffect(() => {
    timeeRef.current = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(timeeRef.current);
    };
  }, []);

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <div className='flex items-center'>
        <span className='mr-2 text-xl'>{message}</span>
        <button onClick={onClose} className='ml-auto text-white text-xl'>
          &times;
        </button>
      </div>
    </div>
  );
};

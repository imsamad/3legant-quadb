import React from 'react';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Loading...',
}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex flex-col items-center'>
        {/* Spinner */}
        <div className='w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500'></div>

        {/* Optional message */}
        {message && (
          <span className='mt-4 text-[#ffff]text-lg font-semibold'>
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

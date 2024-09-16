export const CheckmarkCircle = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#38CB89]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-6 h-6 text-white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 13l4 4L19 7'
          />
        </svg>
      </div>
    </div>
  );
};
export const Stepper = ({
  currentStep,
}: {
  currentStep: 'step1' | 'step2' | 'step3';
}) => {
  let isFirstCompleted = false;
  let isOnFirst = false;

  let isOnSecond = false;
  let isSecondCompleted = false;

  let isOnThrid = false;
  let isThirdCompleted = false;

  if (currentStep == 'step2') {
    isFirstCompleted = true;
    isOnSecond = true;
  } else if (currentStep == 'step3') {
    isFirstCompleted = true;
    isSecondCompleted = true;
    isOnThrid = true;
    isThirdCompleted = true;
  } else {
    isOnFirst = true;
  }

  return (
    <div className='flex justify-center mb-8 gap-8 '>
      <div
        className={
          'flex items-center border-b-2 py-4 pr-16   ' +
          (isFirstCompleted ? 'border-[#38CB89]' : 'border-gray-200')
        }
      >
        {!isFirstCompleted ? (
          <div className='w-8 h-8 bg-black text-[#ffff] flex items-center justify-center rounded-full'>
            1
          </div>
        ) : (
          <CheckmarkCircle />
        )}
        <span
          className={
            'ml-2 font-medium ' + (isFirstCompleted ? 'text-[#38CB89]' : '')
          }
        >
          Shopping cart
        </span>
      </div>
      <div
        className={
          'flex items-center py-4 pr-16 ' +
          (isSecondCompleted
            ? ' border-b-2  border-[#38CB89]'
            : isOnSecond
              ? 'border-b-2  border-gray-400'
              : '')
        }
      >
        {!isSecondCompleted ? (
          <div
            className={
              'w-8 h-8 text-[#ffff] flex items-center justify-center rounded-full ' +
              (isOnSecond ? 'bg-gray-800' : 'bg-gray-400')
            }
          >
            2
          </div>
        ) : (
          <CheckmarkCircle />
        )}
        <span
          className={
            'ml-2 font-medium ' +
            (isSecondCompleted
              ? 'text-[#38CB89]'
              : isOnSecond
                ? 'text-gray-800'
                : 'text-gray-500')
          }
        >
          Checkout details
        </span>
      </div>
      <div
        className={
          'flex items-center py-4 pr-16 ' +
          (isThirdCompleted ? ' border-b-2  border-[#38CB89]' : '')
        }
      >
        {!isThirdCompleted ? (
          <div
            className={
              'w-8 h-8  text-[#ffff] flex items-center justify-center rounded-full ' +
              (isThirdCompleted ? 'bg-black' : 'bg-gray-400')
            }
          >
            3
          </div>
        ) : (
          <CheckmarkCircle />
        )}
        <span
          className={
            'ml-2 font-medium ' +
            (isThirdCompleted ? 'text-[#38CB89]' : 'text-gray-500')
          }
        >
          Order complete
        </span>
      </div>
    </div>
  );
};

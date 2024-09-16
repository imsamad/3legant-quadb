import { useEffect } from 'react';
import { calculateSubtotal, PageHeader } from './CartPageComponent';
import { CartItemsShow } from './CartDrawer';
import { useAppSelector } from '../redux/hooks';
import { OrderSchema, TOrderItemSchema, TOrderSchema } from '../zodSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOrderMutation } from '../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, InputField } from './InputField';
import { Stepper } from './Stepper';

const CheckoutPageComponent = () => {
  return (
    <div className='container mx-auto p-6'>
      {/* <LoadingOverlay message='Placing your order, please wait...' /> */}
      <PageHeader label='Checkout' />

      <Stepper currentStep='step2' />

      <CheckoutPage />
    </div>
  );
};

export const PayNowButton = ({
  onClick,
  label,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-700 to-purple-500 text-[#ffff]font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 w-full'
    >
      <span className='overflow-visible '>
        {label ? label : `Place order & Pay now`}
      </span>
      <div className='flex items-center justify-center w-6 h-6 bg-[#ffff] rounded-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='w-4 h-4 text-purple-500'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </div>
    </button>
  );
};

export default CheckoutPageComponent;

// Reusable Section Wrapper
const SectionWrapper = ({ title, children }: any) => (
  <div className='bg-[#ffff] p-6 rounded-lg shadow-md space-y-2'>
    <h2 className='text-lg font-semibold'>{title}</h2>
    {children}
  </div>
);

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const checkOutForm = useForm<TOrderSchema>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      paymentMode: 'ONLINE',
    },
  });

  useEffect(() => {
    const items: TOrderItemSchema[] = cartItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    // @ts-ignore
    if (items.length) checkOutForm.setValue('items', items);
  }, [cartItems]);

  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const handleSubmit = async (order: TOrderSchema) => {
    try {
      const res = await createOrder(order);

      if (order.paymentMode == 'ONLINE') {
        window.location = res.data.stripePaymentUrl;
      } else {
        navigate('/orders/confirmation/' + res.data.order.id);
      }
    } catch (err) {}
  };

  checkOutForm.watch('paymentMode');
  return (
    <div className='container mx-auto p-6'>
      <form onSubmit={checkOutForm.handleSubmit(handleSubmit, (error) => {})}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Left Section: Contact Info, Shipping, Payment */}
          <div className='col-span-2 space-y-6'>
            {/* Contact Information */}
            <SectionWrapper title='Contact Information'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <InputField
                  type='text'
                  label='First Name'
                  placeholder='John'
                  {...checkOutForm.register('address.firstName')}
                  error={
                    checkOutForm.formState.errors.address?.firstName?.message
                  }
                />
                <InputField
                  type='text'
                  placeholder='Doe'
                  label='Last Name'
                  {...checkOutForm.register('address.lastName')}
                  error={
                    checkOutForm.formState.errors.address?.lastName?.message
                  }
                />
              </div>
              <InputField
                label='Phone Number'
                type='tel'
                placeholder='9870645161'
                {...checkOutForm.register('address.phoneNumber')}
                error={
                  checkOutForm.formState.errors.address?.phoneNumber?.message
                }
              />
              <InputField
                type='email'
                label='Email Address'
                placeholder='imsamad00@gmail.com'
                {...checkOutForm.register('address.email')}
                error={checkOutForm.formState.errors.address?.email?.message}
              />
            </SectionWrapper>

            {/* Shipping Address */}
            <SectionWrapper title='Shipping Address'>
              <InputField
                type='text'
                label='Street Address'
                {...checkOutForm.register('address.streetAddress')}
                error={
                  checkOutForm.formState.errors.address?.streetAddress?.message
                }
                placeholder='Street Address'
              />
              <InputField
                type='text'
                label='Country'
                placeholder='Country'
                {...checkOutForm.register('address.country')}
                error={checkOutForm.formState.errors.address?.country?.message}
              />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <InputField
                  type='text'
                  label='Town / City'
                  placeholder='Town / City'
                  {...checkOutForm.register('address.city')}
                  error={checkOutForm.formState.errors.address?.city?.message}
                />
                <InputField
                  type='text'
                  label='State'
                  placeholder='State'
                  {...checkOutForm.register('address.state')}
                  error={checkOutForm.formState.errors.address?.state?.message}
                />
                <InputField
                  type='text'
                  label='Zip Code'
                  placeholder='Zip Code'
                  {...checkOutForm.register('address.zipCode')}
                  error={
                    checkOutForm.formState.errors.address?.zipCode?.message
                  }
                />
              </div>
              <div className='mt-6'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    name='useDifferentBilling'
                    onChange={() => {}}
                    className='form-checkbox h-4 w-4 text-black'
                  />
                  <span className='ml-2'>
                    Use a different billing address (optional)
                  </span>
                </label>
              </div>
            </SectionWrapper>

            {/* Payment Method */}
            <SectionWrapper title='Payment Method'>
              <div className='flex gap-2 items-center'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='paypal'
                    className='form-radio h-4 w-4 text-black'
                    onChange={() =>
                      checkOutForm.setValue('paymentMode', 'ONLINE')
                    }
                    checked={checkOutForm.getValues('paymentMode') == 'ONLINE'}
                  />
                  <span className='ml-2'>Online Payment (Stripe)</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='paypal'
                    className='form-radio h-4 w-4 text-black'
                    onChange={() => checkOutForm.setValue('paymentMode', 'COD')}
                    checked={checkOutForm.getValues('paymentMode') == 'COD'}
                  />
                  <span className='ml-2'>Cash On Delivery</span>
                </label>

                <label className='inline-flex items-center'>
                  <input
                    disabled
                    type='radio'
                    name='paymentMethod'
                    value='card'
                    className='form-radio h-4 w-4 text-black'
                  />
                  <span className='ml-2'>Pay by Card Credit</span>
                </label>

                {/* Card Details */}
                {false && (
                  <div className='mt-6 space-y-4'>
                    <InputField
                      label='Card Number'
                      type='text'
                      placeholder='1234 1234 1234 1234'
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <InputField
                        label='Expiration Date'
                        type='text'
                        placeholder='MM/YY'
                      />
                      <InputField
                        label='CVC Code'
                        type='text'
                        placeholder='CVC'
                      />
                    </div>
                  </div>
                )}
              </div>
              {checkOutForm.formState.errors.paymentMode?.message && (
                <ErrorMessage
                  error={checkOutForm.formState.errors.paymentMode?.message}
                />
              )}
            </SectionWrapper>
            {checkOutForm.getValues('paymentMode') == 'COD' ? (
              <button
                type='submit'
                className='bg-black text-[#ffff] w-full p-3 rounded-md font-medium hover:bg-gray-800'
              >
                Place Order
              </button>
            ) : (
              <PayNowButton onClick={() => {}} />
            )}
          </div>

          {/* Right Section: Order Summary */}
          <SectionWrapper title='Order Summary'>
            <div className='space-y-4'>
              <CartItemsShow cartItems={cartItems} />
            </div>
            <div className='mt-6'>
              <input
                type='text'
                placeholder='Coupon code'
                className='block w-full p-3 border border-gray-300 rounded-md cursor-not-allowed'
              />
              <button
                type='button'
                className='mt-2 w-full p-3 bg-black text-[#ffff] rounded-md font-medium disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed'
              >
                Apply
              </button>
            </div>
            <div className='mt-6'>
              <div className='flex justify-between text-sm'>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className='flex justify-between text-sm font-medium mt-4'>
                <span>Subtotal</span>
                <span>${calculateSubtotal(cartItems).toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-lg font-bold mt-4'>
                <span>Total</span>
                <span>${calculateSubtotal(cartItems).toFixed(2)}</span>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </form>
    </div>
  );
};

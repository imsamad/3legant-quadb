import { email } from '../assets';
import { drawer, chair } from '../assets';

const Newsletter = () => {
  return (
    <section className='mt-8 bg-[#F3F5F7]'>
      <div className='flex flex-col justify-center items-center py-24 px-8'>
        <img
          src={drawer}
          alt='drawer'
          className='hidden absolute w-1/3 h-[335px] -left-28 object-cover lg:block'
          style={{ mixBlendMode: 'multiply' }}
        />
        <img
          src={chair}
          alt='chair'
          className='hidden absolute w-1/3 h-[335px] -right-0  object-cover lg:block'
          style={{ mixBlendMode: 'multiply' }}
        />
        <div>
          <h6 className='h6 mb-2'>Join Our Newsletter</h6>
          <p className='font-inter font-normal text-sm  text-center mb-8'>
            Sign up for deals, new products and promotions
          </p>
        </div>

        <div className='flex border-b border-[#6C7275]'>
          <img src={email} alt='email' />
          <input
            type='email'
            name='email'
            placeholder='Email address'
            className='w-3/4 bg-transparent border-0 focus:ring-0 text--[#FFAB00] text-base font-medium font-inter placeholder:text-[#6C7275]'
          />
          <button
            type='submit'
            className='text-[#6C7275] text-base font-medium font-inter'
          >
            Signup
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

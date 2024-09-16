import { fastDelivery, money, lock, call } from '../assets';

const values = [
  { img: fastDelivery, title: 'Free Shipping', desc: 'Order above $200' },
  { img: money, title: 'Money-back', desc: '30 days guarantee' },
  { img: lock, title: 'Secure Payments', desc: 'Secured by Stripe' },
  { img: call, title: '24/7 Support', desc: 'Phone and Email support' },
];

const Values = () => {
  return (
    <section className='mt-12 mx-8 2xl:mx-60'>
      <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6'>
        {values.map((value, index) => (
          <div key={index} className='bg-[#F3F5F7] w-full'>
            <div className='mx-4 my-8 lg:mx-8 lg:my-12'>
              <img src={value.img} alt={value.title} />
              <p className='font-inter text-sm font-normal text--[#FFAB00] mt-4 lg:text-xl lg:font-medium'>
                {value.title}
              </p>
              <p className='font-inter text-sm text-[#6C7275] mt-2'>
                {value.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;

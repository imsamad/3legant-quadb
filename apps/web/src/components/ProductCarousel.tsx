import ButtonText from './ButtonText';
import SlideItems from './ProductSlider';

const ProductCarousel = () => {
  return (
    <>
      <section className='flex justify-between mt-8 mx-8 2xl:mx-60'>
        <div>
          <h5
            style={{
              fontSize: '34px',
              fontWeight: '500',
              fontFamily: 'Poppins',
            }}
          >
            New
            <br /> Arrivals
          </h5>
        </div>

        <div className='flex items-end max-sm:hidden'>
          <ButtonText text={'More Products'} linkTo={'product'} />
        </div>
      </section>

      <SlideItems />

      <div className='hidden max-sm:block mt-8 mx-8 2xl:mx-60	'>
        <ButtonText text={'More Products'} linkTo={'product'} />
      </div>
    </>
  );
};

export default ProductCarousel;

const Header = () => {
  return (
    <header className='flex flex-col justify-center items-center mt-8 mx-8 2xl:mx-60 lg:flex-row'>
      <h2 className='text-4xl sm:text-6xl underline-offset-8 font-poppins font-medium mb-4 m-auto lg:mr-auto'>
        Simply Unique<span className='text-[#6C7275]'>/</span> <br /> Simply
        Better
        <span className='text-[#6C7275]'>.</span>
      </h2>
      <div className='font-inter text-[#6C7275] m-auto'>
        <p className='font-normal text-center'>
          <span className='text-[#000000] font-semibold text-sm'>3legant</span>{' '}
          is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
        </p>
      </div>
    </header>
  );
};

export default Header;

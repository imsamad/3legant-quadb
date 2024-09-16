import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <p className='font-poppins    font-medium text-base md:text-2xl'>
        3legant<span className='text-[#6C7275]'>.</span>
      </p>
    </Link>
  );
};

export default Logo;

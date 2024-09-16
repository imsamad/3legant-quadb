import { useState } from 'react';
import Logo from './Logo';
import { userCircle, search } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, selectAuth } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../redux/slices/userApiSlice';
import { CartDrawer } from './CartDrawer';
import { resetCart } from '../redux/slices/cartSlice';

const Nav = () => {
  const userInfo = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall('jnkm').unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/sign-in');
    } catch (error) {}
  };

  return (
    <div className='relative p-4 md:py-4 flex flex-col gap-2 '>
      <nav className='sticky flex justify-between items-center 2xl:mx-60'>
        <Logo />

        <div className='hidden md:block '>
          <NavItems />
        </div>
        <div className='flex items-center gap-2'>
          <img src={search} alt='search' className='' />

          <CartDrawer />
          {/* <Link to={!userInfo ? '/sign-in' : '/dashboard'}>
            <img src={userCircle} alt='user circle' />
          </Link> */}
          {userInfo ? (
            <ProfileSection
              handleLogout={handleLogout}
              isAdmin={userInfo.isAdmin}
            />
          ) : (
            <Link to='/sign-in'>
              <img src={userCircle} alt='user circle' />
            </Link>
          )}
        </div>
      </nav>
      <div className='md:hidden px-4'>
        <NavItems />
      </div>
    </div>
  );
};

const NavItems = () => (
  <div className='text-[#6C7275] flex items-center justify-between gap-10 text-sm font-medium'>
    <Link to='/' className=' text--[#FFAB00]  '>
      Home
    </Link>

    <Link to='/shop' className=''>
      Shop
    </Link>

    <Link to='/products' className=''>
      Product
    </Link>

    <Link to='/contact' className=''>
      Contact Us
    </Link>
  </div>
);

export default Nav;

const ProfileSection = ({ handleLogout, isAdmin }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        id='dropdownDefaultButton'
        onClick={toggleDropdown}
        className='text-gray-700 font-medium rounded-lg text-sm text-center flex items-center gap-2 '
        type='button'
      >
        <img
          src={userCircle}
          alt='user circle'
          className='w-6 h-6 rounded-full'
        />
        <svg
          className='w-2.5 h-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M1 1l4 4 4-4'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id='dropdown'
          className='absolute right-0 mt-2 w-44 bg-[#ffff] divide-y divide-gray-100 rounded-lg shadow z-[5000] opacity-100'
        >
          <ul className='py-2 text-sm text-gray-700 '>
            <li>
              <Link to='/dashboard' className='block px-4 py-2 '>
                Dashboard
              </Link>
            </li>
            {isAdmin ? (
              <li>
                <Link to='/admin' className='block px-4 py-2 '>
                  Admin Panel
                </Link>
              </li>
            ) : null}
            <li>
              <button
                onClick={handleLogout}
                className='block w-full text-left px-4 py-2 '
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

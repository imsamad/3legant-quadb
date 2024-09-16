import Logo from '../components/Logo';
import { chair } from '../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ChangeEvent, useEffect, useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../redux/slices/userApiSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAuth, setCredentials } from '../redux/slices/authSlice';

export const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const authState = useAppSelector(selectAuth);

  useEffect(() => {
    if (authState) {
      navigate(redirect);
    }
  }, [navigate, redirect, authState]);

  const [userData, setUserData] = useState({
    email: 'user@gmail.com',
    password: 'Password@123',
    fullName: 'Abdus Samad',
  });

  const [errorData, setErrorData] = useState<any>({
    email: '',
    password: '',
    fullName: '',
  });

  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [signUp, { isLoading: isLoadingSignup }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tgt = e.target;

    if (errorData[tgt.name]) {
      setErrorData((p: any) => ({ ...p, [tgt.name]: '' }));
    }

    setUserData((p) => ({ ...p, [tgt.name]: tgt.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingLogin || isLoadingSignup) {
      return;
    }

    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(userData).unwrap();
      }

      const res = await login(userData).unwrap();

      dispatch(setCredentials(res));
    } catch (error: any) {
      if (error?.data?.errors?.email) {
        setErrorData((p: any) => ({ ...p, email: error.data?.errors.email }));
      }
      if (error?.data?.errors?.fullName) {
        setErrorData((p: any) => ({
          ...p,
          fullName: error.data?.errors.fullName,
        }));
      }
      if (error?.data?.errors?.password) {
        setErrorData((p: any) => ({
          ...p,
          password: error.data?.errors.password,
        }));
      }
    }
  };

  return (
    <>
      <div className='flex h-screen flex-col lg:flex-row'>
        <div className='flex-1 bg-[#F3F5F7] relative'>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='absolute top-0 mt-8'>
              <Logo />
            </div>
            <img
              src={chair}
              alt='chair'
              className='object-contain h-[430px] w-[375px] lg:h-auto lg:w-auto'
            />
          </div>
        </div>

        <div className='flex-1 flex justify-center items-center px-8'>
          <form className='lg:max-w-[456px] lg:ml-0' onSubmit={handleSubmit}>
            <TopStrip isSignUp={isSignUp} />

            {/* Conditionally render the full name field for sign up */}
            {isSignUp && (
              <TextField
                type='text'
                placeholder='Your name'
                onChange={onChange}
                name={'fullName'}
                value={userData.fullName}
                error={errorData.fullName}
              />
            )}

            <TextField
              type='email'
              placeholder='Your email'
              onChange={onChange}
              name={'email'}
              value={userData.email}
              error={errorData.email}
            />

            <TextField
              type='password'
              placeholder='Your Password'
              onChange={onChange}
              name={'password'}
              value={userData.password}
              error={errorData.password}
            />

            <div className='flex items-center justify-start mt-8'>
              <input
                type='checkbox'
                className='border-[#6C7275] rounded-sm focus:border-[#6C7275] focus:ring-0'
              />
              <label className='text-[#6C7275] font-inter font-base text-sm ml-3'>
                I agree with{' '}
                <span className='text-black font-inter font-semibold cursor-pointer hover:underline'>
                  Privacy Policy
                </span>{' '}
                and{' '}
                <span className='text-[#000000] font-inter font-semibold cursor-pointer hover:underline'>
                  Terms of Use
                </span>
              </label>
            </div>

            <button className='w-full h-12 mt-8 mb-10 flex justify-center items-center rounded-lg bg-black text-[#ffff] font-inter font-base font-semibold'>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const TextField = ({
  type,
  placeholder,
  error,
  onChange,
  value,
  name,
}: {
  type: string;
  placeholder?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='relative'>
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        className='w-full p-2 border-0 border-b border-[#E8ECEF] mt-8 pb-2 focus:border-[#E8ECEF] focus:ring-0 font-inter'
      />
      {type === 'password' && (
        <button
          type='button'
          onClick={handleTogglePassword}
          className='absolute right-2 top-2 text-gray-500'
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      )}
      {error && (
        <p className='text-red-700 text-sm italic pl-4 pt-4 max-w-[200px]'>
          {Array.isArray(error)
            ? error.map((e, index) => <p key={index}>{e}</p>)
            : error}
        </p>
      )}
    </div>
  );
};

const TopStrip = ({ isSignUp }: { isSignUp: boolean }) => {
  return (
    <>
      <h4 className='text-primary mt-10 mb-6'>Sign {isSignUp ? 'up' : 'in'}</h4>
      <p className='text-[#6C7275] font-inter font-normal text-base'>
        {isSignUp ? 'Already have an account?' : 'Don’t have an account yet?'}
        <Link
          to={isSignUp ? '/sign-in' : '/sign-up'}
          className='text-[#38CB89] font-inter font-semibold text-base hover:underline'
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </Link>
      </p>
    </>
  );
};

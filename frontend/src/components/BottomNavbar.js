import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const BottomNavbar = () => {

  const { user } = useAuthContext();

  return (
    <div className='sm:hidden fixed z-50 w-8/12 h-16 max-w-lg -translate-x-1/2 bottom-4 left-1/2 bg-black shadow-[0px_0px_10px_0px_#1e1b4b] rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-80 border border-gray-700'>
      <div className='grid h-full max-w-lg grid-cols-3 mx-auto'>
        <a
          href='/'
          className='inline-flex flex-col items-center justify-center px-5 rounded-s-full group'>
          <svg
            className='w-5 h-5 mb-1 text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'>
            <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
          </svg>
          <span className='sr-only'>Home</span>
        </a>
        <div className='inline-flex flex-col items-center justify-center'>
          <a
            href='/publish'
            className='self-center w-min relative inline-flex items-center justify-between p-0.5 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-purple-600 via-cyan-600/70 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-90'>
            <span className='flex bg-gray-900 justify-center relative p-2.5 xl:p-4 transition-all ease-in duration-75 rounded-full group-hover:bg-opacity-0'>
              <svg
                className='w-4 h-4 text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 1v16M1 9h16'
                />
              </svg>
            </span>
          </a>
        </div>
        {user && <Link to={`/post/user/${user._id}/${user.name}`}
          
          className='inline-flex flex-col items-center justify-center px-5 rounded-e-full'>
          <svg
            className='w-5 h-5 mb-1 text-gray-400 '
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'>
            <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
          </svg>
          <span className='sr-only'>Profile</span>
        </Link>}
        {!user && <Link to={`/login`}
          
          className='inline-flex flex-col items-center justify-center px-5 rounded-e-full'>
          <svg
            className='w-5 h-5 mb-1 text-gray-400 '
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'>
            <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
          </svg>
          <span className='sr-only'>Profile</span>
        </Link>}
        
      </div>
    </div>
  );
};

export default BottomNavbar;

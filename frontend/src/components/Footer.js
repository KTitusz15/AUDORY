import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Footer = () => {
  const { user } = useAuthContext();

  return (
    <footer class='mb-24 sm:mb-4 rounded-lg shadow bg-gray-900/30 m-4 mt-10 backdrop-blur-lg border border-gray-800'>
      <div class='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div class='flex gap-5 flex-col sm:flex-row sm:items-center sm:justify-between'>
          <span class='sm:self-center  text-2xl font-semibold whitespace-nowrap text-white'>
            Audory
          </span>
          <ul class='flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-gray-400'>
            <li>
              <Link
                to='/'
                class='hover:underline me-4 md:me-6'>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/feedback'
                class='hover:underline me-4 md:me-6'>
                Feedback
              </Link>
            </li>
            <li>
              <Link
                to='/publish'
                class='hover:underline me-4 md:me-6'>
                Upload your idea
              </Link>
            </li>
            <li>
              {user && (<Link
                to={`/post/user/${user._id}/${user.name}`}
                class='hover:underline me-4 md:me-6'>
                Profile
              </Link>)}
              {!user && (<Link
                to={`/login`}
                class='hover:underline me-4 md:me-6'>
                Profile
              </Link>)}
            </li>
          </ul>
        </div>
        <hr class='my-6  sm:mx-auto border-gray-700 lg:my-8' />
        <span class='block text-sm sm:text-center text-gray-400'>
          © 2024{' '}
          <a
            href='/'
            class='hover:underline'>
            Audory
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

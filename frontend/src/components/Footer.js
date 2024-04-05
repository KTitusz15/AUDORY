import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class='mb-24 sm:mb-4 rounded-lg shadow bg-gray-900/30 m-4 mt-10 backdrop-blur-lg border border-gray-800'>
      <div class='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div class='flex gap-5 flex-col sm:flex-row sm:items-center sm:justify-between'>
          <span class='sm:self-center  text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Audory
          </span>
          <ul class='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
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
              <Link
                to='/profile'
                class='hover:underline me-4 md:me-6'>
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <hr class='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span class='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
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

import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div class='flex flex-col justify-center items-center place-content-center w-screen h-screen background-error'>
      <h1 className='absolute text-[150px] sm:text-[200px] md:text-[300px] lg:text-[450px] font-extrabold text-gray-900 z-10'>
        404
      </h1>
      <div className='flex flex-col justify-center items-center font-semibold md:text-2xl lg:text-4xl tracking-wider text-gray-400 z-10 h-screen'>
        <span>Uh-oh!</span>
        <span>We can't find that page.</span>
      </div>

      <Link to="/" className='bottom-40 z-10 relative inline-flex  group '>
        <div className='absolute transition-all duration-1000 opacity-50 -inset-px bg-gradient-to-r from-[#7338c6] via-[#1432b8] to-[#41a2c2] rounded-md blur-lg group-hover:opacity-80 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>
        <span
          
          className='relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-all duration-200 bg-gray-900 rounded-xl'
          role='button'>
          Return to home
        </span>
      </Link>
    </div>
  );
};

export default Error;

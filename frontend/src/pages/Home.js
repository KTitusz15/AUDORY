import { useEffect, useState } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { LikesContextProvider } from '../context/LikesContext';
import { CommentsContextProvider } from '../context/CommentsContext';
import { motion } from 'framer-motion';

// components
import PostDetails from '../components/PostDetails';
import PostForm from '../components/PostForm';
import Filter from '../components/Filter';
import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';
import BubbleNav from '../components/BubbleNav';
import Background from '../components/Background';
import GenreCard from '../components/GenreCard';
import { Link } from 'react-router-dom';


const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    document.title = 'Audory';
  });

  return (
    <div className='home'>
      <div className='background-home'></div>
      <Navbar />
      <BottomNavbar />
      {/* <!-- Hero --> */}
      <div className='max-w-[85rem] pt-24 mx-auto px-4 sm:px-6 lg:px-8'>
        {/* <!-- Grid --> */}
        <div className='grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center'>
          <div className='flex flex-col'>
            <h1 className='block text-3xl font-bold mt-5 md:mt-0  sm:text-4xl lg:text-6xl lg:leading-tight text-white'>
              Start your musical journey with{' '}
              <span className='bg-gradient-to-r from-purple-600 to-cyan-600 text-transparent bg-clip-text'>Audory</span>
            </h1>
            <p className='mt-3 text-lg  text-gray-400'>
              Share your ideas with the community and get feedback on your music
            </p>

            {/* <!-- Buttons --> */}
            <div className='mt-7 self-center md:self-start inline-flex'>
              <Link
                to='/feedback'
                className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg transition-all duration-300 bg-gradient-to-r from-purple-900 to-cyan-800 text-gray-100 hover:translate-x-1 disabled:opacity-50 disabled:pointer-events-none'>
                Get started
                <svg
                  className='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='m9 18 6-6-6-6' />
                </svg>
              </Link>
            </div>
            {/* <!-- End Buttons --> */}
          </div>
          {/*  <!-- End Col --> */}

          <div className='relative ms-4'>
            <img
              className='hidden md:block w-full object-right overflow-hidden rounded-md hue-rotate-[250deg]'
              src='https://images.unsplash.com/photo-1593975403686-c1e1f1151ab6?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Image Description'
            />
            <div className='absolute inset-0 -z-[1] bg-gradient-to-tr from-purple-900/40 via-white/0 to-white/0 size-full rounded-xl mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6'></div>
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Hero --> */}

      {/* <!-- Card Section --> */}
      <div className='max-w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-5 my-5'>
        <p className='text-white text-4xl mt-2 mb-6'>Explore popular Genres</p>
        {/* <!-- Grid --> */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6'>
          {/* <!-- Cards --> */}
          <GenreCard
            genre='Edm/Dance'
            link='https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />

          <GenreCard
            genre='Hip-Hop'
            link='https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />

          <GenreCard
            genre='Rock'
            link='https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />

          <GenreCard
            genre='Classical'
            link='https://images.unsplash.com/photo-1514119412350-e174d90d280e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          />
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Card Section --> */}

      {/* Section */}
      <div className='flex flex-col gap-3 w-100 h-auto bg-gray-900/30 shadow-lg border-b border-t border-gray-800 px-5 sm:p-24 py-10 my-5'>
        <h1 className='text-gray-300 font-semibold text-2xl text-center mb-3'>Connect with the community</h1>
        <span className='text-gray-400 text-lg text-center'>Dive into a variety of fresh tunes crafted by our community members. Feel free to share your personal thoughts and offer constructive feedback to support each other's musical journey.</span>
        <span className='text-gray-400 text-lg text-center'>Join the community by uploading your own tracks and discover what fellow music enthusiasts think about your creations!</span>
      </div>


      


      <Footer />
    </div>
  );
};

export default Home;

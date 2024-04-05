import { useEffect } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components

import PostForm from '../components/PostForm';

import BottomNavbar from '../components/BottomNavbar';

import Navbar from '../components/Navbar';
import BubbleNav from '../components/BubbleNav';
import Background from '../components/Background';
import Footer from '../components/Footer';

const Publish = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    document.title = 'Audory';
  });

  return (
    <div className='publish flex flex-col justify-center items-center h-screen'>
      <div className='background-publish'></div>

      <Navbar />

      <div className='pt-24 mt-24 mb-36 w-11/12 md:w-10/12 lg:w-8/12 xl:6/12'>
      <PostForm />
      </div>
    </div>
  );
};

export default Publish;

import { useEffect } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components

import PostForm from '../components/PostForm';

import BottomNavbar from '../components/BottomNavbar';

import Navbar from '../components/Navbar';
import BubbleNav from '../components/BubbleNav';
import Background from '../components/Background';

const Publish = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    document.title = 'Audory';
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POSTS', payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  return (
    <div className='publish background'>
      
      <Navbar />
      <BottomNavbar />
      <BubbleNav />
      <div className='absolute flex flex-col justify-around w-full h-screen sm:justify-center sm:items-center sm:p-10 top-52 xsm:top-32 xsm1:top-24'>
        <div className='sm:w-2/4'>
          <PostForm />
        </div>
      </div>
    </div>
  );
};

export default Publish;

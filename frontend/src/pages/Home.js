import { useEffect } from 'react';
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

import Navbar from '../components/Navbar';
import BubbleNav from '../components/BubbleNav';
import Background from '../components/Background';


const Home = () => {
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
    <div 
    
    className='home'>
      
      <div className='background'></div>
      <Navbar />
      <BottomNavbar />
      {/* <BubbleNav /> */}
      <div className='flex flex-col sm:p-10'>
        <div className='flex flex-col self-center p-5 mb-24 mt-24 bg-gray-500 shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-700 text-white w-11/12'>
          <div className='mb-5 text-2xl md:text-3xl lg:text-4xl'>Feedback</div>
          <Filter />

          {posts &&
            posts.map((post) => (
              <CommentsContextProvider>
                <LikesContextProvider>
                  <PostDetails
                    key={post._id}
                    post={post}
                  />
                </LikesContextProvider>
              </CommentsContextProvider>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

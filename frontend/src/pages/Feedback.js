import { useState, useEffect } from 'react';
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
import Loading from './Loading';



const Feedback = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  
  

  useEffect(() => {
    document.title = 'Audory';
    const fetchPosts = async () => {
      const response = await fetch('https://audory-api.vercel.app/api/posts', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POSTS', payload: json });
      }
      setLoading(false); // Set loading to false once data is fetched
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  if (loading) {
    // Render a loading indicator while data is being fetched
    return <Loading />;
  }

  return (
    <div className='feedback'>
      <div className='background'></div>
      <Navbar />
      <BottomNavbar />
      <div className='flex flex-col sm:p-10 px-5 pb-24 pt-20 sm:pt-24 sm:pb-5'>
        
        {posts &&
            posts.map((post) => (
              <CommentsContextProvider key={`comments_${post._id}`}>
                <LikesContextProvider key={`likes_${post._id}`}>
                  <PostDetails
                    key={post._id}
                    post={post}
                  />
                </LikesContextProvider>
              </CommentsContextProvider>
            ))}
      </div>
    </div>
  );
};

export default Feedback;

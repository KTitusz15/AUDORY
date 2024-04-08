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

import Navbar from '../components/Navbar';
import BubbleNav from '../components/BubbleNav';
import Background from '../components/Background';
import { useParams } from 'react-router-dom';
import ExpandedPost from '../components/ExpandedPost';
import Loading from './Loading';


const Post = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const { post_id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Audory';
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts/${post_id}`, {
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
    <div 
    
    className='feedback'>
      
      <div className='background'></div>
      <Navbar />
      <BottomNavbar />
      {/* <BubbleNav /> */}
      <div className='flex flex-col sm:p-10'>
        <div className='flex flex-col self-center p-5 mb-24 mt-24 bg-gray-500 shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-700 text-white w-11/12'>
          <div className='mb-5 text-2xl md:text-3xl lg:text-4xl'>Post</div>
          

          {posts &&
            <CommentsContextProvider>
            <LikesContextProvider>
              <ExpandedPost
                key={posts._id}
                post={posts}
              />
            </LikesContextProvider>
          </CommentsContextProvider>
          }
        </div>
      </div>
    </div>
  );
};

export default Post;


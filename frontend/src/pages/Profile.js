import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../assets/logo.png';
import Navbar from '../components/Navbar';
import { formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';

import { LikesContextProvider } from '../context/LikesContext';
import { CommentsContextProvider } from '../context/CommentsContext';
import PostDetails from '../components/PostDetails';

const Profile = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const location = useLocation();
  const isPathPublish = location.pathname === '/publish';
  const isPathFeedback = location.pathname === '/feedback';

  const handleClick = () => {
    logout();
  };

  const { posts, dispatch } = usePostsContext();
  

  useEffect(() => {
    document.title = 'Audory';
    
    

    const fetchPosts = async () => {
      const response = await fetch(`/api/posts/user/${user.name}`, {
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
    <div className='profile'>
      <div className='background-profile'></div>
      <Navbar />
      <div className='flex flex-col sm:p-10'>
        <div className='flex flex-col self-center p-5 mb-24 mt-24 bg-gray-500 shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-700 text-white w-11/12'>
          <div className='mb-5 text-2xl md:text-3xl lg:text-4xl'>Profile</div>
          {user && (
            <div className='flex flex-col px-5'>
              <div className='mb-5 text-3xl md:text-4xl lg:text-6xl font-semibold'>
                {user.name}
              </div>
              <div className='flex flex-row gap-3'>
                <span className='font-semibold'>Email:</span>
                <span>{user.email}</span>
              </div>
            </div>
          )}
          <hr class='my-6 h-0.5 border-t-0 bg-white/10' />
          <div className='my-5 text-2xl md:text-3xl lg:text-4xl'>My posts</div>

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

export default Profile;

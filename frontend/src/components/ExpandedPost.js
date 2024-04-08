import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLikesContext } from '../hooks/useLikesContext';
import { useCommentsContext } from '../hooks/useCommentsContext';
import { motion, AnimatePresence } from 'framer-motion';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useRef, useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { Link } from 'react-router-dom';

const ExpandedPost = ({ post }) => {
  const { dispatch: postDispatch } = usePostsContext();
  const { liked, likes, dispatch: likesDispatch } = useLikesContext();
  const { comments, dispatch: commentDispatch } = useCommentsContext();
  const { user } = useAuthContext();

  const [likeCount, setLikeCount] = useState(0);

  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchPostLikeStatus = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/api/likes/check/${post._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          likesDispatch({ type: 'SET_LIKED', payload: data.liked });
        }
      } catch (error) {
        console.error('Error fetching post like status:', error);
      }
    };
    fetchPostLikeStatus();

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${post._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          commentDispatch({ type: 'SET_COMMENTS', payload: data });
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();

    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`/api/likes/count/${post._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const data = await response.json();
        setLikeCount(data.likeCount);

        if (response.ok) {
          likesDispatch({ type: 'SET_LIKES', payload: data.likeCount });
        }
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };
    fetchLikeCount();
  }, [user, post._id]);

  const handleLike = async () => {
    try {
      let updatedLikes;
      if (!liked) {
        const response = await fetch(`/api/likes/${post._id}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          updatedLikes = likeCount + 1;
          setLikeCount(updatedLikes); // Update like count locally
          likesDispatch({ type: 'CREATE_LIKE', payload: json });
        }
      } else {
        const response = await fetch(`/api/likes/${post._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          updatedLikes = likeCount - 1;
          setLikeCount(updatedLikes); // Update like count locally
          likesDispatch({ type: 'DELETE_LIKE', payload: json });
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/posts/' + post._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      postDispatch({ type: 'DELETE_POST', payload: json });
    }
  };

  

  return (
    <div>
      
      <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col w-full overflow-auto'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className='static flex flex-col justify-center p-5 my-3 bg-black shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 border border-gray-700 text-white w-full self-center'>
                <div className='flex flex-col justify-center'>
                  {/* Close button */}
                  <Link
                    to="/feedback"
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none'>
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </Link>

                  <div className='flex flex-row items-center justify-between'>
                    {/* Details */}
                    <div className='flex flex-col justify-between gap-0.5 sm:gap-1 md:gap-1 lg:gap-2 xl:gap-6 items-start w-full h-full pl-2 pr-10'>
                      <p className='text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl'>
                        {post.title}
                      </p>
                      <p className='text-sm font-light sm:text-sm md:text-lg lg:text-xl xl:text-2xl'>
                        {post.userName}
                      </p>
                      <p className='text-xs font-extralight opacity-70 sm:text-sm md:text-sm lg:text-lg'>
                        {post.genre}
                      </p>
                      <p className='text-xs font-extralight opacity-70 sm:text-sm md:text-sm lg:text-lg'>
                        {post.desc}
                      </p>
                    </div>
                  </div>
                  {/* Interactions */}
                  <div className='absolute right-0 flex flex-col items-center justify-around gap-4 p-5'>
                    {/* Like */}
                    <div className='flex flex-col items-center gap-1.5'>
                      <svg
                        className={
                          liked
                            ? 'fill-white active:scale-75 transition-all duration-100 hover:cursor-pointer hover:scale-110'
                            : 'hover:fill-white active:scale-75 transition-all duration-100 hover:cursor-pointer hover:scale-110'
                        }
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='25'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='#ffffff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        onClick={handleLike}>
                        <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
                      </svg>
                      <p className='text-sm cursor-default'>
                        {/* <LikeCount postId={post._id} /> */}
                        {likes}
                      </p>
                    </div>

                    {/* Delete */}
                    {user.name == post.userName && (
                      <span
                        className='active:scale-75 transition-all duration-100 hover:cursor-pointer hover:scale-110 material-symbols-rounded hover:text-red-500'
                        onClick={handleDelete}>
                        delete
                      </span>
                    )}
                  </div>
                  {/* Button */}
                  <a
                    target='_blank'
                    href={post.link}
                    className='self-center inline-flex items-center justify-center p-0.5 mt-5 mb-2 me-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-transform duration-200 hover:scale-105'>
                    <span className='hidden sm:block text-center relative text-xs sm:text-sm md:text-lg lg:text-xl px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                      Play on SoundCloud
                    </span>
                    <span className='relative px-5 py-2 text-xs text-center transition-all duration-75 ease-in bg-white rounded-md sm:hidden sm:text-sm md:text-lg lg:text-xl dark:bg-gray-900 group-hover:bg-opacity-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='30'
                        height='30'
                        viewBox='0 0 24 24'>
                        <defs>
                          <linearGradient
                            id='gradient'
                            x1='0%'
                            y1='0%'
                            x2='100%'
                            y2='100%'>
                            <stop
                              offset='0%'
                              style={{ stopColor: '#a434eb' }}
                            />
                            <stop
                              offset='100%'
                              style={{ stopColor: '#34b1eb' }}
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d='M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689c.446.143.636.138 1 .138v-5.949'
                          fill='url(#gradient)'
                        />
                      </svg>
                    </span>
                  </a>
                  <p className='text-right text-sm text-gray-400'>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <div className='border-b border-gray-400 my-6'></div>

                <div className=''>
                  <h1 className='text-3xl font-semibold mb-4'>Feedback</h1>
                  {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                      <Comment
                        key={comment._id}
                        comment={comment}
                      />
                    ))
                  ) : (
                    <p>No comments for this post yet</p>
                  )}
                  <CommentForm post_id={post._id} />
                </div>
              </motion.div>
            </motion.div>
    </div>
  );
};

export default ExpandedPost;

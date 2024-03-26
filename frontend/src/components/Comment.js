import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCommentsContext } from '../hooks/useCommentsContext';

const Comment = ({ comment }) => {
  const { user } = useAuthContext();
  const { comments, dispatch: commentDispatch } = useCommentsContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/comments/' + comment._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      commentDispatch({ type: 'DELETE_COMMENT', payload: json });
    }
  };

  return (
    <div className='relative flex flex-col p-4 gap-2 border-gray-600 border md:mx-5 my-5 rounded-xl md:w-3/4 shadow-[0px_0px_10px_0px_#1e1b4b]'>
      <p className=''>{comment.name}</p>
      <p className=''>{comment.text}</p>
      <p className='text-xs text-gray-400 text-right'>
        {formatDistanceToNow(new Date(comment.createdAt), {
          addSuffix: true,
        })}
      </p>
      {/* Delete */}
      <div>
        {user && user.name == comment.name && (
          <div className='absolute top-2 right-2 inline-block text-left dropdown '>
            <button
                      className='self-center relative inline-flex items-center justify-between overflow-hidden '
                      type='button'
                      aria-haspopup='true'
                      aria-expanded='true'
                      aria-controls='headlessui-menu-items-117'>
            <span
              className='active:scale-75 transition-all duration-100 hover:cursor-pointer hover:scale-110 material-symbols-rounded text-gray-300 hover:text-white w-fit  text-lg focus:outline-none'
              >
              more_vert
            </span>
            </button>
            <div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
              <div
                className='absolute right-0 w-24 mt-2 origin-top-right [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#4c00a3_100%)] border border-gray-700 text-white divide-y divide-gray-400/35 rounded-md shadow-2xl outline-none'
                aria-labelledby='headlessui-menu-button-1'
                id='headlessui-menu-items-117'
                role='menu'>
                    <div className=''>
                  <button
                    tabIndex='1'
                    className='text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left transition-colors duration-300 hover:bg-gray-600/30'
                    role='menuitem'>
                    Edit
                  </button>
                </div>
                <div className=''>
                  <button
                    tabIndex='2'
                    onClick={handleDelete}
                    className='text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left transition-colors duration-300 hover:bg-gray-600/30'
                    role='menuitem'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

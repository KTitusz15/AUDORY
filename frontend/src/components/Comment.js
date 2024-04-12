import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCommentsContext } from '../hooks/useCommentsContext';

const Comment = ({ comment }) => {
  const { user, dispatch: authDispatch } = useAuthContext()
  const { comments, dispatch: commentDispatch } = useCommentsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    // Remove 10 credits from the user's account
    try {
      const response = await fetch(`https://audory-api.vercel.app/api/user/${user._id}/subtract-credits`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        
        return;
      }else{
        authDispatch({ type: 'SET_CREDITS', payload: json.user.credits });
        
      }
      
    } catch (error) {
      console.error('Error subtracting credits:', error);
      
      return;
    }

    const response = await fetch('https://audory-api.vercel.app/api/comments/' + comment._id, {
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    // Handle saving the edited comment
    // Send a request to your backend API to update the comment
    try {
      const response = await fetch(`https://audory-api.vercel.app/api/comments/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text: editedText }),
      });
      if (response.ok) {
        const updatedComment = await response.json();
        // Update the comment in the local state
        commentDispatch({ type: 'EDIT_COMMENT', payload: updatedComment });
        setIsEditing(false);
      } else {
        // Handle error
        console.error('Failed to update comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div className='relative flex flex-col p-4 gap-2 border-gray-600 border md:mx-5 my-5 rounded-xl md:w-3/4 shadow-[0px_0px_10px_0px_#1e1b4b]'>
      <p className='font-semibold'>{comment.name}</p>
      {isEditing ? (
        <div className='flex flex-row justify-center items-center gap-3 mb-5'>
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={3}
          columns={150}
          className='resize-y  border  text-sm rounded-lg  block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-indigo-900 focus:border-indigo-900'
        />
        {isEditing && (
        <div className='flex flex-col justify-around pl-3 pr-2'>
          <button onClick={handleSaveEdit} className='text-gray-500 hover:text-gray-700 material-symbols-rounded'>
            done
          </button>
          <button onClick={() => setIsEditing(false)} className='text-gray-500 hover:text-gray-700 material-symbols-rounded'>
            close
          </button>
        </div>
      )}
        </div>
      ) : (
        <p className=''>{comment.text}</p>
      )}
      <p className='text-xs text-gray-400 text-right'>
        {formatDistanceToNow(new Date(comment.createdAt), {
          addSuffix: true,
        })}
      </p>
      
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
                className='absolute right-0 w-24 mt-2 origin-top-right bg-gray-950/50 backdrop-blur-lg border border-gray-700 text-white divide-y divide-gray-400 rounded-md shadow-2xl outline-none'
                aria-labelledby='headlessui-menu-button-1'
                id='headlessui-menu-items-117'
                role='menu'>
                    <div className=''>
                  <button
                    tabIndex='1'
                    onClick={handleEdit}
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

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const LikeCount = ({ postId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`https://audory-api.vercel.app/api/likes/count/${postId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
          });
        
        const data = await response.json();
        setLikeCount(data.likeCount);
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikeCount();
  }, [postId]);

  return (
    <span>{likeCount}</span>
  );
};

export default LikeCount;

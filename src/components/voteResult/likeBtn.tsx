import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface LikeButtonProps {
  liked: boolean;
  toggleLike: () => void;
  likeCount: number;
}

function LikeButton({ liked, toggleLike, likeCount }: LikeButtonProps) {
  return (
    <div className="flex items-center mb-4">
      <button
        className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-400'}`}
        onClick={toggleLike}
      >
        {liked ? (
          <FaHeart size={24} className="mr-2" />
        ) : (
          <FaRegHeart size={24} className="mr-2" />
        )}
        <span>{likeCount}</span>
      </button>
    </div>
  );
}

export default LikeButton;

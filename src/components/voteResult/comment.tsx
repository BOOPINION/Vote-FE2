import React, { FormEvent } from 'react';
import { BsSendFill, BsX } from 'react-icons/bs';

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
}

interface CommentSectionProps {
  comments: Comment[];
  commentInput: string;
  setCommentInput: (input: string) => void;
  handleCommentSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCommentDelete: (id: number) => void; 
}

function CommentSection({ comments, commentInput, setCommentInput, handleCommentSubmit, handleCommentDelete }: CommentSectionProps) {
  return (
    <div className="comment-section">
      <form
        onSubmit={handleCommentSubmit}
        className="bottom-0 items-center max-w-md mx-auto px-4 pt-2 pb-2 bg-white  rounded-lg flex"
      >
        <textarea
          className="w-full p-1 border-b border-b-gray-300  mr-2 h-10"
          placeholder="댓글을 입력하세요..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></textarea>
        <button className="py-2 pl-1 pr-1 rounded-lg" type="submit">
          <BsSendFill />
        </button>
      </form>

      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 pb-1 border-b  flex justify-between items-center">
            <div>
              <p className="text-gray-600">
              {comment.username} - {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })} {new Date(comment.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })}
              </p>
              <p>{comment.content}</p>
            </div>
            <button className="text-black" onClick={() => handleCommentDelete(comment.id)}>
              <BsX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;

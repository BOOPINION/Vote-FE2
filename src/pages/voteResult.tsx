import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import VoteBox from '../components/voteResult/votebox';
import LikeButton from '../components/voteResult/likeBtn';
import CommentSection from '../components/voteResult/comment';

//TODO: 삭제기능 필터링, api호출 
interface VoteOption {
  count: number;
  label: string;
}

interface PollResult {
  date: string;
  details: { [key: string]: VoteOption };
}

interface PollData {
  pollTitle: string;
  pollDescription: string;
  username: string;
  viewCount: number;
  results: PollResult[];
}

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
}

function VoteResult() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [votes, setVotes] = useState<{ [key: string]: VoteOption }>({});
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
  const [pollData, setPollData] = useState<PollData>({
    pollTitle: '',
    pollDescription: '',
    username: '',
    viewCount: 0,
    results: [],
  });

  const [commentInput, setCommentInput] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/mockdata.json');
      const data = await response.json();
      setVotes(data.options);
      setPollData({
        pollTitle: data.pollTitle,
        pollDescription: data.pollDescription,
        username: data.username,
        viewCount: data.viewCount,
        results: data.results,
      });
      setComments(data.comments);

      if (data.likeCount !== undefined) {
        setLikeCount(data.likeCount);
      }
    }

    fetchData();
  }, []);

  const totalVotes: number = Object.values(votes).reduce(
    (acc, option) => acc + option.count,
    0
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(`Voted for: ${selectedOption}`);
    setTimeout(() => {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [selectedOption]: {
          ...prevVotes[selectedOption],
          count: prevVotes[selectedOption].count + 1,
        },
      }));

      setIsLoading(false);
      setVoteSubmitted(true);
    }, 1000);
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment: Comment = {
      id: comments.length + 1,
      username: pollData.username,
      content: commentInput,
      createdAt: new Date(),
    };
    setComments([...comments, newComment]);
    setCommentInput('');
  };

  function toggleLike() {
    if (liked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setLiked((prevLiked) => !prevLiked);
  }

  function handleCommentDelete(id: number): void {
    setComments(comments.filter(comment => comment.id !== id)); 
  }

  return (
    <div className="max-w-md mx-auto p-4 overflow-y-auto h-screen">
      <div className="header pt-4 pb-4">
        <Link to="/voteHome" className="text-black">
          <IoIosArrowBack size="26px" />
        </Link>
      </div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{pollData.username}</p>
          <p className="text-gray-600">{pollData.viewCount}명 조회</p>
        </div>
      </div>
      <div className="voteText text-lg mb-4">{pollData.pollTitle}</div>

      {voteSubmitted ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          {Object.entries(votes).map(([key, { count, label }]) => (
            <div key={key} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-800">{label}</div>
                <div className="text-xs font-semibold text-blue-500">
                  {count}표 / {((count / totalVotes) * 100).toFixed(0)}%
                </div>
              </div>
              <motion.div
                className="w-full bg-blue-500 rounded-full h-6 overflow-hidden my-2"
                initial={{ width: 0 }}
                animate={{ width: `${(count / totalVotes) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ width: `${(count / totalVotes) * 100}%` }}
              />
            </div>
          ))}
          <button
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-full shadow-md hover:bg-gray-300 transition-colors"
            onClick={() => setVoteSubmitted(false)}
          >
            다시 투표하기
          </button>
        </div>
      ) : (
        <VoteBox
          votes={votes}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}

      <LikeButton liked={liked} toggleLike={toggleLike} likeCount={likeCount} />

      <CommentSection
  comments={comments}
  commentInput={commentInput}
  setCommentInput={setCommentInput}
  handleCommentSubmit={handleCommentSubmit}
  handleCommentDelete={handleCommentDelete} // handleCommentDelete 프로퍼티 추가
/>

    </div>
  );
}

export default VoteResult;

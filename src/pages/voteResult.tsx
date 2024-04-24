import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

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
  const [commentUsername, setCommentUsername] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);

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
      setCommentUsername(data.username);
      setComments(data.comments); 
    
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
  
  return (
    <div className="max-w-md mx-auto p-4">
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
                <div className="text-sm font-medium text-gray-800">
                  {label}
                </div>
                <div className="text-xs font-semibold text-pink-500">
                  {count}표 / {((count / totalVotes) * 100).toFixed(0)}%
                </div>
              </div>
              <motion.div
                className="w-full bg-pink-500 rounded-full h-6 overflow-hidden my-2"
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
        <div className="votebox bg-white border border-gray-200 rounded-xl px-8 pt-6 pb-8 mb-4 shadow-sm">
          <div className="votebox_text mb-4 text-xl font-semibold text-gray-800">
            투표
          </div>
          <form onSubmit={handleSubmit}>
            {Object.entries(votes).map(([key, { label }]) => (
              <div
                key={key}
                className={`mb-4 p-2 rounded-full border-2 ${
                  selectedOption === key
                    ? 'bg-pink-100 border-pink-500'
                    : 'border-gray-300'
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-pink-500 h-5 w-5"
                    name="vote"
                    value={key}
                    checked={selectedOption === key}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">{label}</span>
                </label>
              </div>
            ))}
            <button
              className={`w-full py-2 rounded-full font-bold flex justify-center items-center focus:outline-none focus:shadow-outline transition-colors ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed text-gray-700'
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0116 0H4z"
                    ></path>
                  </svg>
                  투표 처리 중
                </>
              ) : (
                '투표하기'
              )}
            </button>
          </form>
        </div>
      )}

<form
        onSubmit={handleCommentSubmit}
        className="bottom-0 items-center max-w-md mx-auto p-4  px-4 pb-4 bg-white border rounded-lg"
      >
        <div className="flex justify-between items-center mb-4 ">
        <input
            type="text"
            className="w-3/4 p-2  border-gray-300 rounded-lg mr-2"
            placeholder="닉네임을 입력하세요"
            value={pollData.username} 
            readOnly
          />
          <button
            className="w-1/4 bg-pink-500 text-white py-2 rounded-full shadow-md hover:bg-pink-600 transition-colors"
            type="submit"
          >
            댓글 제출
          </button>
        </div>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="댓글을 입력하세요..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></textarea>
      </form>

      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-2">
            <p className="text-gray-600 ">
              {comment.username} -{' '}
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoteResult;
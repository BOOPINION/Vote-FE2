import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import LikeButton from '../components/voteResult/likeBtn'; 
import { RiShareForwardLine } from 'react-icons/ri';

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

  // 투표 제출 
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

  // 투표 댓글
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

  // 좋아요
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

      {voteSubmitted ? (
        <div className="bg-white rounded-xl p-6 mb-4">
          <div className="mb-4 mt-8 text-xl font-semibold text-center text-gray-800">
            {pollData.pollTitle}
          </div>
          <div className="mb-16 text-md font-semibold text-center text-gray-800">
            {pollData.pollDescription}
          </div>
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
                transition={{ duration: 0.5, ease: "easeOut" }}
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
        <div className="votebox bg-white rounded-xl px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4 mt-8 text-xl font-semibold text-center text-gray-800">
            {pollData.pollTitle}
          </div>
          <div className="mb-16 text-md font-semibold text-center text-gray-800">
            {pollData.pollDescription}
          </div>

          <form onSubmit={handleSubmit}>
            {Object.entries(votes).map(([key, { label }]) => (
              <div
                key={key}
                className={`mb-8 p-4 rounded-xl border-2 ${
                  selectedOption === key
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio text-blue-500 h-5 w-5"
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
                  ? "bg-gray-300 cursor-not-allowed text-gray-700"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
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
                "투표하기"
              )}
            </button>
          </form>
        </div>
      )}

      <div className="flex justify-center items-center mb-4">
        <div className="flex items-center">
          <LikeButton
            liked={liked}
            toggleLike={toggleLike}
            likeCount={likeCount}
          />
        </div>

        <button
          className="flex items-center mb-4 text-gray-400 py-2 px-3 rounded-full transition-colors"
          onClick={() => {
            // 웹공유 로직 추가 
            console.log("Share web content");
          }}
        >
          <RiShareForwardLine className="w-6 h-6 mr-2" />
        </button>
      </div>

      {/* <CommentSection
        comments={comments}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        handleCommentSubmit={handleCommentSubmit}
        handleCommentDelete={handleCommentDelete} 
      /> */}
    </div>
  );
}

export default VoteResult;

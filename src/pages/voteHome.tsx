import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/home/Header";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FaVoteYea } from 'react-icons/fa';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface VoteItem {
  id: number;
  title: string;
  description: string;
  totalVotes: number;
  options: string[];
  participants: number;
  likes: number;
}

const votes: VoteItem[] = [
  {
    id: 1,
    title: "수명을 선택",
    description: "어느 것이 더 좋습니까?",
    totalVotes: 100,
    options: ["20년 엄청 부자로 살다죽기", "70년 복불복으로 살기"],
    participants: 50,
    likes: 60,
  },
  {
    id: 2,
    title: "어떤 직장이 좋을까",
    description: "~~",
    totalVotes: 100,
    options: ["좋아하는 일 하는데 끔찍한 상사", "일은 싫은데 좋은 상사"],
    participants: 34,
    likes: 60,
  },
  {
    id: 3,
    title: "더 화나는 일은???",
    description: ".",
    totalVotes: 100,
    options: ["에어팟 한쪽만 잃어버림", "휴대폰 액정 파손"],
    participants: 34,
    likes: 75,
  },
  {
    id: 4,
    title: "민초반민초 ",
    description: ".",
    totalVotes: 100,
    options: ["민초", "반민초", "둘다 ㄴ"],
    participants: 34,
    likes: 60,
  },
  {
    id: 5,
    title: "당신의 선택은?",
    description: ".",
    totalVotes: 100,
    options: ["연인과의 100일 기념일", "오랜친구의 생일"],
    participants: 34,
    likes: 65,
  },
  // 추가적인 투표 아이템들...
];

// // 투표를 좋아요 수에 따라 내림차순으로 정렬하는 함수
// const sortByLikesDescending = (a: VoteItem, b: VoteItem) => {
//   return b.likes - a.likes;
// };

const App = () => {
  const [randomVotes, setRandomVotes] = useState([...votes]);

  return (
    <div className="p-4">
       <Header />
    <div className="mt-8 flex justify-between items-center pl-2 pr-2">
      <Autocomplete
        multiple
        id="multiple-limit-tags"
        options={["연애", "일상", "취미", "학업", "취업"]}
        renderInput={(params) => (
          <TextField {...params} label="무엇이 고민인가요?" placeholder="해시태그 작성" />
        )}
        sx={{ width: '500px' }}
      />
      <div className="flex space-x-2 pl-2">
        <Link to="/vote-maker">
          <button className="createVote bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            <FaVoteYea />
          </button>
        </Link>
      </div>
      </div>
      <div className="overflow-auto max-h-[calc(100vh-160px)]">
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-4"
        >
          {randomVotes
            // .sort(sortByLikesDescending)
            .map(({ id, title, options, participants, likes }, index) => (
              <Link to={`/vote-result`} key={id}>
                <motion.li
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-4 m-2 shadow rounded-lg mb-4`}
                >
                  <h3 className="text-lg font-bold">{title}</h3>
                  <div className="mt-2">
                    {options.map((option, optionIndex) => (
                      <motion.div
                        key={optionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * optionIndex }}
                        className="flex items-center justify-between p-2 bg-gray-100 rounded-lg my-1"
                      >
                        <span>{option}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    {/* <div className="text-sm text-gray-600 flex items-center">
                      <AiOutlineHeart className="mr-1" /> {likes}
                    </div> */}
                    <button className="text-sm bg-gray-800 text-white border px-16 py-2 rounded-xl">
                      투표 참여하기
                    </button>
                    {/* <div className="text-sm text-gray-600 flex items-center">
                      <AiOutlineUser className="mr-1" /> {participants}
                    </div> */}
                  </div>
                </motion.li>
              </Link>
            ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default App;

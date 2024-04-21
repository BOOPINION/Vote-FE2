import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/home/Header";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";

//TODO: motion 추가,인기투표,  api준비 코드로 바꾸기 , api명세서

interface VoteItem {
  id: number;
  title: string;
  description: string;
  totalVotes: number;
  userParticipated: boolean; // 사용자가 투표에 참여했는지 여부
  options: string[]; // 투표 선택지
  participants: number; // 투표에 참여한 인원 수
  likes: number; // 좋아요 수
}

const votes: VoteItem[] = [
  {
    id: 1,
    title: "수명을 선택",
    description: "어느 것이 더 좋습니까?",
    totalVotes: 100,
    userParticipated: true,
    options: ["20년 엄청 부자로 살다죽기", "70년 복불복으로 살기"],
    participants: 50,
    likes: 60,
  },
  {
    id: 2,
    title: "어떤 직장이 좋을까",
    description: "~~",
    totalVotes: 100,
    userParticipated: false,
    options: ["좋아하는 일 하는데 끔찍한 상사", "일은 싫은데 좋은 상사"],
    participants: 34,
    likes: 60,
  },
  {
    id: 3,
    title: "더 화나는 일은???",
    description: ".",
    totalVotes: 100,
    userParticipated: false,
    options: ["에어팟 한쪽만 잃어버림", "휴대폰 액정 파손"],
    participants: 34,
    likes: 75,
  },
  {
    id: 4,
    title: "민초반민초 ",
    description: ".",
    totalVotes: 100,
    userParticipated: false,
    options: ["민초", "반민초", "둘다 ㄴ"],
    participants: 34,
    likes: 60,
  },
  {
    id: 5,
    title: "당신의 선택은?",
    description: ".",
    totalVotes: 100,
    userParticipated: false,
    options: ["연인과의 100일 기념일", "오랜친구의 생일"],
    participants: 34,
    likes: 65,
  },
  // 추가적인 투표 아이템들...
];

// 투표를 좋아요 수에 따라 내림차순으로 정렬하는 함수
const sortByLikesDescending = (a: VoteItem, b: VoteItem) => {
  return b.likes - a.likes;
};

const App = () => {
  const [randomVotes, setRandomVotes] = useState([...votes]);

  // 좋아요 수에 따라 투표 정렬
  const sortedVotes = randomVotes.sort(sortByLikesDescending);

  // 투표 항목을 랜덤하게 재정렬하는 함수// 셔플 버튼
  const shuffleVotes = () => {
    const shuffled = [...votes].sort(() => Math.random() - 0.5);
    setRandomVotes(shuffled);
  };

  return (
    <div className="p-4">
      <Header />
      <div className="mt-4 mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="무엇이 고민인가요?"
          className="border border-gray-300 px-4 py-2 rounded-md mr-4"
        />
        <button
          onClick={shuffleVotes}
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          <FaRandom />
        </button>
      </div>
      <div className="overflow-auto max-h-[calc(100vh-160px)]">
        <motion.ul
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-4"
        >
          {sortedVotes.map(
            (
              { id, title, userParticipated, options, participants, likes },
              index
            ) => (
              <Link to={`/vote-result`} key={id}>
                <motion.li
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-4 m-2 shadow rounded-lg mb-4 ${
                    userParticipated ? "bg-green-100" : "bg-white"
                  } ${index === 0 ? "border-2 border-pink-500" : ""}`}
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
                  <div className="flex justify-between mt-4">
                    <div className="text-sm text-gray-600 flex items-center">
                      <AiOutlineHeart className="mr-1" /> {likes}
                    </div>
                    <button className="text-sm bg-black text-white border px-16 py-2 rounded-xl">
                      투표 참여하기
                    </button>
                    <div className="text-sm text-gray-600 flex items-center">
                      <AiOutlineUser className="mr-1" /> {participants}
                    </div>
                  </div>
                </motion.li>
              </Link>
            )
          )}
        </motion.ul>
      </div>
    </div>
  );
};

export default App;

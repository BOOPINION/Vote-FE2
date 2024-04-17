import React from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";

interface VoteItem {
    id: number;
    title: string;
    description: string;
    voteCount: number;
    totalVotes: number;
    userParticipated: boolean; // 사용자가 투표에 참여했는지 여부
    options: string[]; // 투표 선택지
    participants: number; // 투표에 참여한 인원 수
  }
  
  // 가상의 투표 데이터
  const votes: VoteItem[] = [
    { id: 1, title: "투표 1", description: "어느 것이 더 좋습니까?", voteCount: 30, totalVotes: 100, userParticipated: true, options: ["반민초", "민초"] ,participants: 50},
    { id: 2, title: "투표 2", description: "최고의 계절은?", voteCount: 70, totalVotes: 100, userParticipated: false, options: ["봄", "여름", "가을", "겨울"] ,participants: 34},
    { id: 2, title: "투표 3", description: "당신의 나이는 ?", voteCount: 70, totalVotes: 100, userParticipated: false, options: ["20대", "30대", "40대"] ,participants: 7},
    // 추가적인 투표 아이템들...
  ];
  
const calculatePercentage = (voteCount: number, totalVotes: number) => {
    return totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
};

const App = () => {
    return (
      <div className="p-4">
        <Header />
        <div className="overflow-auto h-full">
          <ul>
            {votes.map(({ id, title, description, voteCount, totalVotes, userParticipated, options, participants }) => {
              const percentage = calculatePercentage(voteCount, totalVotes); // 투표 결과 계산
              return (
                <li key={id} className={`p-4 shadow rounded-lg mb-4 ${userParticipated ? 'bg-green-100' : 'bg-white'}`}>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p>{description}</p>
                  <div className="flex space-x-2 mt-2">
                    {options.map((option, index) => (
                      <div key={index} className="px-4 py-2 bg-pink-100 rounded-full text-center">
                        {option}
                      </div>
                    ))}
                  </div>
                  <motion.div
                    className="bg-pink-500 h-4 rounded-full my-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <p>{`${voteCount} 표 (${percentage.toFixed(0)}%)`}</p>
                  <p className="text-sm text-gray-600 ">참여 인원: {participants}명</p>
                  {userParticipated && <p className="text-sm text-green-700 ">투표에 참여함</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
  
  export default App;
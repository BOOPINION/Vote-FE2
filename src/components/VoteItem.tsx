// src/components/VoteItem.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface VoteItemProps {
  id: number;
  title: string;
  description: string;
  // 가상의 투표 수치를 추가합니다. 실제 애플리케이션에서는 서버로부터 받은 데이터를 사용하게 됩니다.
  voteCount: number; 
  totalVotes: number; // 전체 투표 수
}

const VoteItem: React.FC<VoteItemProps> = ({ title, description, voteCount, totalVotes }) => {
  const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

  return (
    <li className="p-4 shadow rounded-lg mb-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
      <motion.div
        className="bg-blue-500 h-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
      <p>{`${voteCount} 표 (${percentage.toFixed(0)}%)`}</p>
    </li>
  );
};

export default VoteItem;

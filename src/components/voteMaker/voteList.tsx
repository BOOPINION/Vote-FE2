import React from 'react';
import VoteInput from '../voteMaker/voteInput';

interface VoteItem {
  id: number;
  text: string;
}

interface VoteListProps {
  voteItems: VoteItem[];
  onVoteChange: (id: number, text: string) => void;
  onRemoveVote: (id: number) => void;
  onAddVote: () => void;
}

const VoteList: React.FC<VoteListProps> = ({ voteItems, onVoteChange, onRemoveVote, onAddVote }) => (
  <div className="w-full bg-white shadow-md">
    <div className="votebox p-4">
      <h2 className="text-lg font-semibold text-center">투표</h2>
      <h4 className="text-sm font-thin text-gray-500 text-center">
        항목은 2개 이상 5개 이하로만 가능합니다
      </h4>
      {voteItems.map((item, index) => (
        <VoteInput
          key={item.id}
          value={item.text}
          onChange={e => onVoteChange(item.id, e.target.value)}
          onRemove={() => onRemoveVote(item.id)}
          placeholder={`투표 항목 #${index + 1}`}
        />
      ))}
      <button
        onClick={onAddVote}
        className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 mt-2"
        disabled={voteItems.length >= 5}
      >
        + 항목 추가
      </button>
    </div>
  </div>
);

export default VoteList;

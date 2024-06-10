import React, { useState } from 'react';
import Header from '../components/backHeader';
import TopicSelector from '../components/voteMaker/topicSelector';
import VoteList from '../components/voteMaker/voteList';
import MainForm from '../components/voteMaker/mainForm';
import axios from 'axios';

type VoteItem = {
  id: number;
  text: string;
};

const App: React.FC = () => {
  const [voteItems, setVoteItems] = useState<VoteItem[]>([
    { id: Date.now(), text: '' },
    { id: Date.now() + 1, text: '' },
  ]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const topics = ['일상', '연애', '취미', '학업', '취업'];

  const handleAddVote = () => {
    if (voteItems.length < 5) {
      const newItem: VoteItem = {
        id: Date.now(),
        text: '',
      };
      setVoteItems([...voteItems, newItem]);
    }
  };

  const handleVoteChange = (id: number, text: string) => {
    setVoteItems(voteItems.map(item => (item.id === id ? { ...item, text } : item)));
  };

  const handleRemoveVote = (id: number) => {
    if (voteItems.length > 2) {
      setVoteItems(voteItems.filter(item => item.id !== id));
    }
  };

  //제출시 
  const handleSubmit = async () => {
    const loginToken = localStorage.getItem('loginToken');
    const username = localStorage.getItem('username');
    if (!loginToken || !username) {
      console.error('인증 정보가 없습니다.');
      return;
    }
    const voteData = {
      title,
      authorId: username,
      content,
      options: voteItems.map(item => item.text),
      hashtags: selectedTopics
    };

    try {
      const response = await axios.post('votes/create', voteData, {
        headers: {
          Authorization: 'Bearer ${loginToken}' 
        }
      });
      console.log('투표가 성공적으로 생성되었습니다:', response.data);
    } catch (error) {
      console.error('투표 생성 중 오류가 발생했습니다:', error);
      // 오류 처리 
    }
  };

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  const formattedEndDate = endDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="flex flex-col items-center justify-center p-4 pl-8 pr-8 bg-white rounded-lg h-screen">
      <Header />
      <TopicSelector topics={topics} selectedTopics={selectedTopics} onChange={(event, newValue) => setSelectedTopics(newValue)} />
      <div className="flex flex-col w-full">
        <MainForm/>
      </div>
      <VoteList voteItems={voteItems} onVoteChange={handleVoteChange} onRemoveVote={handleRemoveVote} onAddVote={handleAddVote} />
      <div className="text-gray-500 pt-4 text-center">
        자동 종료일 : {formattedEndDate}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-auto mb-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-400"
      >
        투표 만들기
      </button>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

//TODO: 입력필드 위로 늘어나게 css수정 

type voteItem = {
  id: number;
  text: string;
};

const App: React.FC = () => {
  const [voteItems, setvoteItems] = useState<voteItem[]>([
    { id: Date.now(), text: '' },
    { id: Date.now() + 1, text: '' },
  ]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const topics = ['20대', '30대', '연애', 'MBTI'];

 //⚡투표항목 추가 함수
  const handleAddvote = () => {
    if (voteItems.length < 5) {
      const newItem: voteItem = {
        id: Date.now(),
        text: '',
      };
      setvoteItems([...voteItems, newItem]);
    }
  };

  //⚡투표 텍스트 변경 함수
  const handlevoteChange = (id: number, text: string) => {
    setvoteItems(
      voteItems.map(item => (item.id === id ? { ...item, text } : item))
    );
  };

  //⚡투표 항목 제거 함수
  const handleRemovevote = (id: number) => {
    if (voteItems.length > 2) {
      setvoteItems(voteItems.filter(item => item.id !== id));
    }
  };
  
  //⚡ 주제 선택할때 
  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  //⚡종료예정일 계산 = 현재날짜 + 3
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
      <div className="p-2 mb-4 flex justify-between items-center w-full">
      <Link to="/voteHome" className="text-black">
          <IoIosArrowBack size="26px" />
        </Link>
      </div>
      <div className="mt-4 w-full">
        <select
          value={selectedTopic}
          onChange={handleTopicChange}
          className="w-full  border-b-2 p-2 mb-4"
        >
          <option value="">주제를 선택해주세요</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="제목 내용을 입력해 주세요"
        className="mt-2 w-full rounded-lg text-lg  p-2 mb-2"
      />
      <textarea
        placeholder="투표 내용을 입력해 주세요"
        className=" w-full rounded-lg  p-2 mb-4 h-44 resize-y"
      />
  
      <div className="flex  w-full overflow-y-hidden">
        <div className="w-full max-w-md bg-white shadow-md">
          <div className="votebox p-4 mt-4 ">
            <h2 className="text-lg font-semibold text-center">투표</h2>
            <h4 className='text-sm font-thin text-gray-500 text-center'>항목은 2개이상 5이하로만 가능합니다</h4>
            {voteItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center border border-gray-300 rounded-lg p-1 my-2"
              >
                <input
                  type="text"
                  value={item.text}
                  onChange={e => handlevoteChange(item.id, e.target.value)}
                  className="flex-grow p-2 rounded-l-lg border-0 focus:outline-none"
                  placeholder={`투표 항목 #${index + 1}`}
                />
                <button
                  onClick={() => handleRemovevote(item.id)}
                  className="text-red-500 bg-transparent hover:bg-red-100 p-2 rounded-full"
                  aria-label="Remove item"
                >
                  &ndash;
                </button>
              </div>
            ))}
            <button
              onClick={handleAddvote}
              className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 mt-2"
              disabled={voteItems.length >= 5}
            >
              + 항목 추가
            </button>
            <div className="text-gray-500 pt-4 text-center">
              자동 종료일 : {formattedEndDate}
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mt-auto mb-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-400">
        투표 만들기
      </button>
    </div>
  );
  
};

export default App;

import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type voteItem = {
  id: number;
  text: string;
};

const App: React.FC = () => {
  const [voteItems, setvoteItems] = useState<voteItem[]>([
    { id: Date.now(), text: '' },
    { id: Date.now() + 1, text: '' },
  ]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const topics = ['일상', '연애', '취미', '학업', '취업'];

  const handleAddvote = () => {
    if (voteItems.length < 5) {
      const newItem: voteItem = {
        id: Date.now(),
        text: '',
      };
      setvoteItems([...voteItems, newItem]);
    }
  };

  const handlevoteChange = (id: number, text: string) => {
    setvoteItems(
      voteItems.map(item => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleRemovevote = (id: number) => {
    if (voteItems.length > 2) {
      setvoteItems(voteItems.filter(item => item.id !== id));
    }
  };

  const handleToggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
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
      <div className="p-2 mb-4 flex justify-between items-center w-full">
        <Link to="/voteHome" className="text-black">
          <IoIosArrowBack size="26px" />
        </Link>
      </div>
      <Autocomplete
        multiple
        id="multiple-limit-tags"
        options={topics}
        value={selectedTopics}
        onChange={(event, newValue) => {
          setSelectedTopics(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="무엇이 고민인가요?"
            placeholder=""
          />
        )}
        sx={{ width: '100%', mb: 2, mt: 2 }}
      />

      <input
        type="text"
        placeholder="제목 내용을 입력해 주세요"
        className="w-full text-lg p-2 mb-2 border-b"
      />
      <textarea
        placeholder="투표 내용을 입력해 주세요"
        className="w-full rounded-lg p-2 mb-4 h-44 resize-y"
      />

      <div className="flex w-full">
        <div className="w-full bg-white shadow-md">
          <div className="votebox p-4">
            <h2 className="text-lg font-semibold text-center">투표</h2>
            <h4 className="text-sm font-thin text-gray-500 text-center">
              항목은 2개 이상 5개 이하로만 가능합니다
            </h4>
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

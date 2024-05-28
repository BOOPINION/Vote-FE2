import React from 'react';

const MainForm: React.FC = () => (
  <div className="flex flex-col w-full">
    <input
      type="text"
      placeholder="제목 내용을 입력해 주세요"
      className="w-full text-lg p-2 mb-2 border-b"
    />
    <textarea
      placeholder="투표 내용을 입력해 주세요"
      className="w-full rounded-lg p-2 mb-4 h-44 resize-y"
    />
  </div>
);

export default MainForm;

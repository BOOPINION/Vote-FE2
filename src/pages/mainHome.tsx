import React from 'react';
import { Link } from 'react-router-dom';

const MainHome: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">메인 화면</h1>
      <p className="mb-4">메인 화면 컴포넌트 내용</p>
      <Link to="/vote-result" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        투표하기
      </Link>
    </div>
  );
}

export default MainHome;

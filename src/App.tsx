import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routes import 추가
import MainHome from './pages/mainHome'; // 메인 화면 컴포넌트 import
import VoteResult from './pages/voteResult'; // 투표 결과 컴포넌트 import

function App() {
  return (
    <Router>
      <Routes> {/* Routes로 감싸주기 */}
        <Route path="/" element={<MainHome />} />
        <Route path="/vote-result" element={<VoteResult />} />
      </Routes>
    </Router>
  );
}

export default App;

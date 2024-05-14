import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Routes import 추가
import MainHome from "./pages/mainHome";
import VoteResult from "./pages/voteResult";
import SignUp from "./pages/SignUp";
import VoteMaker from "./pages/voteMaker";
import VoteHome from "./pages/voteHome";
import Login from "./pages/Login";
import Setting from "./pages/setting";
import Mypage from "./pages/myPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/vote-result" element={<VoteResult />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vote-maker" element={<VoteMaker />} />
        <Route path="/voteHome" element={<VoteHome />} />
        <Route path="login" element={<Login />} />
        <Route path="/mypage" element={<Mypage/>} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Routes import 추가
import MainHome from "./pages/mainHome";
import VoteResult from "./pages/voteResult";
import SignUp from "./pages/SignUp";
import VoteMaker from "./pages/voteMaker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/vote-result" element={<VoteResult />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vote-maker" element={<VoteMaker />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Routes import 추가
import MainHome from "./pages/mainHome";
import VoteResult from "./pages/voteResult";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/vote-result" element={<VoteResult />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

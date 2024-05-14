import React from "react";
import MypageHeader from "../components/Mypage/MypageHeader";
import UserProfile from "../components/Mypage/UserProfile";
import VoteHistory from "../components/Mypage/VoteHistory";

const Mypage: React.FC = () => {

  return (
    <>
        <MypageHeader />
        <UserProfile />
        <VoteHistory />
    </>    
  );
};

export default Mypage;

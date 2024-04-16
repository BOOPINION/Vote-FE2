import React from "react";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <div className="flex w-auto justify-between items-center m-4">
      <div className="text-xl font-bold">Vote</div>
      <div className="flex justify-between items-center">
        <Link to="/" className="bg-gray-500 rounded-full px-2 py-1">
          <div className="text-white">홈</div>
        </Link>
        <Link to="/vote-result" className="bg-gray-500 rounded-full px-2 py-1">
          <div className="text-white">투표</div>
        </Link>
      </div>
      <button>Profile</button>
    </div>
  );
};
export default Header;

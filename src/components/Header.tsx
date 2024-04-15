import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex w-auto justify-between items-center m-4">
      <div className="text-xl font-bold">Vote</div>
      <button className="w-1/4 bg-gray-500 rounded-full">
        <div className="flex justify-center items-center h-auto flex rounded-full text-lg">
          <div className="m-2 text-white">홈</div>
          <div className="m-2 text-white text-lg">투표</div>
        </div>
      </button>
      <button>Profile</button>
    </div>
  );
};
export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header: React.FC = () => {
  return (
    <div className="flex mx-2 items-center m-4">
      <div className="flex flex-1 flex-grow justify-start text-2xl font-semibold">
        Boopinion
      </div>
      <div className="flex flex-1 items-center justify-center flex-grow">
        <Link to="/" className="bg-gray-500 rounded-full px-2 py-1">
          <div className="text-white">홈</div>
        </Link>
        <Link to="/voteHome" className="bg-gray-500 rounded-full px-2 py-1">
          <div className="text-white">투표</div>
        </Link>
      </div>
      <div className="flex flex-1 flex-grow justify-end">
        <button>
          <CgProfile className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Header;

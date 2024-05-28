import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <div className="p-2 mb-4 flex justify-between items-center w-full">
    <Link to="/voteHome" className="text-black">
      <IoIosArrowBack size="26px" />
    </Link>
  </div>
);

export default Header;

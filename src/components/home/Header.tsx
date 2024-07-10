import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (path: string) => {
    switch (path) {
      case "/":
        return "home";
      case "/voteHome":
        return "vote";
      default:
        return "home";
    }
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case "home":
        navigate("/");
        break;
      case "vote":
        navigate("/voteHome");
        break;
      default:
        navigate("/");
        break;
    }
  };
  return (
    <div className="flex mx-2 items-center m-4">
      <div className="flex flex-1 flex-grow justify-start text-2xl font-semibold">
        Boopinion
      </div>
      <div className="flex flex-1 items-center justify-center flex-grow transition-all">
        <Tabs
          defaultValue={getValueFromPath(location.pathname)}
          onValueChange={handleTabChange}
          className="w-32 transition-all"
        >
          <TabsList className="w-full h-12 bg-gray-300 transition-all">
            <TabsTrigger
              className="w-full font-semibold text-md text-black"
              value="home"
            >
              홈
            </TabsTrigger>
            <TabsTrigger
              className="w-full font-semibold text-md text-black"
              value="vote"
            >
              투표
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-1 flex-grow justify-end">
        <Link to="login">
          <CgProfile className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
};

export default Header;

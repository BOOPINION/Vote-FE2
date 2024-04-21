import React from "react";
import Header from "../components/home/Header";
import Main from "../components/home/Main";

const MainHome: React.FC = () => {
  return (
    <div className="p-4">
      <Header />
      <Main />
    </div>
  );
};

export default MainHome;

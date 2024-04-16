import React from "react";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="flex flex-col mt-20 mx-12 items-center">
        <div className="text-4xl font-bold mb-4">당신의 선택은?</div>
        <div className="w-auto border border-4 border-pink-400 p-2 rounded-lg text-2xl font-bold mb-2">
          매일 고구마 먹기 vs. 매일 감자 먹기
        </div>
        <div className="text-md text-gray-500 font-semibold">
          로그인하고 더 많은 설문을 선택하세요
        </div>
      </div>
      <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-black mb-24">
        로그인하고 설문 작성하러 가기
      </button>
    </div>
  );
};

export default Main;

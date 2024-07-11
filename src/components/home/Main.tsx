// Main.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Main: React.FC = () => {
  const [showImage, setShowImage] = useState(true);
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartFadeOut(true);
    }, 500); // 1초 후에 fade out 시작

    const hideTimer = setTimeout(() => {
      setShowImage(false);
    }, 1500); // 2초 후에 이미지 숨기기 (fade out 효과가 완료된 후)

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="flex flex-col mt-20 mx-12 items-center">
        <div className="text-4xl font-bold mb-4">너는 뭐가 좋아?</div>
        <div className="text-md text-gray-500 font-semibold">
          로그인하고 더 많은 설문을 선택하세요
        </div>
        <div className="w-[500px] overflow-y-scroll max-h-[500px] mt-8">
          {showImage ? (
            <img
              src="/Boo.jpeg"
              className={`${startFadeOut ? "animate-fade-out" : "opacity-100"}`}
            />
          ) : (
            <div className="flex flex-col">
              <Card text="발표빼고 다하기 vs. 발표하기" hueA={340} hueB={10} />
              <Card text="녹차 vs. 민트초코" hueA={20} hueB={40} />
              <Card text="사막 히터 vs. 남극 에어컨" hueA={60} hueB={90} />
              <Card text="사막 히터 vs. 남극 에어컨" hueA={80} hueB={120} />
              <Card text="사막 히터 vs. 남극 에어컨" hueA={205} hueB={245} />
              <Card text="사막 히터 vs. 남극 에어컨" hueA={280} hueB={300} />
            </div>
          )}
        </div>
      </div>
      <Link to="/signup">
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-black mb-32">
          회원가입하고 설문 작성하러 가기
        </button>
      </Link>
    </div>
  );
};

export default Main;

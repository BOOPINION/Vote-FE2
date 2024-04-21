import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const Question: React.FC<{
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}> = ({ questionNumber, setQuestionNumber }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const questions = [
    {
      question: "당신의 성별이 궁금해요",
      options: ["남성", "여성", "기타"],
    },
    {
      question: "당신의 나이대는 어떻게 되세요?",
      options: ["10대", "20대", "30대", "40대", "50대 이상"],
    },
    {
      question: "당신의 관심 분야는 무엇인가요?",
      options: ["음악", "영화", "요리", "운동", "여행"],
    },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // 현재 질문 번호가 마지막 질문이 아닐 경우에만 다음 질문으로 이동
    if (questionNumber < questions.length) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
  };

  return (
    <div className="flex flex-col items-start w-auto mx-auto my-8 p-8">
      {/* 진행률 표시 */}
      <ProgressBar current={questionNumber} total={questions.length} />
      <span className="mt-8 text-lg text-blue-500 font-semibold">
        질문 {questionNumber}
      </span>
      <h2 className="text-2xl font-bold mt-2 mb-96">
        {questions[questionNumber - 1].question}
      </h2>
      {/* 각 질문에 대한 보기를 보여주는 버튼을 생성 */}
      {questions[questionNumber - 1].options.map((option, index) => (
        <button
          key={index}
          className="mt-8 w-full items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-4"
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;

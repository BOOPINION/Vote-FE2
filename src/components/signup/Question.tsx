import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
const Question: React.FC<{
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}> = ({ questionNumber, setQuestionNumber }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [email, setEmail] = useState<string>(""); // 추가: 이메일 입력 상태
  const [password, setPassword] = useState<string>(""); // 추가: 비밀번호 입력 상태
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // 추가: 확인용 비밀번호 입력 상태

  const questions = [
    {
      question: "이메일을 알려주세요",
      options: ["다음"],
    },
    {
      question: "비밀번호를 설정해주세요",
      options: ["입력"],
    },
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
    if (questionNumber < questions.length) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
  };

  const handleNextButtonClick = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (questionNumber === 1 && !emailPattern.test(email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }

    if (questionNumber === 2 && password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    if (questionNumber < questions.length) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      {questionNumber === 1 ? (
        <Link to="/">
          <IoIosArrowBack size="26px" className="mt-8 mb-0 mx-4" />
        </Link>
      ) : (
        <IoIosArrowBack
          size="26px"
          className="mt-8 mb-0 mx-4"
          onClick={() => setQuestionNumber(questionNumber - 1)}
        />
      )}
      <div className="flex flex-col items-start w-auto mx-auto my-8 p-8">
        <ProgressBar current={questionNumber} total={questions.length} />
        <span className="mt-8 text-lg text-blue-500 font-semibold">
          질문 {questionNumber}
        </span>
        <h2 className="text-2xl font-bold mt-2 mb-80">
          {questions[questionNumber - 1].question}
        </h2>
        {questionNumber === 1 ? (
          <>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="example@example.com"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextButtonClick}
            >
              다음
            </button>
          </>
        ) : questionNumber === 2 ? (
          <>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md mb-4"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md mb-4"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextButtonClick}
            >
              다음
            </button>
          </>
        ) : (
          questions[questionNumber - 1].options.map((option, index) => (
            <button
              key={index}
              className="mt-8 w-full items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-4"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default Question;

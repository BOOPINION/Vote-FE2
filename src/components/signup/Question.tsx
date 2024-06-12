import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Question: React.FC<{
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}> = ({ questionNumber, setQuestionNumber }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number | null>(10);
  const [signUpCompleted, setSignUpCompleted] = useState<boolean>(false);

  const questions = [
    {
      question: "이메일을 알려주세요",
      options: ["다음"],
    },
    {
      question: "이름을 알려주세요",
      options: ["입력"],
    },
    {
      question: "비밀번호를 설정해주세요",
      options: ["입력"],
    },
    {
      question: "당신의 성별이 궁금해요",
      options: ["남성", "여성"],
    },
    {
      question: "당신의 나이대는 어떻게 되세요?",
      options: ["10대", "20대", "30대", "40대", "50대 이상"],
    },
  ];

  const handleGenderSelect = (option: string) => {
    const genderMapping: { [key: string]: string } = {
      남성: "MALE",
      여성: "FEMALE",
    };
    const selectedGender = genderMapping[option];
    setGender(selectedGender);
    console.log(`Set gender to: ${selectedGender}`);
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
  };

  const handleAgeSelect = (option: string) => {
    const ageMapping: { [key: string]: number } = {
      "10대": 10,
      "20대": 20,
      "30대": 30,
      "40대": 40,
      "50대 이상": 50,
    };
    const selectedAge = ageMapping[option];
    setAge(selectedAge);
    console.log(`Set age to: ${selectedAge}`);
    handleSignUp();
  };

  const handleNextButtonClick = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (questionNumber === 1 && !emailPattern.test(email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }
    if (questionNumber === 2 && name === "") {
      alert("이름을 입력해주세요!");
      return;
    }
    if (questionNumber === 3 && password === "") {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    if (questionNumber === 3 && password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    if (questionNumber < questions.length) {
      setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    }
  };

  const handleSendVerificationCode = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }
    try {
      await axios.post("auth/signup/email/code", { email });
      setIsVerificationSent(true);
      alert("인증 번호가 전송되었습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          `인증 번호 전송 실패: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        alert(`인증 번호 전송 실패: ${error}`);
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("auth/signup/email/verify", {
        email,
        state: {
          code: verificationCode,
          verified: false,
        },
        verifyCode: verificationCode,
      });
      console.log(response);
      const verified = response.data;
      if (verified) {
        setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
      } else {
        alert("인증 번호가 일치하지 않습니다. 다시 입력해주세요.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          `인증 번호 확인 실패: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        alert(`인증 번호 확인 실패: ${error}`);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      await axios.post("auth/signup", {
        email,
        name,
        password,
        gender,
        age,
      });
      setSignUpCompleted(true);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          `회원가입 실패: ${error.response?.data?.message || error.message}`
        );
      } else {
        alert(`회원가입 실패: ${error}`);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
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
            {isVerificationSent && (
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md mt-4"
                placeholder="인증 번호 입력"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            )}
            <button
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={
                isVerificationSent
                  ? handleVerifyCode
                  : handleSendVerificationCode
              }
            >
              {isVerificationSent ? "다음" : "인증 번호 전송"}
            </button>
          </>
        ) : questionNumber === 2 ? (
          <>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="이름"
              value={name}
              onChange={handleNameChange}
            />
            <button
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextButtonClick}
            >
              다음
            </button>
          </>
        ) : questionNumber === 3 ? (
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
        ) : questionNumber === 4 ? (
          questions[questionNumber - 1].options.map((option, index) => (
            <button
              key={index}
              className="mt-8 w-full items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-4"
              onClick={() => handleGenderSelect(option)}
            >
              {option}
            </button>
          ))
        ) : questionNumber === 5 ? (
          questions[questionNumber - 1].options.map((option, index) => (
            <button
              key={index}
              className="mt-8 w-full items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-4"
              onClick={() => handleAgeSelect(option)}
            >
              {option}
            </button>
          ))
        ) : signUpCompleted ? (
          <button
            className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => alert("회원가입이 이미 완료되었습니다.")}
          >
            회원가입 완료
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Question;

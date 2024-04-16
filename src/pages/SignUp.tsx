import React, { useState } from "react";
import Question from "../components/signup/Question";

const SignUp: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState<number>(1);

  return (
    <Question
      questionNumber={questionNumber}
      setQuestionNumber={setQuestionNumber}
    />
  );
};

export default SignUp;

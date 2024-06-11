import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginBox from "../components/login/LoginBox";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("auth/login", { email, password });
      console.log(response);
      console.log(response.data.accessToken);
      const loginToken = response.data.accessToken;

      localStorage.setItem("loginToken", loginToken);
      // localStorage.setItem("refreshToken", refreshToken);

      // console.log(username, userEmail);

      navigate("/"); // 홈으로
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`로그인 실패: ${error.response?.data?.message || error.message}`);
      } else {
        alert(`로그인 실패: ${error}`);
      }
    }
  };

  return (
    <>
      <Link to="/">
        <IoIosArrowBack size="26px" className="mt-8 mb-0 mx-4" />
      </Link>
      <div>
        <LoginBox onLogin={handleLogin} />
      </div>
    </>
  );
};

export default Login;

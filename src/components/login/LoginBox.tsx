import React, { useState } from "react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const LoginBox: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col mx-8 justify-center items-center h-[800px]">
        <h2 className="text-2xl text-center font-semibold mb-4">Boopinion</h2>
        <div className="border w-full mx-8 border-blue-700 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl mb-8">로그인하고 재미난 설문을 만나보세요!</h3>
          <form>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={email}
                placeholder="이메일"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={password}
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-900"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <a href="/signup" className="text-gray-600 hover:underline mr-4">
                회원가입 하러가기
              </a>
              <a href="#" className="text-gray-600 hover:underline">
                아이디/비밀번호 찾기
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginBox;

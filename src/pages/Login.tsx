import React from "react";
import ReactDOM from "react-dom";
import LoginBox from "../components/login/LoginBox";

const Login: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // 여기서는 로그인 과정을 처리할 수 있습니다.
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div>
      <LoginBox onLogin={handleLogin} />
    </div>
  );
};

ReactDOM.render(<Login />, document.getElementById("root"));
export default Login;

import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import useAuth from "../hooks/useAuth";

interface loginProps {
  onLogin: Function;
}

const LoginForm: React.FC<loginProps> = ({ onLogin }: loginProps) => {
  const [username, _a, onUsernameChange] = useInput("Lambda School");
  const [password, _b, onPasswordChange] = useInput("i<3Lambd4");
  const [error, setError] = useState("");

  const auth = useAuth("token", false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await auth.login("http://localhost:5000/api/login", { username, password }, (data) => {
      return data.payload;
    });
    if (!response.success) {
      setError("Login failed, please try again");
    } else {
      onLogin();
    }
  };
  return (
    <>
      <form onSubmit={submit}>
        <input value={username} placeholder="Email" onChange={onUsernameChange} />
        <input type="password" value={password} placeholder="Password" onChange={onPasswordChange} />
        <button type="submit">Login</button>
      </form>
      {error && error}
    </>
  );
};

export default LoginForm;

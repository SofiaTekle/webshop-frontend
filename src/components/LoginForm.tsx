import { useState } from "react";
import type { LoginRequest } from "../types/auth";

type LoginFormProps = {
  onLogin: (credentials: LoginRequest) => Promise<void>;
};

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();


    await onLogin({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleLogin} method="POST">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          id="email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          id="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default LoginForm;

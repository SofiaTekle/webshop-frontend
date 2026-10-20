import type { LoginRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

type LoginPageProps = {
  onLogin: (credentials: LoginRequest) => Promise<void>;
};



const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (
    credentials: LoginRequest,
  ): Promise<void> => {
    setError("");

    try {
      await onLogin(credentials);
      navigate("/", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Inloggningen misslyckades.",
      );
      throw error;
    }
  };


  return (
    <main>
      <section className="login-box">
        <h1 className="center-text">Sign in</h1>

        {error && <p role="alert">{error}</p>}

        <LoginForm onLogin={handleLogin}></LoginForm>
      </section>
    </main>
  );
};

export default LoginPage;

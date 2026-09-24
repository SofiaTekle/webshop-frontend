import type { LoginRequest } from "../types/auth";
import { login } from "../service/authService";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials: LoginRequest): Promise<void> => {
    await login(credentials);

    navigate("/");
  };

  return (
    <main>
      <section>
        <h1>Sign in</h1>
        <LoginForm onLogin={handleLogin}></LoginForm>
      </section>
    </main>
  );
};

export default LoginPage;

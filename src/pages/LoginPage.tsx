import type { LoginRequest } from "../types/auth";
import { login } from "../service/authService";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials: LoginRequest): Promise<void> => {
    const loginResponse = await login(credentials);

    navigate("/welcome", {
      state: { user: loginResponse },
    });
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

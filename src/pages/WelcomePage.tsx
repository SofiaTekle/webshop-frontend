import { useLocation } from "react-router";
import type { TokenResponse } from "../types/auth";

type WelcomeLocationState = {
  user: TokenResponse;
};

const WelcomePage = () => {
  const location = useLocation();
  const state = location.state as WelcomeLocationState | null;
  const user = state?.user;

  if (!user) {
    return (
      <main>
        <section>
          <h1>Ingen inloggningsinformation</h1>
          <p>Logga in för att se välkomstsidan.</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h1>Välkommen!</h1>
        <p>Användare: {user.subject}</p>
        <p>Roller: {user.roles.join(", ")}</p>
      </section>
    </main>
  );
};

export default WelcomePage;

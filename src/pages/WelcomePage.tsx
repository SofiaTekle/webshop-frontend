import { getCurrentUser } from "../service/authService";

const WelcomePage = () => {
  const user = getCurrentUser();

  if (!user) {
    return (
      <main className="welcome-page">
        <section className="welcome-box">
          <h1>Ingen inloggningsinformation</h1>
          <p>Logga in för att se välkomstsidan.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="welcome-page">
      <section>
        <h1 className="center-text">Välkommen!</h1>
        <div className="welcome-box">
          <p>Användare: {user.email}</p>
          <p>Roller: {user.roles.join(", ")}</p>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;

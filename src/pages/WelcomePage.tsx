import type { CurrentUser } from "../types/auth";

type WelcomePageProps = {
  currentUser: CurrentUser | null;
}

const WelcomePage = ({currentUser}: WelcomePageProps) => {

  if (currentUser === null) {
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
          <p>Användare: {currentUser.subject}</p>
          <p>Roller: {currentUser.roles.join(", ")}</p>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;

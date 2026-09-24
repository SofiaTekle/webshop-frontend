import { getCurrentUser } from "../service/authService";

const WelcomePage = () => {
  const user = getCurrentUser();

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
        <p>Användare: {user.email}</p>
        <p>Roller: {user.roles.join(", ")}</p>
      </section>
    </main>
  );
};

export default WelcomePage;

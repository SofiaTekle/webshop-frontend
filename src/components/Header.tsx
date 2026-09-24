import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../service/authService";

function Header() {
  useLocation();

  const authenticated = isAuthenticated();

  return (
    <header className="site-header">
      <Link className="site-logo" to="/">
        Webbshop
      </Link>

      <nav aria-label="Huvudnavigation">
        <ul className="nav-list">
          {authenticated ? (
            <>
              <li>
                <Link to="/">Hem</Link>
              </li>

              <li>
                <Link to="/products">Produkter</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Logga in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

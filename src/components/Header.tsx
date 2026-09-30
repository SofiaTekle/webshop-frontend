import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../service/authService";

function Header() {
  useLocation();

  const authenticated = isAuthenticated();
  const user = getCurrentUser();
  const isAdmin = user?.roles.includes("ROLE_ADMIN");

  return (
    <header className="site-header">
      <Link className="site-logo" to="/">
        Webbshop
      </Link>

      <nav className="nav-list" aria-label="Huvudnavigation">
        <ul className="nav-list">
          {authenticated ? (
            <>
              <li>
                <Link to="/">Hem</Link>
              </li>

              <li>
                <Link to="/products">Produkter</Link>
              </li>
              <li>
                <Link to="/cart">Kundvagn</Link>
              </li>

              {isAdmin && (
                <li>
                  <Link to="/admin/products">Hantera produkter</Link>
                </li>
              )}
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

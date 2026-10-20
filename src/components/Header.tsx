import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../service/authService";
import type { CurrentUser } from "../types/auth";

type HeaderProps = {
  currentUser: CurrentUser | null;
}

function Header({currentUser}: HeaderProps) {
  useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const isAdmin = currentUser?.roles.includes("ROLE_ADMIN");
  const authenticated = currentUser !== null;

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
              <li>
                <button type="button" onClick={handleLogout}>
                  Logga ut
                </button>
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

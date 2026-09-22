function Header() {
  return (
    <header className="site-header">
      <a className="site-logo" href="/">
        Webbshop
      </a>

      <nav aria-label="Huvudnavigation">
        <ul className="nav-list">
          <li>
            <a href="/">Hem</a>
          </li>
          <li>
            <a href="/products">Produkter</a>
          </li>
          <li>
            <a href="/login">Logga in</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

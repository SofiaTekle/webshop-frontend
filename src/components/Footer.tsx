function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 Webbshop. Alla rättigheter förbehållna.</p>


     <button
        type="button"
        className="cookie-info-link"
        onClick={() =>
          window.dispatchEvent(new Event("open-cookie-info"))
        }
      >
        Om cookies
      </button>



    </footer>
  );
}

export default Footer;

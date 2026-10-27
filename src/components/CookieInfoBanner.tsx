import { useEffect, useState } from "react";

export default function CookieInfoBanner() {
  const [isVisible, setIsVisible] = useState(
    () => localStorage.getItem("cookie-info-dismissed") !== "true",
  );

  function closeBanner() {
    localStorage.setItem("cookie-info-dismissed", "true");
    setIsVisible(false);
  }

  useEffect(() => {
    function handleOpenInfo() {
      setIsVisible(true);
      localStorage.removeItem("cookie-info-dismissed");
    }

    window.addEventListener("open-cookie-info", handleOpenInfo);

    return () => {
      window.removeEventListener("open-cookie-info", handleOpenInfo);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <section
          className="cookie-info-banner"
          aria-label="Information om cookies"
        >
          <div>
            <h2>Information om cookies</h2>
            <p>
              Den här webbplatsen använder en nödvändig cookie för att hantera
              din inloggning och skydda åtkomsten till ditt konto. Cookien
              behövs för att tjänsten ska fungera och används inte för spårning
              eller marknadsföring. 
              Du kan radera cookien i din webbläsare när som helst. 
              Om du gör det loggas du ut och behöver logga in igen.

            </p>
          </div>

          <button type="button" onClick={closeBanner}>
            Stäng
          </button>
        </section>
      )}
    </>
  );
}

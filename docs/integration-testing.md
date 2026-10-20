# FE-38 – Undersök integrationstestning

## Verktyg

- Vitest kör testerna och tillhandahåller assertions och test-hooks.
- React Testing Library renderar komponenter och kontrollerar
  vad användaren ser och kan göra.
- MSW fångar HTTP-anrop och returnerar kontrollerade API-svar.
  Backend behöver därför inte vara igång.

## Skillnader mellan testnivåer

| Testnivå                  | Omfattning                                                          | Exempel                                                                                       |
| ------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Komponenttest             | En enskild komponent                                                | ProductCard visar produktinformation och anropar onAdd vid klick.                             |
| Frontend-integrationstest | Flera delar av frontend tillsammans, med mockat API                 | App renderas på /products och visar produkter eller ett felmeddelande beroende på API-svaret. |
| End-to-end-test           | Ett komplett flöde i en riktig webbläsare med det startade systemet | Användaren loggar in och öppnar produktsidan via gateway och mikrotjänster.                   |

## Genomförande – FE-39 och FE-40

MSW är konfigurerat med handlers för GET /auth/me och GET /products.
Servern startas före testerna, handlers återställs efter varje test
och servern stängs efter testkörningen.

App.integration.test.tsx renderar App i MemoryRouter på /products.

Två scenarier testas: En inloggad användare ser produkterna från det mockade API:et. Ett felmeddelande visas när GET /products returnerar status 500. 

## Nuvarande begränsning

ProtectedRoute använder fortfarande sessionStorage.
Testerna förbereder därför en test-token och en testanvändare där.

Handlern för /auth/me är förberedd men används ännu inte av App.
När frontend har anpassats till cookie-inloggning och återställning
via /auth/me behöver testernas inloggningsförberedelse uppdateras.

Testerna verifierar frontendens beteende med mockade API-svar.
De verifierar inte riktig JWT-validering eller kommunikationen
mellan gateway och mikrotjänster.

## Körning och resultat

- npm test: 4 tester godkända i 2 testfiler.
- npm run build: godkänd.

## Referenser

- https://vitest.dev/guide/
- https://testing-library.com/docs/react-testing-library/intro/
- https://mswjs.io/docs/quick-start

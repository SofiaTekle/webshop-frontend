# FE-38 – Undersök integrationstestning

## Verktyg

- Vitest kör testerna och tillhandahåller assertions och test-hooks.
- React Testing Library renderar komponenter och kontrollerar
  vad användaren ser och kan göra.
- MSW fångar HTTP-anrop och returnerar kontrollerade API-svar.
  Backend behöver därför inte vara igång.

## Skillnader mellan testnivåer

### Komponenttest

Testar en enskild komponent.
Exempel: ProductCard visar produktinformation och anropar onAdd vid klick.

### Frontend-integrationstest

Testar flera delar av frontend tillsammans med ett mockat API.
Exempel: App renderas på /products och visar produkter
eller ett felmeddelande beroende på API-svaret.

### End-to-end-test

Testar ett komplett flöde i en riktig webbläsare med startade system.
Exempel: Användaren loggar in och öppnar produktsidan
via gateway och mikrotjänster. |

## Genomförande – FE-39 och FE-40

MSW är konfigurerat med handlers för GET /auth/me och GET /products.

Servern startas före testerna, handlers återställs efter varje test
och servern stängs efter testkörningen. Renderade komponenter
städas också undan efter varje test.

App.integration.test.tsx renderar App i MemoryRouter på /products.
App använder den riktiga getSession-funktionen, medan MSW
returnerar ett mockat svar från /auth/me med subject och roles.

Två scenarier testas:
 En inloggad användare ser produkterna Testskor och Testtröja från det mockade API:et. Ett felmeddelande visas när GET /products returnerar status 500, och produkterna visas inte.

I felscenariot används server.use för att tillfälligt ersätta
svaret från /products. Svaret från /auth/me är fortfarande lyckat.

## Inloggning och begränsningar

App hämtar den aktuella användaren via GET /auth/me.
MSW returnerar en mockad inloggad användare i testerna.
Ingen token eller användare sparas i sessionStorage.

Testerna verifierar frontendens beteende med mockade API-svar.
De verifierar inte riktig JWT-validering, hantering av HttpOnly-cookies
i webbläsaren eller kommunikationen mellan gateway och mikrotjänster.

Återställning av användare vid status 401 testas separat i FE-41.

## Körning och resultat

Kör testerna:

bash
npm test

Kontrollera produktionsbygget:

bash
npm run build

Verifierat efter anpassningen till inloggning via /auth/me:

- npm test: 4 tester godkända i 2 testfiler.
- Två komponenttester för ProductCard.
- Två integrationstester för produkthämtning.
- npm run build: godkänd.

## Referenser

- https://vitest.dev/guide/
- https://testing-library.com/docs/react-testing-library/intro/
- https://mswjs.io/docs/quick-start/

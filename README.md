# Webshop Frontend

Webshop Frontend är webbgränssnittet för webshoppen. Applikationen är byggd med React och TypeScript och kommunicerar med backend via Webshop Gateway.

## Ansvar och funktioner

Frontend ansvarar för att:

- Visa inloggningssidan och hantera inloggning och utloggning.
- Återställa användarens inloggningsstatus när applikationen öppnas.
- Visa välkomstsidan, produktlistan och produktdetaljer.
- Hantera varukorgen och ändringar av antal.
- Skicka beställningar och skapa en Stripe Checkout-session via gatewayen.
- Visa sidor för genomförd eller avbruten Checkout.
- Tillhandahålla administrationssidor för produkter.
- Visa information om cookies.

Backend ansvarar för autentisering, behörigheter, produktdata, lager, beställningar och betalningsstatus.

## Teknik

Projektet använder:

- React och React DOM.
- TypeScript.
- Vite.
- React Router.
- Fetch API för HTTP-anrop.
- Oxlint för kodkontroll.
- Vitest och React Testing Library för tester.
- jsdom som testmiljö.
- Mock Service Worker (MSW) för mockade API-anrop.
- Playwright för webbläsartester.

Beroenden och versionsintervall finns i `package.json`. Låsta versioner finns i `package-lock.json`.

## Databas

Frontend har ingen egen databas.

Användare, produkter och beställningar hanteras av backendtjänsterna. Frontend behöver inga databasuppgifter, RabbitMQ-lösenord eller hemliga Stripe-nycklar.

## Förutsättningar

För lokal utveckling behövs:

- Node.js och npm med stöd för projektets beroenden.
- Git.
- En webbläsare.
- En tillgänglig gateway och de backendtjänster som behövs för aktuellt flöde.

Backendtjänsternas egna förutsättningar och miljövariabler beskrivs i respektive repository.

## Hämta projektet

```bash
git clone https://github.com/SofiaTekle/webshop-frontend.git
cd webshop-frontend
```

Installera beroenden:

```bash
npm ci
```

## Miljövariabler

Skapa filen `.env.local` i projektets rot, bredvid `package.json`.

För en lokal gateway:

```env
VITE_GATEWAY_API_URL=http://localhost:9003/gateway
```

`VITE_GATEWAY_API_URL` används av:

- `src/service/authService.ts`
- `src/service/productService.ts`
- `src/service/orderService.ts`

Adressen ska inkludera `/gateway` och anges utan avslutande snedstreck.

Exempelvis lägger produktservicen själv till `/products`, vilket ger:

```text
http://localhost:9003/gateway/products
```

De visade servicefilerna använder inte de äldre variablerna `VITE_AUTH_API_URL`, `VITE_PRODUCT_API_URL` eller `VITE_ORDER_API_URL`.

Starta om utvecklingsservern efter ändringar i `.env.local`.

Miljövariabler med prefixet `VITE_` används i frontendkoden. Lägg därför aldrig lösenord, privata nycklar eller andra hemligheter i dessa variabler.

## Starta lokalt

### 1. Starta backend

Vid lokal körning används följande standardportar:

- Auth Service: `8080`.
- Product Service: `8081`.
- Order Service: `9999`.
- Gateway: `9003`.
- Mail Service: `8087`.

Gatewayen ska vara konfigurerad med adresserna till backendtjänsterna.

Inloggning kräver Auth Service. Produktvisning kräver även Product Service. Checkout kräver Order Service och dess beroenden.

För orderbekräftelse via e-post behövs också RabbitMQ, Mail Service och fungerande e-postinställningar.

### 2. Kontrollera frontendens konfiguration

Kontrollera att `.env.local` innehåller rätt gatewayadress.

### 3. Starta frontend

```bash
npm run dev
```

Öppna adressen som visas i terminalen, normalt:

```text
http://localhost:5173
```

För att uttryckligen använda port `5173`:

```bash
npm run dev -- --port 5173 --strictPort
```

Port `5173` används även i Playwright-konfigurationen och i Order Services lokala returadresser från Stripe Checkout.

## Sidor och navigation

Följande rutter finns i `App.tsx`:

- `/login` – inloggning.
- `/` – välkomstsida.
- `/products` – produktlista.
- `/products/:id` – produktdetaljer.
- `/cart` – varukorg.
- `/payment/success` – retursida efter Checkout.
- `/payment/cancel` – retursida vid avbruten Checkout.
- `/admin/products` – administration av produkter.
- `/admin/products/new` – formulär för nya produkter.

Kundsidornas rutter ligger bakom `ProtectedRoute`. Administrationssidorna ligger bakom `AdminRoute`.

Backend kontrollerar behörigheter för API-anropen.

## Kommunikation med gatewayen

Frontend använder följande API-anrop:

- `POST /gateway/auth/login`
- `GET /gateway/auth/me`
- `POST /gateway/auth/logout`
- `GET /gateway/products`
- `GET /gateway/products/{id}`
- `POST /gateway/products`
- `POST /gateway/orders`
- `POST /gateway/orders/checkout`
- `GET /gateway/orders/{id}`

Servicefilerna skickar anrop med:

```typescript
credentials: "include";
```

Gatewayen hanterar autentiseringstoken i en HttpOnly-cookie med namnet `access_token` och vidarebefordrar token till backend.

Vid uppstart anropar frontend `/auth/me` via gatewayen för att kontrollera aktuell inloggning.

Gatewayens CORS-konfiguration måste tillåta frontendens adress och anrop med cookies.

## Checkout och betalning

Frontend skickar produkt-id och antal till gatewayens Checkout-endpoint.

Order Service skapar beställningen och Stripe Checkout-sessionen. Svaret innehåller `checkoutUrl` och `orderId`.

Betalningsstatus uppdateras av Order Service genom verifierade Stripe-webhooks. Att användaren kommer tillbaka till `/payment/success` är inte i sig en bekräftelse på att backend har registrerat betalningen.

Se Order Services README för Stripe-konfiguration och webhookhantering.

## Tester

### Komponent- och integrationstester

Kör Vitest-testerna en gång:

```bash
npm test
```

Testkonfigurationen finns i `vitest.config.ts` och använder:

- `jsdom`.
- `src/setupTests.ts`.
- `VITE_GATEWAY_API_URL=http://localhost:9003/gateway`.

Mappen `e2e` är undantagen från Vitest.

Projektet innehåller bland annat komponenttester och `src/App.integration.test.tsx`. Integrationstesterna använder MSW för mockade API-svar.

Mer information finns i [dokumentationen om integrationstester](docs/integration-testing.md).

### Webbläsartester med Playwright

Installera Playwrights Chromium-webbläsare:

```bash
npx playwright install chromium
```

Starta frontend separat på port `5173`. Den nuvarande Playwright-konfigurationen startar inte utvecklingsservern automatiskt.

Starta även gatewayen och de backendtjänster som testflödet behöver. Kontrollera testkontots uppgifter och förutsättningarna i `e2e/login-products.spec.ts`.

Kör testerna:

```bash
npx playwright test
```

Konfigurationen finns i `playwright.config.ts` och:

- Läser `.env.local`.
- Hämtar tester från `e2e`.
- Använder `http://localhost:5173` som basadress.
- Använder profilen Desktop Chrome.
- Visar webbläsaren under körningen.

## Kodkontroll och produktionsbygge

Kör kodkontroll:

```bash
npm run lint
```

Skapa ett produktionsbygge:

```bash
npm run build
```

Byggkommandot kör TypeScript-kompilering följt av Vites byggsteg.

Förhandsgranska bygget lokalt:

```bash
npm run preview
```

Öppna adressen som visas i terminalen. Gatewayens CORS-inställningar behöver tillåta den adress som används vid förhandsgranskningen.

## Projektstruktur

- `src/components` – återanvändbara komponenter och ruttkontroller.
- `src/pages` – applikationens sidor.
- `src/hooks` – egna hooks, bland annat varukorgshantering.
- `src/service` – anrop till gatewayen.
- `src/types` – TypeScript-typer.
- `src/mocks` – mockade API-svar för tester.
- `src/App.tsx` – rutter och övergripande applikationstillstånd.
- `src/setupTests.ts` – testförberedelser.
- `e2e` – Playwright-tester.
- `docs` – kompletterande dokumentation.

## Felsökning

- **Moduler saknas:** kör `npm ci` efter att du hämtat ändringar med nya beroenden.
- **Fel gatewayadress:** kontrollera `VITE_GATEWAY_API_URL` och starta om utvecklingsservern.
- **Anrop innehåller `undefined`:** kontrollera att `.env.local` ligger i projektets rot och att variabelnamnet är rätt.
- **Status 401:** kontrollera inloggningen och att webbläsaren skickar gatewayens cookie.
- **Status 403:** kontrollera användarens behörigheter i backend.
- **CORS-fel:** kontrollera att gatewayen tillåter frontendens exakta adress, inklusive port.
- **Status 502:** kontrollera gatewayens anslutning till bakomliggande tjänster och deras loggar.
- **Fel port:** kontrollera terminalens adress. Playwright och de lokala Stripe-returadresserna använder port `5173`.
- **Betalningen förblir `PENDING`:** kontrollera Stripe-webhooken och Order Services loggar.
- **Ingen orderbekräftelse:** kontrollera betalningsstatus, RabbitMQ och Mail Service.
- **Playwright saknar webbläsare:** kör `npx playwright install chromium`.

## Systemets repositories

- [Auth Service](https://github.com/armin-akhtarzand/webshop-auth-server)
- [Product Service](https://github.com/armin-akhtarzand/webshop-product-service)
- [Order Service](https://github.com/armin-akhtarzand/webshop-order-service)
- [Mail Service](https://github.com/armin-akhtarzand/webshop-mail-service)
- [Gateway](https://github.com/SofiaTekle/webshop-gateway)
- [Frontend](https://github.com/SofiaTekle/webshop-frontend)

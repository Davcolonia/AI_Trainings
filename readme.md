# RestfulBookerPlaywright

Playwright API automation framework for [Restful-Booker](https://restful-booker.herokuapp.com) — TypeScript, enterprise-ready.

---

## Tech Stack

| Tool               | Version   | Purpose                     |
|--------------------|-----------|-----------------------------|
| Playwright         | ^1.44.1   | API request + test runner   |
| TypeScript         | ^5.4.5    | Language                    |
| Ajv                | ^8.17.1   | JSON schema validation      |
| ajv-formats        | ^3.0.1    | Date/string format support  |
| dotenv             | ^16.4.5   | Environment config          |

---

## Project Structure

```
RestfulBookerPlaywright/
├── .env                         ← Base URL + credentials (not committed)
├── playwright.config.ts         ← Reporter, timeout, baseURL config
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── api/
│   │   ├── AuthApi.ts           ← POST /auth
│   │   ├── BookingApi.ts        ← All /booking endpoints
│   │   └── PingApi.ts           ← GET /ping
│   ├── data/
│   │   └── bookingData.ts       ← Reusable test payloads
│   ├── fixtures/
│   │   └── apiFixtures.ts       ← Custom test fixtures (authToken, API classes)
│   ├── models/
│   │   └── Booking.ts           ← TypeScript interfaces for all request/response shapes
│   ├── schemas/
│   │   ├── createBookingSchema.json
│   │   └── getBookingSchema.json
│   └── utils/
│       ├── schemaValidator.ts   ← Ajv-based schema validator
│       └── logger.ts            ← Timestamped console logger
└── tests/
    ├── healthCheck.spec.ts
    ├── auth.spec.ts
    ├── getBooking.spec.ts
    ├── createBooking.spec.ts
    ├── updateBooking.spec.ts
    └── deleteBooking.spec.ts
```

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers (only chromium needed for API, but required by playwright)
npx playwright install chromium
```

---

## Run Tests

```bash
# All tests
npm test

# Specific suite
npm run test:auth
npm run test:booking
npm run test:health

# Single file
npx playwright test tests/createBooking.spec.ts

# Single test by name
npx playwright test --grep "valid credentials return a token"
```

---

## View Report

After a run, open the HTML report:
```bash
npm run report
```
Report saved at `reports/html/index.html`.

---

## Configuration

Edit `.env` to change target environment:

```env
BASE_URL=https://restful-booker.herokuapp.com
AUTH_USERNAME=admin
AUTH_PASSWORD=password123
```

Override at runtime:
```bash
BASE_URL=https://other-env.example.com npm test
```

---

## Test Coverage

| Spec File              | Method | Endpoint           | Scenario                                        |
|------------------------|--------|--------------------|--------------------------------------------------|
| healthCheck.spec.ts    | GET    | /ping              | 201 — API is healthy                            |
| auth.spec.ts           | POST   | /auth              | Valid credentials → token returned              |
| auth.spec.ts           | POST   | /auth              | Invalid credentials → reason: Bad credentials  |
| getBooking.spec.ts     | GET    | /booking           | All IDs returned as non-empty array             |
| getBooking.spec.ts     | GET    | /booking           | Filter by firstname                             |
| getBooking.spec.ts     | GET    | /booking           | Filter by checkin date                          |
| getBooking.spec.ts     | GET    | /booking/:id       | Valid ID → schema + field assertions            |
| getBooking.spec.ts     | GET    | /booking/:id       | Non-existent ID → 404                           |
| createBooking.spec.ts  | POST   | /booking           | Valid payload → schema + field assertions       |
| createBooking.spec.ts  | POST   | /booking           | Booking dates persisted correctly               |
| updateBooking.spec.ts  | PUT    | /booking/:id       | Full update with cookie token                   |
| updateBooking.spec.ts  | PUT    | /booking/:id       | Full update with Basic Auth                     |
| updateBooking.spec.ts  | PUT    | /booking/:id       | No / invalid auth → 403                         |
| updateBooking.spec.ts  | PATCH  | /booking/:id       | Partial update (firstname + lastname)           |
| deleteBooking.spec.ts  | DELETE | /booking/:id       | Token auth → 201 + verify 404 after delete      |
| deleteBooking.spec.ts  | DELETE | /booking/:id       | Basic Auth → 201                                |
| deleteBooking.spec.ts  | DELETE | /booking/:id       | No auth → 403                                   |

---

## Schema Validation

`src/utils/schemaValidator.ts` uses **Ajv** (JSON Schema draft-07) to validate API responses.  
Throws a descriptive error listing every violation if the response shape deviates from the contract.

Schemas live in `src/schemas/` and are registered by name:

| Key              | Schema file                   | Used in                  |
|------------------|-------------------------------|--------------------------|
| `createBooking`  | createBookingSchema.json      | createBooking.spec.ts    |
| `getBooking`     | getBookingSchema.json         | getBooking.spec.ts       |

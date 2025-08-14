# concentrate_quiz

## Tech stack

- Frontend
	- Next.js 15 (App Router), React 19, TypeScript
	- Mantine UI 8.x for theming and components
	- NextAuth with Microsoft Entra ID provider for auth
- Backend
	- Node 20, Express 4
	- PostgreSQL 16 with JSONB user records and unique email upsert
	- OpenAPI 3.0.3 spec served via Swagger UI
- Tooling
	- Jest 30 + React Testing Library for unit tests (frontend); Jest + Supertest for backend
	- ESLint 9, Stylelint 16, Prettier 3, TypeScript 5
	- Storybook 8 for component development
	- Docker Compose for local Postgres + backend + frontend

## Repository layout

- `app/` – Next.js app router pages and layout
- `components/` – UI components (Appbar, Auth, Profile, Welcome, etc.)
- `lib/` – shared front‑end utilities like `UserService`
- `auth.ts` – NextAuth configuration with Microsoft Entra ID
- `middleware.ts` – route protection and redirects
- `backend/` – Express server (`src/app.ts`) and DB helpers (`src/db.ts`)
	- `api/openapi.yaml` – contract for user endpoints
	- `sql/` – database creation and schema
- `compose.yaml` – Docker Compose for local dev (postgres, backend, frontend)
- `jest.config.cjs`, `jest.setup.cjs` – frontend test config and setup

## Architecture and design choices

- App Router + Mantine
	- App‑level layout (`app/layout.tsx`) provides Mantine provider and an `Appbar` sidebar for authenticated routes; login page (`/`) hides the bar.
	- Theming via Mantine with a small `theme.ts` and `ColorSchemeToggle` to switch modes.
- Authentication
	- NextAuth with Microsoft Entra ID. On successful sign‑in, a callback upserts the user to the backend (`auth.ts` → `upsertUserToBackend`).
	- `middleware.ts` protects `/dashboard` and `/profile`, and redirects appropriately based on session.
- Backend contract
	- OpenAPI documented endpoints:
		- `GET /api/v0/users/by-email?email=...` → `{ id, email, name } | 404`
		- `PUT /api/v0/users` with `{ email, name }` → echoes the upserted fields.
	- Data is stored as JSONB in a `users` table with a unique constraint on `data->>'email'` to allow atomic upsert.
- Frontend/backend interaction
	- `lib/service.ts` encapsulates `fetch` calls to the backend. The base URL is resolved from `process.env.BACKEND_URL` at call‑time to work in Docker and tests.
	- Server components (e.g., `Welcome`, `UserCardImage`) can call `auth()` and backend services and then render client components (like `WelcomeView`, `UserCardDisplay`).

## Local development

You can run everything with Docker Compose. The compose file provisions:

- `postgres` – Postgres 16 with init SQL mounted
- `backend` – Node 20 container running Express dev server on `3010`
- `frontend` – Next.js dev server on `3000`

Environment highlights:

- `BACKEND_URL` for the frontend/server code (set to `http://backend:3010` in Compose)
- NextAuth Microsoft Entra secrets: `AUTH_MICROSOFT_ENTRA_ID_ID`, `AUTH_MICROSOFT_ENTRA_ID_SECRET`

Dev commands (Docker):

- Start services
	- Windows PowerShell
		```powershell
		docker compose up --build
		```
- Frontend: http://localhost:3000
- Backend Swagger UI: http://localhost:3010/api-docs
- Postgres: localhost:5432 (default `postgres/postgres`, db `dev`)

Dev commands (no Docker):

- Database: start a local Postgres 16 with schema from `backend/sql` and set env vars
- Backend:
	```powershell
	cd backend; npm i; npm run dev
	```
- Frontend (root):
	```powershell
	npm i; npm run dev
	```

## Testing

- Frontend (root)
	- Jest + RTL; jsdom environment
	- Command runs Prettier, ESLint, Stylelint, TS typecheck, and Jest with coverage
	```powershell
	npm test
	```
	- Tests live alongside components in `components/**` and utilities in `lib/**`
	- `test-utils/` provides a Mantine‑aware render helper
  - Tests ensure components function as intended (i.e., navigation via buttons), error handling, conditional rendering
  - Service tests ensure proper communication between front and backend, proper fetch calls, proper error handling

- Backend
	- Jest + ts-jest; Supertest for HTTP routes
	```powershell
	cd backend; npm test
	```
	- `src/app.test.ts` exercises Express routes; DB calls mocked
	- `src/db.test.ts` verifies DB helper logic with a mocked `pg.Pool`

## Notable implementation details

- `lib/service.ts` resolves `BACKEND_URL` at function call time to allow tests to override via environment.
- `components/Welcome/Welcome.tsx` and `components/Profile/UserCardImage.tsx` are server components that call `auth()` and then `UserService`, returning client components to render.
- Route protection is centralized in `middleware.ts` with simple allow/deny lists for protected routes and the login page.
- The backend uses a JSONB column (`users.data`) and a unique constraint on `data->>'email'`; upsert is done in a single statement.

## Linting, formatting, and TypeScript

- ESLint (Next + React + accessibility) and Stylelint for CSS; Prettier enforces formatting
- CI‑friendly script ordering: Prettier → ESLint/Stylelint → Typecheck → Jest
- Coverage output is ignored by Stylelint to avoid spurious failures

## Environment variables

Frontend/server:
- `BACKEND_URL` – base URL for backend API (Docker: `http://backend:3010`, local: `http://localhost:3010`)
- `NEXTAUTH_URL`, `AUTH_URL`, `AUTH_TRUST_HOST` – as needed by NextAuth deployment
- `AUTH_MICROSOFT_ENTRA_ID_ID`, `AUTH_MICROSOFT_ENTRA_ID_SECRET` – Microsoft Entra provider creds

Backend:
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `DATABASE_URL` – full Postgres connection string

## Scripts (root)

- `dev` – Next dev server
- `build` – Next production build
- `test` – Prettier check, ESLint, Stylelint, Typecheck, Jest with coverage
- `jest` – Jest with coverage
- `prettier:check` / `prettier:write` – Prettier helpers
- `lint` – ESLint + Stylelint

## Scripts (backend)

- `dev` – nodemon (ts-node) for live server reload
- `build` – compile TypeScript
- `test` – build + Jest (ts-jest)
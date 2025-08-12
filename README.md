# Concentrate Quiz (Next.js + Azure AD + Postgres)

Single Next.js app with Azure SSO and a Postgres users table (id UUID, data jsonb). Docker Compose runs web+db with one command.

## Stack
- Next.js App Router
- NextAuth (Azure AD)
- Postgres (users: id uuid pk, data jsonb)

## Setup
1. Fill Azure credentials and `NEXTAUTH_SECRET` into `.env`
2. Start containers:

```
docker compose up --build
```

3. Visit http://localhost:3000

## Schema
The app will auto-create table `users(id uuid primary key, data jsonb not null)` on first use.

## Pages
- `/login`: start Azure SSO
- `/dashboard`: protected, writes and shows your user record
- `/profile`: protected, shows your user data
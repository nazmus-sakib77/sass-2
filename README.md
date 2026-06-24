# Tomotik — Full-Stack System

Marketing site + lead CRM + blog/CMS + portfolio CMS + client portal, built on
Next.js 14.2 (App Router) + TypeScript, Prisma + MySQL, and Auth.js v5.

## Stack

- **Next.js 14.2** (App Router) + TypeScript
- **Prisma ORM + MySQL** (Hostinger Business-ready)
- **Auth.js (NextAuth v5)** — Credentials provider + bcrypt, JWT sessions, `ADMIN` / `CLIENT` roles
- **Motion 11** for animations
- Plain CSS design system (`app/globals.css`, `app/admin.css`) — flame-on-dark brand

## What's inside

| System | Public | Admin |
| --- | --- | --- |
| Marketing | `/`, `/services`, `/about`, `/pricing`, `/get-quote`, `/contact` | — |
| Lead CRM | quote/contact forms → DB | `/admin/leads` (status, notes) |
| Blog | `/blog`, `/blog/[slug]` | `/admin/posts` |
| Portfolio | `/work`, `/work/[slug]`, homepage Work section | `/admin/case-studies` |
| Client portal | `/portal`, `/portal/[projectId]` | `/admin/clients`, `/admin/projects` |

Auth lives at `/login`; `/dashboard` routes by role. `/admin/**` requires `ADMIN`,
`/portal/**` requires a logged-in user — enforced in `middleware.ts` **and** re-checked
server-side in each layout/action.

## Local setup

1. Copy env and fill in values:
   ```bash
   cp .env.example .env.local
   # set DATABASE_URL, AUTH_SECRET (npx auth secret), SEED_ADMIN_*
   ```
2. Run a MySQL 8 instance (e.g. Docker):
   ```bash
   docker run --name tomotik-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=tomotik -p 3306:3306 -d mysql:8
   ```
3. Install, migrate, seed:
   ```bash
   npm install
   npx prisma migrate deploy   # applies prisma/migrations
   npx prisma db seed          # creates the initial ADMIN from SEED_ADMIN_*
   ```
4. Dev: `npm run dev` · Build: `npm run build` · Start: `npm run start`
5. Inspect data: `npx prisma studio`

> The repo ships a generated `prisma/migrations/0_init` so `migrate deploy` works
> without needing to author migrations. Use `npx prisma migrate dev --name <x>`
> for further schema changes during development.

## Deploy (Hostinger Business + MySQL)

1. hPanel → create a MySQL database + user; note host/db/user/password.
2. Set env vars on the Node app: `DATABASE_URL` (`mysql://user:pass@host:3306/db`),
   `AUTH_SECRET`, `AUTH_URL` (your real https domain), and `SEED_ADMIN_*`.
3. Deploy step runs `prisma generate && prisma migrate deploy` (build script runs
   `prisma generate`; run `migrate deploy` in your deploy hook). Seed once:
   `npx prisma db seed`.
4. `npm run build` then `npm run start`.

Use `prisma migrate deploy` (not `migrate dev`) in production, and back up the
database before each migration.

## Security

- Passwords bcrypt-hashed (cost 12); never stored in plaintext.
- All role checks server-side (middleware + per-action `requireAdmin`).
- Client portal verifies project ownership server-side; non-owned IDs return 404.
- Markdown is sanitized on render (`marked` + DOMPurify) — no raw HTML injection.
- `.env.local` is gitignored.

# Renee Dugas Nugent for Judge

Production-ready campaign website for Renee Dugas Nugent, candidate for District Judge in the Thirty-Fifth Judicial District Court serving Grant Parish, Louisiana.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI components
- Prisma with Supabase Postgres for editable content and form submissions
- Server Actions for forms and admin edits

## Local Setup

1. Copy `.env.example` to `.env`.
2. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `SESSION_SECRET`.
3. Install dependencies:

```bash
npm install
```

1. Set `DATABASE_URL` and `DIRECT_URL` from the Supabase project.

2. Create the database and seed starter content:

```bash
npm run db:push
npm run db:seed
```

1. Start the site:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Open `http://localhost:3000/admin` and sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

The backend supports:

- Editable homepage headline, mission statement, and donation disclaimer
- Event creation
- Endorsement creation
- Volunteer signup review
- Contact submission review
- CSV export for volunteers and contacts

## Content Notes

The first version uses the supplied campaign questionnaire for biography, qualifications, judicial philosophy, and campaign details. Missing campaign contact and public endorsement details use placeholders and should be updated before launch.

## Deployment

For Vercel deployment:

1. Set environment variables from `.env.example`.
2. Copy the pooled and direct Postgres connection strings from Supabase into `DATABASE_URL` and `DIRECT_URL`.
3. Apply the SQL in `supabase/migrations/20260620_init_campaign_backend.sql` to a fresh Supabase project, or run `npm run db:push` against the project.
4. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
5. Set the same database environment variables in Vercel before deploying.

Stripe donation checkout variables are prepared but checkout is intentionally disabled until the campaign has approved payment credentials and compliance language.

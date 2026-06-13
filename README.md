# Renee Dugas Nugent for Judge

Production-ready campaign website for Renee Dugas Nugent, candidate for District Judge in the Thirty-Fifth Judicial District Court serving Grant Parish, Louisiana.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn-style local UI components
- Prisma with SQLite for editable content and form submissions
- Server Actions for forms and admin edits

## Local Setup

1. Copy `.env.example` to `.env`.
2. Set `ADMIN_PASSWORD` and `SESSION_SECRET`.
3. Install dependencies:

```bash
npm install
```

4. Create the database and seed starter content:

```bash
npm run db:push
npm run db:seed
```

5. Start the site:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Open `http://localhost:3000/admin` and sign in with `ADMIN_PASSWORD`.

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
2. Use a production database provider supported by Prisma.
3. Run `prisma migrate deploy` or `prisma db push` as part of deployment setup.
4. Set `NEXT_PUBLIC_SITE_URL` to the production URL.

Stripe donation checkout variables are prepared but checkout is intentionally disabled until the campaign has approved payment credentials and compliance language.

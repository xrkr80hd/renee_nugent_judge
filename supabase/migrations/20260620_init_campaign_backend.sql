create table if not exists public."Volunteer" (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  city text,
  interests text not null,
  "createdAt" timestamptz not null default now()
);

create index if not exists "Volunteer_createdAt_idx" on public."Volunteer" ("createdAt" desc);
create index if not exists "Volunteer_email_idx" on public."Volunteer" (email);
alter table public."Volunteer" enable row level security;

create table if not exists public."ContactSubmission" (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  "createdAt" timestamptz not null default now()
);

create index if not exists "ContactSubmission_createdAt_idx" on public."ContactSubmission" ("createdAt" desc);
create index if not exists "ContactSubmission_email_idx" on public."ContactSubmission" (email);
alter table public."ContactSubmission" enable row level security;

create table if not exists public."Event" (
  id text primary key,
  title text not null,
  "startsAt" timestamptz not null,
  location text not null,
  description text not null,
  "isPublished" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create index if not exists "Event_startsAt_idx" on public."Event" ("startsAt" asc);
create index if not exists "Event_isPublished_idx" on public."Event" ("isPublished");
alter table public."Event" enable row level security;

create table if not exists public."Endorsement" (
  id text primary key,
  name text not null,
  role text not null,
  quote text not null,
  category text not null default 'Community Supporter',
  "isPublished" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create index if not exists "Endorsement_category_idx" on public."Endorsement" (category);
create index if not exists "Endorsement_isPublished_idx" on public."Endorsement" ("isPublished");
alter table public."Endorsement" enable row level security;

create table if not exists public."NewsPost" (
  id text primary key,
  title text not null,
  excerpt text not null,
  body text not null,
  slug text not null unique,
  "isPublished" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create index if not exists "NewsPost_isPublished_idx" on public."NewsPost" ("isPublished");
alter table public."NewsPost" enable row level security;

create table if not exists public."SiteSetting" (
  key text primary key,
  value text not null,
  "updatedAt" timestamptz not null default now()
);

alter table public."SiteSetting" enable row level security;

insert into public."Event" (id, title, "startsAt", location, description, "isPublished")
values
  ('seed-event-1', 'Grant Parish Meet and Greet', '2026-07-18T23:00:00Z', 'Grant Parish, Louisiana', 'A community conversation with Renee Dugas Nugent. Details to be announced.', true),
  ('seed-event-2', 'Campaign Volunteer Evening', '2026-08-06T22:30:00Z', 'Campaign Headquarters', 'Help prepare yard signs, voter outreach materials, and event support.', true)
on conflict (id) do update set
  title = excluded.title,
  "startsAt" = excluded."startsAt",
  location = excluded.location,
  description = excluded.description,
  "isPublished" = excluded."isPublished",
  "updatedAt" = now();

insert into public."SiteSetting" (key, value)
values
  ('homepageHeadline', 'Candidate for District Judge'),
  ('missionStatement', 'A courtroom should be prepared, impartial, respectful, and rooted in the law.'),
  ('donationDisclaimer', 'Political contributions are subject to applicable campaign finance laws. Additional disclaimer language should be reviewed by campaign counsel.')
on conflict (key) do update set
  value = excluded.value,
  "updatedAt" = now();

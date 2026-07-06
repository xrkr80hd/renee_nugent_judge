create table if not exists public."Volunteer" (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  address1 text,
  address2 text,
  city text,
  state text,
  zip text,
  interests text not null,
  contacted boolean not null default false,
  confirmed boolean not null default false,
  "createdAt" timestamptz not null default now()
);

alter table public."Volunteer" add column if not exists contacted boolean not null default false;
alter table public."Volunteer" add column if not exists confirmed boolean not null default false;
alter table public."Volunteer" add column if not exists address1 text;
alter table public."Volunteer" add column if not exists address2 text;
alter table public."Volunteer" add column if not exists state text;
alter table public."Volunteer" add column if not exists zip text;

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

create table if not exists public."DonationSubmission" (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  address1 text not null,
  address2 text,
  city text not null,
  state text not null,
  zip text not null,
  amount text,
  notes text,
  "createdAt" timestamptz not null default now()
);

create index if not exists "DonationSubmission_createdAt_idx" on public."DonationSubmission" ("createdAt" desc);
create index if not exists "DonationSubmission_email_idx" on public."DonationSubmission" (email);
alter table public."DonationSubmission" enable row level security;

create table if not exists public."Event" (
  id text primary key,
  "sortOrder" integer not null default 0,
  title text not null,
  "startsAt" timestamptz not null,
  location text not null,
  description text not null,
  "isPublished" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

alter table public."Event" add column if not exists "sortOrder" integer not null default 0;
create index if not exists "Event_startsAt_idx" on public."Event" ("startsAt" asc);
create index if not exists "Event_isPublished_idx" on public."Event" ("isPublished");
create index if not exists "Event_sortOrder_idx" on public."Event" ("sortOrder");
alter table public."Event" enable row level security;

create table if not exists public."Endorsement" (
  id text primary key,
  "sortOrder" integer not null default 0,
  name text not null,
  role text not null,
  quote text not null,
  category text not null default 'Community Supporter',
  "isPublished" boolean not null default true,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

alter table public."Endorsement" add column if not exists "sortOrder" integer not null default 0;
create index if not exists "Endorsement_category_idx" on public."Endorsement" (category);
create index if not exists "Endorsement_isPublished_idx" on public."Endorsement" ("isPublished");
create index if not exists "Endorsement_sortOrder_idx" on public."Endorsement" ("sortOrder");
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

insert into public."SiteSetting" (key, value)
values
  ('homepageHeadline', 'Candidate for District Judge'),
  ('missionStatement', 'A courtroom should be prepared, impartial, respectful, and rooted in the law.'),
  ('donationDisclaimer', 'Political contributions are subject to applicable campaign finance laws. Additional disclaimer language should be reviewed by campaign counsel.')
on conflict (key) do update set
  value = excluded.value,
  "updatedAt" = now();

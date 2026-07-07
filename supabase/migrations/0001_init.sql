-- AussieBarbers initial schema
-- Run in Supabase: SQL Editor → paste → Run, or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ── Barbers ──────────────────────────────────────────────────────────
create table if not exists public.barbers (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  suburb        text,
  bio           text,
  specialties   text[] default '{}',
  years         int default 0,
  rating        numeric(2,1) default 5.0,
  review_count  int default 0,
  is_active      boolean default true,
  created_at    timestamptz default now()
);

-- ── Booking requests / bookings ──────────────────────────────────────
create type booking_status as enum ('requested', 'confirmed', 'completed', 'cancelled');

create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  status        booking_status default 'requested',
  service_name  text not null,
  price_aud     numeric(10,2),
  suburb        text not null,
  preferred_day text,
  preferred_time text,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  barber_id     uuid references public.barbers(id) on delete set null,
  notes         text,
  created_at    timestamptz default now()
);

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_status_idx on public.bookings (status);

-- ── Reviews ──────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  barber_id   uuid references public.barbers(id) on delete cascade,
  booking_id  uuid references public.bookings(id) on delete set null,
  author_name text not null,
  suburb      text,
  rating      int not null check (rating between 1 and 5),
  body        text,
  is_published boolean default false,
  created_at  timestamptz default now()
);

-- ── Row Level Security ───────────────────────────────────────────────
alter table public.barbers  enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews  enable row level security;

-- Public can read active barbers and published reviews.
create policy "public read active barbers"
  on public.barbers for select using (is_active = true);

create policy "public read published reviews"
  on public.reviews for select using (is_published = true);

-- Booking inserts happen server-side with the service-role key, which
-- bypasses RLS. No public insert policy is granted here on purpose so
-- the anon key cannot write bookings directly from the browser.

-- AussieBarbers barber job applications (careers page)

create type application_status as enum ('new', 'reviewing', 'interview', 'hired', 'declined');

create table if not exists public.applications (
  id                   uuid primary key default gen_random_uuid(),
  full_name            text not null,
  email                text not null,
  phone                text not null,
  region               text,               -- Brisbane / Gold Coast
  service_suburbs      text,               -- free text: areas they can cover
  years_experience     int,
  qualification        text,               -- e.g. Certificate III in Barbering
  specialties          text[] default '{}',
  right_to_work        boolean default false,
  has_abn              boolean default false,
  own_tools            boolean default false,
  own_transport        boolean default false,
  insurance_status     text,               -- have / willing to obtain / none
  police_check_consent boolean default false,
  portfolio_url        text,               -- Instagram / website
  availability         text,
  resume_url           text,               -- path in the `resumes` storage bucket
  cover_note           text,
  status               application_status default 'new',
  created_at           timestamptz default now()
);

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_status_idx on public.applications (status);

-- Applications are written server-side (service role) and read only by staff.
alter table public.applications enable row level security;

-- Private storage bucket for uploaded resumes.
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

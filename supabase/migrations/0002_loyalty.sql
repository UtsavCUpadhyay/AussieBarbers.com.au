-- AussieBarbers loyalty / members portal
-- Earn 5 points per completed haircut; 20 points = 1 free haircut.
-- Rewards are non-transferable (tied to the individual member).

create table if not exists public.members (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  email          text unique not null,
  phone          text,
  points         int default 0,
  visits         int default 0,
  rewards_earned int default 0,
  rewards_used   int default 0,
  joined_at      timestamptz default now()
);

-- Immutable log of every points movement, so a balance is always auditable.
create type points_reason as enum ('visit', 'reward_redeemed', 'adjustment', 'signup_bonus');

create table if not exists public.points_ledger (
  id         uuid primary key default gen_random_uuid(),
  member_id  uuid references public.members(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  delta      int not null,
  reason     points_reason not null,
  created_at timestamptz default now()
);

create index if not exists points_ledger_member_idx on public.points_ledger (member_id, created_at desc);

-- Link a booking to the member who earned it (nullable for guest bookings).
alter table public.bookings
  add column if not exists member_id uuid references public.members(id) on delete set null;

-- Award points when a booking is marked completed, and roll 20 pts into a reward.
create or replace function public.award_points_on_completion()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed'
     and new.member_id is not null then
    update public.members
      set points = points + 5,
          visits = visits + 1
      where id = new.member_id;

    insert into public.points_ledger (member_id, booking_id, delta, reason)
      values (new.member_id, new.id, 5, 'visit');

    -- Convert every full 20 points into a free-haircut reward.
    update public.members
      set rewards_earned = rewards_earned + (points / 20),
          points = points % 20
      where id = new.member_id and points >= 20;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_award_points on public.bookings;
create trigger trg_award_points
  after update on public.bookings
  for each row execute function public.award_points_on_completion();

-- RLS: members are read/written server-side (service role) only.
alter table public.members enable row level security;
alter table public.points_ledger enable row level security;

-- Run this once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).

create table signboard_notes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  x_pct numeric not null,       -- horizontal position, 0-100 (% of board width)
  y_pct numeric not null,       -- vertical position, 0-100 (% of board height)
  rotation numeric not null,    -- slight tilt in degrees, for a handwritten feel
  color text not null,          -- which note color was used
  created_at timestamptz not null default now()
);

-- Row Level Security: guests can read every note and add their own,
-- but nobody (not even a guest who knows the API key) can edit or
-- delete someone else's note, or anyone else's.
alter table signboard_notes enable row level security;

create policy "Anyone can read notes"
  on signboard_notes for select
  using (true);

create policy "Anyone can add a note"
  on signboard_notes for insert
  with check (
    char_length(name) <= 60
    and char_length(message) <= 280
  );

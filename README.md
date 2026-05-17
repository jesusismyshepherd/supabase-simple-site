# Supabase Simple Site

A minimal website that reads and writes messages to a Supabase database.

## Setup

1. Create a `messages` table in your Supabase project:

```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  created_at timestamptz default now()
);

alter table messages enable row level security;
create policy "public read" on messages for select using (true);
create policy "public insert" on messages for insert with check (true);
```

2. Set environment variables (in Vercel or `.env`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Deploy

Push to GitHub and connect the repo to Vercel. Add the env vars in Vercel project settings.

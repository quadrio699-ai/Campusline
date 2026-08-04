# CampusLine

Registration-season tips and a direct, anonymous line for LASU students to raise concerns — built by Marvellous Al-ameen, candidate for SUG President.

## 1. Set up the database (Supabase)

Create a **new, separate** Supabase project for this (don't reuse the GasWatch one). Then, in your project's SQL Editor, run:

```sql
create table concerns (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  message text not null,
  name text,
  matric_number text,
  is_anonymous boolean not null default false,
  created_at timestamptz not null default now()
);

alter table concerns enable row level security;

create policy "Anyone can submit a concern"
on concerns for insert
to anon
with check (true);
```

That last part matters: it lets anyone submit a concern through the site, but doesn't let anyone *read* the list back through the public key — so submissions stay private. You'll read them yourself later through the Supabase dashboard's Table Editor (Table Editor → concerns), logged in with your own account.

## 2. Connect the site to your database

Copy `.env.example` to a new file called `.env.local`, then fill in your project's **Project URL** and **Publishable/anon key** from Supabase (Settings → API → "Publishable and secret API keys" tab). Never put the secret key here — this file only needs the public one.

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Try submitting the concern form and check it shows up in Supabase's Table Editor.

## 4. Before you deploy

- Swap in the real LASU registration tips/dates in `components/RegistrationHelp.tsx` once you have them — what's there now is general, evergreen guidance.
- Once you know your live domain (e.g. `campusline.vercel.app` or a custom domain), replace the placeholder `siteUrl` value in three files: `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`. This is what search engines and shared links will use.
- Double check the footer's contact email is the one you want public.

## 5. Deploy (free, on Vercel)

1. Push this project to a new GitHub repository.
2. Go to vercel.com, sign in with GitHub, and click "Add New Project" → import the repo.
3. In the project's Environment Variables settings, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the same values from your `.env.local`.
4. Deploy. You'll get a free `.vercel.app` link — that's what goes on your QR code/poster.

## What's already handled for SEO

- Unique title, meta description, Open Graph, and Twitter card tags (`app/layout.tsx`)
- JSON-LD structured data describing the site and the candidate
- Auto-generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`)
- One clear heading per section, semantic HTML throughout
- Mobile-first, responsive layout
- No `meta keywords` tag — Google ignores it, so it's left out on purpose

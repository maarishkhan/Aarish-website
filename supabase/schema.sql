create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  headline text not null,
  bio text not null,
  university text not null,
  location text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists research_interests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  description text not null,
  keywords text[] not null default '{}',
  icon text,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists research_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  description text not null,
  research_question text,
  motivation text,
  methodology text,
  results text,
  research_area text,
  technologies text[] not null default '{}',
  datasets text[] not null default '{}',
  advisor text,
  institution text,
  start_date text,
  end_date text,
  status text not null default 'Ongoing',
  featured boolean not null default false,
  tags text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  authors text[] not null default '{}',
  publication_type text not null,
  journal text,
  conference text,
  publication_date text,
  abstract text not null,
  keywords text[] not null default '{}',
  doi text,
  pdf_url text,
  external_url text,
  citation text not null,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  organization text not null,
  location text,
  description text not null,
  start_date text,
  end_date text,
  is_current boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text not null,
  field text,
  location text,
  description text,
  start_date text,
  end_date text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  proficiency integer,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  category text,
  year text,
  description text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists presentations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  presentation_type text,
  event text,
  location text,
  date text,
  description text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  content text,
  category text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row level security
-- The public site reads content with the anon key, so visitors may read ONLY published
-- rows. All writes go through the server using the service-role key, which bypasses RLS,
-- so no insert/update/delete policies are defined: the anon key can never modify data.
-- Safe to re-run.
-- ---------------------------------------------------------------------------

do $$
declare
  t text;
begin
  foreach t in array array[
    'research_interests', 'research_projects', 'publications', 'experiences',
    'education', 'skills', 'awards', 'presentations', 'blog_posts'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "Public can read published rows" on %I', t);
    execute format('create policy "Public can read published rows" on %I for select using (published = true)', t);
  end loop;
end $$;

-- Site settings hold the public site content, so they are readable by anyone.
alter table site_settings enable row level security;
drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings" on site_settings for select using (true);

-- Private tables: RLS on with no policies = no access except via the service-role key.
alter table profiles enable row level security;
alter table admin_users enable row level security;

create table if not exists profile_entries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('conference', 'certification', 'leadership', 'presented_at', 'recognized_by')),
  name text not null,
  role text default '',
  note text default '',
  display_order integer default 0
);

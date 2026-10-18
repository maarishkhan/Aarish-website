# Biomedical Engineering Researcher Website

A production-oriented academic and research portfolio built with Next.js, TypeScript, Tailwind CSS, and Supabase-ready architecture for future admin and AI capabilities.

## Overview

This project is structured as a reusable template for a Biomedical Engineering researcher profile. It is designed to support:

- academic portfolio presentation
- research project and publication management
- administrative content editing via a protected dashboard
- future AI-powered research assistance using RAG and pgvector
- Vercel-friendly deployment with free-tier assumptions

Personal information is stored as editable configuration and database content, not hard-coded into pages.

## Project architecture

- App Router frontend in `app/`
- Reusable UI in `components/`
- Central configuration/data in `data/`
- Server-side utility layer in `lib/`
- Supabase-ready schema and migration guidance in `supabase/`

## Technology stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS
- Supabase + PostgreSQL
- Zod validation
- Vercel deployment target

## Free-tier assumptions

Target hosting cost: $0 for standard personal site traffic.

- Website hosting: Vercel free tier
- Database: Supabase free tier
- Authentication: Supabase Auth free tier
- Source control: GitHub free tier
- AI inference: Provider dependent, not included by default
- Custom domain: optional and may require paid registrar or domain purchase

## Local development

```bash
npm install
npm run dev
```

Then visit:

- http://localhost:3000

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Never commit `.env.local`.

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, link previews |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Reading content in production |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only: saving admin edits, image uploads, admin allow-list (never expose to the browser) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin login. There are no defaults: login stays disabled until set |
| `ADMIN_SESSION_SECRET` | Signs admin session cookies. 16+ random characters (`openssl rand -hex 32`). Required in production |
| `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL` | Optional live LLM for Research AI (`anthropic`, `openai` or `gemini`) |

## Supabase setup

1. Create a Supabase project and copy the URL, anon key and service-role key.
2. In the SQL editor, run [supabase/schema.sql](supabase/schema.sql). It creates the tables and enables Row Level Security: visitors can read only published rows, and only the server (service-role key) can write. The script is safe to re-run.
3. Add admin users: set `ADMIN_EMAIL`, or insert rows into `admin_users`. A Supabase Auth account that is not on this list cannot sign in to the admin area.
4. Uploaded images are stored in a public Supabase Storage bucket named `site-uploads`, created automatically on first upload.

## Deploying to Vercel

1. Import the GitHub repository in Vercel.
2. Add every variable from the table above under Project Settings, Environment Variables (Production).
3. Run `supabase/schema.sql` in Supabase (step 2 above) before the first deploy.
4. Deploy, then check: `/admin/editor` redirects to the login page when signed out; signing in works; a profile edit and an image upload persist after a refresh; `/sitemap.xml` and `/robots.txt` load.

Without the Supabase variables the site still renders from the built-in data, but admin edits and uploads only work locally (Vercel's file system is read-only).

## Content

- Profile, navigation, section toggles and images: admin editor at `/admin/editor`.
- Projects, publications, experience, education, skills, awards, presentations and blog posts: Supabase tables (defaults live in `data/site-config.ts`).
- The CV page is generated from the same data; extra CV-only entries (conferences, certifications, leadership) are in `data/cv-extras.ts`.

## Research AI

`/research-ai` answers questions using only the website's own content (`lib/ai/knowledge.ts`). Without an API key it uses built-in keyword search over that content. With `AI_PROVIDER` and `AI_API_KEY` set, a model writes the answer from the same content, and the app falls back to keyword search if the model call fails. Requests are rate-limited and capped at 500 characters.

## Security notes

- Admin sessions are signed, expiring cookies; the dashboard and the editor action both check them.
- Uploads are limited to JPEG, PNG, WebP and GIF files under 5 MB.
- Keep the service-role key server-side only.

## Troubleshooting

- If the app does not load, verify `.env.local` values are correct.
- If the build fails, run `npx tsc --noEmit` for TypeScript diagnostics.
- If Supabase is not configured, public pages should still render using sample data.
- If AI configuration is absent, “Research AI is currently unavailable” messaging should be shown rather than failing the page.

## License

This project is intended for educational and research portfolio use. Add a license file before production deployment if you plan to distribute or publish it publicly.

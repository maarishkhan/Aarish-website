# Biomedical Engineering Researcher Website

A production-oriented academic and research portfolio built with Next.js, TypeScript, Tailwind CSS, and Supabase-ready architecture for future admin and AI capabilities.

## Overview

This project is structured as a reusable template for a Biomedical Engineering researcher profile. It is designed to support:

- academic portfolio presentation
- research project and publication management
- administrative content editing via a protected dashboard
- future AI-powered research assistance using RAG and pgvector
- Vercel-friendly deployment with free-tier assumptions

All personal information is represented as editable configuration and sample data, with clear placeholders to avoid presenting fictional information as real.

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

Copy `.env.example` to `.env.local` and update the values as needed.

```bash
cp .env.example .env.local
```

Required for the site to run without AI features:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional:

- `SUPABASE_SERVICE_ROLE_KEY`
- `AI_PROVIDER`
- `AI_MODEL`
- `AI_API_KEY`
- `EMBEDDING_MODEL`

## Supabase setup

1. Create a Supabase project.
2. Set the URL and anon key in `.env.local`.
3. Apply SQL migrations under `supabase/migrations/`.
4. Configure Row Level Security for public and admin access.

## Database migration and seed guidance

The project includes a migration-ready structure to support tables for:

- profiles
- research_interests
- research_projects
- publications
- experiences
- education
- skills
- awards
- presentations
- blog_posts
- social_links
- site_settings
- admin_users

Keep SQL schema definitions in `supabase/migrations/` and sample configuration in `data/`.

## Admin authentication

The admin experience is intended to use Supabase Auth. Protect the dashboard routes and restrict database writes to authenticated, authorized administrator users.

## AI/RAG architecture

The AI layer is designed around a server-only interface:

- `lib/ai/provider.ts`
- `lib/ai/chat.ts`
- `lib/ai/embeddings.ts`
- `lib/ai/retrieval.ts`
- `lib/ai/prompts.ts`
- `lib/ai/types.ts`

This architecture isolates the frontend from provider-specific logic and supports future OpenAI/Gemini/Anthropic or local model integration.

## Security and content integrity

- Never expose credentials to the browser.
- Validate all forms and external input with Zod.
- Use Supabase RLS for public/admin separation.
- Keep the website functional without AI configuration.
- Show friendly configuration messages when AI is unavailable.

## Deployment

This app is designed to be deployed to Vercel, with reasonable portability to Cloudflare or similar hosting later.

### Vercel

```bash
npm run build
npm run start
```

## Troubleshooting

- If the app does not load, verify `.env.local` values are correct.
- If the build fails, run `npx tsc --noEmit` for TypeScript diagnostics.
- If Supabase is not configured, public pages should still render using sample data.
- If AI configuration is absent, “Research AI is currently unavailable” messaging should be shown rather than failing the page.

## License

This project is intended for educational and research portfolio use. Add a license file before production deployment if you plan to distribute or publish it publicly.
# Aarish-website
# Aarish-website

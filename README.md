# Ambika Home Decor Surat

Next.js 15 App Router project for a luxury home decor showcase website.

## Stack

- Next.js 15 + TypeScript
- TailwindCSS
- Supabase client setup

## Routes

- `/` Home with responsive navbar, hero placeholder, and footer
- `/collection`
- `/gallery`
- `/about`
- `/contact`
- `/admin/dashboard`

## Setup

```bash
npm install
npm run dev
```

Copy env template:

```bash
cp .env.example .env.local
```

Required env variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

# Architecture — BEWEAR

A Next.js 15 (App Router) e-commerce with a strict server/client boundary, a
Drizzle/Postgres data layer, Server Actions for mutations and TanStack Query on
the client. This document describes the system, its boundaries and the key flows.

## System overview

```
                ┌─────────────────────────────────────────────┐
   Browser ───► │  Next.js App Router (Vercel)                │
                │                                             │
                │  Server Components ──read──► Drizzle ──► Postgres (Neon)
                │      │                         ▲           │
                │      │ render HTML/RSC         │           │
                │      ▼                         │           │
                │  Client Components             │           │
                │   ├─ TanStack Query ──► Server Actions ────┘ (mutations)
                │   └─ UI (shadcn/ui + Tailwind v4)          │
                │                                             │
                │  Route handlers: /api/auth (Better Auth),  │
                │                  /api/stripe/webhook        │
                └──────────────┬──────────────────────────────┘
                               │
                  Stripe (checkout/payments) · Better Auth (sessions)
```

## Server / client boundary

- **Server Components** (default) read data directly via Drizzle (`@/db`) using
  the relational API. Pages that need data are `async`. Catalog reads go through
  cached helpers in `src/db/queries.ts` (`unstable_cache`, tag `catalog`).
- **Client Components** (`"use client"`) handle interactivity. They never `fetch`
  raw; server data/state flows through **TanStack Query** hooks in
  `src/hooks/queries` (reads) and `src/hooks/mutations` (writes → Server Actions).
- **Mutations** live in `src/actions/<name>/` as `index.ts` (`"use server"`) plus
  a Zod `schema.ts`. Each action validates input → checks the Better Auth session
  → runs the DB write → `revalidatePath` when needed → returns a typed result.

## Data flow (read)

1. A Server Component (e.g. PLP/PDP) calls a cached query in `src/db/queries.ts`.
2. Drizzle issues a scoped relational query to Postgres (Neon).
3. The RSC renders; the home is statically generated with ISR (`revalidate`),
   PLP/PDP render dynamically but reuse the cached catalog reads.

## Mutation flow (write)

1. A Client Component submits via React Hook Form (`zodResolver`).
2. The submit calls a TanStack **mutation** hook, which invokes the **Server
   Action**.
3. The action re-validates with Zod, authenticates the session, writes via
   Drizzle, and revalidates affected paths. The hook invalidates the relevant
   query keys; Sonner shows feedback.

## Payment flow (Stripe)

1. On checkout, a Server Action creates a Stripe Checkout Session (amounts in
   **cents**, USD), applying any validated coupon discount to the total.
2. The client is redirected to Stripe; on success it returns to
   `/checkout/success`.
3. Stripe calls `/api/stripe/webhook`; the handler marks the order paid.

## Auth

Better Auth (`@/lib/auth`) manages sessions via `/api/auth/[...all]`. Every
sensitive action/query resolves the session with
`auth.api.getSession({ headers })` and scopes data by `userId` — client-provided
ids are never trusted.

## SEO surfaces

`app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, per-page `generateMetadata`
(canonical + OpenGraph), and JSON-LD (`WebSite`, `BreadcrumbList`, `Product`).
Base URL comes from `NEXT_PUBLIC_SITE_URL` (`src/lib/site.ts`).

## Quality gates

- **Types**: TypeScript strict, zero `any`.
- **Unit tests** (Vitest): helpers (money, sizes, coupon, gallery), US states and
  Zod schemas — `src/**/*.test.ts`.
- **E2E** (Playwright): browse and search flows — `e2e/`.
- **CI** (GitHub Actions): lint · typecheck · unit tests, plus a build job.

## Key directories

See `.cursor/rules/bewear.mdc` for the full map. In short: `src/app` (routes),
`src/actions` (mutations), `src/db` (schema/queries), `src/components/ui`
(shadcn) and `src/components/common` (domain), `src/hooks/{queries,mutations}`,
`src/lib` (auth, utils, site), `src/helpers` (pure functions).

## Decision records

See [`docs/adr/`](adr/) for architecture decision records.

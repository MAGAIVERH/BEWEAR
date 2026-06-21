# ADR 0001 — Drizzle ORM over Prisma

**Status:** Accepted · **Date:** 2026-06

## Context

We need a typed data layer for Postgres (Neon) that works cleanly inside Next.js
Server Components and Server Actions, with predictable SQL and low runtime
overhead at the edge/serverless.

## Decision

Use **Drizzle ORM** with the relational query API (`db.query.*` + `with`/`columns`)
as the single data layer. Migrations are managed with `drizzle-kit`.

## Consequences

- Thin, SQL-first ORM with first-class TypeScript inference (`$inferSelect`);
  enums and table types are derived from `schema.ts`, never duplicated.
- No separate client generation step or heavy runtime as with Prisma.
- Schema changes are applied with `drizzle-kit push` in this project (see the
  team note: `migrate` was blocked by an empty `__drizzle_migrations`).
- Trade-off: a smaller ecosystem than Prisma; we accept it for the simpler model
  and tighter Server Component fit.

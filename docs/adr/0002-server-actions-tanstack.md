# ADR 0002 — Server Actions for mutations, TanStack Query on the client

**Status:** Accepted · **Date:** 2026-06

## Context

Reads are best served by Server Components hitting the DB directly. Writes need
validation, authentication and cache revalidation, while the client needs
optimistic-friendly state and loading/feedback handling.

## Decision

- **Reads:** Server Components query Drizzle directly (cached for catalog data).
- **Writes:** one **Server Action** per mutation in `src/actions/<name>/`
  (`index.ts` + Zod `schema.ts`). Flow: validate → check session → write →
  `revalidatePath` → return typed result.
- **Client state:** **TanStack Query** — `hooks/queries` for reads,
  `hooks/mutations` for writes (which call the actions). No raw `fetch` in
  components; forms use React Hook Form + `zodResolver` reusing the action schema.

## Consequences

- A single validation source (the action's Zod schema) shared by form, hook and
  server. Session is always checked server-side; client ids are never trusted.
- Consistent feedback via Sonner and `isPending` states.
- Trade-off: a little boilerplate per mutation (folder + schema + hook), accepted
  for clarity and testability.

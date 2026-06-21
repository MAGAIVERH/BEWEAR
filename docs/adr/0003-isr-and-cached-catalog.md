# ADR 0003 — ISR for the home, cached catalog reads for dynamic pages

**Status:** Accepted · **Date:** 2026-06

## Context

The catalog is effectively read-only at runtime (no in-app product mutations).
The home has no per-request state, but PLP/PDP depend on `searchParams`/session
and therefore render dynamically — yet they shouldn't hit Postgres on every
request.

## Decision

- **Home:** statically generated with **ISR** (`export const revalidate = 3600`).
- **PLP/PDP/search:** remain dynamic, but all catalog reads go through
  `src/db/queries.ts` wrapped in **`unstable_cache`** (`revalidate: 3600`, tag
  `catalog`). A future admin mutation can call `revalidateTag("catalog")`.

## Consequences

- Fresh data without a rebuild; dynamic pages avoid redundant DB round-trips.
- Independent queries are parallelized with `Promise.all`.
- Trade-off: data can be up to ~1h stale; acceptable for a catalog and tunable
  per query.

See [`docs/performance.md`](../performance.md) for measurements.

# Performance — BEWEAR (Fase C)

Documento vivo das otimizações de performance, metas e como medir. Régua: **Lighthouse 90+**
em Performance, Accessibility, Best Practices e SEO, com **LCP** e **CLS** controlados.

---

## O que foi feito (Fase C)

### 1. Dynamic import de componentes pesados fora da dobra

- `ImpactSection` (client, motion + vídeo) é carregado via `next/dynamic` na home, então seu
  JavaScript fica em um chunk separado e não pesa no bundle inicial.
- Componentes editoriais da home (`CampaignGrid`, `SplitEditorial`, `EditorialBanner`,
  `FeatureCards`, `Brands`) já são **Server Components** (zero JS no cliente).

### 2. Auditoria de `next/image`

- **`sizes`** corretos em todas as imagens `fill` (hero/banners `100vw`; grids com breakpoints;
  thumbs com largura fixa em px).
- **`priority`** apenas no que está acima da dobra (1º slide do hero, imagem principal da PDP).
- **`placeholder="blur"`** com um blur placeholder neutro compartilhado
  (`src/helpers/image.ts` → `BLUR_DATA_URL`) em todas as imagens raster (produto, hero,
  banners, cart, pedidos) — reduz CLS e o "flash" branco no carregamento.
- **Formatos modernos**: `next.config.ts` serve **AVIF/WebP** automaticamente
  (`images.formats`). Não há conversão manual de assets — o pipeline do `next/image` entrega
  o menor formato suportado por requisição.

### 3. ISR / cache de catálogo (dados frescos sem rebuild)

- **Home**: `export const revalidate = 3600` → renderizada estaticamente e revalidada a cada 1h
  (ISR). Confirmado no build: rota `/` marcada como **Static**, `Revalidate 1h`.
- **PLP / PDP** são dinâmicas (dependem de `searchParams` / sessão), então as **leituras de
  catálogo** foram centralizadas em `src/db/queries.ts` com `unstable_cache`
  (`revalidate: 3600`, tag `catalog`). Isso evita ida ao Postgres a cada request mesmo nas
  páginas dinâmicas. Uma futura mutação de admin pode chamar `revalidateTag("catalog")`.
- Consultas independentes paralelizadas com `Promise.all` (home: 3 queries; PDP: stock +
  reviews + sessão).

### 4. Streaming + Suspense com skeletons

- `loading.tsx` em **home**, **PDP** e **search** (PLP já tinha) → shell instantâneo durante a
  navegação.
- Na **PDP**, a seção "You might also like" foi extraída para um componente assíncrono
  (`RelatedProducts`) dentro de `<Suspense>` com `ProductRailSkeleton`, removendo essa query do
  caminho crítico — o conteúdo principal do produto pinta primeiro e os relacionados fazem
  stream em seguida.
- Skeleton reutilizável: `src/components/common/product-rail-skeleton.tsx`.

### 5. Bundle analysis

- `@next/bundle-analyzer` ligado em `next.config.ts` (flag `ANALYZE`).
- Rodar: `pnpm analyze` (abre os relatórios HTML interativos client/server).

---

## Snapshot do build (`pnpm build`)

> Atualizar quando o catálogo/UI mudar de forma relevante.

```
Route (app)                                 Size  First Load JS  Revalidate  Expire
┌ ○ /                                    44.8 kB         299 kB          1h      1y   (Static, ISR)
├ ○ /about                               1.64 kB         248 kB
├ ○ /authentication                       5.3 kB         254 kB
├ ƒ /category/[slug]                     3.42 kB         250 kB        (Dynamic)
├ ○ /help                                4.14 kB         253 kB
├ ƒ /product-variant/[slug]              7.59 kB         264 kB        (Dynamic)
├ ƒ /search                              2.18 kB         249 kB        (Dynamic)
└ ƒ /wishlist                            2.18 kB         249 kB
+ First Load JS shared by all             100 kB
```

`○ (Static)` = pré-renderizado · `ƒ (Dynamic)` = renderizado sob demanda.

---

## Metas (régua Nike / internacional)

| Métrica            | Meta      |
| ------------------ | --------- |
| Performance        | ≥ 90      |
| Accessibility      | ≥ 90      |
| Best Practices     | ≥ 90      |
| SEO                | ≥ 90      |
| LCP                | < 2.5s    |
| CLS                | < 0.1     |
| TBT                | < 200ms   |

---

## Como medir

### Lighthouse (recomendado: build de produção)

```bash
pnpm build
pnpm start          # serve em http://localhost:3000
```

Depois, em outra aba/terminal:

- **Chrome DevTools** → aba *Lighthouse* → *Analyze page load* (modo *Navigation*, *Mobile*).
- ou **CLI**:
  ```bash
  npx lighthouse http://localhost:3000 --view --preset=desktop
  npx lighthouse http://localhost:3000/category/sneakers --view
  npx lighthouse http://localhost:3000/product-variant/<slug> --view
  ```

Medir sempre em **produção** (`pnpm build && pnpm start`) — o modo `dev` não reflete os números
reais (sem minificação, com HMR).

### Bundle analyzer

```bash
pnpm analyze
```

---

## Resultados Lighthouse (preencher após rodar)

| Página                  | Perf | A11y | BP  | SEO | LCP | CLS | Data |
| ----------------------- | ---- | ---- | --- | --- | --- | --- | ---- |
| Home `/`                |      |      |     |     |     |     |      |
| PLP `/category/[slug]`  |      |      |     |     |     |     |      |
| PDP `/product-variant/` |      |      |     |     |     |     |      |

> Salvar os relatórios HTML/JSON em `docs/lighthouse/` ao gerar.

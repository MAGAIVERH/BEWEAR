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

## Resultados Lighthouse

**Medição:** 2026-06-21 · Lighthouse mobile (preset padrão: slow-4G + 4× CPU throttling) ·
build de produção via `next start` em `localhost:3100` · Chrome headless.
Relatórios HTML/JSON completos em [`docs/lighthouse/`](lighthouse/) (`home`, `plp`, `pdp`).

| Página                                  | Perf | A11y | BP  | SEO | LCP   | CLS   | TBT     | FCP   |
| --------------------------------------- | ---- | ---- | --- | --- | ----- | ----- | ------- | ----- |
| Home `/`                                | 54   | 100  | 96  | 100 | 7.7 s | 0     | ~2.0 s  | 1.1 s |
| PLP `/category/accessories`             | 74   | 100  | 96  | 100 | 3.4 s | 0     | 670 ms  | 1.1 s |
| PDP `/product-variant/backpack-black`   | 69   | 100  | 96  | 100 | 4.4 s | 0     | 760 ms  | 1.1 s |

> **A11y 88–90 → 100** após a **Fase D** (landmark `<main>`, `aria-label` em botões só-ícone,
> `role="img"` no rating, ordem de headings, contraste do eyebrow, target-size dos dots).

### Leitura dos resultados

- ✅ **CLS = 0** em todas as páginas (blur placeholders + dimensões reservadas funcionaram).
- ✅ **A11y 100 · SEO 100 · Best Practices 96** em todas as páginas.
- ✅ **FCP ~1.1 s** consistente — o shell pinta rápido.
- ⚠️ **Performance abaixo de 90** (Home 54 · PLP 74 · PDP 69), puxada por **LCP** e **TBT**.

### Causa raiz (Home)

- **Peso total ~10 MB**, dominado por **dois vídeos autoplay**: `public/hero.mp4` (~4 MB, acima da
  dobra) e `public/home/impact.mp4` (~4,7 MB, abaixo da dobra). Sob o throttling de slow-4G do
  laboratório isso empurra o **LCP para 7.7 s**.
- **Main-thread work ~9.3 s / bootup ~3.1 s** — custo de hidratação das libs de motion
  (Framer Motion + Lenis + Embla) presentes na home.

> ⚠️ **Contexto de medição:** números de **laboratório local** (`next start` num notebook, com
> throttling agressivo mobile). O alvo canônico é o **deploy de produção na Vercel** (CDN/edge,
> compressão e cache de borda), onde LCP/TBT tendem a melhorar de forma relevante. Re-medir o site
> publicado e atualizar esta tabela.

### Backlog de performance (caminho até 90+)

Itens fora do escopo já entregue da Fase C — candidatos a um `perf:` dedicado:

1. **Vídeo do hero (maior alavanca de LCP):** comprimir/encurtar o `.mp4` (alvo < 1,5–2 MB) e/ou
   tratar o **poster otimizado como LCP** (carregar o vídeo só depois). Avaliar `preload="none"`.
2. **Vídeo do impact (abaixo da dobra):** montar/autoplay só ao entrar na viewport
   (IntersectionObserver) para tirar ~4,7 MB do carregamento inicial.
3. **Reduzir JS de motion na dobra:** carregar `Reveal`/Lenis de forma mais preguiçosa para baixar o TBT.
4. **Servir mídia por CDN** (já vale para imagens remotas; estender a vídeos) e medir na Vercel.

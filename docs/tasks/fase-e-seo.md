# Fase E — SEO técnico

**Data:** 2026-06-21
**Fase:** Fase E — SEO técnico
**Branch:** `feat/fase-e-seo`
**Status:** ✅ concluído (código verificado em build de produção)

---

## 🎯 Objetivo

Tornar o site totalmente indexável e com preview rico ao compartilhar qualquer rota: favicon da
marca, metadata por página, sitemap/robots, OG/Twitter e JSON-LD.

## 📋 Tarefas

- [x] **Favicon da marca**: `src/app/icon.svg` (monograma "B") substituindo o triângulo padrão do
      Next (`favicon.ico` removido). Aparece na aba do navegador.
- [x] **Config central de site** (`src/lib/site.ts`): `SITE_URL` (via `NEXT_PUBLIC_SITE_URL`),
      nome, título e descrição.
- [x] **Metadata global** (`layout.tsx`): `metadataBase`, `title.template` `%s | BEWEAR`,
      OpenGraph + Twitter padrão, imagem OG default.
- [x] **`generateMetadata`** por página: PLP (category), PDP, search (`noindex`); home/about/help
      com canonical e títulos alinhados ao template.
- [x] **`app/robots.ts`**: allow geral + disallow de rotas privadas/transacionais; link do sitemap.
- [x] **`app/sitemap.ts`**: rotas estáticas + categorias + product-variants do DB (ISR 1h).
- [x] **JSON-LD**: `WebSite` (+ SearchAction) global; `BreadcrumbList` via componente `Breadcrumbs`
      (PLP/PDP); `Product` na PDP (já existente) preservado.
- [x] **Canonical** por página (sem vazar `/` global).

## 🧱 Arquivos tocados

- `src/lib/site.ts` (novo) · `src/app/icon.svg` (novo) · `src/app/robots.ts` (novo) ·
  `src/app/sitemap.ts` (novo)
- `src/app/layout.tsx` (metadata + WebSite JSON-LD)
- `src/components/common/breadcrumbs.tsx` (BreadcrumbList JSON-LD)
- `src/app/page.tsx`, `about/page.tsx`, `help/page.tsx`,
  `category/[slug]/page.tsx`, `search/page.tsx`, `product-variant/[slug]/page.tsx` (metadata)
- removido `src/app/favicon.ico` (triângulo padrão)

## ✅ Critério de Done

- [x] `npx tsc --noEmit` limpo · `pnpm build` ok (18 páginas, `/robots.txt` + `/sitemap.xml`)
- [x] Verificado em `next start`: sitemap (72 URLs) válido, `icon.svg` 200, canonical/OG/JSON-LD
      presentes em home/PLP/PDP, search com `noindex`.

## 🧩 Decisões & aprendizados

- `SITE_URL` usa `NEXT_PUBLIC_SITE_URL` com fallback `https://bewear.vercel.app` — **definir a env
  com o domínio real no deploy** para canonicals/sitemap corretos.
- O `canonical` global foi **removido do layout** (vazava `/` para todas as páginas); cada página
  define o seu.
- Títulos das páginas passaram a ser só o nome (sem `| BEWEAR`) porque o `title.template` já
  adiciona o sufixo — evita duplicação.
- Durante a verificação, um `.next` corrompido (artefatos Pages Router de builds/dev anteriores)
  causava erros em runtime; `rm -rf .next` + rebuild resolveu. Não era problema de código.

## 🚧 Bloqueios / pendências

- Definir `NEXT_PUBLIC_SITE_URL` no ambiente de produção (Vercel).
- (Opcional) OG image dinâmica por produto via `next/og` (hoje usa a imagem do produto / poster).

## ⏭️ Próximo passo

Fase F — Qualidade, arquitetura & testes (Vitest, Playwright, CI).

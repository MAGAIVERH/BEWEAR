# Guia de Desenvolvimento — BEWEAR

**Para:** Magaiver (desenvolvedor / dono do produto)
**Papel deste documento:** roadmap vivo e plano de ação. Atualizado continuamente; consultar antes de cada fase.
**Objetivo:** entregar um **e-commerce/marketplace de nível internacional** que comprove, sem deixar dúvidas,
domínio de **front-end** (UI/UX, design system, animação, acessibilidade, performance) e de **arquitetura**
full-stack (server/client boundaries, dados, validação, pagamentos, SEO, testes, CI/CD).

**Mercado:** EUA. Produto **100% em inglês (en-US)**, moeda **USD**. Régua visual: **Nike** (nike.com).
**Stack:** Next.js 15 (App Router) · React 19 · TypeScript strict · Drizzle ORM + Postgres (Neon) ·
Tailwind v4 · shadcn/ui · Framer Motion · Lenis · Embla · React Hook Form + Zod · TanStack Query ·
Better Auth · Stripe · Sonner · pnpm.

> Regras invioláveis: `.cursor/rules/bewear.mdc` (resumo em `CLAUDE.md`). Cada dia/tarefa gera um log em
> `docs/tasks/`. Assets reais sempre solicitados antes de commit (`docs/assets-needed.md`).

---

## Padrões de qualidade (a régua — não negociável)

- **Zero `any`, zero erro de TS, lint limpo.** `pnpm build` deve passar antes de entregar.
- **Todo botão e todo link funcionam** — nenhum `href="#"` morto em produção.
- **Estados completos**: loading (skeleton), vazio, erro e sucesso em toda tela com dados.
- **Acessibilidade WCAG AA**: teclado, foco visível, `aria-*`, contraste, `prefers-reduced-motion`.
- **Responsivo impecável** em mobile/tablet/desktop.
- **Performance**: imagens otimizadas, code-splitting, Suspense/streaming, Lighthouse 90+.
- **UI tokenizada**: sem cor hardcoded; tudo em `globals.css`.
- **Arquitetura limpa**: Server Components leem do `db`; mutações em `actions/`; client via TanStack;
  fronteiras server/client corretas.

---

## ✅ Estado atual (concluído)

**Fase 0 — Fundação**
- [x] Regras, guia, logs de tarefas; localização **en-US/USD** (UI, moeda, checkout US, seed em inglês)
- [x] Design system: paleta **preto/branco + acento** (`--brand`), tipografia editorial, `container-bw`
- [x] Animação: Framer Motion + Lenis + Embla; primitivos `Reveal`/`Container`/`SectionHeader`/`Marquee`

**Fase 1 — Home premium (nível Nike)**
- [x] **Hero carrossel** (vídeo + imagens) com anel de progresso, play/pause, setas e dots
- [x] Marcas (marquee infinito), **feature cards**, **editorial banner**, **campaign grid**,
      **impact em vídeo**, **split editorial**, **Trending** (curado, foto chapada) + logo/links
- [x] **Header** sticky **server-rendered** (sem flash) com nav centralizada + efeito hover Nike; footer rico

**Fase 2 — Listagem & busca**
- [x] PLP responsiva (grid, skeleton `loading.tsx`, estado vazio)
- [x] **Filtros & ordenação** (cor, faixa de preço, sort) com estado na URL
- [x] **Tamanhos** (schema `size` + PDP + carrinho + pedido)
- [x] **Busca** (header + página de resultados)

**Fase 3 — PDP**
- [x] Galeria **2 colunas** interativa (imagem + thumbnails), seletor de variante/cor, seletor de tamanho
- [x] Conteúdo em accordion (Details/Size & Fit/Shipping), **JSON-LD** + **Open Graph** por produto

**Fase 4 — Cart & Checkout**
- [x] Cart sheet polido (badge de contagem, estado vazio, totais)
- [x] Checkout em **2 colunas** com **steps** (Bag/Address/Payment), resumo sticky, "Place order"
- [x] Endereço US + **Stripe** (USD) + página de sucesso

**Fase 5 — Conta**
- [x] `my-orders` (cabeçalho, estado vazio, ordenação) + auth centralizado

---

# PLANO DE AÇÃO (o que falta) — nível internacional

> Ordem de prioridade. Cada item tem **Done**. Marcar `[x]` ao concluir e registrar log em `docs/tasks/`.

## FASE A — Robustez & navegação completa (PRIORIDADE)

**A1. Páginas institucionais + links funcionais**
- [ ] Criar páginas reais: `/help` (FAQ, Shipping & Returns, Contact), `/about`, `/contact`.
- [ ] Wire de **todos** os links do footer e da seção Trending (remover qualquer `#` morto).
- [ ] Redes sociais → URLs externas reais ou ocultar com elegância.
- **Done:** nenhum link morto no site; páginas com layout consistente (header/footer/container).

**A2. Estados globais de erro e 404**
- [ ] `not-found.tsx` global estilizado (CTA voltar à loja).
- [ ] `error.tsx` (boundary) global e por rota crítica, com retry.
- [ ] `loading.tsx` nas rotas que ainda não têm (home, PDP, search, my-orders).
- **Done:** nenhuma tela branca; erros e 404 tratados com a identidade do site.

**A3. Navegação & orientação**
- [ ] **Breadcrumbs** na PLP e PDP (Home › Categoria › Produto).
- [ ] **Recently viewed** (produtos vistos recentemente) — localStorage + faixa na home/PDP.
- **Done:** usuário sempre sabe onde está e volta fácil.

## FASE B — Funcionalidades de marketplace

**B1. Wishlist / Favoritos**
- [ ] Schema `wishlist`/`wishlist_item`; action add/remove; ícone de coração no card/PDP; página `/wishlist`.
- **Done:** favoritar persiste por usuário; contador no header (opcional).

**B2. Avaliações & ratings**
- [ ] Schema `review` (rating, comment, user, product); média no PDP; formulário (autenticado); estrelas no card.
- **Done:** PDP mostra rating médio + reviews; usuário logado avalia.

**B3. Estoque por tamanho (SKU real)**
- [ ] Evoluir modelo: estoque por (variante × tamanho); desabilitar tamanho sem estoque; "Out of stock".
- **Done:** seleção de tamanho reflete disponibilidade real.

**B4. Paginação / scroll infinito na PLP**
- [ ] Paginação por cursor ou load-more; manter filtros na URL.
- **Done:** catálogos grandes navegáveis sem travar.

**B5. Conta completa**
- [ ] `/account` (perfil), gestão de **endereços** (CRUD), **detalhe do pedido** (`/my-orders/[id]`), logout.
- **Done:** central do cliente comparável a grandes lojas.

**B6. Promoções / cupom (opcional v1.1)** ✅
- [x] Campo de cupom no checkout; desconto aplicado ao total/Stripe.

**B7. Newsletter real** ✅
- [x] Persistir e-mail (tabela/serviço) com validação e feedback.

## FASE C — Performance

- [x] **Dynamic import** de componentes client pesados (motion) fora da dobra (`ImpactSection`).
- [x] Auditar `next/image` (sizes, priority, placeholder/blur); AVIF/WebP via `next/image`
      (decisão: confiar no pipeline em vez de converter assets manualmente).
- [x] **ISR / revalidate** no catálogo: home com `revalidate=3600` (Static+ISR); leituras de
      catálogo cacheadas (`unstable_cache`, tag `catalog`) em `src/db/queries.ts`.
- [x] **Streaming + Suspense** com skeletons (`loading.tsx` home/PDP/search; relacionados da PDP
      em Suspense; `ProductRailSkeleton`).
- [x] Bundle analysis (`@next/bundle-analyzer` + `pnpm analyze`); metas **Lighthouse 90+** e guia
      de medição em `docs/performance.md`.
- **Done (parcial):** otimizações de código entregues e `pnpm build` ok; **falta rodar o
  Lighthouse** (build de produção) e salvar o relatório / preencher a tabela em `docs/performance.md`.

## FASE D — Acessibilidade & responsividade

- [ ] Navegação por **teclado** em toda UI (menus, carrosséis, dialogs, filtros).
- [ ] `aria-*` em ícones/inputs/dialogs; foco visível; contraste AA.
- [ ] Passar **axe DevTools**; corrigir issues críticas.
- [ ] QA responsivo em todos os breakpoints (mobile/tablet/desktop/ultrawide).
- **Done:** zero violação crítica de a11y; layout perfeito em todos os tamanhos.

## FASE E — SEO técnico

- [ ] `generateMetadata` em todas as páginas (PLP/category/search/home).
- [ ] `app/sitemap.ts` e `app/robots.ts`.
- [ ] OG default + por página; JSON-LD `BreadcrumbList` e `WebSite` (PDP `Product` já feito).
- **Done:** indexável, preview rico ao compartilhar qualquer rota.

## FASE F — Qualidade, arquitetura & testes

- [ ] **Testes unitários** (Vitest): helpers (money/sizes), schemas Zod, lógica de filtro/sort.
- [ ] **E2E** (Playwright): fluxos críticos (browse → add to cart com tamanho → checkout; busca; auth).
- [ ] **CI** (GitHub Actions): lint + typecheck + build + test em PR.
- [ ] **ADRs** e `docs/architecture.md` (diagrama do sistema, fronteiras server/client, fluxo de dados/pagamento).
- **Done:** CI verde; arquitetura documentada; testes nos caminhos que importam.

## FASE G — Entrega & portfólio

- [ ] **README staff-level**: problema, solução, arquitetura (diagrama), highlights de front-end,
      screenshots/GIFs, **demo ao vivo** (Vercel), métricas de performance, decisões/ADRs.
- [ ] **Vídeo demo** (60–90s) navegando a loja.
- [ ] Checklist final "FINALIZADO" 100%.
- **Done:** projeto que se apresenta sozinho a um recrutador internacional.

---

## Checklist final ("FINALIZADO")

- [ ] Todo link/botão funcional; 404/erro/loading tratados
- [ ] Wishlist, reviews, conta completa, paginação, estoque por tamanho
- [ ] Lighthouse 90+ (Perf/A11y/BP/SEO) documentado
- [ ] WCAG AA; responsivo impecável; reduced-motion
- [ ] SEO (metadata, sitemap, robots, JSON-LD, OG) em todas as rotas
- [ ] Testes (unit + E2E) e CI verde
- [ ] README sênior + arquitetura + demo ao vivo + vídeo
- [ ] `pnpm build` limpo; zero `any`; lint limpo

---

## Ordem de execução recomendada

```
A (robustez/links/erros)  →  B (marketplace: wishlist, reviews, conta, paginação)
→  C (performance)  →  D (a11y/responsivo)  →  E (SEO)  →  F (testes/CI/arquitetura)  →  G (entrega)
```

*Documento vivo — atualizar marcações e mover itens entre "concluído" e "plano" conforme avançamos.*
</content>

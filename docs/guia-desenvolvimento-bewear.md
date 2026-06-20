# Guia de Desenvolvimento — BEWEAR (do estado atual ao nível Nike)

**Para:** Magaiver (desenvolvedor executor)
**Papel deste documento:** seu tech lead / referência diária — você executa tudo aqui descrito.
**Objetivo:** elevar o BEWEAR (e-commerce de moda/streetwear já iniciado) a um nível de
**front-end equivalente ao da Nike** (https://www.nike.com) — tipografia, espaçamento, efeitos,
interatividade e polimento — para que um recrutador entenda, em segundos, que **você domina front-end**.

**Mercado-alvo:** **Estados Unidos**. Produto **100% em inglês (en-US)**, moeda **USD ($)**.
**Idioma deste guia:** português (instruções para o dev); **toda copy/UI/seed de exemplo em inglês**.

**Stack real (não inventar):** Next.js 15 (App Router) · React 19 · TypeScript strict ·
Drizzle ORM + PostgreSQL (Neon) · Tailwind v4 · shadcn/ui · lucide-react · Zod ·
React Hook Form · TanStack Query · Better Auth · Stripe · Sonner · pnpm.

> Regras detalhadas e invioláveis: ver `.cursor/rules/bewear.mdc` (também resumidas em `CLAUDE.md`).

---

## Como usar este guia

1. Antes de cada fase, **crie uma branch** (`feat/fase-[n]-[descricao]`). Nunca trabalhe na `main`.
2. Para cada dia de trabalho, crie um arquivo em `docs/tasks/dia-NN-descricao.md`
   (base: `docs/tasks/_template.md`). Ao terminar, marque o checklist e o critério **Done**.
3. Só avance de dia quando o **Done** estiver cumprido.
4. Antes de concluir qualquer dia: **zero erros de TypeScript** (`npx tsc --noEmit`) e **lint limpo** (`pnpm lint`).
5. Commits pequenos e claros (Conventional Commits). **Nunca** commitar/pushar sem o usuário pedir.
6. Ao fim da fase: abrir PR e aguardar confirmação do merge.

---

## Estado atual (baseline — o que já existe)

✅ Já implementado:
- Autenticação (Better Auth): sign-in / sign-up (`/authentication`).
- Schema Drizzle completo: `user`, `category`, `product`, `product_variant`, `shipping_address`,
  `cart`, `cart_item`, `order`, `order_item` (+ enum `order_status`).
- Home (`/`) com banner, marcas parceiras, "Mais vendidos", seletor de categoria, "Novos produtos".
- PLP por categoria (`/category/[slug]`).
- PDP por variante (`/product-variant/[slug]`) com seletor de variante e add-to-cart.
- Carrinho (Sheet + página), fluxo de checkout (`/cart` → identification → confirmation),
  Stripe (`create-checkout-session`, webhook), `my-orders`.
- Hooks TanStack (cart, addresses) e mutations (cart, shipping, finish-order).
- shadcn/ui instalado (button, card, sheet, dialog, form, tabs, etc.).

⚠️ Dívidas / gaps para o nível Nike:
- **Localização:** UI e dados estão em **pt-BR/BRL** → migrar para **en-US/USD**.
- **Visual:** layout funcional, porém sem a identidade editorial/premium da Nike.
- **Desktop:** praticamente só mobile; falta navbar completa, mega-menu, grids desktop.
- **Animação/interatividade:** sem smooth scroll, sem reveal on scroll, hover pobres.
- **Tipografia/tokens:** primary roxo genérico; falta hierarquia tipográfica forte.
- **Conteúdo:** seed com dados de exemplo; faltam coleções/categorias reais em inglês.

---

## Princípios "Nike" (a régua de qualidade)

| Princípio | O que significa na prática |
|-----------|----------------------------|
| Tipografia protagonista | Títulos grandes, peso black, `tracking-tight`; eyebrows uppercase com tracking largo |
| Respiro generoso | Seções com bastante espaço vertical; nada apertado; escala de espaçamento consistente |
| Imagem em primeiro plano | Fotografia full-bleed, `next/image`, proporções consistentes, hero com `priority` |
| Micro-interações | Hover com zoom suave na imagem, transições `duration-300 ease-out`, foco visível |
| Movimento com propósito | Reveal on scroll (stagger), smooth scroll (Lenis), sempre com `prefers-reduced-motion` |
| Preto/branco + 1 acento | Paleta neutra forte; cor de acento usada com parcimônia |
| Desktop impecável | Mobile-first, mas desktop rico: navbar, mega-menu, grids 3–4 colunas, hover states |
| Performance | Lighthouse alto; imagens otimizadas; sem layout shift; LCP rápido |

---

# FASE 0 — Fundação & Design System (Dias 1–4)

> **Por que primeiro?** Sem tokens, tipografia e localização definidos, toda tela construída depois
> precisaria ser refeita. Fixamos a base "Nike" antes de produzir telas.

## Dia 1 — Documentação, regras e setup do roadmap
**Objetivo:** ter as regras, o guia e o fluxo de tarefas no projeto.
**Fazer:**
- [ ] Criar `.cursor/rules/bewear.mdc` (regras do projeto). ✅ (feito)
- [ ] Criar `CLAUDE.md` na raiz (resumo das regras p/ Claude Code). ✅ (feito)
- [ ] Criar este guia em `docs/guia-desenvolvimento-bewear.md`. ✅ (feito)
- [ ] Criar `docs/tasks/_template.md` e `docs/tasks/dia-01-setup-docs.md`. ✅ (feito)
- [ ] Confirmar pendências da seção "O que preciso de você" nas regras.
**Done:** regras + guia + template + dia 01 versionados; pendências confirmadas com o usuário.

## Dia 2 — Localização en-US/USD (base)
**Objetivo:** o projeto fala inglês e cobra em dólar.
**Fazer:**
- [ ] Helper de dinheiro: criar `formatCentsToUSD` em `@/helpers/money`
      (`Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })`); substituir usos de `formatCentsToBRL`.
- [ ] Varrer a UI e traduzir todas as strings pt-BR → en-US (header, footer, cart, checkout, auth, my-orders).
- [ ] Endereço/checkout no padrão americano: `Full name`, `Address line 1/2`, `City`, **State (dropdown 50+DC)**,
      **ZIP code**, **Phone (555) 123-4567**. Remover campos BR (CPF/CNPJ → ajustar/retirar conforme regra de negócio).
- [ ] `lang="en"` no `<html>` (layout). Datas em `en-US` (`MM/DD/YYYY`).
**Done:** nenhuma string em português na UI; preços em `$`; checkout com campos americanos.

## Dia 3 — Tokens, paleta e tipografia (identidade Nike)
**Objetivo:** design system editorial em `globals.css`.
**Fazer:**
- [ ] Revisar paleta em `src/app/globals.css`: neutra (preto/branco/zinc) + **1 acento** (definir com o usuário).
      Ajustar `--primary` para preto forte (CTAs) se aprovado.
- [ ] Definir escala tipográfica: display (hero), h1–h3, body, caption — com pesos e tracking.
- [ ] Avaliar fonte display (ex.: Archivo/Anton) para hero/títulos; manter Geist para corpo.
- [ ] Criar utilitários/classes de seção: eyebrow, section-title, container responsivo (`px-5 md:px-8 lg:px-12`).
**Done:** paleta + tipografia aprovadas; tokens só em `globals.css`; um "style tile" de exemplo aprovado.

## Dia 4 — Biblioteca de animação & primitivos de layout
**Objetivo:** infraestrutura para o "efeito Nike".
**Fazer:**
- [ ] (Se aprovado) `pnpm add framer-motion lenis embla-carousel-react`.
- [ ] Provider de smooth scroll (Lenis) no layout, respeitando `prefers-reduced-motion`.
- [ ] Componentes utilitários em `src/components/common/`: `Reveal` (fade/slide on scroll),
      `MaxWidthWrapper`/`Container`, `SectionHeader` (eyebrow + título), `Marquee`.
**Done:** uma seção da home anima ao entrar na viewport; scroll suave ativo; reduced-motion respeitado.

---

# FASE 1 — Home premium (Dias 5–8)

## Dia 5 — Hero editorial
**Objetivo:** primeira dobra impactante (a "cara" do site).
**Fazer:**
- [ ] Hero full-bleed: imagem grande + headline display + sub + CTA(s) ("Shop now").
- [ ] Versão mobile e desktop; texto sobreposto com contraste garantido; `priority` na imagem.
- [ ] Animação de entrada sutil (stagger) respeitando reduced-motion.
**Done:** hero responsivo, sem layout shift, com CTA funcional.

## Dia 6 — Faixa de marcas + seções editoriais
**Objetivo:** ritmo visual da home.
**Fazer:**
- [ ] Refinar `Brands` (marquee infinito suave de logos, grayscale → cor no hover).
- [ ] Blocos editoriais "category feature" (imagem grande + label + link), estilo Nike.
**Done:** home com seções alternadas (texto/imagem) e respiro consistente.

## Dia 7 — Grids de produto (Mais vendidos / Novos)
**Objetivo:** cards de produto premium.
**Fazer:**
- [ ] `ProductItem`: imagem em `overflow-hidden rounded-3xl` + `group-hover:scale-105 transition`.
- [ ] Grid responsivo (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`), tipografia e preço refinados.
- [ ] Carrossel horizontal (Embla) opcional para "Novos produtos" no mobile.
**Done:** grids alinhados, hover suave, preço em USD.

## Dia 8 — Footer & navegação global premium
**Objetivo:** footer e header dignos da régua Nike.
**Fazer:**
- [ ] Footer rico: colunas (Shop, Help, Company), newsletter, social, legal.
- [ ] Header desktop: navbar com categorias, busca, conta, carrinho; sticky com leve shrink no scroll.
- [ ] Menu mobile (Sheet) aprimorado.
**Done:** navegação consistente em mobile e desktop.

---

# FASE 2 — Listagem & categorias / PLP (Dias 9–11)

## Dia 9 — PLP responsiva
- [ ] `/category/[slug]`: header de categoria (eyebrow + título + contagem), grid desktop 3–4 col.
- [ ] Estados de loading (skeletons) e vazio.
**Done:** PLP elegante em mobile e desktop.

## Dia 10 — Filtros & ordenação
- [ ] Sidebar/Sheet de filtros (categoria, tamanho, cor, faixa de preço) e ordenação (Featured, Price, Newest).
- [ ] Estado dos filtros na URL (`searchParams`), awaited (Next 15).
**Done:** filtrar/ordenar reflete na URL e na lista.

## Dia 11 — Busca
- [ ] Busca por nome/descrição (input no header + página de resultados).
- [ ] Empty state com sugestões.
**Done:** busca retorna resultados relevantes.

---

# FASE 3 — Página de produto / PDP (Dias 12–14)

## Dia 12 — Galeria premium
- [ ] Galeria com imagem principal + thumbnails; zoom/hover; layout desktop em 2 colunas (galeria | infos).
**Done:** PDP com galeria fluida em mobile e desktop.

## Dia 13 — Seletor de variante & add-to-cart
- [ ] Refino do `variant-selector` (cor/tamanho como botões acessíveis), estado selecionado claro.
- [ ] Add-to-cart com `isPending`, toast Sonner, atualização do carrinho (TanStack).
**Done:** selecionar variante e adicionar ao carrinho com feedback impecável.

## Dia 14 — Conteúdo da PDP
- [ ] Accordion (Details, Shipping & Returns, Reviews placeholder), produtos relacionados.
- [ ] JSON-LD `Product`, Open Graph para compartilhamento.
**Done:** PDP completa, rica e com SEO básico.

---

# FASE 4 — Carrinho & Checkout (Dias 15–17)

## Dia 15 — Cart polish
- [ ] Sheet + página de carrinho refinados (itens, quantidade, subtotal, frete placeholder, CTA).
**Done:** carrinho consistente, valores em USD, micro-interações.

## Dia 16 — Identificação/endereço (US)
- [ ] Form de endereço americano (RHF + Zod), State dropdown, ZIP/phone mask.
**Done:** endereço salvo e usado no checkout.

## Dia 17 — Stripe & confirmação
- [ ] Revisar `create-checkout-session` e webhook; success/confirmation pages.
- [ ] Estados de erro/sucesso com toast.
**Done:** compra de ponta a ponta em modo teste do Stripe.

---

# FASE 5 — Conta & pedidos (Dias 18–19)

## Dia 18 — My orders
- [ ] `/my-orders` com lista de pedidos, status (`pending/paid/canceled`), detalhe.
**Done:** histórico de pedidos claro e responsivo.

## Dia 19 — Auth polish
- [ ] Páginas de sign-in/sign-up no padrão editorial; mensagens em inglês; (opcional) login social.
**Done:** fluxo de autenticação premium.

---

# FASE 6 — Polimento, interatividade & responsividade (Dias 20–23)

## Dia 20 — Micro-interações & transições
- [ ] Page transitions sutis, skeletons em todas as telas com fetch, consistência de toasts.
**Done:** nenhuma tela "pisca" branca durante carregamento.

## Dia 21 — Reveal on scroll & detalhes Nike
- [ ] Aplicar `Reveal`/stagger nas seções principais; marquees; hover states refinados.
**Done:** sensação de movimento premium em toda a navegação.

## Dia 22 — Acessibilidade (a11y)
- [ ] Navegação por teclado, aria-labels em ícones/inputs, foco visível, contraste WCAG AA.
- [ ] Rodar axe DevTools; corrigir issues críticas.
**Done:** sem violações críticas nos fluxos principais.

## Dia 23 — Responsividade final
- [ ] Revisar todas as páginas em mobile/tablet/desktop; corrigir quebras.
**Done:** layout impecável em todos os breakpoints.

---

# FASE 7 — Performance, SEO & entrega (Dias 24–26)

## Dia 24 — Performance
- [ ] `next/image` otimizado, dynamic import de componentes pesados (carrossel/animações).
- [ ] Lighthouse na home e PDP — meta 90+; documentar antes/depois.
**Done:** report do Lighthouse salvo em `docs/`.

## Dia 25 — SEO & metadata
- [ ] `generateMetadata` por página, sitemap, robots, OG por produto, JSON-LD.
**Done:** preview rico ao compartilhar links; páginas indexáveis.

## Dia 26 — README, demo & deploy
- [ ] README nível sênior (problema, stack, prints/GIFs, demo, decisões).
- [ ] Vídeo curto (60–90s) navegando o site para portfólio/LinkedIn.
- [ ] Deploy (Vercel) e URL no README.
**Done:** projeto demonstrável e publicado; você teria orgulho de mostrar a um sênior.

---

# Ordem de construção (não inverter)

```
0. Fundação: docs/regras → localização en-US/USD → tokens/tipografia → animação/layout
1. Home premium (hero, marcas, grids, header/footer)
2. PLP (grid desktop, filtros, busca)
3. PDP (galeria, variantes, add-to-cart, conteúdo)
4. Cart & checkout (Stripe, endereço US)
5. Conta & pedidos, auth polish
6. Polimento (micro-interações, a11y, responsividade)
7. Performance, SEO, README, demo, deploy
```

---

# O que fazer quando travar (regra do tech lead)

| Situação | Ação |
|----------|------|
| String pt-BR aparecendo | Parar e migrar para en-US antes de seguir; varrer o arquivo todo |
| Valor monetário errado | Centralizar em `formatCentsToUSD`; nunca formatar na mão |
| Animação quebrando layout/drag | Aplicar só on-scroll/hover; testar sem animação primeiro; respeitar reduced-motion |
| Layout shift / CLS alto | Definir dimensões de imagem, usar `sizes`, reservar espaço |
| Hover ruim no mobile | Hover é desktop; usar `:active`/feedback tátil no mobile |
| `any`/erro de TS | Resolver a causa; nunca `@ts-ignore`/`as any` |
| Escopo crescendo (wishlist, reviews reais, multi-idioma) | Anotar em `docs/backlog.md` — não construir agora |

---

# Checklist final ("FINALIZADO" para portfólio)

- [ ] Produto 100% em **inglês (en-US)**, moeda **USD**, endereços/checkout americanos
- [ ] Identidade visual editorial nível Nike (tokens em `globals.css`, tipografia forte, respiro)
- [ ] Home premium (hero, marcas, grids, seções editoriais)
- [ ] Header desktop + mega-menu/navbar + footer rico
- [ ] PLP com filtros/ordenação/busca, grid desktop
- [ ] PDP com galeria, variantes, add-to-cart, conteúdo e SEO
- [ ] Cart + checkout (Stripe) ponta a ponta
- [ ] Conta & pedidos, auth premium
- [ ] Micro-interações, reveal on scroll, smooth scroll (reduced-motion respeitado)
- [ ] Acessibilidade (WCAG AA) e responsividade total
- [ ] Lighthouse 90+ na home e PDP
- [ ] SEO (metadata, sitemap, OG, JSON-LD)
- [ ] README sênior + vídeo demo + deploy (Vercel) com URL pública
- [ ] Zero `any`, zero erro de TS, lint limpo

---

# Backlog v2 (não construir antes da entrega)

- [ ] Wishlist / favoritos
- [ ] Reviews reais de produto
- [ ] Recomendações ("You might also like") por IA
- [ ] Multi-idioma / multi-moeda
- [ ] Programa de fidelidade
- [ ] Painel admin de catálogo

---

*Documento criado para Magaiver — atualize fases/dias conforme o produto evoluir.
Sempre crie o arquivo do dia em `docs/tasks/` e mantenha este guia em dia.*
</content>

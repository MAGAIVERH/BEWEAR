# Dia 08 — Header/navbar premium + footer rico

**Data:** 2026-06-19
**Fase:** Fase 1 — Home premium
**Branch:** `feat/fase-1-header-footer`
**Status:** ✅ concluído

---

## 🎯 Objetivo
Navegação global nível Nike: header responsivo (navbar desktop com categorias, conta e carrinho; sticky com
shrink no scroll; menu mobile aprimorado) e footer rico (colunas, newsletter, social, legal).

## 📋 Tarefas
- [x] Action `getCategories` + hook TanStack `useCategories` (links de categoria dinâmicos).
- [x] `Header` reescrito:
      - **sticky** `top-0` com `backdrop-blur` e **shrink no scroll** (`py-4 → py-2`).
      - **Desktop:** logo + nav de categorias no centro + conta (avatar/sign-out ou sign-in) + carrinho.
      - **Mobile:** menu lateral (Sheet `side="left"`) com bloco de conta + links de categoria + My orders.
- [x] `NewsletterForm` (client, RHF + Zod + Sonner) — assina localmente com toast.
- [x] `Footer` rico: marca + newsletter, colunas **Shop / Help / Company**, ícones sociais, barra legal + crédito.
- [x] Verificação: `tsc --noEmit` 0 erros; lint limpo.

## 🧱 Arquivos tocados
- `src/actions/get-categories/index.ts` (novo)
- `src/hooks/queries/use-categories.ts` (novo)
- `src/components/common/header.tsx` (reescrito)
- `src/components/common/newsletter-form.tsx` (novo)
- `src/components/common/footer.tsx` (reescrito)

## 🎨 Notas de design (Nike)
- Header translúcido com blur que encolhe ao rolar — leve, premium, sempre presente.
- Nav de categorias com hover sutil (`text-foreground/70 → text-foreground`).
- Footer editorial com hierarquia clara (eyebrow uppercase nas colunas) e newsletter.

## ✅ Critério de Done
- [x] Navegação consistente em mobile e desktop
- [x] Header sticky com shrink; menu mobile completo
- [x] Footer rico e responsivo
- [x] `tsc --noEmit` 0 erros; lint limpo

## 🧩 Decisões & aprendizados
- Mantive `Header` como client (usa `useSession`); categorias vêm via TanStack Query (`useCategories`)
  para não precisar passar props por todas as páginas que usam `<Header />`.
- Links de Help/Company/social são `#` por enquanto (páginas institucionais não fazem parte do escopo atual).

## 🚧 Bloqueios / pendências
- **Busca** ainda não implementada (Dia 11) — por isso não há ícone de busca dead-end no header.
- Links institucionais (Shipping/Returns/FAQ/About...) são placeholders `#`.
- `CategorySelector` (pílulas) segue disponível para reuso, mas hoje não está em uso.

## 🔧 Correções pós-review (mesmo dia)
- **Marquee de marcas:** emenda entre cópias estava colada (Zara→Nike) e em telas largas o loop "parava".
  Refeito com **4 cópias** + `translateX(-25%)` e espaçamento uniforme via `[&>*]:mr-*` (inclui a emenda) —
  loop infinito contínuo e sempre preenchendo a largura.
- **Banco em inglês:** `src/db/seed.ts` traduzido (categorias, produtos, cores, descrições) de pt-BR → **en-US**
  e **re-semeado** (6 categorias, 24 produtos, 62 variantes). URLs de imagem do CDN mantidas.

## ⏭️ Próximo passo
**Fase 2 — Dia 9: PLP responsiva** (header de categoria com contagem, grid desktop, skeletons e estado vazio).
</content>

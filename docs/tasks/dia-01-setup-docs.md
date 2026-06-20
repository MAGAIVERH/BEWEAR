# Dia 01 — Documentação, regras e roadmap

**Data:** 2026-06-19
**Fase:** Fase 0 — Fundação & Design System
**Branch:** `main` (setup inicial de docs — sem código de produto)
**Status:** ✅ concluído

---

## 🎯 Objetivo
Estabelecer a base de governança do projeto antes de produzir telas: regras invioláveis,
roadmap dia a dia e o fluxo de documentação de tarefas — alinhados ao objetivo de levar o
BEWEAR ao nível de front-end da Nike, com produto **100% em inglês (en-US) / USD** para o mercado americano.

## 📋 Tarefas
- [x] Criar regras do projeto em `.cursor/rules/bewear.mdc` (adaptadas à stack real: Drizzle, actions/, TanStack, sem dark/Prisma/modules).
- [x] Criar `CLAUDE.md` na raiz (resumo das regras para o Claude Code).
- [x] Criar o guia de desenvolvimento em `docs/guia-desenvolvimento-bewear.md` (fases 0–7, dias 1–26).
- [x] Criar `docs/tasks/_template.md` e este `docs/tasks/dia-01-setup-docs.md`.
- [x] Refletir a decisão de localização **en-US/USD** em todos os documentos.
- [ ] Confirmar com o usuário as pendências da seção "O que preciso de você".

## 🧱 Arquivos tocados
- `.cursor/rules/bewear.mdc` (novo)
- `CLAUDE.md` (novo)
- `docs/guia-desenvolvimento-bewear.md` (novo)
- `docs/tasks/_template.md` (novo)
- `docs/tasks/dia-01-setup-docs.md` (novo)

## 🎨 Notas de design (Nike)
Régua de qualidade documentada: tipografia protagonista, respiro generoso, imagem em primeiro plano,
micro-interações, movimento com propósito (reduced-motion), preto/branco + 1 acento, desktop impecável.
Estética **light/editorial** — não dark.

## ✅ Critério de Done
- [x] Regras, guia, template e dia 01 versionados no projeto
- [x] Documentos consistentes com a stack real e com en-US/USD
- [ ] Pendências confirmadas com o usuário (próximo passo)

## 🧩 Decisões & aprendizados
- A stack real difere do guia de referência (PROPAI): é **Drizzle** (não Prisma), arquitetura por
  `src/actions/<nome>/` + `src/hooks` (não `modules/`), e **light** (não dark). As regras foram
  adaptadas à realidade do código, não copiadas.
- Localização **en-US/USD** definida pelo usuário: implica migrar `formatCentsToBRL` → `formatCentsToUSD`,
  traduzir toda a UI e adotar endereço/checkout no padrão americano.

## 🚧 Bloqueios / pendências (aguardando usuário)
- Direção de cor: manter primary roxo ou migrar para **preto/branco + 1 acento** (recomendado).
- Aprovar libs de animação: `framer-motion`, `lenis`, `embla-carousel-react`.
- Fonte display para hero/títulos (ex.: Archivo/Anton) vs. manter Geist.
- Fornecimento de imagens reais (produto/banners) vs. placeholders.
- Confirmar construção das versões **desktop** de todas as páginas.
- Variáveis `.env`: Neon, Better Auth, Stripe (e Google OAuth se login social).
- Alvo de deploy (Vercel) e domínio.

## ⏭️ Próximo passo
**Dia 02 — Localização en-US/USD (base):** `formatCentsToUSD`, varredura de strings pt-BR → en-US,
checkout no padrão americano, `lang="en"`.
</content>

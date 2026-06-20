# Assets necessários — BEWEAR (rumo ao nível Nike)

> Documento vivo. Toda tela que usa mídia entra aqui **antes do commit**.
> Status: ⏳ pendente · 📥 recebido · ✅ aplicado.
> Placeholders (Unsplash) são pontes temporárias e estão marcados ⏳.

**Como enviar:** coloque os arquivos em `public/` com **exatamente** os nomes sugeridos (ou me passe o
caminho/URL). **Sem texto embutido** nas fotos/vídeos — a tipografia é nossa. Otimize antes de enviar
(ex.: [squoosh.app](https://squoosh.app) para imagem; HandBrake para vídeo).

---

## 1. HERO da home — VÍDEO (decisão: vídeo, estilo Nike) ✅ aplicado (stock)

> **Aplicado:** `public/hero.mp4` (Mixkit, 720p, ~4 MB, licença grátis/uso comercial) +
> `public/hero-poster.jpg` (Unsplash, 2400×1350). Trocar por **footage de marca real** quando houver.
> WebM continua opcional (browser usa o MP4). Specs originais abaixo para referência.

**Onde:** `src/components/common/hero.tsx`

**Vídeo (principal):**
- **Arquivos:** `public/hero.mp4` **e** `public/hero.webm`
- **Codecs:** MP4 = **H.264 (AVC)** · WebM = **VP9**
- **Resolução:** **1920×1080** (mínimo) — ideal **2560×1440**
- **Proporção:** **16:9** (paisagem)
- **Duração:** **8–15s**, em **loop perfeito** (sem corte perceptível)
- **FPS:** 24–30
- **Áudio:** **sem áudio** (mudo)
- **Tamanho-alvo:** MP4 **< 6 MB** · WebM **< 5 MB** (autoplay precisa ser leve)
- **Conteúdo:** modelo(s) em movimento com look streetwear; **deixar a faixa inferior-esquerda “calma”**
  (espaço para título branco); evitar elementos claros demais embaixo (contraste com texto branco)

**Poster (fallback obrigatório — exibido até o vídeo carregar e em `prefers-reduced-motion`):**
- **Arquivo:** `public/hero-poster.webp`
- **Resolução:** **2400×1350** (16:9)
- **Formato:** `.webp` · **< 400 KB**
- **Conteúdo:** um frame representativo do vídeo (mesma composição/contraste)

---

## 2. Blocos editoriais de categoria ✅ aplicado (stock)

> **Aplicado:** `public/category-1.jpg` e `public/category-2.jpg` (Unsplash, 1600×2000). Trocar por arte real depois.

**Onde:** `src/components/common/editorial-categories.tsx` (constante `FEATURE_IMAGES`)
- **Arquivos:** `public/category-1.webp`, `public/category-2.webp`
- **Tipo:** foto · **Formato:** `.webp` (ou `.jpg`)
- **Resolução:** **1600×2000** (lado maior ≥ 2000px)
- **Proporção:** **4:5** (retrato)
- **Peso:** **< 400 KB** cada
- **Quantidade:** **2** (idealmente 1 por categoria principal: ex. Sneakers, Jackets)
- **Conteúdo:** lifestyle/produto da categoria; **parte inferior mais escura** (o label branco fica embaixo)

---

## 2.5. Galeria da PDP (detalhe/lifestyle por categoria) ✅ aplicado (stock)

> **Aplicado:** `public/gallery/{categoria}-1.jpg` e `-2.jpg` (Unsplash, 1200×1200) para sneakers, t-shirts,
> pants, shorts, jackets-hoodies, accessories. Usadas como imagens adicionais na galeria da PDP
> (`getGalleryImages`). Ideal: substituir por **múltiplos ângulos reais do próprio produto** quando houver.

## 3. Fotos de produto (catálogo) ⏳

**Onde:** variantes (`product_variant.imageUrl`) — hoje vêm de um CDN via seed
- **Tipo:** foto de produto · **Formato:** `.webp`/`.jpg`
- **Resolução:** **1200×1200** (ideal **2000×2000**)
- **Proporção:** **1:1** (quadrado) — **manter consistente em todo o catálogo**
- **Peso:** **< 300 KB** cada
- **Fundo:** **uniforme/neutro** (de preferência o mesmo em todos)
- **Quantidade:** conforme o catálogo final (en-US) — **ligado ao seed em inglês (pendente)**
- **Obs:** se possível, 1 imagem por **variante de cor**

---

## 4. Banner promocional da home ⏳ (decisão pendente)

**Onde:** `public/banner02.png` (ainda usado na home)
- **Decisão:** manter / substituir / remover? (default atual: **manter por ora**)
- Se substituir: paisagem **2000×1000** (~2:1), `.webp`, **< 400 KB**, **sem texto embutido**
- **Arquivo (se novo):** `public/banner-promo.webp`

---

## 5. Logo & favicon (confirmar) ⏳

- **Logo header:** `public/logo.svg` — confirmar se é a versão **definitiva** (vetorial, fundo claro)
- **Favicon:** `src/app/favicon.ico` — confirmar/atualizar
- (Opcional) versão do logo em **branco** para usar sobre o hero, se o header virar transparente sobre a foto

---

## Logos de marcas — ✅ (já no projeto)
`public/{nike,adidas,puma,newbalance,converse,polo,zara}.svg` — OK para o marquee de marcas.

---

### Resumo dos arquivos a entregar (nomes exatos)
| Arquivo | Tipo | Dimensões | Proporção | Peso alvo |
|---|---|---|---|---|
| `public/hero.mp4` | vídeo H.264 | 1920×1080+ | 16:9 | < 6 MB |
| `public/hero.webm` | vídeo VP9 | 1920×1080+ | 16:9 | < 5 MB |
| `public/hero-poster.webp` | imagem | 2400×1350 | 16:9 | < 400 KB |
| `public/category-1.webp` | imagem | 1600×2000 | 4:5 | < 400 KB |
| `public/category-2.webp` | imagem | 1600×2000 | 4:5 | < 400 KB |
| fotos de produto | imagem | 1200×1200+ | 1:1 | < 300 KB |
| `public/banner-promo.webp` (se substituir) | imagem | 2000×1000 | 2:1 | < 400 KB |

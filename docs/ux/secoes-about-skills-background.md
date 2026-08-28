# Layout — ABOUT, HARD SKILLS e BACKGROUND

**Status:** proposta UX (v2 — stacks com ícones + fundo distinto)  
**Data:** 2026-08-28  
**Contexto:** hero com nebula/bolas roxas já implementado (Direções A/C)  
**Protótipos:** [Stacks com ícones](./prototypes/proto-skills-icons-flat-bg.png) · [Background fundo plano](./prototypes/proto-background-flat-bg.png)

---

## Decisão do stakeholder

1. **Sem barras de skill** — visual antiquado; substituir por **grid de stacks com ícones**.
2. **Fundo das seções internas diferente do hero** — sem nebula/bolas roxas; zona de conteúdo com fundo plano/sólido.

---

## 1. Para o coordenador

### Resumo

Modernizar About, Hard Skills e Background com duas mudanças claras:

| Área | Antes (proposta v1) | Agora (v2) |
|------|---------------------|------------|
| Hard Skills | Barras de progresso | **Grid de ícones** com label |
| Fundo | Mesmo/nebuloso | **Zona plana** `#0a0a0f`, separada do hero |

O visitante sente transição: **hero atmosférico** → **conteúdo legível em fundo sólido**.

### Mapa de zonas da Home

```
┌─────────────────────────────────────┐
│  ZONA A — HERO + DESTAQUES          │
│  Fundo: nebula / bolas roxas        │
│  (background.webp ou is-nebula)     │
├─────────────────────────────────────┤  ← transição suave (fade ou linha)
│  ZONA B — CONTEÚDO                  │
│  Fundo: #0a0a0f plano              │
│  · SOBRE + HARD SKILLS (grid)       │
│  · EXPERIÊNCIA (cards timeline)     │
│  · MEDIUM (herda Zona B)            │
└─────────────────────────────────────┘
```

### Critérios de aceite

- [ ] Nenhuma barra de progresso de skill visível
- [ ] Skills exibidas como ícones + nome (grid responsivo)
- [ ] Fundo da Zona B **sem** radial-gradient roxo / nebula
- [ ] Transição visual clara entre hero e conteúdo (sem “corte” abrupto)
- [ ] About legível; Background em cards; expand preservado
- [ ] PT-BR / EN-US ok

### Esforço estimado

| Bloco | Dias |
|-------|------|
| Zona B (fundo + wrapper) | 0,5 |
| About + Skills ícones | 1–1,5 |
| Background cards | 1,5–2 |
| QA | 0,5 |
| **Total** | **3,5–4,5 dias** |

---

## 2. Fundo — duas zonas

### Zona A (hero) — manter

- Nebula / bolas roxas (`is-nebula`) ou `background.webp`
- Visível só no **topo** da Home (1º viewport + faixa destaques)
- `RouteBackground` atual com `nebula` — **não estender** para a página inteira no scroll

### Zona B (conteúdo) — novo

| Token | Valor |
|-------|-------|
| Cor base | `#0a0a0f` (ou `#050508` se quiser igual body preview C) |
| Gradiente | **nenhum** roxo |
| Textura | opcional: noise 2% ou linha topo `rgb(255 255 255 / 6%)` |
| Seções tinted | remover gradient footer em Background; usar `tone="content"` |

### Transição Hero → Conteúdo

Opções (escolher uma):

| Opção | Descrição |
|-------|-----------|
| **T1** | `linear-gradient` vertical 80px: transparente → `#0a0a0f` no fim do hero |
| **T2** | `border-top: 1px solid rgb(255 255 255 / 8%)` na primeira seção Zona B |
| **T3** | Wrapper `.home-content-zone` com `margin-top` negativo pequeno + padding-top |

**Recomendação:** T1 + T2 combinados.

### Implementação (dev)

- Envolver `AboutSection`, `TimelineSection`, `MediumSection` em `<div className="home-content-zone">` em `page.tsx`
- CSS:

```css
.home-content-zone {
  position: relative;
  z-index: 1;
  background-color: #0a0a0f;
}

.home-content-zone::before {
  content: "";
  display: block;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 255 255 / 10%) 50%,
    transparent
  );
}
```

- Garantir que `route-background.is-nebula-page` seja `height: 100vh` fixo, **não** `min-height: 100%` da página
- Projects: pode usar Zona B também (fundo plano) — alinhar depois

---

## 3. ABOUT — especificação

### Layout (desktop ≥ 900px)

```
                    SOBRE
    ┌─────────────────────────┬──────────────────┐
    │  parágrafo 1            │  HARD SKILLS     │
    │  parágrafo 2            │  [icon grid]     │
    │  parágrafo 3            │                  │
    └─────────────────────────┴──────────────────┘
              [ projetos ]  [ CV ]
```

### Mudanças

| Item | Alvo |
|------|------|
| Alinhamento | `left` (sem justify) |
| Fundo | herda Zona B plana |
| Grid com Skills | 1.2fr / 0.8fr ≥ 900px |
| Tipografia | weight 400, `rgb(255 255 255 / 72%)` |

### Mobile

Sobre → Skills (grid ícones) → CTAs — ordem vertical.

---

## 4. HARD SKILLS — stacks com ícones (sem barras)

### Direção — grid de ícones

Substituir `SkillBar` + barras por **tiles** com ícone + label.

```
HARD SKILLS

  ┌────┐  ┌────┐  ┌────┐  ┌────┐
  │ C# │  │.NET│  │ TS │  │ ⚛  │
  └────┘  └────┘  └────┘  └────┘
  C#     .NET   Typescript React
```

### Anatomia do tile

```
┌──────────────┐
│   [ícone]    │  40–48px, centralizado
│   Label      │  0.75rem, muted
└──────────────┘
```

| Token | Valor |
|-------|-------|
| Tile size | `4.5rem` × `4.5rem` (mobile `4rem`) |
| Border | `1px solid rgb(255 255 255 / 8%)` |
| Background | `rgb(255 255 255 / 4%)` |
| Border-radius | `0.75rem` |
| Hover | borda `rgb(192 132 252 / 35%)`, fundo `rgb(192 132 252 / 8%)` |
| Grid gap | `0.75–1rem` |
| Colunas | `auto-fill, minmax(4.5rem, 1fr)` ou fixo 4 col desktop |

### Stacks e ícones

| Skill (atual) | Ícone sugerido | Já no repo? |
|---------------|----------------|-------------|
| C# .NET | `c-sharp.png` + `dotnet.png` (tile único ou dois) | ✓ |
| Unit test | ícone flask/check (adicionar SVG) | — |
| Integration test | ícone pipeline (adicionar SVG) | — |
| Typescript | devicon ou SVG | — |
| Angular | devicon ou SVG | — |
| React Native | devicon ou SVG | — |
| Cloud (Azure) | `az900.webp` / logo Azure | ✓ parcial |
| React | devicon ou SVG | — |
| Devops | ícone genérico CI/CD | — |

**Recomendação:** pacote `simple-icons` ou SVGs em `public/images/stacks/` — **não** depender de URLs externas.

### O que remover

- Componente `SkillBar.tsx` (ou deprecar)
- Classes `.skill-bar`, `.skill-gaps`, `.skill-nolevel`, animação `box-shadow inset`
- Propriedade `level` (1–5) — **opcional:** usar só se quiser badge “principal” vs “familiar” no futuro; por ora **sem nível visual**

### Dados — novo formato

```ts
type StackItem = {
  id: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
};
```

Lista em `AboutSection.tsx` ou `src/lib/stacks.ts` (preferível extrair).

### Título

- Manter `SkillsTitle` (HARD SKILLS)
- Alinhar à esquerda na coluna direita (desktop)

---

## 5. BACKGROUND — especificação

### Fundo

- Dentro da **Zona B** — mesmo `#0a0a0f`
- **Sem** `ui-section-tinted` com gradient roxo
- Cards com superfície levemente mais clara que o fundo (`rgb(255 255 255 / 3%)`)

### Layout — cards na timeline

```
EXPERIÊNCIA

  ● ─┬─ [ card experiência 1 ]
     │
  ● ─┼─ [ card experiência 2 ]
     │
  ○ ─┴─ [ card experiência 3 ]

        [ LinkedIn ]
```

### Card

- Data + empresa (chip) + título + resumo + ver mais
- Borda sutil; hover roxo leve
- Expand/collapse e links externos preservados

### Mobile

Cards full width; linha vertical à esquerda; sem `position: absolute` com `left: 153px`.

---

## 6. Para o desenvolvedor

### Arquivos impactados

| Arquivo | Mudança |
|---------|---------|
| `src/app/[locale]/page.tsx` | Wrapper `.home-content-zone` |
| `src/styles/home.css` | Zona B, grid about, timeline cards |
| `src/styles/globals.css` | Token `--color-content-zone-bg` |
| `src/components/home/AboutSection.tsx` | Grid; dados stacks |
| `src/components/home/SkillsSection.tsx` | Grid ícones (rewrite) |
| `src/components/home/SkillBar.tsx` | **Remover** ou substituir por `StackIcon.tsx` |
| `src/components/ui/Section.tsx` | Novo `tone="content"` (opcional) |
| `src/components/home/TimelineSection.tsx` | Cards; `tone` sem tinted |
| `src/components/home/TimelineEntry.tsx` | Markup card |
| `src/components/layout/RouteBackground.tsx` | Nebula só `100vh` |
| `public/images/stacks/*` | SVGs novos |

### Fases

**Fase 1 — Zona de fundo (0,5 dia)**  
1. `home-content-zone` wrapper  
2. Nebula limitada ao viewport do hero  
3. Transição T1+T2

**Fase 2 — Skills ícones (1–1,5 dia)**  
1. Criar `StackIcon` + `stacks.ts`  
2. Adicionar SVGs faltantes  
3. Grid responsivo; remover `SkillBar`  
4. Grid About + Skills no desktop

**Fase 3 — Background (1,5–2 dias)**  
1. Cards timeline  
2. Remover tinted gradient  
3. Mobile QA

### Checklist

**Fundo**
- [ ] Zona B plana em About, Background, Medium
- [ ] Hero mantém nebula; scroll não “puxa” roxo para baixo
- [ ] Transição suave hero → conteúdo

**Skills**
- [ ] Zero barras de progresso
- [ ] Grid de ícones com labels
- [ ] Ícones com `alt` descritivo
- [ ] Hover/focus acessível

**About**
- [ ] Texto left, grid desktop
- [ ] CTAs abaixo full width

**Background**
- [ ] Cards; expand ok
- [ ] Sem gradient tinted na seção

### Definition of Done

- Protótipos v2 aprovados
- Screenshots Zona A vs Zona B mostrando contraste de fundo
- Sem `SkillBar` em produção

---

## 7. Decisões pendentes

| # | Pergunta | Recomendação |
|---|----------|--------------|
| 1 | Ícones | SVGs locais em `public/images/stacks/` |
| 2 | C# + .NET | Um tile “.NET” ou dois tiles separados | dois tiles |
| 3 | Cor Zona B | `#0a0a0f` | |
| 4 | Medium na Zona B | sim (mesmo fundo) | sim |
| 5 | Projects page | mesmo fundo plano depois | sim, fase 2 |

---

## 8. Wireframe geral

```
╔═══════════════════════════════════╗
║  HERO + DESTAQUES                 ║
║  (nebula / bolas roxas)           ║
╠═══════════════════════════════════╣  ← transição
║  #0a0a0f plano                    ║
║  SOBRE          │ HARD SKILLS     ║
║  bio...         │ [icons grid]    ║
║  [ CTAs ]                         ║
║  ─────────────────────────────────║
║  EXPERIÊNCIA                      ║
║  ● card · ● card · ○ card         ║
║  ─────────────────────────────────║
║  MEDIUM                           ║
╚═══════════════════════════════════╝
```

---

## Histórico

| Versão | Mudança |
|--------|---------|
| v1 | Barras pill + fundo transparente/tinted |
| **v2** | **Ícones no lugar de barras; Zona B fundo plano** |

Protótipos v1 (obsoletos para skills): `proto-about-skills-split.png` — barras; manter só como referência de grid.

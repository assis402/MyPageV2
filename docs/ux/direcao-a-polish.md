# Direção A — Polish

**Status:** candidata à implementação  
**Data:** 2026-08-27  
**Protótipo:** [proto-a-polish-hero.png](./prototypes/proto-a-polish-hero.png)  
**Documento irmão:** [direcao-c-projects-ritmo.md](./direcao-c-projects-ritmo.md)

---

## 1. Para o coordenador

### Resumo

Refinar o layout atual da Home **sem mudar a estrutura**. O visitante continua reconhecendo o site; a sensação fica mais limpa, com hierarquia tipográfica mais clara e menos “caixas” competindo com o nome.

### Objetivo de negócio

- Modernizar a primeira impressão com **risco baixo**.
- Manter identidade (dark, roxo, `matheusassis`, C#/.NET no hero).
- Não exigir novo conteúdo, novas rotas ou mudança de fluxo.

### Escopo

| Inclui | Não inclui |
|--------|------------|
| Hero: espaçamento, tipografia, card de stack mais leve | Nova seção ou reorder de seções |
| Botões do hero: ritmo visual (gap, alinhamento) | Trocar ordem dos CTAs (isso é Direção C) |
| Seções About / Timeline / Medium: títulos e ritmo tipográfico | Redesign da página Projects |
| Ajustes de CSS/tokens existentes | Light mode, novo branding |
| Responsivo (mobile/tablet/desktop) | Admin, i18n de textos (salvo ajuste fino de copy) |

### O que muda na prática

1. **Nome como protagonista** — greeting mais discreto; nome com mais peso visual.
2. **Stack principal menos “widget”** — card atual vira bloco leve ou linha inline com ícones menores.
3. **Mais respiro vertical** — entre nome, stack, texto e botões.
4. **Seções abaixo** — títulos (`SectionTitle`) com hierarquia mais definida; menos cinzas “todos iguais”.

### O que permanece igual

- Ordem: Hero → About → Timeline → Medium.
- Dois CTAs no hero: “saber mais” (primário) + “ver projetos” (secundário).
- Header, footer, fundo atmosférico, traduções atuais.
- Página Projects intacta.

### Esforço estimado

| Perfil | Estimativa |
|--------|------------|
| Desenvolvimento | 0,5–1,5 dia |
| QA / revisão visual | 2–4 h |
| Conteúdo / copy | 0 h (opcional) |

**Complexidade:** baixa — majoritariamente CSS e pequenos ajustes de markup.

### Critérios de aceite (coordenação)

- [ ] Hero legível em mobile sem scroll horizontal.
- [ ] Nome “Matheus Assis” é o elemento dominante no 1º viewport.
- [ ] Card de stack não compete visualmente com o nome.
- [ ] CTAs continuam claros e acessíveis (contraste, foco por teclado).
- [ ] About, Timeline e Medium mantêm conteúdo e ordem; só refinamento visual.
- [ ] Nenhuma regressão em PT-BR / EN-US.
- [ ] Lighthouse / acessibilidade não pioram (sem remover landmarks ou alt texts).

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Stack “some” demais | Manter ícones C#/.NET visíveis, só menores |
| Mobile quebra layout lado a lado do hero | Empilhar nome + stack em coluna abaixo de 768px |
| Over-scoping em Timeline/Medium | Limitar escopo a títulos + spacing; não redesenhar cards da timeline |

### Entrega sugerida

1. Hero (maior impacto)  
2. Seções About+ (títulos e spacing)  
3. Passada final responsivo + QA

---

## 2. Para o desenvolvedor

### Visão técnica

Implementação **CSS-first**, com possível micro-ajuste de HTML no hero para simplificar o card de stack. Reutilizar tokens em `globals.css`; evitar novos componentes se não forem necessários.

### Arquivos principais

| Arquivo | Tipo de mudança |
|---------|-----------------|
| `src/styles/home.css` | Principal — hero, stack, presentation, seções |
| `src/styles/ui.css` | Secundário — `.ui-section-title` se aplicável |
| `src/components/home/HeroSection.tsx` | Opcional — markup do stack (inline vs card) |
| `src/styles/globals.css` | Opcional — novos tokens de spacing/opacity |

**Não tocar (nesta direção):** `page.tsx`, `projects/*`, mensagens i18n, admin.

### Especificação — Hero

#### Layout atual (referência)

```
about-minified
├── about-title (greeting + nome)
└── main-stack (card com título, body, ícones)
presentation
├── presentation-text
└── presentation-buttons (Gradient + Outlined)
```

#### Layout alvo

```
about-minified (coluna no mobile; row no desktop com mais gap)
├── about-title
│   ├── greeting — menor, weight 200–300, cor soft
│   └── nome (b) — maior, weight 700
└── main-stack — LEVE (ver opções abaixo)
presentation — gap vertical maior
├── presentation-text
└── presentation-buttons — gap ~24–28px (hoje 40px)
```

#### Opção recomendada para `main-stack`

**Variante A1 (preferida):** manter estrutura, aliviar estilo.

```css
/* Direção de valores — calibrar no browser */
.main-stack {
  padding: 1rem 1.25rem;           /* era ~1.75rem 2.25rem */
  border: 1px solid rgb(140 141 157 / 25%);  /* mais sutil */
  background-color: rgb(255 255 255 / 3%);   /* quase transparente */
  gap: 0.75rem;
}
.main-stack-title { font-size: 12px; letter-spacing: 0.06em; }
.main-stack-body { font-size: 18px; font-weight: 500; }
.tech-icon { height: 36px; }       /* era 50px */
```

**Variante A2 (alternativa):** stack inline sob o nome — exige pequena mudança em `HeroSection.tsx` (empilhar título+ícones horizontalmente, remover card).

Coordenador pode escolher A1 (menor diff) ou A2 (mais moderno). Protótipo visual assume **A1 ou híbrido**.

#### Tipografia — `.about-title`

| Elemento | Atual (aprox.) | Alvo |
|----------|----------------|------|
| Greeting | `clamp(2.25rem, 4.5vw, 3.25rem)` weight 200 | Manter size ou −5%; cor `--color-legacy-text-soft` |
| Nome (`b`) | weight 700 | weight 700; opcional `clamp(2.5rem, 5vw, 3.5rem)` |
| Line-height | 1.15 | 1.1–1.15 |

#### Spacing — `.about-container` / `.about-minified`

| Token | Atual | Alvo |
|-------|-------|------|
| `.about-container` gap | `3rem` | `3.5–4rem` |
| `.about-minified` gap | `3rem` | `2.5rem` (desktop row) / `1.5rem` (mobile col) |
| `.about-minified` padding-bottom | `2rem` | `1rem` ou remover |
| `.presentation` gap | `30px` | `2rem–2.5rem` |

#### Responsivo

- **≥ 900px:** nome à esquerda, stack à direita (como hoje), com stack visualmente secundário.
- **< 768px:** coluna centrada; nome centralizado ou alinhado à esquerda (validar com protótipo); stack abaixo do nome.
- Revisar media queries existentes em `home.css` — não duplicar breakpoints; usar `--breakpoint-legacy-sm` / `md` já documentados.

### Especificação — Seções (About, Timeline, Medium)

Escopo **limitado** a:

1. **`.ui-section-title`** — weight 500–600; letter-spacing leve; cor `--color-legacy-text` (não soft).
2. **Espaçamento entre título e corpo** — +0.5–1rem onde estiver apertado.
3. **`.about-body`** — manter weight 300; garantir contraste mínimo WCAG AA no cinza do parágrafo.

**Fora de escopo A:** redesenhar skill bars, timeline cards ou Medium cards.

### Motion (opcional, baixa prioridade)

- Hero: fade/slide leve no load (se já existir animação, só sincronizar timing).
- Não adicionar libraries novas.

### Checklist de implementação

- [ ] Ajustar `.main-stack` (padding, border, bg, ícones)
- [ ] Refinar `.about-title` (hierarquia greeting vs nome)
- [ ] Aumentar ritmo vertical em `.about-container` / `.presentation`
- [ ] Reduzir gap dos botões do hero
- [ ] Revisar breakpoints mobile do hero
- [ ] Ajustar `.ui-section-title` (se necessário)
- [ ] Testar PT-BR e EN-US
- [ ] Testar foco por teclado nos CTAs
- [ ] Comparar side-by-side com [protótipo](./prototypes/proto-a-polish-hero.png)

### Testes manuais

1. Home desktop 1440px — nome domina; stack legível mas secundário.
2. Home mobile 390px — sem overflow; botões tocáveis (min 44px).
3. Scroll até About — títulos consistentes.
4. Header fixo não cobre `#about-more` ao clicar “saber mais”.
5. Projetos e admin inalterados.

### Definition of Done

- PR com diff focado em `home.css` (+ `HeroSection.tsx` / `ui.css` se necessário).
- Screenshots antes/depois anexados ao PR ou issue.
- Nenhuma chave i18n nova obrigatória.
- Aprovado visualmente contra protótipo A.

---

## 3. Wireframe de referência

```
┌─────────────────────────────────────────────────────────┐
│  [foto] matheusassis              Sobre  Projetos  PT/EN │
│                                                          │
│              Olá, me chamo          ┌─────────────┐      │
│              MATHEUS ASSIS          │ STACK       │      │
│                                     │ C# · .NET   │      │
│                                     └ (leve) ────┘      │
│        texto de apresentação (centrado, 1–2 linhas)      │
│              [ saber mais ]   [ ver projetos ]           │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Decisões pendentes (coordenador)

| # | Pergunta | Opções | Recomendação |
|---|----------|--------|--------------|
| 1 | Stack no hero | A1 card leve / A2 inline sem card | A1 (menor risco) |
| 2 | Alinhamento mobile do nome | centro / esquerda | centro (consistente com presentation) |
| 3 | Ajustar seções abaixo do hero | sim / só hero | sim, só títulos + spacing |

Preencher antes de abrir task para dev.

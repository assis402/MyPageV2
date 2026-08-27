# Direção C — Projects no ritmo

**Status:** candidata à implementação  
**Data:** 2026-08-27  
**Protótipo:** [proto-c-projects-ritmo.png](./prototypes/proto-c-projects-ritmo.png)  
**Documento irmão:** [direcao-a-polish.md](./direcao-a-polish.md)

---

## 1. Para o coordenador

### Resumo

Reposicionar o site como **portfolio work-first**: no hero, “ver projetos” vira ação principal; entre Hero e About entra uma faixa mínima de **destaques** (2–3 projetos, só tipografia); a página Projects ganha visual mais calmo (grade P1).

Pode ser implementada **sozinha** ou **depois da Direção A** (recomendado: A primeiro, C em seguida — menos conflito no hero).

### Objetivo de negócio

- Reduzir fricção até a prova de trabalho.
- Reforçar que projetos são o argumento central do portfolio.
- Manter identidade visual; mudança é de **fluxo de atenção**, não de branding.

### Escopo

| Inclui | Não inclui |
|--------|------------|
| Inversão de hierarquia dos CTAs no hero | Remover seção About ou Timeline |
| Nova faixa “Destaques” entre Hero e About | Cards com thumbnail na faixa |
| Lista curada de 2–3 projetos em destaque | CMS ou admin para editar destaques |
| Chaves i18n novas (label “Destaques”, link “ver todos”) | Lista editorial P2 (alternativa futura) |
| Refino visual da página Projects (P1) | Reescrever busca/filtros do zero |

### Fluxo do visitante (alvo)

```
Hero → CTA primário "ver projetos"
     → faixa Destaques (atalhos rápidos)
     → About (contexto pessoal)
     → Timeline → Medium
```

### O que muda na prática

1. **Hero:** botão gradiente = Projetos; outline = Sobre (`#about-more`).
2. **Faixa Destaques:** linha horizontal fina; nomes clicáveis separados por `·`; link “→” ou “ver todos” para `/projects`.
3. **Projects (P1):** cards com menos moldura; mais ênfase em preview/título; tags mais discretas.

### O que permanece igual

- Dark theme, header, footer, i18n existente (com adições).
- Conteúdo das seções About, Timeline, Medium.
- Lógica de busca/tags em Projects (só visual).

### Esforço estimado

| Perfil | Estimativa |
|--------|------------|
| Desenvolvimento | 1,5–3 dias |
| QA / revisão visual | 4–6 h |
| Conteúdo | 1 h — definir quais 3 projetos destacar |

**Complexidade:** média — novo componente + config + CSS em Projects.

### Critérios de aceite (coordenação)

- [ ] No hero, “ver projetos” é visualmente o CTA primário (gradiente).
- [ ] “saber mais” leva ao About (`#about-more`) como secundário.
- [ ] Faixa Destaques aparece entre Hero e About em desktop e mobile.
- [ ] Cada destaque abre o projeto correto (URL definida na config).
- [ ] Faixa funciona com 0 projetos configurados (oculta ou mensagem graceful — definir).
- [ ] PT-BR e EN-US com labels traduzidos.
- [ ] Página Projects visualmente mais calma (menos borda/sombra nos cards).
- [ ] Busca e filtros continuam funcionando.

### Decisões que o coordenador precisa fechar

| # | Decisão | Opções | Recomendação |
|---|---------|--------|--------------|
| 1 | Quais projetos destacar | Lista fixa em config | 3 projetos mais representativos (nomes + URLs) |
| 2 | Destino do link do projeto | GitHub / página interna / demo | Mesmo destino que `ProjectCard` usa hoje |
| 3 | Faixa vazia | ocultar seção / placeholder | Ocultar seção |
| 4 | Ordem vs Direção A | C sozinha / A depois C | A depois C |
| 5 | Texto do CTA secundário | manter “saber mais” / “Sobre” | manter chave `AboutButton` |

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Destaques desatualizados | Arquivo de config versionado; doc de como editar |
| Duplicar fetch GitHub na Home | Config estática (slug + title + href); sem API extra |
| Faixa polui mobile | Wrap em 2 linhas ou scroll horizontal suave |
| Conflito com Polish (A) | Sequenciar PRs: A merge → C |

### Entrega sugerida (fases)

1. **Fase 1:** CTAs invertidos no hero  
2. **Fase 2:** Componente `FeaturedProjectsStrip` + i18n + config  
3. **Fase 3:** Visual P1 em `projects.css` / `ProjectCard`

Cada fase pode ir em PR separado para revisão incremental.

---

## 2. Para o desenvolvedor

### Visão técnica

Três blocos independentes:

1. **Hero CTAs** — swap de variantes de botão em `HeroSection.tsx`.
2. **Faixa de destaques** — novo componente server + config estática + CSS.
3. **Projects P1** — CSS em cards/search (sem mudar data layer).

### Arquivos principais

| Arquivo | Mudança |
|---------|---------|
| `src/components/home/HeroSection.tsx` | Inverter GradientButton / OutlinedButton |
| `src/components/home/FeaturedProjectsStrip.tsx` | **Novo** |
| `src/lib/featured-projects.ts` | **Novo** — lista curada |
| `src/app/[locale]/page.tsx` | Inserir strip entre Hero e About |
| `src/styles/home.css` | Estilos da faixa `.featured-projects-strip` |
| `src/messages/pt-BR.json` | Chaves novas |
| `src/messages/en-US.json` | Chaves novas |
| `src/styles/projects.css` | P1 — cards mais calmos |
| `src/components/projects/ProjectCard.tsx` | Opcional — classes/markup mínimo |

### Especificação — Hero (CTAs)

#### Comportamento atual

```tsx
<GradientButton href="#about-more">  {/* saber mais — primário */}
<OutlinedButton href="/projects">     {/* ver projetos — secundário */}
```

#### Comportamento alvo

```tsx
<GradientButton href="/projects" icon={projectsIcon}>
  {t("ProjectsButton")}
</GradientButton>
<OutlinedButton href="#about-more" icon={aboutIcon}>
  {t("AboutButton")}
</OutlinedButton>
```

- Manter mesmas chaves i18n (`ProjectsButton`, `AboutButton`).
- Manter `#about-more` no divisor do hero (já existe).
- Ícones: trocar ordem para bater com label (projects no gradiente).

**Nota:** Se Direção A for mergeada antes, preservar spacing/tipografia do A; só inverter botões.

### Especificação — Faixa Destaques

#### Wireframe

```
┌──────────────────────────────────────────────────────────────┐
│  Destaques   Projeto A · Projeto B · Projeto C        ver →  │
└──────────────────────────────────────────────────────────────┘
```

#### Markup sugerido (semântico)

```tsx
<section className="featured-projects-strip" aria-labelledby="featured-projects-heading">
  <div className="featured-projects-strip__inner">
    <h2 id="featured-projects-heading" className="featured-projects-strip__label">
      {t("FeaturedProjectsLabel")}
    </h2>
    <ul className="featured-projects-strip__list">
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
    <Link href="/projects" className="featured-projects-strip__all">
      {t("FeaturedProjectsViewAll")}
    </Link>
  </div>
</section>
```

#### Config estática — `src/lib/featured-projects.ts`

```ts
export type FeaturedProject = {
  id: string;
  title: string;
  href: string;
};

export const featuredProjects: FeaturedProject[] = [
  { id: "exemplo-1", title: "Nome do Projeto", href: "https://github.com/..." },
  // 2–3 itens — coordenador preenche
];
```

- **Não** buscar GitHub na Home nesta versão (performance + simplicidade).
- Títulos podem ser literais ou vir de i18n se precisarem traduzir nomes (improvável).

#### i18n — chaves novas

| Chave | PT-BR (sugestão) | EN-US (sugestão) |
|-------|------------------|------------------|
| `FeaturedProjectsLabel` | Destaques | Highlights |
| `FeaturedProjectsViewAll` | ver todos | see all |

#### CSS — direção visual

```css
.featured-projects-strip {
  border-top: 1px solid rgb(255 255 255 / 8%);
  border-bottom: 1px solid rgb(255 255 255 / 8%);
  padding: 1rem 6%;
}
.featured-projects-strip__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  max-width: 850px;
  margin: 0 auto;
}
.featured-projects-strip__label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-legacy-muted);
}
.featured-projects-strip__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0;
  /* separador · via CSS between items */
}
```

- Links: cor `--color-legacy-text-soft`; hover `--color-legacy-text`.
- Mobile: label em linha própria; lista wrap; “ver todos” alinhado à direita ou full width.
- **Render condicional:** se `featuredProjects.length === 0`, não renderizar `<section>`.

#### Integração em `page.tsx`

```tsx
<main id="main-content">
  <HeroSection />
  <FeaturedProjectsStrip />
  <AboutSection />
  ...
</main>
```

### Especificação — Projects P1 (grade calma)

Objetivo: menos “dashboard”, mais foco em preview.

#### ProjectCard / `projects.css` — direções

| Elemento | Ajuste sugerido |
|----------|-----------------|
| Borda do card | reduzir opacidade ou remover |
| Background | mais transparente / igual `--color-legacy-project-card` com −opacity |
| Sombra | remover ou suavizar |
| Tags | font-size menor; padding reduzido; hover menos agressivo |
| Título | weight 500–600; mais contraste |
| Preview/imagem | manter ratio; opcional border-radius leve |

#### Fora de escopo P1

- Mudar grid columns logic.
- Trocar busca por outro UX.
- Implementar P2 (lista editorial).

### Checklist de implementação

**Fase 1 — Hero**
- [ ] Inverter GradientButton / OutlinedButton
- [ ] Validar anchor `#about-more` com header fixo

**Fase 2 — Destaques**
- [ ] Criar `featured-projects.ts` com 2–3 itens (placeholders até coordenador definir)
- [ ] Criar `FeaturedProjectsStrip.tsx`
- [ ] Adicionar estilos em `home.css`
- [ ] Inserir em `page.tsx`
- [ ] Adicionar chaves i18n PT/EN
- [ ] Ocultar strip se array vazio

**Fase 3 — Projects P1**
- [ ] Ajustar `projects.css` (card, tags)
- [ ] Smoke test busca + filtro por tag
- [ ] Smoke test modal de vídeo (se aplicável)

### Testes manuais

1. Hero: gradiente leva a `/projects`; outline rola para About.
2. Strip: 3 links abrem destinos corretos; “ver todos” → `/projects`.
3. Strip mobile 390px: legível, sem overflow horizontal.
4. Home com `featuredProjects = []`: strip ausente, layout ok.
5. Projects: cards visualmente mais leves; funcionalidade intacta.
6. PT-BR / EN-US nas novas strings.

### Definition of Done

- PR(s) com descrição referenciando este doc e [protótipo](./prototypes/proto-c-projects-ritmo.png).
- Lista de projetos em destaque documentada no PR ou comentário.
- Screenshots hero + strip + projects.
- Sem regressão em rotas existentes.

---

## 3. Wireframes

### Home — transição Hero → About

```
│  ... hero ...                                            │
│  [ ver projetos ]  (gradiente)   [ saber mais ] (outline)│
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│  DESTAQUES   API X · Portfolio · Mobile        ver →     │
└──────────────────────────────────────────────────────────┘
│  About ...                                               │
```

### Projects — P1

```
Projetos
[ busca ........................ ]  [tag] [tag]

┌──────────────┐  ┌──────────────┐
│   preview    │  │   preview    │
│ Título       │  │ Título       │
│ tags leves   │  │ tags leves   │
└──────────────┘  └──────────────┘
(bordas sutis, mais imagem)
```

---

## 4. Conteúdo para o coordenador preencher

Copiar na task de implementação:

```
Projetos em destaque (máx. 3):
1. Título: _______________  URL: _______________
2. Título: _______________  URL: _______________
3. Título: _______________  URL: _______________

CTA secundário no hero: [ ] manter "saber mais"  [ ] renomear para: _______
Implementar após Direção A: [ ] sim  [ ] não  [ ] em paralelo
```

---

## 5. Relação com Direção A

| Aspecto | Só A | Só C | A + C |
|---------|------|------|-------|
| Hero spacing/tipo | ✓ | — | ✓ |
| Stack leve | ✓ | — | ✓ |
| CTA Projetos primário | — | ✓ | ✓ |
| Faixa destaques | — | ✓ | ✓ |
| Projects P1 | — | ✓ | ✓ |

**Recomendação:** merge A → depois C, para o dev não retrabalhar hero duas vezes.

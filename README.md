# MyPageV2 ![status](https://img.shields.io/static/v1?label=status&message=em%20andamento&color=yellow)
<br>

## Resumo do Projeto

O **MyPageV2** é a reescrita do meu site profissional ([matheusassis.dev](https://matheusassis.dev)): mesma aparência pública, stack moderna e foco em performance.

A versão em produção hoje foi feita em **ASP.NET MVC** (repositório [MyPage](https://github.com/assis402/MyPage)). Este projeto reconstrói o portfólio em **Next.js**, mantendo o visual, o conteúdo em **en-US / pt-BR** e a listagem de projetos pessoais via GitHub. A área de cursos da versão anterior **não entra** neste rebuild.

O site ao vivo continua sendo o legado até o cutover de DNS (ainda não disponível).

<br>

## Como rodar localmente

```bash
yarn install
yarn dev
```

- App: [http://localhost:3000](http://localhost:3000) (redireciona para `/en-US`)
- Português: [http://localhost:3000/pt-BR](http://localhost:3000/pt-BR)

Variáveis de ambiente estão descritas em `.env.example`. Integrações (GitHub na listagem de projetos; Medium na home; Google Auth no admin — preencha `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `AUTH_SECRET`).

<br>

## Tecnologias Utilizadas

- **Next.js 15** (App Router, Server Components)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **next-intl** (en-US / pt-BR)
- **Yarn 4**
- **ESLint + Prettier**
<br>
<div>
    <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" height="48" alt="Next.js">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="48" alt="React">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="48" alt="TypeScript">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" height="48" alt="Tailwind CSS">
</div>
<br>

## Estrutura do Projeto

```
MyPageV2
├── public/
│   ├── images/                 // Ícones, foto, certificados, flags
│   └── cv/                     // PDFs do currículo (pt-BR / en-US)
│
├── src/
│   ├── app/                    // sitemap.ts, robots.ts, rotas por idioma
│   │   └── [locale]/           // home, projects, admin
│   ├── components/
│   │   ├── layout/             // Header, menu mobile, footer, troca de idioma
│   │   ├── home/               // Hero, about, skills, timeline, Medium
│   │   └── projects/           // Busca, tags, cards e modal de vídeo
│   ├── lib/
│   │   ├── i18n/               // next-intl, cookie de idioma
│   │   ├── fonts/              // Poppins via next/font
│   │   ├── github/             // Fetch + cache dos repositórios com tag mypage
│   │   ├── medium/             // Fetch + cache das publicações (até 10 posts)
│   │   ├── auth/               // Allowlist do admin (e-mail do dono)
│   │   └── seo.ts              // metadataBase, Open Graph, Twitter
│   ├── messages/               // Copy en-US e pt-BR
│   └── styles/                 // Tokens de tema + chrome do layout
│
└── docs/                       // Backlog e notas de rebuild
```
<br>

## O que já está pronto

- Base Next.js + TypeScript + Tailwind + Yarn
- Internacionalização en-US / pt-BR (prefixo na URL + cookie)
- Tokens visuais extraídos do CSS do site legado
- Assets estáticos (imagens, favicon, CVs)
- Header, menu mobile, footer (contato + copiar e-mail) e botão de voltar ao topo
- Navegação **About** e **Projects** (sem Courses)
- Home: hero (saudação, stack, CTAs) e seção About (textos + download de CV)
- Home: barras de skills (animação ao scroll)
- Home: timeline de experiência (expandir/recolher)
- Serviço de projetos GitHub (cache no servidor)
- Página de projetos com busca, tags, cards e modal de vídeo
- Serviço de publicações Medium (cache no servidor)
- Home: seção Medium (cards + link para o perfil)
- Admin: login Google (somente o dono), logout e limpeza de cache (projetos e artigos)
- SEO: metadata por locale, Open Graph, Twitter, sitemap.xml, robots.txt
- Redirects das URLs do site legado (`/Projects`, `/Courses`, `/Admin`) para rotas `en-US`
<br>

## Ainda não disponível

- CI/CD e deploy em produção
- Cutover de DNS de matheusassis.dev
<br>

## Padrões de Design e Arquitetura

- App Router do Next.js
- Server Components por padrão; Client Components só onde há interação (menu, copiar e-mail, scroll, timeline)
- i18n nas strings de interface (`src/messages`)
- Cache de APIs externas no servidor quando as integrações forem ligadas (`unstable_cache` / ISR)
- Visual alinhado ao site legado; código interno não replica a arquitetura MVC
<br>

## Environments

- Variáveis ficam em `.env` (não versionado). O modelo está em `.env.example`.
- `NEXT_PUBLIC_SITE_URL` alimenta `metadataBase`, sitemap e robots.
- Bookmarks do ASP.NET (`/Projects`, `/Courses`, `/Admin`, e as variantes em minúsculas) redirecionam para o locale padrão **en-US**, não para o cookie `NEXT_LOCALE`.
- Tokens de GitHub e Google **não** devem ser reaproveitados do repositório legado.
<br>

## CI/CD

Ainda não disponível.
<br>

## Deploy

Ainda não disponível. O domínio [matheusassis.dev](https://matheusassis.dev) aponta para a aplicação ASP.NET MVC até o cutover.
<br>

## Links

- **Site atual (legado):** https://matheusassis.dev
- **Base visual / código anterior:** https://github.com/assis402/MyPage
- **Este repositório:** https://github.com/assis402/MyPageV2

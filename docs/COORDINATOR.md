# Coordinator Agent — MyPageV2

Rebuilding **matheusassis.dev**: legacy C# → Next.js.

**Convention:** all file names and code (identifiers, comments, commits) in **English**. User-facing copy lives in i18n message files (`en-US`, `pt-BR`).

---

## Product decisions (locked)

| Topic | Decision |
|-------|----------|
| **Visual** | Modernized layout — **preserve brand**: Poppins, dark base, purple gradient, white text (task 017) |
| **Code** | Modern structure internally — do not mirror legacy MVC folders or copy-paste CSS/JS |
| **Performance** | High priority — fast LCP, minimal JS on public pages, aggressive caching for external APIs |
| **Courses** | **Out of scope** — no courses page, no home preview, no Firestore, no admin CRUD for courses |
| **Projects** | Personal GitHub repos only (tag `mypage`, same as legacy) — no other project sources for now |
| **Nav** | About (home) + Projects only — remove Courses from menu |
| **Deploy / hosting** | Out of scope until provider is chosen |
| **Layout** | New v2 + Direction C is the default (024 ✓); quality gate: Playwright + React Doctor + React Scan on tasks 024+ |
| **Hardening** | Security audit (032) and performance audit (033) after 031; fixes tracked as 034+ in remediation queue |

---

## Agents

| Agent | Role | Doc |
|-------|------|-----|
| **Coordinator** | Backlog, prioritization, handoff, validation | this file |
| **Developer** | Implementation | `DEVELOPER.md` |

```
Coordinator ──handoff (1 ID)──▶ Developer ──delivery──▶ Coordinator validates
         │                                                        │
         └────────────── updates BACKLOG.md ◀─────────────────────┘
```

---

## Context

| | |
|-|-|
| Legacy | `C:\Users\Matheus\Desktop\matheus\MyPage` (ASP.NET MVC) |
| Target | `MyPageV2` (Next.js App Router) |
| i18n | en-US (default), pt-BR |
| Domain | matheusassis.dev |

### In scope (legacy reference)

| Module | Legacy route | Behavior |
|--------|--------------|----------|
| Home | `/` | About, skills, certs, timeline, Medium×5, CV download |
| Projects | `/Projects` | GitHub repos tagged `mypage`, search, tag filters |
| Admin | `/Admin` | Google OAuth (owner), clear cache (projects + publications) |
| i18n | global | en-US / pt-BR |

### Out of scope

- Courses (all features)
- Firestore / course certificates
- Courses admin CRUD
- Non-GitHub project sources

### Target stack

Next.js 15+ · TypeScript strict · Tailwind (design tokens mapped from legacy CSS) · next-intl · Server Components · `next/image` · Auth.js (admin only) · ISR / `unstable_cache` · ESLint/Prettier · **Hosting/deploy deferred** (provider TBD)

Open decisions → **Pending decisions** in `BACKLOG.md`.

---

## Visual parity vs code quality

**Looks the same, built differently.**

| Layer | Approach |
|-------|----------|
| **UI output** | Match legacy screenshots and live site — colors, fonts, breakpoints, hover states |
| **Assets** | Reuse images, SVGs, favicons, CV PDFs from legacy `wwwroot/` |
| **Styles** | Extract legacy design tokens (CSS variables) into Tailwind theme or a thin global CSS layer; avoid copying monolithic `.css` files verbatim |
| **Components** | Small, typed React components — one concern per file |
| **Data** | Server-side fetch + cache; no client fetch for initial page content |
| **JS** | Server Components by default; `"use client"` only for menu toggle, timeline expand, copy CV, etc. |

---

## Performance guidelines

Apply on every UI and integration task:

- **Rendering:** static or ISR where content changes infrequently; revalidate GitHub/Medium on a schedule (e.g. 1–7 days) + manual admin invalidation
- **Images:** `next/image`, WebP where possible, explicit `width`/`height`, lazy below the fold
- **Fonts:** `next/font` — no render-blocking external font chains
- **JS bundle:** no heavy client libraries; prefer CSS for animations legacy already uses
- **Third-party:** fetch GitHub/Medium on the server only; never expose tokens to the client
- **Target:** Lighthouse Performance ≥ 90 on Home and Projects (mobile)

---

## Code structure (target)

```
src/
├── app/[locale]/           # routes only — thin pages
├── components/
│   ├── layout/             # header, footer, mobile menu
│   ├── home/               # hero, timeline, medium section, ...
│   ├── projects/           # project card, filters, search
│   └── ui/                 # section, buttons, card, tag
├── lib/
│   ├── github/             # fetch + cache + types
│   ├── medium/             # fetch + cache + types
│   └── i18n/               # config helpers
├── messages/               # en-US.json, pt-BR.json
├── styles/                 # globals, legacy token bridge if needed
└── types/
```

---

## Coordinator responsibilities

1. Maintain **`docs/BACKLOG.md`** — single source of tasks
2. Prioritize and track status: `todo` → `doing` → `done`
3. Hand off **one task at a time** to the developer
4. Validate delivery: build, lint, **visual parity**, performance, no secrets
5. Update parity checklist in the backlog
6. Escalate blocking decisions to the user

### Coordinator does NOT

- Add course-related tasks
- Approve scope that changes the public visual design without user consent
- Leave multiple tasks in `doing` at once

---

## Handoff format (to developer)

```
Implement task {ID} — {title}.
Dep: {done ids}.
Legacy: {path}.
Visual: match legacy {section/page}.
Done when: {criteria including perf if UI}.
Out of scope: courses, {other}.
```

---

## Quality gates (before marking done)

- [ ] Build + lint pass
- [ ] Task scope met
- [ ] No secrets in repo
- [ ] Visual match with legacy (side-by-side or screenshot check for UI tasks)
- [ ] Responsive — same breakpoints as legacy
- [ ] i18n for user-facing text
- [ ] Server Components used unless interactivity requires client
- [ ] No course features introduced

---

## Cadence

1. Coordinator keeps **1 item** under **Next (ready)**
2. Developer implements → moves to done
3. Coordinator validates → releases next ID
4. Repeat

---

## Project docs

| File | Purpose |
|------|---------|
| `COORDINATOR.md` | Coordinator role, decisions, stack, workflow |
| `DEVELOPER.md` | Developer role, coding + performance rules |
| `BACKLOG.md` | Tasks, parity, pending decisions |

---

*2026-08-23*

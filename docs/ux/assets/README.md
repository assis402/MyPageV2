# Assets — Hard Skills (ícones minimalistas)

**Protótipo de referência:** [proto-about-skills-dev-reference.png](../prototypes/proto-about-skills-dev-reference.png)  
**Brief completo:** [secoes-about-skills-background.md](../secoes-about-skills-background.md)

---

## Estilo dos ícones

| Regra | Valor |
|-------|-------|
| Formato | SVG monocromático |
| Cor | `currentColor` (herda do tile — branco ~82%) |
| Traço | `1.5px`, `round` cap/join |
| ViewBox | `24×24` |
| Estilo | Line icons geométricos — **não** logos coloridos de marca |

---

## Inventário

| Arquivo | Skill | Label UI |
|---------|-------|----------|
| `csharp.svg` | C# | C# |
| `dotnet.svg` | .NET | .NET |
| `unit-test.svg` | Testes unitários | Unit tests |
| `integration-test.svg` | Testes de integração | Integration tests |
| `typescript.svg` | TypeScript | TypeScript |
| `angular.svg` | Angular | Angular |
| `react-native.svg` | React Native | React Native |
| `azure.svg` | Azure | Azure |
| `react.svg` | React | React |
| `devops.svg` | DevOps | DevOps |

**Produção:** `public/images/stacks/`  
**Cópia de referência UX:** `docs/ux/assets/stacks/` (mesmos arquivos)

**Manifesto sugerido:** `src/lib/stacks.ts` — array `STACK_ITEMS` com `id`, `label`, `iconSrc`, `iconAlt`.

---

## Tile (CSS de referência)

```css
.stack-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 0.75rem;
  background: rgb(255 255 255 / 4%);
  color: rgb(255 255 255 / 82%);
  transition: border-color 0.2s, background-color 0.2s;
}

.stack-tile:hover {
  border-color: rgb(192 132 252 / 35%);
  background: rgb(192 132 252 / 8%);
}

.stack-tile__icon {
  width: 1.75rem;
  height: 1.75rem;
}

.stack-tile__label {
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgb(255 255 255 / 55%);
  text-align: center;
  line-height: 1.2;
}
```

Grid: `display: grid; grid-template-columns: repeat(auto-fill, minmax(4.5rem, 1fr)); gap: 0.75rem;`

---

## Uso no componente (sugestão)

```tsx
import Image from "next/image";
import { STACK_ITEMS } from "@/lib/stacks";

{STACK_ITEMS.map((item) => (
  <div key={item.id} className="stack-tile" title={item.label}>
    <Image
      className="stack-tile__icon"
      src={item.iconSrc}
      alt={item.iconAlt}
      width={28}
      height={28}
    />
    <span className="stack-tile__label">{item.label}</span>
  </div>
))}
```

Labels podem vir de i18n no futuro; por ora literais em inglês como no `AboutSection` atual.

---

## Preview local dos ícones

Abrir qualquer SVG em `public/images/stacks/` no browser — fundo escuro recomendado para validar contraste.

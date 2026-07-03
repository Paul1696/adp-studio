# Composants UI — ADP Studio

## Source de vérité

Le design system est défini dans `packages/ui/src/`.  
Les composants locaux à l'app sont dans `apps/web/src/components/`.

## Hiérarchie

```
packages/ui          ← Composants primitifs (Button, Card, Input…)
     ↓
apps/web/components/ui        ← Overrides et compositions locales
apps/web/components/layout    ← AppSidebar, AppHeader, Providers
apps/web/components/features  ← Composants métier (ProjectCard, AgentChat…)
```

## Composants disponibles (`@adp-studio/ui`)

| Composant | Variants |
|---|---|
| `Button` | default, destructive, outline, secondary, ghost, link |
| `Badge` | default, secondary, destructive, outline, success, warning |
| `Card` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `Input` | — |
| `Label` | — |
| `Separator` | horizontal, vertical |
| `Skeleton` | — |
| `Tooltip` | Tooltip, TooltipTrigger, TooltipContent, TooltipProvider |

## Convention de style

- Utiliser `cn()` de `@adp-studio/ui` pour la composition de classes
- Tokens de couleur via variables CSS HSL (`--primary`, `--muted`…)
- Jamais de couleurs hardcodées (`text-blue-500`) dans les composants partagés

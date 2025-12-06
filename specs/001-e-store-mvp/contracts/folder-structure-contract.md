# Folder Structure Contract

**Version**: 1.0.0
**Date**: 2025-12-06
**Type**: Architectural Contract

## Overview

This contract defines the mandatory folder structure pattern for all widgets and features in the e-store codebase, following Feature-Sliced Design (FSD) methodology.

## Widget/Feature Folder Structure Contract

### Mandatory Structure

Every widget or feature MUST follow this structure:

```
[layer]/[slice-name]/
├── [SliceName].tsx              ← REQUIRED: Main component (PascalCase)
├── [SliceName].module.scss      ← REQUIRED: Main styles (PascalCase)
├── index.ts                     ← REQUIRED: Barrel export (public API)
├── model/                       ← OPTIONAL: Business logic layer
│   └── use[SliceName].ts        ← Hook or store
└── ui/                          ← OPTIONAL: Auxiliary UI components
    ├── [Slice]ComponentA.tsx    ← Internal composition components
    └── [Slice]ComponentB.tsx    ← Internal composition components
```

**Where**:
- `[layer]` = `features/` or `widgets/`
- `[slice-name]` = kebab-case directory name (e.g., `header`, `hero-banner`)
- `[SliceName]` = PascalCase component name matching slice (e.g., `Header`, `HeroBanner`)

---

## Rules

### Rule 1: Main Component at Root

**REQUIRED**: The primary component file MUST be at the slice root level.

✅ **Correct**:
```
widgets/header/
├── Header.tsx              ← Main component at root
└── ui/
    └── HeaderNav.tsx       ← Auxiliary component in ui/
```

❌ **Incorrect**:
```
widgets/header/
└── ui/
    ├── Header.tsx          ← Main component should NOT be in ui/
    └── HeaderNav.tsx
```

---

### Rule 2: Main Styles at Root

**REQUIRED**: The primary SCSS module MUST be co-located with the main component at root.

✅ **Correct**:
```
widgets/header/
├── Header.tsx
├── Header.module.scss      ← Styles next to component
```

❌ **Incorrect**:
```
widgets/header/
├── Header.tsx
└── styles/
    └── Header.module.scss  ← Styles should be at root
```

---

### Rule 3: Barrel Export at Root

**REQUIRED**: Every widget/feature MUST have an `index.ts` barrel export at root.

✅ **Correct**:
```typescript
// widgets/header/index.ts
export { Header } from './Header';
export type { HeaderProps } from './Header';
```

❌ **Incorrect**:
```typescript
// No index.ts file - forces direct imports
import { Header } from '@/widgets/header/Header'; // Discouraged
```

**Rationale**: Barrel exports:
- Provide a stable public API
- Decouple consumers from internal file structure
- Enable future refactoring without breaking changes

---

### Rule 4: Auxiliary UI in ui/ Subfolder

**OPTIONAL**: Internal composition components SHOULD be in `ui/` subfolder.

✅ **Correct**:
```
widgets/header/
├── Header.tsx              ← Main component (public)
└── ui/
    ├── HeaderNav.tsx       ← Auxiliary component (internal)
    ├── HeaderLogo.tsx      ← Auxiliary component (internal)
    └── HeaderSearch.tsx    ← Auxiliary component (internal)
```

**Rationale**: The `ui/` folder indicates **internal implementation details** not part of the public API.

---

### Rule 5: No Empty ui/ Folders

**REQUIRED**: Empty `ui/` folders MUST be deleted.

✅ **Correct**:
```
widgets/hero-banner/
├── HeroBanner.tsx
├── HeroBanner.module.scss
└── index.ts
# No ui/ folder - widget has no auxiliary components
```

❌ **Incorrect**:
```
widgets/hero-banner/
├── HeroBanner.tsx
├── HeroBanner.module.scss
├── index.ts
└── ui/                     ← Empty folder should be deleted
```

---

### Rule 6: Business Logic in model/ Subfolder

**OPTIONAL**: Hooks, stores, and business logic SHOULD be in `model/` subfolder.

✅ **Correct**:
```
widgets/header/
├── Header.tsx
├── model/
│   ├── useHeaderCounters.ts    ← Custom hook
│   └── headerStore.ts          ← Zustand store
```

**Rationale**: Separates UI from business logic, following FSD segmentation.

---

## Import Patterns

### Public API Imports (Preferred)

✅ **Correct**: Import via barrel export
```typescript
import { Header } from '@/widgets/header';
import { HeroBanner } from '@/widgets/hero-banner';
```

### Direct Imports (Discouraged)

⚠️ **Discouraged**: Direct imports bypass public API
```typescript
import { Header } from '@/widgets/header/Header';
import { HeaderNav } from '@/widgets/header/ui/HeaderNav'; // Especially bad - accessing internals
```

### Internal Imports (Within Same Slice)

✅ **Correct**: Relative imports within the same slice
```typescript
// In widgets/header/Header.tsx
import { HeaderNav } from './ui/HeaderNav';
import { useHeaderCounters } from './model/useHeaderCounters';
```

---

## Validation

Every pull request MUST verify:

1. [ ] Main component at slice root (`[SliceName].tsx`)
2. [ ] Main styles at slice root (`[SliceName].module.scss`)
3. [ ] Barrel export exists (`index.ts`)
4. [ ] No empty `ui/` or `model/` folders
5. [ ] Auxiliary components (if any) in `ui/` subfolder
6. [ ] Business logic (if any) in `model/` subfolder
7. [ ] No direct imports to internal files (`/ui/*` or `/model/*`)

---

## Examples

### Simple Widget (No Auxiliary Components)

```
widgets/category-section/
├── CategorySection.tsx
├── CategorySection.module.scss
└── index.ts
```

### Complex Widget (With Auxiliary Components)

```
widgets/header/
├── Header.tsx
├── Header.module.scss
├── index.ts
├── model/
│   └── useHeaderCounters.ts
└── ui/
    ├── HeaderNav.tsx
    ├── HeaderLogo.tsx
    ├── HeaderSearch.tsx
    ├── HeaderBurger.tsx
    ├── HeaderDrawer.tsx
    └── HeaderIcons.tsx
```

---

## Migration from Non-Compliant Structure

When refactoring non-compliant widgets:

1. Use `git mv` to preserve file history
2. Move main component and styles to root
3. Create barrel export (`index.ts`)
4. Update all import paths
5. Delete empty folders
6. Verify build succeeds

See [quickstart.md](../quickstart.md) for step-by-step instructions.

---

## Enforcement

This contract is enforced by:

- Code review checklist
- Constitutional principle I (FSD compliance)
- SpecKit workflows (`/speckit.plan`, `/speckit.tasks`)

**Non-compliance blocks merge approval.**

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-06 | Initial folder structure contract definition |

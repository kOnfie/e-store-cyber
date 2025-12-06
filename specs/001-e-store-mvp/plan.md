# Implementation Plan: Restructure Widget/Feature Folder Organization

**Branch**: `001-e-store-mvp` | **Date**: 2025-12-06 | **Spec**: [spec.md](./spec.md)
**Input**: Restructure widgets and features folders so main component files are at root level, with auxiliary UI components in ui/ subfolder

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Refactor the folder structure for all widgets and features to move main component files (e.g., `Header.tsx`, `Header.module.scss`) from `ui/` subfolder to the root of each widget/feature folder. Auxiliary UI components remain in the `ui/` subfolder. This improves discoverability and aligns with FSD best practices where the main entry point of a feature/widget is clearly identifiable at the top level.

**Current Structure** (example - header widget):
```
widgets/header/
├── ui/
│   ├── Header.tsx          ← Main component (should be at root)
│   ├── Header.module.scss  ← Main styles (should be at root)
│   ├── HeaderNav.tsx       ← Auxiliary component (stays in ui/)
│   └── HeaderLogo.tsx      ← Auxiliary component (stays in ui/)
```

**Target Structure**:
```
widgets/header/
├── Header.tsx              ← Main component moved to root
├── Header.module.scss      ← Main styles moved to root
└── ui/
    ├── HeaderNav.tsx       ← Auxiliary component
    └── HeaderLogo.tsx      ← Auxiliary component
```

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)
**Primary Dependencies**: Next.js 14+ (App Router), React, SCSS Modules
**Storage**: N/A (refactoring task, no data storage changes)
**Testing**: Manual verification of imports and component rendering
**Target Platform**: Web (Next.js)
**Project Type**: Web application (Next.js frontend)
**Performance Goals**: No performance impact - pure structural refactoring
**Constraints**: Zero breaking changes - all imports must be updated atomically
**Scale/Scope**: ~7 widgets to restructure (header, hero-banner, category-section, popular-products-section, product-card, product-list, and future features)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| **I. Feature-Sliced Design (FSD)** | ✅ **PASS** | This refactoring **improves** FSD compliance by making main component entry points clearly visible at feature/widget root level, consistent with FSD best practices |
| **II. TypeScript Strict Mode** | ✅ **PASS** | No type changes - only file moves and import path updates |
| **III. SCSS Modules Only** | ✅ **PASS** | SCSS module files move alongside their components, maintaining 1:1 component-style pairing |
| **IV. Server State Management** | ✅ **PASS** | No TanStack Query or API changes |
| **V. Client State Minimalism** | ✅ **PASS** | No Zustand store changes |
| **VI. Component Composition & Reusability** | ✅ **PASS** | Component hierarchy unchanged - only folder structure improves discoverability |

**Gate Status**: ✅ **PASSED** - All constitutional principles are satisfied. This refactoring enhances FSD compliance without violating any principles.

### Post-Design Re-evaluation (After Phase 1)

After completing research.md, data-model.md, quickstart.md, and contracts/, re-evaluating constitutional compliance:

| Principle | Compliance | Post-Design Notes |
|-----------|------------|-------------------|
| **I. Feature-Sliced Design (FSD)** | ✅ **PASS** | Design artifacts confirm this refactoring aligns with official FSD methodology. Folder structure contract (contracts/folder-structure-contract.md) codifies FSD best practices. |
| **II. TypeScript Strict Mode** | ✅ **PASS** | Refactoring involves zero type changes. Build verification step in quickstart.md ensures `tsc --noEmit` passes. |
| **III. SCSS Modules Only** | ✅ **PASS** | Design maintains 1:1 component-style pairing. SCSS modules remain co-located with components at slice root. |
| **IV. Server State Management** | ✅ **PASS** | No API integration changes. TanStack Query usage unaffected. |
| **V. Client State Minimalism** | ✅ **PASS** | No Zustand store modifications. Model layer (useHeaderCounters) remains in model/ subfolder. |
| **VI. Component Composition & Reusability** | ✅ **PASS** | Design preserves component hierarchy. Auxiliary components remain in ui/ subfolder, maintaining composition boundaries. |

**Post-Design Gate Status**: ✅ **PASSED** - All design artifacts reinforce constitutional compliance. No violations introduced during design phase.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

**Current Structure** (before refactoring):
```text
src/
├── widgets/
│   ├── header/
│   │   ├── ui/
│   │   │   ├── Header.tsx          ← MOVE to root
│   │   │   ├── Header.module.scss  ← MOVE to root
│   │   │   ├── HeaderNav.tsx       ← KEEP in ui/
│   │   │   ├── HeaderLogo.tsx      ← KEEP in ui/
│   │   │   ├── HeaderSearch.tsx    ← KEEP in ui/
│   │   │   ├── HeaderBurger.tsx    ← KEEP in ui/
│   │   │   ├── HeaderDrawer.tsx    ← KEEP in ui/
│   │   │   └── HeaderIcons.tsx     ← KEEP in ui/
│   │   └── model/
│   │       └── useHeaderCounters.ts
│   ├── hero-banner/
│   │   └── ui/
│   │       ├── HeroBanner.tsx          ← MOVE to root
│   │       ├── HeroBanner.module.scss  ← MOVE to root
│   │       └── index.ts                ← MOVE to root
│   ├── category-section/
│   │   ├── CategorySection.tsx         ← Already at root ✓
│   │   └── CategorySection.module.scss ← Already at root ✓
│   ├── product-card/
│   │   ├── ProductCard.tsx             ← Already at root ✓
│   │   ├── ProductCard.module.scss     ← Already at root ✓
│   │   ├── ProductCardSkeleton.tsx     ← Already at root ✓
│   │   ├── ProductCardSkeleton.module.scss ← Already at root ✓
│   │   └── index.ts                    ← Already at root ✓
│   ├── product-list/
│   │   ├── ProductList.tsx             ← Already at root ✓
│   │   ├── ProductList.module.scss     ← Already at root ✓
│   │   ├── ProductListSkeleton.tsx     ← Already at root ✓
│   │   ├── ProductListSkeleton.module.scss ← Already at root ✓
│   │   └── index.ts                    ← Already at root ✓
│   └── popular-products-section/
│       ├── PopularProductsSection.tsx      ← Already at root ✓
│       ├── PopularProductsSection.module.scss ← Already at root ✓
│       └── index.ts                        ← Already at root ✓
└── features/
    └── (future features follow same pattern)
```

**Target Structure** (after refactoring):
```text
src/
├── widgets/
│   ├── header/
│   │   ├── Header.tsx              ← Main component at root
│   │   ├── Header.module.scss      ← Main styles at root
│   │   ├── model/
│   │   │   └── useHeaderCounters.ts
│   │   └── ui/
│   │       ├── HeaderNav.tsx       ← Auxiliary UI components
│   │       ├── HeaderLogo.tsx
│   │       ├── HeaderSearch.tsx
│   │       ├── HeaderBurger.tsx
│   │       ├── HeaderDrawer.tsx
│   │       └── HeaderIcons.tsx
│   ├── hero-banner/
│   │   ├── HeroBanner.tsx          ← Main component at root
│   │   ├── HeroBanner.module.scss  ← Main styles at root
│   │   ├── index.ts                ← Barrel export at root
│   │   └── ui/                     ← Empty (can be deleted if no auxiliary components)
│   └── [other widgets remain unchanged - already compliant]
└── features/
    └── (future features follow this pattern)
```

**Structure Decision**: This is a Next.js web application using Feature-Sliced Design (FSD). The refactoring affects only the `widgets/` layer (and future `features/` layer). The pattern establishes that:
1. Main component file (`[WidgetName].tsx`) lives at widget root
2. Main styles file (`[WidgetName].module.scss`) lives at widget root
3. Auxiliary UI components live in `ui/` subfolder
4. Business logic/models live in `model/` subfolder (unchanged)
5. Barrel exports (`index.ts`) live at widget root

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitutional violations detected. This section is not applicable.

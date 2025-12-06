# Research: Widget/Feature Folder Restructuring

**Date**: 2025-12-06
**Feature**: Restructure widget/feature folder organization
**Phase**: 0 (Research & Unknowns Resolution)

## Research Questions

### 1. What is the standard FSD (Feature-Sliced Design) pattern for main component placement?

**Decision**: Main component files should be at the root level of each feature/widget slice.

**Rationale**:
- FSD official documentation recommends placing the main entry point (public API) at the slice root
- This improves discoverability - developers can immediately identify the primary component
- The `ui/` subfolder is intended for **internal UI composition** (sub-components), not the main export
- Example from FSD methodology:
  ```
  features/auth/
  ├── index.ts          ← Public API (barrel export)
  ├── AuthForm.tsx      ← Main component (public interface)
  └── ui/
      ├── LoginTab.tsx  ← Internal composition
      └── SignupTab.tsx ← Internal composition
  ```

**Alternatives Considered**:
- **Keep everything in ui/ subfolder**: Rejected because it reduces discoverability and conflicts with FSD best practices where `ui/` is for internal composition
- **Flatten all components to root (no ui/ folder)**: Rejected because it loses the distinction between public API and internal implementation details

**References**:
- Feature-Sliced Design documentation: https://feature-sliced.design/docs/reference/layers
- FSD "Public API" concept: Main exports live at slice root, internal details in subfolders

---

### 2. How should we handle widgets that already follow the correct pattern?

**Decision**: Leave compliant widgets untouched - only refactor non-compliant widgets.

**Rationale**:
- **Widgets already compliant** (main file at root): `category-section`, `product-card`, `product-list`, `popular-products-section`
- **Widgets requiring refactoring**: `header` (main files in `ui/`), `hero-banner` (main files in `ui/`)
- Minimizes risk by limiting scope to only necessary changes
- Preserves working code and git history where possible

**Alternatives Considered**:
- **Refactor all widgets uniformly**: Rejected because it introduces unnecessary churn for already-correct structures
- **Standardize auxiliary component naming conventions**: Deferred to future work - focus on structural pattern first

---

### 3. What is the correct import path update strategy to prevent breaking changes?

**Decision**: Use git mv + atomic commit with all import updates to ensure zero breakage.

**Rationale**:
- Git preserves file history when using `git mv` instead of manual delete/create
- All imports must be updated in the **same commit** as file moves to prevent build breakage
- TypeScript compiler will catch any missed import updates during verification
- Next.js App Router uses absolute imports from `@/` which simplifies path updates

**Alternatives Considered**:
- **Incremental refactoring (one widget at a time)**: Rejected because partial states create confusion and potential build failures
- **Use symlinks temporarily**: Rejected as it adds unnecessary complexity and doesn't solve the root problem

**Implementation Steps**:
1. Identify all files importing from widgets to be refactored (use grep/ripgrep)
2. Move files using `git mv` to preserve history
3. Update all import statements in the same commit
4. Run `npm run build` to verify no breakage
5. Commit atomically with message describing refactoring scope

---

### 4. Should index.ts barrel exports be created for all widgets?

**Decision**: Create `index.ts` barrel exports at widget root to standardize public API.

**Rationale**:
- Barrel exports provide a clear public API surface: `import { Header } from '@/widgets/header'`
- Prevents direct imports from internal files: `import { HeaderNav } from '@/widgets/header/ui/HeaderNav'` (discouraged)
- Already present in some widgets (`hero-banner`, `product-card`, `product-list`) - standardize across all
- Simplifies import statements and allows future internal refactoring without breaking consumers

**Pattern**:
```typescript
// widgets/header/index.ts
export { Header } from './Header';
export type { HeaderProps } from './Header';
```

**Alternatives Considered**:
- **Direct imports without barrel exports**: Rejected because it tightly couples consumers to internal file structure
- **Re-export auxiliary components through index.ts**: Rejected because auxiliary UI should remain internal to the widget

---

### 5. What should happen to empty ui/ folders after moving main components?

**Decision**: Delete empty `ui/` folders; keep `ui/` folder if it contains auxiliary components.

**Rationale**:
- **header widget**: Keep `ui/` folder (contains 6 auxiliary components: HeaderNav, HeaderLogo, etc.)
- **hero-banner widget**: Delete `ui/` folder if empty after moving HeroBanner.tsx (no auxiliary components identified)
- Eliminates unnecessary directory clutter
- Future auxiliary components can recreate `ui/` folder as needed

**Alternatives Considered**:
- **Keep empty ui/ folders for consistency**: Rejected because empty folders serve no purpose and add cognitive load
- **Move auxiliary components to root alongside main component**: Rejected because it loses the distinction between public API and internal composition

---

## Summary of Research Findings

| Research Area | Decision | Impact |
|--------------|----------|--------|
| **FSD Pattern** | Main components at slice root, auxiliary in `ui/` | Improves discoverability and FSD compliance |
| **Scope** | Refactor only `header` and `hero-banner` widgets | Minimizes risk, preserves compliant code |
| **Import Strategy** | Atomic commit with `git mv` + all import updates | Zero breaking changes, preserves git history |
| **Barrel Exports** | Standardize `index.ts` at all widget roots | Clear public API, decouples consumers from internal structure |
| **Empty Folders** | Delete empty `ui/` folders, keep when auxiliary components exist | Reduces clutter, maintains clarity |

---

## Validation Checklist

Before proceeding to Phase 1 (Design), verify:

- [x] All research questions resolved with clear decisions
- [x] No NEEDS CLARIFICATION items remain in Technical Context
- [x] FSD pattern confirmed and documented
- [x] Import update strategy defined and risk-free
- [x] Barrel export pattern standardized
- [x] Empty folder cleanup policy established

**Status**: ✅ All research complete - ready for Phase 1 (Design)

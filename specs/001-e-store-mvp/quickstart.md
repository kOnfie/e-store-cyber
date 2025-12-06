# Quickstart: Widget/Feature Folder Restructuring

**Date**: 2025-12-06
**Feature**: Restructure widget/feature folder organization
**Estimated Time**: 15-30 minutes

## Prerequisites

Before starting this refactoring:

1. ✅ All changes committed to git (clean working directory)
2. ✅ On branch `001-e-store-mvp` or feature branch
3. ✅ Node modules installed (`npm install`)
4. ✅ Project builds successfully (`npm run build`)

## Quick Implementation Steps

### Step 1: Find All Import References (5 min)

Identify all files that import from widgets to be refactored:

```bash
# Find all imports from header widget
grep -r "from '@/widgets/header" src/

# Find all imports from hero-banner widget  
grep -r "from '@/widgets/hero-banner" src/
```

**Expected Output**: List of files importing Header or HeroBanner components.

---

### Step 2: Refactor Header Widget (10 min)

#### Move Main Files

```bash
# Move main component and styles to root
git mv src/widgets/header/ui/Header.tsx src/widgets/header/Header.tsx
git mv src/widgets/header/ui/Header.module.scss src/widgets/header/Header.module.scss
```

#### Create Barrel Export

Create `src/widgets/header/index.ts`:

```typescript
export { Header } from './Header';
```

#### Update Internal Imports in Header.tsx

Open [src/widgets/header/Header.tsx](../../src/widgets/header/Header.tsx) and update imports of auxiliary components:

**Before**:
```typescript
import { HeaderNav } from './HeaderNav';
import { HeaderLogo } from './HeaderLogo';
```

**After**:
```typescript
import { HeaderNav } from './ui/HeaderNav';
import { HeaderLogo } from './ui/HeaderLogo';
```

#### Update Consumer Imports

Update all files that import Header (from Step 1 search results):

**Before**:
```typescript
import { Header } from '@/widgets/header/ui/Header';
```

**After**:
```typescript
import { Header } from '@/widgets/header';
```

---

### Step 3: Refactor Hero Banner Widget (10 min)

#### Move Main Files

```bash
# Move main component, styles, and barrel export to root
git mv src/widgets/hero-banner/ui/HeroBanner.tsx src/widgets/hero-banner/HeroBanner.tsx
git mv src/widgets/hero-banner/ui/HeroBanner.module.scss src/widgets/hero-banner/HeroBanner.module.scss
git mv src/widgets/hero-banner/ui/index.ts src/widgets/hero-banner/index.ts
```

#### Delete Empty ui/ Folder

```bash
# Remove empty ui directory
rmdir src/widgets/hero-banner/ui
```

#### Update Consumer Imports

Update all files that import HeroBanner (from Step 1 search results):

**Before**:
```typescript
import { HeroBanner } from '@/widgets/hero-banner/ui/HeroBanner';
```

**After**:
```typescript
import { HeroBanner } from '@/widgets/hero-banner';
```

---

### Step 4: Verify Build (5 min)

```bash
# Type check
npx tsc --noEmit

# Build project
npm run build

# Run dev server (optional - manual testing)
npm run dev
```

**Expected**: All commands succeed with no errors.

---

### Step 5: Commit Changes (2 min)

```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "refactor: restructure header and hero-banner widgets to FSD pattern

- Move Header.tsx and Header.module.scss to widget root
- Move HeroBanner.tsx and HeroBanner.module.scss to widget root
- Create barrel exports (index.ts) for public API
- Update all import paths to use new structure
- Delete empty hero-banner/ui/ directory

This improves FSD compliance by placing main components at slice root level."
```

---

## Verification Checklist

After completing the refactoring, verify:

- [ ] `src/widgets/header/Header.tsx` exists at root (not in ui/)
- [ ] `src/widgets/header/Header.module.scss` exists at root (not in ui/)
- [ ] `src/widgets/header/index.ts` exists and exports Header
- [ ] `src/widgets/header/ui/` still exists and contains 6 auxiliary components
- [ ] `src/widgets/hero-banner/HeroBanner.tsx` exists at root
- [ ] `src/widgets/hero-banner/HeroBanner.module.scss` exists at root
- [ ] `src/widgets/hero-banner/index.ts` exists and exports HeroBanner
- [ ] `src/widgets/hero-banner/ui/` directory deleted (was empty)
- [ ] `npm run build` succeeds
- [ ] `npx tsc --noEmit` succeeds (no TypeScript errors)
- [ ] All imports updated (no references to old paths like `header/ui/Header`)
- [ ] Git history preserved (files show as renamed, not deleted/added)

---

## Troubleshooting

### Issue: TypeScript can't find module '@/widgets/header'

**Solution**: Check that `src/widgets/header/index.ts` exists and exports Header component.

### Issue: Styles not loading after move

**Solution**: Verify `Header.module.scss` is in the same directory as `Header.tsx` and import path is updated.

### Issue: Build fails with "Cannot find module './HeaderNav'"

**Solution**: Update internal imports in `Header.tsx` to reference `./ui/HeaderNav` instead of `./HeaderNav`.

### Issue: Git shows files as deleted/added instead of moved

**Solution**: Use `git mv` instead of manual move to preserve file history.

---

## Next Steps

After completing this refactoring:

1. Update project documentation to reflect new folder structure pattern
2. Apply same pattern to all future features and widgets
3. Consider adding ESLint rule to enforce barrel export usage
4. Document FSD pattern in team onboarding materials

---

## Time Breakdown

| Step | Estimated Time |
|------|---------------|
| Find import references | 5 min |
| Refactor header widget | 10 min |
| Refactor hero-banner widget | 10 min |
| Verify build | 5 min |
| Commit changes | 2 min |
| **Total** | **~30 min** |

**Actual time may vary based on number of import references to update.**

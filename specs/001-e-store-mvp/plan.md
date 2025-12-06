# Implementation Plan: E-Store MVP

**Branch**: `001-e-store-mvp` | **Date**: 2025-12-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-e-store-mvp/spec.md`

## Summary

E-commerce store MVP implementing complete shopping flow: browsing products with categories and search, product details, wishlist management, shopping cart with promo codes and bonus cards, and 3-step checkout (address, delivery, payment). Built as client-side application using localStorage for cart/wishlist persistence, mock data for products, and test mode payment processing.

**Technical Approach**: Next.js App Router SPA with Feature-Sliced Design architecture, TanStack Query for mock data management, Zustand for UI state (cart, wishlist), SCSS Modules for styling, and TypeScript strict mode throughout.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)
**Primary Dependencies**: Next.js 14+ (App Router), TanStack Query v5, Zustand v4, Axios, SCSS/Sass
**Storage**: Browser localStorage (cart, wishlist persistence)
**Testing**: Jest + React Testing Library (unit/integration tests optional for MVP)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge) with localStorage support
**Project Type**: Web application (frontend-only SPA)
**Performance Goals**: <2s initial page load, <500ms UI state updates, <1s search results
**Constraints**: Desktop-first (mobile responsive optional), no backend API (mock data), localStorage only
**Scale/Scope**: 8 user stories, ~15 pages/screens, mock product catalog (~50-100 products for demo)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. Feature-Sliced Design (FSD)
- **Compliance**: Structure will use features/, widgets/, shared/ directories
- **Implementation**: Each user story maps to isolated feature module
- **Validation**: No cross-feature imports except through public APIs

### ✅ II. TypeScript Strict Mode
- **Compliance**: tsconfig.json will enable strict mode
- **Implementation**: All components, stores, and utilities fully typed
- **Validation**: No `any` types without justification comments

### ✅ III. SCSS Modules Only
- **Compliance**: All component styles use `.module.scss` files
- **Implementation**: Descriptive class names, no BEM needed (automatic scoping)
- **Validation**: No global styles except reset/normalize

### ✅ IV. Server State Management
- **Compliance**: TanStack Query for all data fetching (even mock data)
- **Implementation**: Mock API functions wrapped in TanStack Query hooks
- **Validation**: No direct state storage of server data in Zustand

### ✅ V. Client State Minimalism
- **Compliance**: Zustand ONLY for cart, wishlist, checkout form, UI modals
- **Implementation**: Separate stores per feature (cart store, wishlist store)
- **Validation**: Product data never stored in Zustand (TanStack Query only)

### ✅ VI. Component Composition & Reusability
- **Compliance**: Atomic design in shared/ui/ (atoms → molecules)
- **Implementation**: Button, Input atoms; SearchBar, ProductPrice molecules
- **Validation**: Features compose from shared UI, widgets compose from features

**Gate Status**: ✅ PASSED - All constitutional requirements satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-e-store-mvp/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0: Technology research and decisions
├── data-model.md        # Phase 1: Entity models and relationships
├── quickstart.md        # Phase 1: Development setup guide
├── contracts/           # Phase 1: Mock API contracts
│   ├── products.md      # Product listing, search, filtering endpoints
│   ├── categories.md    # Category listing endpoint
│   └── validation.md    # Promo code and bonus card validation
└── checklists/
    └── requirements.md  # Spec quality validation (completed)
```

### Source Code (repository root)

```text
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   ├── category/
│   │   └── [id]/
│   │       └── page.tsx          # Category page with filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx          # Product detail page
│   ├── wishlist/
│   │   └── page.tsx              # Wishlist page
│   ├── cart/
│   │   └── page.tsx              # Shopping cart page
│   ├── checkout/
│   │   ├── address/
│   │   │   └── page.tsx          # Checkout step 1
│   │   ├── delivery/
│   │   │   └── page.tsx          # Checkout step 2
│   │   └── payment/
│   │       └── page.tsx          # Checkout step 3
│   ├── about/
│   │   └── page.tsx              # About static page
│   └── contact/
│       └── page.tsx              # Contact static page
├── features/                     # Feature modules (FSD)
│   ├── product-card/
│   │   ├── ui/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductCard.module.scss
│   │   └── model/
│   │       └── types.ts
│   ├── product-list/
│   │   ├── ui/
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductGrid.module.scss
│   │   └── api/
│   │       └── useProducts.ts    # TanStack Query hook
│   ├── search/
│   │   ├── ui/
│   │   │   ├── SearchOverlay.tsx
│   │   │   └── SearchOverlay.module.scss
│   │   ├── model/
│   │   │   └── useSearchStore.ts # Zustand store
│   │   └── api/
│   │       └── useSearchProducts.ts
│   ├── category-filter/
│   │   ├── ui/
│   │   │   ├── PriceFilter.tsx
│   │   │   ├── PriceFilter.module.scss
│   │   │   ├── Pagination.tsx
│   │   │   └── Pagination.module.scss
│   │   └── model/
│   │       └── useFilterStore.ts
│   ├── wishlist/
│   │   ├── ui/
│   │   │   ├── WishlistButton.tsx
│   │   │   └── WishlistButton.module.scss
│   │   ├── model/
│   │   │   └── useWishlistStore.ts
│   │   └── lib/
│   │       └── localStorage.ts
│   ├── cart/
│   │   ├── ui/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartItem.module.scss
│   │   │   ├── OrderSummary.tsx
│   │   │   └── OrderSummary.module.scss
│   │   ├── model/
│   │   │   └── useCartStore.ts
│   │   └── lib/
│   │       ├── localStorage.ts
│   │       └── calculations.ts
│   ├── promo/
│   │   ├── ui/
│   │   │   ├── PromoCodeInput.tsx
│   │   │   ├── BonusCardInput.tsx
│   │   │   └── PromoCodeInput.module.scss
│   │   └── api/
│   │       └── validatePromo.ts
│   └── checkout/
│       ├── ui/
│       │   ├── AddressForm.tsx
│       │   ├── DeliverySelector.tsx
│       │   ├── PaymentForm.tsx
│       │   ├── StepIndicator.tsx
│       │   └── checkout.module.scss
│       └── model/
│           └── useCheckoutStore.ts
├── widgets/                      # Composite blocks (FSD)
│   ├── header/
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   └── Header.module.scss
│   │   └── model/
│   │       └── useHeaderCounters.ts
│   ├── footer/
│   │   ├── ui/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.module.scss
│   ├── hero-banners/
│   │   ├── ui/
│   │   │   ├── HeroBanners.tsx
│   │   │   └── HeroBanners.module.scss
│   ├── category-slider/
│   │   ├── ui/
│   │   │   ├── CategorySlider.tsx
│   │   │   └── CategorySlider.module.scss
│   │   └── api/
│   │       └── useCategories.ts
│   └── breadcrumbs/
│       ├── ui/
│       │   ├── Breadcrumbs.tsx
│       │   └── Breadcrumbs.module.scss
├── shared/                       # Reusable UI & utilities (FSD)
│   ├── ui/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.scss
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Input.module.scss
│   │   │   ├── Icon/
│   │   │   │   ├── Icon.tsx
│   │   │   │   └── Icon.module.scss
│   │   │   └── Badge/
│   │   │       ├── Badge.tsx
│   │   │       └── Badge.module.scss
│   │   └── molecules/
│   │       ├── SearchBar/
│   │       │   ├── SearchBar.tsx
│   │       │   └── SearchBar.module.scss
│   │       ├── PriceTag/
│   │       │   ├── PriceTag.tsx
│   │       │   └── PriceTag.module.scss
│   │       └── Toast/
│   │           ├── Toast.tsx
│   │           └── Toast.module.scss
│   ├── lib/
│   │   ├── utils/
│   │   │   ├── formatters.ts    # Currency, date formatting
│   │   │   └── validators.ts    # Email, card number validation
│   │   └── constants/
│   │       └── config.ts        # Tax rate, valid promo codes
│   ├── api/
│   │   ├── client.ts            # Axios instance
│   │   ├── queryClient.ts       # TanStack Query client
│   │   └── mock/
│   │       ├── products.ts      # Mock product data generator
│   │       ├── categories.ts    # Mock category data
│   │       └── api.ts           # Mock API functions
│   └── types/
│       ├── product.ts           # Product entity types
│       ├── category.ts          # Category entity types
│       ├── cart.ts              # Cart entity types
│       └── order.ts             # Order entity types
├── styles/
│   ├── globals.scss             # CSS reset/normalize only
│   └── variables.scss           # SCSS variables (colors, spacing)
└── middleware.ts                # Next.js middleware (if needed)

public/
├── images/
│   ├── banners/                 # Promotional banner images
│   ├── categories/              # Category icons
│   └── products/                # Product images (mocks)
└── icons/                       # SVG icons

.specify/
└── context/
    └── claude.md                # AI agent context (auto-updated)

tsconfig.json                    # TypeScript strict mode config
next.config.js                   # Next.js configuration
package.json                     # Dependencies
.eslintrc.json                   # ESLint configuration
.prettierrc                      # Prettier configuration
```

**Structure Decision**: Web application using Feature-Sliced Design architecture. The `src/` directory is organized into FSD layers (app, features, widgets, shared) for clear separation of concerns. Next.js App Router handles routing, features contain isolated business logic, widgets compose multiple features, and shared provides reusable UI components following atomic design.

## Complexity Tracking

> **No constitutional violations detected. This section remains empty.**

---

## Phase 0: Research & Technical Decisions

### Research Tasks

**No significant unknowns requiring external research.** All technical decisions are constrained by the Constitution:
- Framework: Next.js (mandated)
- Language: TypeScript strict (mandated)
- Styling: SCSS Modules (mandated)
- State: TanStack Query + Zustand (mandated)

Minor decisions to document:
1. **Next.js App Router vs Pages Router**: App Router (mandated by Constitution)
2. **Mock Data Strategy**: In-memory arrays with search/filter functions
3. **localStorage Schema**: JSON serialization for cart/wishlist
4. **Promo Code Validation**: Hardcoded valid codes in constants

---

## Phase 1: Design Artifacts

### Data Model

Will be generated in `data-model.md`:
- Product entity (ID, title, description, prices, discount, image URL, category, availability, delivery, warranty)
- Category entity (ID, name, icon identifier)
- Cart entity (items array, discounts, totals)
- CartItem entity (product reference, quantity, timestamp)
- Wishlist entity (product ID array, count)
- Order entity (products, delivery address, delivery option, payment method, total, timestamp)
- Delivery Address entity (name, street, city, postal code, country)
- Delivery Option entity (type, cost, timeframe)
- Payment Details entity (method, card details if applicable)

### API Contracts

Will be generated in `contracts/`:

**products.md**:
- `GET /api/products` - List all products with optional filters (category, price range, search query, pagination)
- `GET /api/products/:id` - Get single product details
- `GET /api/products/random` - Get random products for home page
- `GET /api/products/discounted` - Get products with active discounts
- `GET /api/products/related/:id` - Get related products by category

**categories.md**:
- `GET /api/categories` - List all categories with icons

**validation.md**:
- `POST /api/promo/validate` - Validate promo code (body: {code: string})
- `POST /api/bonus/validate` - Validate bonus card (body: {cardNumber: string})

**Note**: All endpoints are mock functions, not real HTTP endpoints. Implemented as local TypeScript functions returning Promises.

### Quickstart Guide

Will be generated in `quickstart.md`:
1. Clone repository
2. Install dependencies: `npm install` or `pnpm install`
3. Run development server: `npm run dev`
4. Open browser: `http://localhost:3000`
5. Mock data auto-generates on first load
6. localStorage persists cart/wishlist across sessions

---

## Implementation Notes

### Key Technical Patterns

**Mock API with TanStack Query**:
```typescript
// shared/api/mock/api.ts
export const fetchProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return mockProducts.filter(/* apply filters */);
};

// features/product-list/api/useProducts.ts
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

**Zustand Store with localStorage**:
```typescript
// features/cart/model/useCartStore.ts
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => { /* ... */ },
      removeItem: (productId) => { /* ... */ },
      // ...
    }),
    {
      name: 'e-store-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

**SCSS Module Pattern**:
```scss
// features/product-card/ui/ProductCard.module.scss
.card {
  padding: 16px;
  border-radius: 12px;
  background: var(--color-bg-primary);

  &:hover {
    box-shadow: var(--shadow-card-hover);
  }
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
}
```

### Performance Optimizations

- **Code Splitting**: Next.js automatic code splitting per route
- **Image Optimization**: Next.js `<Image>` component for product images
- **Query Caching**: TanStack Query with 5-minute staleTime for product data
- **Memoization**: React.memo() for ProductCard to prevent unnecessary re-renders
- **Debounced Search**: 300ms debounce on search input to reduce filter calculations

### Testing Strategy (Optional for MVP)

If tests are implemented:
- **Unit Tests**: Zustand stores, utility functions, mock API functions
- **Integration Tests**: Feature modules (add to cart, apply promo, checkout flow)
- **E2E Tests**: (Optional) Playwright tests for critical user journeys

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.4.0",
    "axios": "^1.6.0",
    "sass": "^1.69.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.54.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.1.0"
  }
}
```

---

## Next Steps

1. ✅ Constitution Check: PASSED
2. 🔄 Phase 0: Generate `research.md` (minimal, mostly decisions documentation)
3. 🔄 Phase 1: Generate `data-model.md`, `contracts/*.md`, `quickstart.md`
4. 🔄 Update `.specify/context/claude.md` with technology stack
5. ⏭️ Ready for `/speckit.tasks` command to generate task breakdown

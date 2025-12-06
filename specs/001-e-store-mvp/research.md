# Research & Technical Decisions: E-Store MVP

**Feature**: E-Store MVP
**Date**: 2025-12-05
**Status**: Completed

## Overview

This document captures technical decisions made during planning phase. Most decisions are constrained by the project Constitution, requiring minimal external research.

---

## Technology Stack Decisions

### ✅ 1. Next.js App Router vs Pages Router

**Decision**: Use Next.js 14+ with **App Router**

**Rationale**:
- App Router is the current recommended approach by Next.js team
- Better support for React Server Components (future-proofing)
- Improved routing with nested layouts
- Constitution mandates Next.js, App Router is the modern standard

**Alternatives Considered**:
- Pages Router: Older, more stable but deprecated direction
- Pure React SPA: Would lose Next.js benefits (SSR, routing, optimization)

**Implementation Impact**:
- Use `app/` directory structure
- Layouts defined in `layout.tsx` files
- Pages defined in `page.tsx` files

---

### ✅ 2. Backend API Strategy

**Decision**: Use **FakeStoreAPI** (https://fakestoreapi.com) as real backend

**Rationale**:
- Real REST API available without setup or authentication
- Production-like integration with real HTTP requests
- No need to maintain mock data
- TanStack Query caching works with real network delays
- API provides ~20 products across 4 categories (sufficient for MVP)

**API Schema**:
```typescript
// Product from FakeStoreAPI
interface Product {
  id: number;           // Note: number, not string
  title: string;
  price: number;
  description: string;
  category: string;     // Category name (not ID)
  image: string;        // Direct image URL
}

// Available categories
["electronics", "jewelery", "men's clothing", "women's clothing"]
```

**API Endpoints**:
```typescript
// Get all products
GET https://fakestoreapi.com/products

// Get single product
GET https://fakestoreapi.com/products/{id}

// Get all categories
GET https://fakestoreapi.com/products/categories

// Get products by category
GET https://fakestoreapi.com/products/category/{categoryName}
```

**Implementation**:
```typescript
// shared/api/products.ts
import axios from 'axios';

const API_BASE = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_BASE}/products`);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${API_BASE}/products/${id}`);
  return response.data;
};

// Client-side filtering utility
export const applyFilters = (
  products: Product[],
  filters?: ProductFilters
): Product[] => {
  let results = [...products];

  if (filters?.category) {
    results = results.filter(p => p.category === filters.category);
  }
  if (filters?.priceRange) {
    results = results.filter(p =>
      p.price >= filters.priceRange.min &&
      p.price <= filters.priceRange.max
    );
  }
  if (filters?.search) {
    const query = filters.search.toLowerCase();
    results = results.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  return results;
};
```

**Filtering Strategy**:
- **Server-side**: Only category filtering via `/products/category/{categoryName}`
- **Client-side**: Price range, search, pagination (API limitations)
- Fetch all products once, cache with TanStack Query, filter locally

**Limitations & Workarounds**:
- No `discount`/`originalPrice` fields → Simulate client-side for "Discounted Products" section
- No `availability` field → Assume all products in stock
- No `deliveryTime`/`warranty` → Use placeholder text
- Limited products (~20) → Sufficient for MVP demonstration

**Alternatives Considered**:
- Mock data in-memory: Not production-like, requires maintenance
- JSON files: Requires file I/O, less realistic
- Other mock APIs (mockapi.io): More setup, unnecessary complexity

---

### ✅ 3. localStorage Schema

**Decision**: JSON serialization with **versioned schema**

**Rationale**:
- Simple, no external dependencies
- Survives page refreshes and browser restarts
- Schema versioning allows future migrations
- Per-feature storage keys for isolation

**Implementation**:
```typescript
// Cart localStorage schema
{
  "version": "1.0",
  "items": [
    {
      "productId": 1,  // Note: number (FakeStoreAPI uses number IDs)
      "quantity": 2,
      "addedAt": "2025-12-05T10:30:00Z"
    }
  ],
  "promoCode": "SAVE5" | null,
  "bonusCard": "1234567890" | null
}

// Wishlist localStorage schema
{
  "version": "1.0",
  "productIds": [1, 5, 12]  // Note: numbers, not strings
}
```

**Storage Keys**:
- `e-store-cart`: Shopping cart data
- `e-store-wishlist`: Wishlist product IDs
- `e-store-checkout`: Checkout form data (temporary)

**Alternatives Considered**:
- sessionStorage: Data lost on tab close, poor UX
- IndexedDB: Overcomplicated for simple key-value storage
- Cookies: Size limitations, security concerns

---

### ✅ 4. Promo Code & Bonus Card Validation

**Decision**: Hardcoded valid codes in **constants file**

**Rationale**:
- Test mode only (per spec assumptions)
- No real payment processing
- Allows easy demonstration of success/error states
- Constants can be easily replaced with API calls later

**Implementation**:
```typescript
// shared/lib/constants/config.ts
export const VALID_PROMO_CODES = {
  'SAVE5': { discount: 0.05, description: '5% off your order' },
  'WELCOME10': { discount: 0.10, description: '10% off for new customers' },
  'FREESHIP': { discount: 0, freeShipping: true, description: 'Free shipping' },
};

export const VALID_BONUS_CARDS = new Set([
  '1234567890',
  '0987654321',
  '1111222233',
]);

export const TAX_RATE = 0.08; // 8% tax
export const EXPRESS_SHIPPING_COST = 10;
```

**Validation Logic**:
```typescript
export const validatePromoCode = async (code: string): Promise<ValidationResult> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

  const promo = VALID_PROMO_CODES[code.toUpperCase()];
  if (!promo) {
    return { valid: false, error: 'Invalid promo code' };
  }
  return { valid: true, discount: promo.discount, description: promo.description };
};
```

**Alternatives Considered**:
- Always accept codes: No error state testing
- Random validation: Inconsistent UX for testing
- External validation API: Adds complexity for test mode

---

### ✅ 5. Image Asset Strategy

**Decision**: Static images in **public/ directory** with placeholder service

**Rationale**:
- Simple deployment (no CDN required)
- Next.js Image optimization works with public/ assets
- Can use placeholder image service (e.g., placeholder.com) for initial development
- Easy to replace with real images later

**Implementation**:
```
public/
├── images/
│   ├── banners/
│   │   ├── hero-1.jpg
│   │   ├── hero-2.jpg
│   │   ├── mid-banner.jpg
│   │   └── bottom-banner.jpg
│   ├── categories/
│   │   ├── electronics.svg
│   │   ├── clothing.svg
│   │   └── ...
│   └── products/
│       ├── product-1.jpg
│       ├── product-2.jpg
│       └── ... (or use placeholder URLs)
└── icons/
    ├── cart.svg
    ├── wishlist.svg
    ├── search.svg
    └── ...
```

**Placeholder Strategy**:
```typescript
// During development, use:
const productImageUrl = `/api/placeholder/300/400?text=${product.title}`;

// Or external service:
const productImageUrl = `https://via.placeholder.com/300x400.png?text=${encodeURIComponent(product.title)}`;
```

**Alternatives Considered**:
- External CDN: Requires setup, adds latency
- Base64 embedded: Increases bundle size
- Unsplash API: Rate limits, inconsistent images

---

### ✅ 6. Routing Strategy

**Decision**: Dynamic routes with **Next.js App Router conventions**

**Rationale**:
- Built-in Next.js functionality
- SEO-friendly URLs
- Type-safe with TypeScript
- Supports nested layouts

**Route Structure**:
```
/ → app/page.tsx (Home)
/category/[id] → app/category/[id]/page.tsx (Category with filters)
/product/[id] → app/product/[id]/page.tsx (Product details)
/wishlist → app/wishlist/page.tsx
/cart → app/cart/page.tsx
/checkout/address → app/checkout/address/page.tsx (Step 1)
/checkout/delivery → app/checkout/delivery/page.tsx (Step 2)
/checkout/payment → app/checkout/payment/page.tsx (Step 3)
/about → app/about/page.tsx
/contact → app/contact/page.tsx
```

**Alternatives Considered**:
- Query parameters (?page=product&id=1): Less SEO-friendly, ugly URLs
- Hash routing (#/product/1): No SSR support, poor SEO

---

### ✅ 7. State Persistence Strategy

**Decision**: Zustand `persist` middleware with **localStorage adapter**

**Rationale**:
- Built-in Zustand feature
- Automatic serialization/deserialization
- Configurable storage adapter
- Handles hydration automatically

**Implementation**:
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      bonusCard: null,
      addItem: (product) => set((state) => ({ ... })),
      // ... actions
    }),
    {
      name: 'e-store-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        items: state.items,
        promoCode: state.promoCode,
        bonusCard: state.bonusCard,
      }),
    }
  )
);
```

**Alternatives Considered**:
- Manual localStorage handling: More boilerplate, error-prone
- Redux Persist: Heavier, unnecessary for Zustand
- No persistence: Poor UX (cart lost on refresh)

---

### ✅ 8. Search Implementation

**Decision**: Client-side filtering with **debounced input**

**Rationale**:
- All product data loaded in TanStack Query cache
- Real-time filtering without server calls
- 300ms debounce reduces computation
- Acceptable performance for 50-100 products

**Implementation**:
```typescript
import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useProducts } from '@/features/product-list/api/useProducts';

export const useSearchProducts = (query: string) => {
  const [debouncedQuery] = useDebounce(query, 300);
  const { data: products } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery || !products) return products || [];

    const lowerQuery = debouncedQuery.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [debouncedQuery, products]);

  return filteredProducts;
};
```

**Alternatives Considered**:
- Server-side search: Requires backend API (out of scope)
- No debounce: Performance issues, too many re-renders
- Fuzzy search library: Overcomplicated for MVP

---

## Performance Considerations

### Code Splitting
- Next.js automatic route-based splitting
- Dynamic imports for search overlay (not needed immediately)

### Memoization
- `React.memo()` for ProductCard (prevents re-renders in grids)
- `useMemo()` for search/filter calculations
- `useCallback()` for Zustand actions passed as props

### Image Optimization
- Next.js `<Image>` component with automatic optimization
- Lazy loading for offscreen images
- Placeholder blur while loading

---

## Security Considerations

### Input Validation
- Email validation for contact form
- Card number format validation (test mode, no real validation)
- XSS prevention (React escapes by default)

### Data Storage
- No sensitive data in localStorage (payment details discarded after mock submission)
- No authentication tokens (no auth system)
- Promo codes are demo-only, no real value

---

## Summary

All major technical decisions documented. No external research required due to Constitutional constraints on technology stack. Ready to proceed to Phase 1 (design artifacts).

**Next**: Generate data-model.md, contracts/, quickstart.md

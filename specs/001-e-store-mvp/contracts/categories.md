# API Contract: Categories

**Feature**: E-Store MVP
**Date**: 2025-12-05
**Type**: REST API (FakeStoreAPI)
**Base URL**: `https://fakestoreapi.com`

## Overview

This document defines the category-related API endpoints using FakeStoreAPI.

---

## Get All Categories

**Endpoint**: `GET /products/categories`

**Description**: Retrieve list of all product categories from FakeStoreAPI.

**Request**:
```
GET https://fakestoreapi.com/products/categories
```

**Response**:
```typescript
string[] // Array of category names
```

**Example Request**:
```bash
curl https://fakestoreapi.com/products/categories
```

**Example Response**:
```json
[
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]
```

**Implementation Location**: `shared/api/categories.ts`

---

## TanStack Query Hook

### useCategories
```typescript
// widgets/category-slider/api/useCategories.ts
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes (categories rarely change)
  });
};
```

---

## Mock Data Structure

Mock category data in `shared/api/mock/categories.ts`:

```typescript
export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    iconUrl: '/images/categories/electronics.svg'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    iconUrl: '/images/categories/clothing.svg'
  },
  {
    id: 'home',
    name: 'Home & Garden',
    iconUrl: '/images/categories/home.svg'
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    iconUrl: '/images/categories/sports.svg'
  },
  {
    id: 'books',
    name: 'Books',
    iconUrl: '/images/categories/books.svg'
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    iconUrl: '/images/categories/toys.svg'
  }
];
```

---

## Usage in Components

Categories are used in:
- **Category Slider** (widgets/category-slider): Display all categories with navigation
- **Product Filtering** (features/category-filter): Filter products by selected category
- **Breadcrumbs** (widgets/breadcrumbs): Show current category in navigation path

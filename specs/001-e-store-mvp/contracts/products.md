# API Contract: Products

**Feature**: E-Store MVP
**Date**: 2025-12-05
**Type**: REST API (FakeStoreAPI)
**Base URL**: `https://fakestoreapi.com`

## Overview

This document defines the product-related API endpoints using FakeStoreAPI. All endpoints return real data from the FakeStore API.

---

## Get All Products

**Endpoint**: `GET /products`

**Description**: Retrieve all products from FakeStoreAPI.

**Request**:
```
GET https://fakestoreapi.com/products
```

**Query Parameters**:
- `limit` (optional): Limit number of results (e.g., `?limit=5`)
- `sort` (optional): Sort order - `asc` or `desc` (default: `asc`)

**Response**:
```typescript
Product[] // Array of Product objects

// Schema:
{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
```

**Example Request**:
```bash
curl https://fakestoreapi.com/products

# With limit
curl https://fakestoreapi.com/products?limit=5
```

**Example Response**:
```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  }
]
```

**Implementation Location**: `shared/api/products.ts`

**Client-Side Filtering**: Price range, search, and pagination are applied client-side after fetching.

---

## Get Single Product

**Endpoint**: `GET /products/{id}`

**Description**: Retrieve single product by ID.

**Request**:
```
GET https://fakestoreapi.com/products/{id}
```

**Path Parameters**:
- `id` (required): Product ID (number)

**Response**:
```typescript
Product // Single Product object

// Schema:
{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
```

**Example Request**:
```bash
curl https://fakestoreapi.com/products/1
```

**Example Response**:
```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}
```

**Implementation Location**: `shared/api/products.ts`

**Error Cases**:
- Returns 404 if product ID not found

---

## Get Random Products

**Implementation**: Client-side utility function

**Description**: Retrieve random selection of products for home page display. Uses `GET /products` and randomly selects items client-side.

**Endpoint Used**: `GET /products`

**Function Signature**:
```typescript
// shared/api/products.ts
async function fetchRandomProducts(count: number = 8): Promise<Product[]>
```

**Logic**:
1. Fetch all products from `GET /products`
2. Randomly shuffle the array client-side
3. Return first `count` items
4. Ensures no duplicates

**Example Usage**:
```typescript
// Get 8 random products for home page
const randomProducts = await fetchRandomProducts(8);
```

**Implementation Location**: `shared/api/products.ts`

---

## Get Discounted Products

**Implementation**: Client-side utility function

**Description**: Simulates discounted products by randomly selecting products and applying mock discounts. FakeStoreAPI does not provide discount information.

**Endpoint Used**: `GET /products?limit={limit}`

**Function Signature**:
```typescript
// shared/api/products.ts
async function fetchDiscountedProducts(limit: number = 4): Promise<ProductWithExtras[]>
```

**Logic**:
1. Fetch limited products from `GET /products?limit={limit * 2}`
2. Randomly select products to mark as "discounted" (client-side simulation)
3. Add `isDiscounted: true` and `originalPrice` fields (e.g., `originalPrice = price * 1.2`)
4. Return up to `limit` items

**Example Usage**:
```typescript
// Get 4 discounted products for home page
const discounted = await fetchDiscountedProducts(4);
// Returns: ProductWithExtras[] with isDiscounted: true
```

**Implementation Location**: `shared/api/products.ts`

**Note**: Discounts are simulated client-side since FakeStoreAPI does not provide this data.

---

## Get Related Products

**Endpoint**: `GET /products/category/{categoryName}`

**Description**: Retrieve products related to given product (same category).

**Request**:
```
GET https://fakestoreapi.com/products/category/{categoryName}
```

**Path Parameters**:
- `categoryName` (required): Category name (e.g., "electronics", "jewelery")

**Response**:
```typescript
Product[] // Array of products in the category
```

**Example Request**:
```bash
curl https://fakestoreapi.com/products/category/electronics
```

**Example Response**:
```json
[
  {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility...",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
  }
]
```

**Function Signature**:
```typescript
// shared/api/products.ts
async function fetchRelatedProducts(productId: number, limit: number = 4): Promise<Product[]>
```

**Logic**:
1. Fetch product by ID to get its category
2. Fetch all products in that category via `GET /products/category/{categoryName}`
3. Exclude the given product itself (filter by ID)
4. Return up to `limit` items

**Implementation Location**: `shared/api/products.ts`

---

## TanStack Query Hooks

These API functions should be wrapped in TanStack Query hooks:

### useProducts
```typescript
// features/product-list/api/useProducts.ts
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      // Apply client-side filters (category, priceRange, search, pagination)
      return applyFilters(response.data, filters);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### useProduct
```typescript
// features/product-list/api/useProduct.ts
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id, // Only fetch if ID exists
  });
};
```

### useRandomProducts
```typescript
// features/product-list/api/useRandomProducts.ts
export const useRandomProducts = (count: number = 8) => {
  return useQuery({
    queryKey: ['products', 'random', count],
    queryFn: () => fetchRandomProducts(count), // Utility function
    staleTime: 10 * 60 * 1000, // 10 minutes (less frequent updates for random)
  });
};
```

### useDiscountedProducts
```typescript
// features/product-list/api/useDiscountedProducts.ts
export const useDiscountedProducts = (limit: number = 4) => {
  return useQuery({
    queryKey: ['products', 'discounted', limit],
    queryFn: () => fetchDiscountedProducts(limit), // Utility function
    staleTime: 5 * 60 * 1000,
  });
};
```

### useRelatedProducts
```typescript
// features/product-list/api/useRelatedProducts.ts
export const useRelatedProducts = (productId: number, limit: number = 4) => {
  return useQuery({
    queryKey: ['products', 'related', productId, limit],
    queryFn: () => fetchRelatedProducts(productId, limit), // Uses category endpoint
    staleTime: 5 * 60 * 1000,
    enabled: !!productId,
  });
};
```

---

## API Categories Available

FakeStoreAPI provides the following categories:

```typescript
// Available categories from GET /products/categories
[
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]
```

---

## Performance Notes

- Real API calls to FakeStoreAPI (no simulated delays)
- Product data cached in TanStack Query with 5-10 minute staleTime
- Client-side filters applied for: price range, search, pagination
- Server-side filtering available only for category via `/products/category/{categoryName}`
- All products fetched once and cached, filters applied locally for better UX

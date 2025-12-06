# Data Model: E-Store MVP

**Feature**: E-Store MVP
**Date**: 2025-12-05
**Status**: Final

## Overview

This document defines all data entities, their TypeScript interfaces, validation rules, and relationships for the E-Store MVP application.

---

## Core Entities

### Product

Represents a product available for purchase in the store. Uses FakeStoreAPI schema.

**TypeScript Interface**:
```typescript
// shared/types/product.ts
// Based on FakeStoreAPI: https://fakestoreapi.com
export interface Product {
  id: number; // Product ID from FakeStore API
  title: string; // Product title
  price: number; // Price in USD
  description: string; // Product description
  category: string; // Category name
  image: string; // Product image URL
}

// Extended interface with computed fields for UI
export interface ProductWithExtras extends Product {
  // Computed/derived fields (not from API)
  isDiscounted?: boolean; // Derived from price comparison
  originalPrice?: number; // For display purposes only
}
```

**Validation Rules**:
- `id`: Required, unique, positive integer from API
- `title`: Required, non-empty string
- `description`: Required, non-empty string
- `price`: Required, positive number > 0
- `category`: Required, non-empty string (category name from API)
- `image`: Required, valid URI

**Sample Data**:
```typescript
{
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use...",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
}
```

---

### Category

Represents a product category for filtering and navigation. Uses FakeStoreAPI category names.

**TypeScript Interface**:
```typescript
// shared/types/category.ts
// Based on FakeStoreAPI: https://fakestoreapi.com/products/categories
export type Category = string; // Category name from API (e.g., "electronics", "jewelery", "men's clothing", "women's clothing")

// Extended interface for UI display with icons
export interface CategoryWithIcon {
  name: string; // Category name from API
  iconUrl: string; // URL to category icon (client-side mapping)
}
```

**Validation Rules**:
- Category: Required, non-empty string from FakeStoreAPI
- API returns array of strings: `["electronics", "jewelery", "men's clothing", "women's clothing"]`

**Sample Data**:
```typescript
// From API: GET /products/categories
["electronics", "jewelery", "men's clothing", "women's clothing"]

// Extended with icons (client-side):
{
  name: "electronics",
  iconUrl: "/images/categories/electronics.svg"
}
```

---

### CartItem

Represents a single product added to the shopping cart.

**TypeScript Interface**:
```typescript
// shared/types/cart.ts
export interface CartItem {
  productId: number; // Reference to Product.id (FakeStoreAPI uses number)
  quantity: number; // Number of units
  addedAt: string; // ISO timestamp when item was added
}
```

**Validation Rules**:
- `productId`: Required, must reference existing Product (positive integer)
- `quantity`: Required, positive integer >= 1
- `addedAt`: Required, valid ISO 8601 timestamp

**Sample Data**:
```typescript
{
  productId: 1,
  quantity: 2,
  addedAt: '2025-12-05T10:30:00.000Z'
}
```

---

### Cart

Represents the user's shopping cart with all items and discounts.

**TypeScript Interface**:
```typescript
// shared/types/cart.ts
export interface Cart {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number; // Discount amount in USD
  bonusCard: string | null;
  bonusDiscount: number; // Discount amount in USD
}

// Computed fields (not stored, calculated on demand)
export interface CartTotals {
  subtotal: number; // Sum of all (price × quantity)
  totalDiscount: number; // promoDiscount + bonusDiscount
  tax: number; // (subtotal - totalDiscount) × taxRate
  shipping: number; // 0 for standard, 10 for express
  total: number; // subtotal - totalDiscount + tax + shipping
}
```

**Validation Rules**:
- `items`: Array of valid CartItem objects
- `promoCode`: Optional string, if present must be valid promo code
- `promoDiscount`: Required, non-negative number
- `bonusCard`: Optional string, if present must be valid bonus card
- `bonusDiscount`: Required, non-negative number

**Calculation Rules**:
- `subtotal = Σ(item.product.price × item.quantity)`
- `totalDiscount = promoDiscount + bonusDiscount`
- `tax = (subtotal - totalDiscount) × TAX_RATE`
- `shipping = deliveryOption === 'express' ? 10 : 0`
- `total = subtotal - totalDiscount + tax + shipping`

**Sample Data**:
```typescript
{
  items: [
    { productId: '1', quantity: 2, addedAt: '2025-12-05T10:30:00Z' },
    { productId: '5', quantity: 1, addedAt: '2025-12-05T11:00:00Z' }
  ],
  promoCode: 'SAVE5',
  promoDiscount: 50.00, // 5% of subtotal
  bonusCard: '1234567890',
  bonusDiscount: 100.00, // 10% of subtotal
}

// Computed totals:
{
  subtotal: 1000.00,
  totalDiscount: 150.00,
  tax: 68.00, // (1000 - 150) × 0.08
  shipping: 0,
  total: 918.00
}
```

---

### Wishlist

Represents the user's saved products for later.

**TypeScript Interface**:
```typescript
// shared/types/wishlist.ts
export interface Wishlist {
  productIds: number[]; // Array of Product IDs (FakeStoreAPI uses number)
}

// Computed field
export interface WishlistWithProducts {
  products: Product[]; // Full product objects
  count: number; // productIds.length
}
```

**Validation Rules**:
- `productIds`: Array of unique positive integers, each must reference existing Product
- No duplicate IDs allowed

**Sample Data**:
```typescript
{
  productIds: [1, 5, 12, 15]
}
```

---

### DeliveryAddress

Represents shipping address for order.

**TypeScript Interface**:
```typescript
// shared/types/order.ts
export interface DeliveryAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}
```

**Validation Rules**:
- All fields required, non-empty strings
- `fullName`: 1-100 characters
- `street`: 1-200 characters
- `city`: 1-100 characters
- `postalCode`: 1-20 characters, format depends on country
- `country`: 1-100 characters

**Sample Data**:
```typescript
{
  fullName: 'John Doe',
  street: '123 Main Street, Apt 4B',
  city: 'New York',
  postalCode: '10001',
  country: 'United States'
}
```

---

### DeliveryOption

Represents shipping method choice.

**TypeScript Interface**:
```typescript
// shared/types/order.ts
export type DeliveryType = 'standard' | 'express';

export interface DeliveryOption {
  type: DeliveryType;
  cost: number; // Shipping cost in USD
  timeframe: string; // Human-readable delivery time
}
```

**Predefined Options**:
```typescript
export const DELIVERY_OPTIONS: Record<DeliveryType, DeliveryOption> = {
  standard: {
    type: 'standard',
    cost: 0,
    timeframe: '5-7 business days'
  },
  express: {
    type: 'express',
    cost: 10,
    timeframe: '1-2 business days'
  }
};
```

**Validation Rules**:
- `type`: Required, must be 'standard' or 'express'
- `cost`: Required, non-negative number
- `timeframe`: Required, non-empty string

---

### PaymentDetails

Represents payment information for order.

**TypeScript Interface**:
```typescript
// shared/types/order.ts
export type PaymentMethod = 'credit-card' | 'paypal';

export interface PaymentDetails {
  method: PaymentMethod;
  // Credit card fields (only if method === 'credit-card')
  cardholderName?: string;
  cardNumber?: string; // Last 4 digits only for display
  cvv?: string; // Never stored, only validated
  expirationDate?: string; // MM/YY format
}
```

**Validation Rules**:
- `method`: Required, must be 'credit-card' or 'paypal'
- If `method === 'credit-card'`:
  - `cardholderName`: Required, 1-100 characters
  - `cardNumber`: Required, 16 digits (formatted with spaces for display)
  - `cvv`: Required, 3 digits (not stored after validation)
  - `expirationDate`: Required, MM/YY format, must be future date
- If `method === 'paypal'`:
  - Card fields not required (mock PayPal login)

**Security Note**: In test mode, all payment details are validated but NOT stored permanently. After successful mock payment, only payment method type is saved to order.

**Sample Data**:
```typescript
{
  method: 'credit-card',
  cardholderName: 'John Doe',
  cardNumber: '**** **** **** 1234', // Display format
  expirationDate: '12/26'
  // cvv never stored
}
```

---

### Order

Represents a completed purchase order.

**TypeScript Interface**:
```typescript
// shared/types/order.ts
export interface Order {
  id: string; // Unique order ID
  items: Array<{
    productId: number; // Product ID from FakeStoreAPI
    title: string; // Snapshot of product title at purchase time
    price: number; // Snapshot of price at purchase time
    quantity: number;
  }>;
  deliveryAddress: DeliveryAddress;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod; // Only method type, no sensitive details
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string; // ISO timestamp
}
```

**Validation Rules**:
- `id`: Required, unique, auto-generated UUID
- `items`: Required, non-empty array of order items
- `deliveryAddress`: Required, valid DeliveryAddress
- `deliveryOption`: Required, valid DeliveryOption
- `paymentMethod`: Required, valid PaymentMethod
- `subtotal, discount, tax, shipping, total`: Required, non-negative numbers
- `createdAt`: Required, valid ISO 8601 timestamp

**Sample Data**:
```typescript
{
  id: 'ord_1234567890',
  items: [
    {
      productId: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack',
      price: 109.95,
      quantity: 2
    }
  ],
  deliveryAddress: {
    fullName: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    postalCode: '10001',
    country: 'United States'
  },
  deliveryOption: {
    type: 'standard',
    cost: 0,
    timeframe: '5-7 business days'
  },
  paymentMethod: 'credit-card',
  subtotal: 219.90,
  discount: 32.99, // 15% total discount
  tax: 14.95,
  shipping: 0,
  total: 201.86,
  createdAt: '2025-12-05T15:30:00.000Z'
}
```

---

## Query Filter Types

### ProductFilters

Used for filtering product lists (applied client-side after fetching from FakeStoreAPI).

**TypeScript Interface**:
```typescript
// shared/types/product.ts
export interface ProductFilters {
  category?: string; // Filter by category name (from FakeStoreAPI)
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string; // Search query for title/description
  page?: number; // Pagination page number (client-side)
  limit?: number; // Items per page (client-side)
}
```

**Note**: FakeStoreAPI does not support server-side filtering except by category. All other filters (price range, search, pagination) are applied client-side.

---

## Validation Utilities

### PromoCodeValidation

**TypeScript Interface**:
```typescript
// shared/types/promo.ts
export interface PromoCodeValidationResult {
  valid: boolean;
  discount?: number; // Discount amount (0.05 = 5%)
  description?: string;
  error?: string; // Error message if invalid
}
```

### BonusCardValidation

**TypeScript Interface**:
```typescript
// shared/types/promo.ts
export interface BonusCardValidationResult {
  valid: boolean;
  discount?: number; // Discount amount (0.10 = 10%)
  error?: string; // Error message if invalid
}
```

---

## Constants

```typescript
// shared/lib/constants/config.ts
export const TAX_RATE = 0.08; // 8% tax
export const ITEMS_PER_PAGE = 9; // Products per page in category view
export const ITEMS_PER_ROW = 3; // Products per row in grid
export const HOME_RANDOM_PRODUCTS = 8; // Random products on home page
export const HOME_DISCOUNTED_PRODUCTS = 4; // Discounted products on home page
export const RELATED_PRODUCTS_COUNT = 4; // Related products on product page
```

---

## Entity Relationships

```
Product (from FakeStoreAPI)
  ├─ belongs to → Category (string: category name)
  ├─ referenced by → CartItem.productId (number)
  ├─ referenced by → Wishlist.productIds (number[])
  └─ referenced by → Order.items[].productId (number)

Cart
  ├─ contains → CartItem[]
  └─ each CartItem → references Product by productId (number)

Wishlist
  └─ contains productIds (number[]) → reference Product[]

Order
  ├─ contains → DeliveryAddress
  ├─ contains → DeliveryOption
  ├─ references → PaymentMethod
  └─ contains items → snapshot of Product data (productId: number)
```

---

## Data Flow

### Add to Cart Flow
```
1. User clicks "Buy" on ProductCard
2. useCartStore.addItem(product) called
3. Check if product already in cart
   - If yes: increment quantity
   - If no: add new CartItem with quantity = 1
4. Persist to localStorage via Zustand middleware
5. Update cart counter in Header (computed from items.length)
6. Show success toast notification
```

### Checkout Flow
```
1. User navigates to /cart
2. Cart data loaded from Zustand store
3. User applies promo code / bonus card (optional)
   - Validate via mock API
   - Update discount fields in store
4. User clicks "Checkout"
5. Navigate to /checkout/address
6. useCheckoutStore stores form data
7. Navigate through steps: address → delivery → payment
8. On payment submit:
   - Create Order object with all data
   - Clear cart via useCartStore.clear()
   - Show success modal
   - Redirect to home page
```

---

## Summary

All entities defined with TypeScript interfaces, validation rules, and relationships. Ready for implementation in `shared/types/` directory.

**Next**: Generate API contracts and quickstart guide

# API Contract: Validation

**Feature**: E-Store MVP
**Date**: 2025-12-05
**Type**: Mock API (client-side functions, not HTTP endpoints)

## Overview

This document defines validation functions for promo codes and bonus cards.

---

## Validate Promo Code

**Function**: `validatePromoCode(code: string): Promise<PromoCodeValidationResult>`

**Description**: Validate promo code and return discount information.

**Parameters**:
- `code`: Promo code string (case-insensitive)

**Response**:
```typescript
interface PromoCodeValidationResult {
  valid: boolean;
  discount?: number; // Discount percentage as decimal (0.05 = 5%)
  description?: string; // Human-readable description
  error?: string; // Error message if invalid
}
```

**Example Usage**:
```typescript
// Valid code
const result = await validatePromoCode('SAVE5');
// { valid: true, discount: 0.05, description: '5% off your order' }

// Invalid code
const result = await validatePromoCode('INVALID');
// { valid: false, error: 'Invalid promo code' }
```

**Implementation Location**: `features/promo/api/validatePromo.ts`

**Simulated Delay**: 500ms (simulate server validation)

**Valid Promo Codes**:
```typescript
// shared/lib/constants/config.ts
export const VALID_PROMO_CODES = {
  'SAVE5': { discount: 0.05, description: '5% off your order' },
  'WELCOME10': { discount: 0.10, description: '10% off for new customers' },
  'FREESHIP': { discount: 0, freeShipping: true, description: 'Free shipping' },
  'SUMMER20': { discount: 0.20, description: '20% summer sale' },
} as const;
```

**Validation Logic**:
1. Convert input to uppercase
2. Check if code exists in VALID_PROMO_CODES
3. If valid: return discount info
4. If invalid: return error message

---

## Validate Bonus Card

**Function**: `validateBonusCard(cardNumber: string): Promise<BonusCardValidationResult>`

**Description**: Validate bonus card number and return discount information.

**Parameters**:
- `cardNumber`: Bonus card number (string of digits)

**Response**:
```typescript
interface BonusCardValidationResult {
  valid: boolean;
  discount?: number; // Fixed 10% discount (0.10)
  error?: string; // Error message if invalid
}
```

**Example Usage**:
```typescript
// Valid card
const result = await validateBonusCard('1234567890');
// { valid: true, discount: 0.10 }

// Invalid card
const result = await validateBonusCard('0000000000');
// { valid: false, error: 'Invalid bonus card' }
```

**Implementation Location**: `features/promo/api/validatePromo.ts`

**Simulated Delay**: 500ms (simulate server validation)

**Valid Bonus Cards**:
```typescript
// shared/lib/constants/config.ts
export const VALID_BONUS_CARDS = new Set([
  '1234567890',
  '0987654321',
  '1111222233',
  '5555666677',
  '9876543210',
]);

export const BONUS_CARD_DISCOUNT = 0.10; // Fixed 10% discount
```

**Validation Logic**:
1. Check if cardNumber exists in VALID_BONUS_CARDS set
2. If valid: return fixed 10% discount
3. If invalid: return error message

---

## Usage in Cart

Both validation functions are used in the cart page:

```typescript
// Example in features/cart/ui/OrderSummary.tsx
const handleApplyPromo = async () => {
  setLoading(true);
  const result = await validatePromoCode(promoInput);
  setLoading(false);

  if (result.valid) {
    // Apply discount to cart
    cartStore.setPromoCode(promoInput, result.discount);
    showToast('Promo code applied!', 'success');
  } else {
    showToast(result.error, 'error');
  }
};
```

---

## Discount Stacking Rules

- **One promo code** can be active at a time
- **One bonus card** can be active at a time
- **Promo code + bonus card** discounts can be stacked
- Both discounts apply to subtotal (before tax and shipping)
- Formula: `discountedSubtotal = subtotal * (1 - promoDiscount - bonusDiscount)`

**Example**:
- Subtotal: $1000
- Promo code (5%): -$50
- Bonus card (10%): -$100
- Discounted subtotal: $850
- Tax (8% of $850): +$68
- Shipping: +$0 (standard)
- **Total**: $918

---

## Error Messages

**Promo Code Errors**:
- Invalid code: "Invalid promo code"
- Already applied: "Promo code already applied" (handled in UI)

**Bonus Card Errors**:
- Invalid card: "Invalid bonus card"
- Already applied: "Bonus card already applied" (handled in UI)

---

## Future Considerations

For real API implementation:
- Add expiration dates to promo codes
- Add usage limits (one-time use, per-user limits)
- Add minimum purchase requirements
- Track promo code usage analytics
- Validate bonus card balance

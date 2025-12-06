// Valid promo codes for testing
export const VALID_PROMO_CODES: Record<
  string,
  { discount: number; description: string; freeShipping?: boolean }
> = {
  SAVE5: { discount: 0.05, description: '5% off your order' },
  WELCOME10: { discount: 0.1, description: '10% off for new customers' },
  FREESHIP: { discount: 0, freeShipping: true, description: 'Free shipping' },
  SUMMER20: { discount: 0.2, description: '20% summer sale' },
};

// Valid bonus cards for testing
export const VALID_BONUS_CARDS = new Set([
  '1234567890',
  '0987654321',
  '1111222233',
  '5555666677',
  '9876543210',
]);

// Bonus card discount (fixed 10%)
export const BONUS_CARD_DISCOUNT = 0.1;

// Tax rate (8%)
export const TAX_RATE = 0.08;

// Shipping costs
export const SHIPPING_COST = {
  STANDARD: 0,
  EXPRESS: 10,
};

// Delivery timeframes
export const DELIVERY_TIMEFRAME = {
  STANDARD: '5-7 business days',
  EXPRESS: '1-2 business days',
};

// Pagination
export const PRODUCTS_PER_PAGE = 9;

// localStorage keys
export const STORAGE_KEYS = {
  CART: 'e-store-cart',
  WISHLIST: 'e-store-wishlist',
  CHECKOUT: 'e-store-checkout',
};

// Cart item representing a product in the shopping cart
export interface CartItem {
  productId: number; // FakeStoreAPI uses number IDs
  quantity: number;
  addedAt: string; // ISO timestamp
}

// Shopping cart state
export interface Cart {
  items: CartItem[];
  promoCode: string | null;
  bonusCard: string | null;
}

// Cart totals (computed)
export interface CartTotals {
  subtotal: number;
  promoDiscount: number;
  bonusDiscount: number;
  tax: number;
  shipping: number;
  total: number;
}

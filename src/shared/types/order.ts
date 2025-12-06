// Delivery address for order
export interface DeliveryAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

// Delivery option
export interface DeliveryOption {
  type: 'standard' | 'express';
  cost: number;
  timeframe: string;
}

// Payment method
export type PaymentMethod = 'credit-card' | 'paypal';

// Payment details (for credit card)
export interface PaymentDetails {
  method: PaymentMethod;
  cardholderName?: string;
  cardNumber?: string;
  cvv?: string;
  expirationDate?: string;
}

// Order (created after successful payment)
export interface Order {
  id: string;
  items: Array<{
    productId: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  deliveryAddress: DeliveryAddress;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
}

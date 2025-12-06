// Product type based on FakeStoreAPI schema
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Extended Product with computed fields for UI
export interface ProductWithExtras extends Product {
  isDiscounted?: boolean;
  originalPrice?: number;
}

// Filters for product search and filtering
export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
  page?: number;
  limit?: number;
}

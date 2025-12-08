import type { Product } from '@/shared/types/product';

import { apiClient } from './client';

/**
 * Fetch single product by ID
 * @param id Product ID
 * @returns Promise<Product>
 */
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

/**
 * Fetch products by category
 * @param category Category name (e.g., 'electronics', 'jewelery')
 * @returns Promise<Product[]>
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

/**
 * Fetch all products with optional limit
 * @param limit Optional limit for number of products
 * @returns Promise<Product[]>
 */
export const fetchProducts = async (limit?: number): Promise<Product[]> => {
  const url = limit ? `/products?limit=${limit}` : '/products';
  const response = await apiClient.get(url);
  return response.data;
};

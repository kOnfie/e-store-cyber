import { useQuery } from '@tanstack/react-query';

import { fetchProductById, fetchProducts, fetchProductsByCategory } from '@/shared/api/products';
import type { Product } from '@/shared/types/product';

const DEFAULT_PRODUCTS_LIMIT = 4;

export const useProducts = (limit: number = DEFAULT_PRODUCTS_LIMIT) => {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => fetchProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id && id > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRandomProducts = (limit: number = DEFAULT_PRODUCTS_LIMIT) => useProducts(limit);
export const usePopularProducts = (limit: number = DEFAULT_PRODUCTS_LIMIT) => useProducts(limit);
export const useSearchProducts = (query: string, limit: number = 12) => {
  return useQuery({
    queryKey: ['products', 'search', query, limit],
    queryFn: () => fetchProducts(limit),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

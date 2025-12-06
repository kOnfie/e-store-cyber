import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/client';
import type { Product } from '@/shared/types/product';

const DEFAULT_PRODUCTS_LIMIT = 4;

export const useProducts = (limit: number = DEFAULT_PRODUCTS_LIMIT) => {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.get(`/products?limit=${limit}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRandomProducts = (limit: number = DEFAULT_PRODUCTS_LIMIT) => useProducts(limit);
export const usePopularProducts = (limit: number = DEFAULT_PRODUCTS_LIMIT) => useProducts(limit);
export const useSearchProducts = (query: string, limit: number = 12) => {
  return useQuery({
    queryKey: ['products', 'search', query, limit],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.get(`/products?limit=${limit}`);
      return response.data;
    },
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

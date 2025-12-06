'use client';

import { useSearchProducts } from '@/shared/hooks/useProducts';
import type { Product } from '@/shared/types/product';
import { Icon } from '@/shared/ui/atoms/Icon';

import { ProductList, ProductListSkeleton } from '@/widgets/product-list';

import { useSearchOverlay } from './hooks';

import styles from './SearchOverlay.module.scss';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const { searchQuery, setSearchQuery, debouncedQuery } = useSearchOverlay({
    open,
    onClose,
  });

  const { data: products = [], isLoading } = useSearchProducts(debouncedQuery, 12);

  const filteredProducts = products.filter(
    (product: Product) =>
      product.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <div className={styles.searchIcon}>
              <Icon name="search" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close search">
            ×
          </button>
        </div>

        <div className={styles.results}>
          {debouncedQuery.length === 0 ? (
            <div className={styles.placeholder}>
              <p>Start typing to search for products...</p>
            </div>
          ) : isLoading ? (
            <ProductListSkeleton />
          ) : filteredProducts.length > 0 ? (
            <div onClick={onClose}>
              <ProductList products={filteredProducts} />
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No products found for &quot;{debouncedQuery}&quot;</p>
              <p className={styles.suggestion}>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

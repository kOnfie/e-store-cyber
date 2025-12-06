'use client';

import { usePopularProducts } from '@/shared/hooks/useProducts';
import { Container } from '@/shared/ui/atoms/Container';

import { ProductList, ProductListSkeleton } from '@/widgets/product-list';

import styles from './PopularProductsSection.module.scss';

export const PopularProductsSection = () => {
  const { data: products, isLoading, error } = usePopularProducts(8);

  if (error) {
    return (
      <section className={styles.section}>
        <Container size="large">
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Popular Products</h2>
          </div>
          <div className={styles.error}>
            Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <Container size="large">
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Popular Products</h2>
        </div>
        {isLoading ? <ProductListSkeleton count={8} /> : <ProductList products={products || []} />}
      </Container>
    </section>
  );
};

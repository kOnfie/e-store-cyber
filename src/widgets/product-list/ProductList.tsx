import type { Product } from '@/shared/types/product';

import { ProductCard } from '../product-card/ProductCard';

import styles from './ProductList.module.scss';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => (
  <div className={styles.productsList}>
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </div>
);

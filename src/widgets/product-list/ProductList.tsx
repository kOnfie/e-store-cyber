import { ProductCard } from '../product-card/ProductCard';

import styles from './ProductList.module.scss';

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

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

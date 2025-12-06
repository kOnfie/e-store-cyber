import { ProductCardSkeleton } from '@/widgets/product-card';

import styles from './ProductListSkeleton.module.scss';

interface ProductListSkeletonProps {
  count?: number;
}

const DEFAULT_SKELETON_LENGTH = 8;

export const ProductListSkeleton = ({
  count = DEFAULT_SKELETON_LENGTH,
}: ProductListSkeletonProps) => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

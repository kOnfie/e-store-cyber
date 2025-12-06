import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <div className={styles.imageSkeleton} />
    </div>
    <div className={styles.info}>
      <div className={styles.textContent}>
        <div className={styles.titleSkeleton} />
        <div className={styles.priceSkeleton} />
      </div>
      <div className={styles.buttonSkeleton} />
    </div>
  </div>
);

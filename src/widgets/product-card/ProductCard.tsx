import Image from 'next/image';

import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  onBuyClick?: () => void;
}

export const ProductCard = ({ title, image, price, onBuyClick }: ProductCardProps) => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <Image src={image} alt={title} width={160} height={160} className={styles.image} />
    </div>
    <div className={styles.info}>
      <div className={styles.textContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.priceRow}>
          <span className={styles.price}>${price}</span>
        </div>
      </div>
      <button className={styles.buyButton} onClick={onBuyClick}>
        Buy Now
      </button>
    </div>
  </div>
);

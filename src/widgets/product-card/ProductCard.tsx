import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/ui/atoms';

import { generateProductUrl } from './utils';

import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  onBuyClick?: () => void;
}

export const ProductCard = ({
  id,
  title,
  image,
  price,
  category,
  onBuyClick,
}: ProductCardProps) => {
  const productUrl = generateProductUrl(category, id);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when buy button is clicked
    e.stopPropagation();
    if (onBuyClick) {
      onBuyClick();
    }
  };

  return (
    <Link href={productUrl} className={styles.cardLink}>
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
          <Button
            variant="primary"
            size="small"
            fullWidth
            onClick={handleBuyClick}
            className={styles.button}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
  );
};

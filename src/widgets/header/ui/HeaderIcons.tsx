import Link from 'next/link';

import { Icon } from '@/shared/ui/atoms/Icon';

import styles from '../Header.module.scss';

export const HeaderIcons = () => (
  <div className={styles.icons}>
    <Link href="#" className={styles.iconButton} aria-label="User profile">
      <Icon name="user" width={24} height={24} />
    </Link>
    <Link href="/wishlist" className={styles.iconButton} aria-label="Wishlist">
      <Icon name="heart" width={24} height={24} />
    </Link>
    <Link href="/cart" className={styles.iconButton} aria-label="Shopping cart">
      <Icon name="cart" width={24} height={24} />
    </Link>
  </div>
);

import Link from 'next/link';

import { Icon } from '@/shared/ui/atoms/Icon';

import { useHeaderCounters } from '../model/useHeaderCounters';

import styles from '../Header.module.scss';

export const HeaderDrawer = ({
  open,
  closing,
  onClose,
  onSearchClick,
}: {
  open: boolean;
  closing: boolean;
  onClose: () => void;
  onSearchClick?: () => void;
}) => {
  const { wishlistCount, cartCount } = useHeaderCounters();
  if (!open && !closing) return null;
  return (
    <>
      <div className={styles.drawerOverlay} onClick={onClose} />
      <aside className={styles.drawer + (closing ? ' ' + styles.drawerClosing : '')}>
        <button
          className={styles.drawerClose}
          aria-label="Close menu"
          onClick={onClose}
          type="button"
        >
          <span className={styles.closeIcon}>
            <span />
            <span />
          </span>
        </button>

        <nav className={styles.drawerNav}>
          <Link href="/" className={styles.drawerNavLink} onClick={onClose}>
            Home
          </Link>
          <Link href="/about" className={styles.drawerNavLink} onClick={onClose}>
            About
          </Link>
          <Link href="/contact" className={styles.drawerNavLink} onClick={onClose}>
            Contact Us
          </Link>
        </nav>
        <div className={styles.drawerIcons}>
          <Link href="#" className={styles.drawerIconButton} onClick={onClose}>
            <Icon name="user" width={32} height={32} />
            <span>Profile</span>
          </Link>
          <Link href="/wishlist" className={styles.drawerIconButton} onClick={onClose}>
            <Icon name="heart" width={32} height={32} />
            <span>Saved</span>
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>
          <Link href="/cart" className={styles.drawerIconButton} onClick={onClose}>
            <Icon name="cart" width={32} height={32} />
            <span>Cart</span>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

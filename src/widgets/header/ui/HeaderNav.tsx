import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from '../Header.module.scss';

export const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.navigation}>
      <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
        Home
      </Link>
      <Link
        href="/about"
        className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
      >
        Contact Us
      </Link>
    </nav>
  );
};

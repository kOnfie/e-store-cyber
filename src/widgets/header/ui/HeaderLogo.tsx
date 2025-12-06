import Image from 'next/image';
import Link from 'next/link';

import styles from '../Header.module.scss';

export const HeaderLogo = () => (
  <Link href="/" className={styles.logo}>
    <Image src="/images/logo.svg" alt="E-Store Logo" width={65.4} height={22.87} priority />
  </Link>
);

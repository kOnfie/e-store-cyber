'use client';

import Link from 'next/link';

import { Button, Container } from '@/shared/ui/atoms';
import { Icon } from '@/shared/ui/atoms/Icon';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <Container size="large">
      <div className={styles.notFoundPage}>
        <div className={styles.content}>
          <div className={styles.iconSection}>
            <div className={styles.errorIcon}>
              <span className={styles.errorNumber}>404</span>
            </div>
          </div>

          <div className={styles.textSection}>
            <h1 className={styles.title}>Page Not Found</h1>
            <p className={styles.description}>
              Sorry, we couldn't find the page you're looking for. The page might have been moved,
              deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className={styles.actionsSection}>
            <Link href="/">
              <Button variant="primary" size="large">
                <Icon name="home" width={20} height={20} />
                Go to Home
              </Button>
            </Link>
            <Button variant="secondary" size="large" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>

          <div className={styles.helpSection}>
            <p className={styles.helpText}>Need help?</p>
            <div className={styles.helpLinks}>
              <Link href="/contact" className={styles.helpLink}>
                Contact Support
              </Link>
              <span className={styles.separator}>•</span>
              <Link href="/about" className={styles.helpLink}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

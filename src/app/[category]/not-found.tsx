'use client';

import Link from 'next/link';

import { Button, Container } from '@/shared/ui/atoms';
import { Icon } from '@/shared/ui/atoms/Icon';

import styles from './not-found.module.scss';

export default function CategoryNotFound() {
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
            <h1 className={styles.title}>Category Not Found</h1>
            <p className={styles.description}>
              Sorry, we couldn't find the category you're looking for. The category might not exist
              or the URL is incorrect.
            </p>
          </div>

          <div className={styles.actionsSection}>
            <Link href="/">
              <Button variant="primary" size="large">
                <Icon name="home" width={20} height={20} />
                Browse All Categories
              </Button>
            </Link>
            <Button variant="secondary" size="large" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>

          <div className={styles.suggestionSection}>
            <p className={styles.suggestionText}>Popular categories:</p>
            <div className={styles.suggestionLinks}>
              <Link href="/electronics" className={styles.suggestionLink}>
                Electronics
              </Link>
              <span className={styles.separator}>•</span>
              <Link href="/jewelery" className={styles.suggestionLink}>
                Jewelery
              </Link>
              <span className={styles.separator}>•</span>
              <Link href="/men's%20clothing" className={styles.suggestionLink}>
                Men's Clothing
              </Link>
              <span className={styles.separator}>•</span>
              <Link href="/women's%20clothing" className={styles.suggestionLink}>
                Women's Clothing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

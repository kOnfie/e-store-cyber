'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from './PromoBanner.module.scss';

interface PromoBannerProps {
  titleMain: string;
  titleAccent: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  backgroundAlt: string;
}

export const PromoBanner = ({
  titleMain,
  titleAccent,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
  backgroundAlt,
}: PromoBannerProps) => {
  return (
    <section className={styles.banner}>
      <div className={styles.backgroundWrapper}>
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className={styles.backgroundImage}
          priority={false}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h2 className={styles.title}>
            <span className={styles.titleMain}>{titleMain}</span>
            <span className={styles.titleAccent}>{titleAccent}</span>
          </h2>
          <p className={styles.description}>{description}</p>
        </div>
        <Link href={ctaLink} className={styles.button}>
          {ctaText}
        </Link>
      </div>
    </section>
  );
};

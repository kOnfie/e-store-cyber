import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/shared/ui/atoms/Container';

import styles from './HeroBanner.module.scss';

interface HeroBannerProps {
  subtitle?: string;
  title: string;
  titleBold?: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
}

export const HeroBanner = ({
  subtitle,
  title,
  titleBold,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt,
}: HeroBannerProps) => {
  return (
    <section className={styles.heroBanner}>
      <Container>
        <div className={styles.bannerContent}>
          <div className={styles.content}>
            <div className={styles.titles}>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              <h1 className={styles.title}>
                {title}
                {titleBold && <span className={styles.titleBold}> {titleBold}</span>}
              </h1>
            </div>
            <p className={styles.description}>{description}</p>
            <Link href={ctaLink} className={styles.ctaButton}>
              {ctaText}
            </Link>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={406}
              height={632}
              className={styles.image}
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

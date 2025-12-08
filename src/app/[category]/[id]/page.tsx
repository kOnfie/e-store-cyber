'use client';

import { use } from 'react';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { useProduct } from '@/shared/hooks/useProducts';
import { Container } from '@/shared/ui/atoms/Container';

import styles from './page.module.scss';

interface ProductPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);

  // Validate ID
  if (isNaN(productId) || productId <= 0) {
    notFound();
  }

  const { data: product, isLoading, error } = useProduct(productId);

  // Handle error
  if (error) {
    return (
      <Container size="large">
        <div className={styles.error}>
          <h1>Product Not Found</h1>
          <p>Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </Container>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <Container size="large">
        <div className={styles.loading}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonPrice}></div>
              <div className={styles.skeletonDescription}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // Product not found
  if (!product) {
    notFound();
  }

  return (
    <Container size="large">
      <div className={styles.productPage}>
        <div className={styles.productContainer}>
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className={styles.productImage}
                priority
              />
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.productInfo}>
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.title}>{product.title}</h1>
              <div className={styles.price}>${product.price}</div>
              <p className={styles.description}>{product.description}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCartButton}>Add to Cart</button>
              <button className={styles.wishlistButton}>Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

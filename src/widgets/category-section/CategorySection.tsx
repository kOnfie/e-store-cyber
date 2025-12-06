'use client';

import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import { Container } from '@/shared/ui/atoms/Container';
import { Icon } from '@/shared/ui/atoms/Icon';

import styles from './CategorySection.module.scss';

const categories = [
  { id: 1, name: 'Phones', icon: 'phones' },
  { id: 2, name: 'Smart Watches', icon: 'smart-watches' },
  { id: 3, name: 'Cameras', icon: 'cameras' },
  { id: 4, name: 'Headphones', icon: 'headphones' },
  { id: 5, name: 'Computers', icon: 'computers' },
  { id: 6, name: 'Gaming', icon: 'gaming' },
  { id: 7, name: 'Tablets', icon: 'tablet' },
  { id: 8, name: 'Laptops', icon: 'laptop' },
];

export const CategorySection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Browse By Category</h2>
          <div className={styles.sliderArrows}>
            <button
              className={styles.arrowPrev}
              aria-label="Previous category"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Icon name="arrow-left" width={26} height={26} />
            </button>
            <button
              className={styles.arrowNext}
              aria-label="Next category"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Icon name="arrow-right" width={26} height={26} />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={16}
          slidesPerView={6}
          className={styles.categoriesList}
          style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 3, spaceBetween: 8 },
            768: { slidesPerView: 4, spaceBetween: 12 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.categoryCard}>
                <div className={styles.iconWrapper}>
                  <Icon name={cat.icon} width={48} height={48} />
                </div>
                <span className={styles.categoryName}>{cat.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

import { CategorySection } from '@/widgets/category-section';
import { Header } from '@/widgets/header';
import { HeroBanner } from '@/widgets/hero-banner';
import { PopularProductsSection } from '@/widgets/popular-products-section';
import { PromoBanner } from '@/widgets/promo-banner';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner
          subtitle="Pro.Beyond."
          title="IPhone 14"
          titleBold="Pro"
          description="Created to change everything for the better. For everyone"
          ctaText="Shop Now"
          ctaLink="/products"
          imageSrc="/images/banners/iphone-14-pro-3312ee.png"
          imageAlt="iPhone 14 Pro"
        />
        <CategorySection />
        <PopularProductsSection />
        <PromoBanner
          titleMain="Big Summer"
          titleAccent="Sale"
          description="Commodo fames vitae vitae leo mauris in. Eu consequat."
          ctaText="Shop Now"
          ctaLink="/products"
          backgroundImage="/images/banners/summer-sale-banner.png"
          backgroundAlt="Big Summer Sale"
        />
      </main>
    </>
  );
}

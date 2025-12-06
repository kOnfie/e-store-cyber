# Tasks: E-Store MVP

**Input**: Design documents from `/specs/001-e-store-mvp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT included (not requested in specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app structure: `src/` at repository root (Next.js 14+ App Router)
- FSD layers: `src/app/`, `src/features/`, `src/widgets/`, `src/shared/`
- Public assets: `public/images/`, `public/icons/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 14+ project with TypeScript strict mode in project root
- [ ] T002 [P] Install core dependencies: next, react, react-dom, @tanstack/react-query, zustand, axios, sass
- [ ] T003 [P] Configure tsconfig.json with strict mode enabled
- [ ] T004 [P] Configure next.config.js for SCSS modules support
- [ ] T005 [P] Configure ESLint with Next.js recommended rules in .eslintrc.json
- [ ] T006 [P] Configure Prettier for code formatting in .prettierrc
- [ ] T007 Create FSD directory structure: src/app/, src/features/, src/widgets/, src/shared/
- [ ] T008 [P] Create public/ directory with subdirectories: images/banners/, images/categories/, images/products/, icons/
- [ ] T009 [P] Setup global styles: src/styles/globals.scss (CSS reset only)
- [ ] T010 [P] Setup SCSS variables: src/styles/variables.scss (colors, spacing, breakpoints)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Type Definitions (Foundation)

- [ ] T011 [P] Create Product type in src/shared/types/product.ts with FakeStoreAPI schema (id: number, title, price, description, category, image)
- [ ] T012 [P] Create ProductWithExtras type extending Product with isDiscounted, originalPrice in src/shared/types/product.ts
- [ ] T013 [P] Create ProductFilters type in src/shared/types/product.ts
- [ ] T014 [P] Create Category type (string) and CategoryWithIcon interface in src/shared/types/category.ts
- [ ] T015 [P] Create Cart types: CartItem, Cart in src/shared/types/cart.ts
- [ ] T016 [P] Create Wishlist type in src/shared/types/wishlist.ts
- [ ] T017 [P] Create Order types: DeliveryAddress, DeliveryOption, PaymentMethod, Order in src/shared/types/order.ts

### API Infrastructure

- [ ] T018 [P] Create Axios instance with FakeStoreAPI base URL in src/shared/api/client.ts
- [ ] T019 [P] Create TanStack Query client with config in src/shared/api/queryClient.ts
- [ ] T020 [P] Create constants file with promo codes, bonus cards, tax rate, shipping costs in src/shared/lib/constants/config.ts

### Shared UI Atoms

- [ ] T021 [P] Create Button atom component in src/shared/ui/atoms/Button/Button.tsx with variants (primary, secondary, outline)
- [ ] T022 [P] Create Button styles in src/shared/ui/atoms/Button/Button.module.scss
- [ ] T023 [P] Create Input atom component in src/shared/ui/atoms/Input/Input.tsx with validation states
- [ ] T024 [P] Create Input styles in src/shared/ui/atoms/Input/Input.module.scss
- [ ] T025 [P] Create Icon atom component in src/shared/ui/atoms/Icon/Icon.tsx (wrapper for SVG icons)
- [ ] T026 [P] Create Icon styles in src/shared/ui/atoms/Icon/Icon.module.scss
- [ ] T027 [P] Create Badge atom component in src/shared/ui/atoms/Badge/Badge.tsx (for counters)
- [ ] T028 [P] Create Badge styles in src/shared/ui/atoms/Badge/Badge.module.scss

### Shared UI Molecules

- [ ] T029 [P] Create PriceTag molecule in src/shared/ui/molecules/PriceTag/PriceTag.tsx (displays current + original price with strikethrough)
- [ ] T030 [P] Create PriceTag styles in src/shared/ui/molecules/PriceTag/PriceTag.module.scss
- [ ] T031 [P] Create Toast molecule in src/shared/ui/molecules/Toast/Toast.tsx (success/error notifications)
- [ ] T032 [P] Create Toast styles in src/shared/ui/molecules/Toast/Toast.module.scss

### Shared Utilities

- [ ] T033 [P] Create formatters utility (currency, date) in src/shared/lib/utils/formatters.ts
- [ ] T034 [P] Create validators utility (email, card number) in src/shared/lib/utils/validators.ts

### App Structure

- [ ] T035 Create root layout in src/app/layout.tsx with TanStack Query provider and global styles
- [ ] T036 [P] Create Next.js middleware stub in src/middleware.ts (if needed for future features)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Products on Home Page (Priority: P1) 🎯 MVP

**Goal**: Users can browse the home page with banners, category slider, random products section, and discounted products section

**Independent Test**: Navigate to http://localhost:3000, verify home page loads with all sections (2 hero banners, category slider with arrows, 8 random product cards, mid-page banner, 4 discounted product cards, bottom banner). Click category to navigate to category page. Click product card to navigate to detail page. Click wishlist button to add/remove from wishlist. Click "Buy" button to add to cart.

### API Layer - Products & Categories

- [ ] T037 [P] [US1] Create fetchProducts API function using FakeStoreAPI GET /products in src/shared/api/products.ts
- [ ] T038 [P] [US1] Create fetchProductById API function using FakeStoreAPI GET /products/{id} in src/shared/api/products.ts
- [ ] T039 [P] [US1] Create fetchCategories API function using FakeStoreAPI GET /products/categories in src/shared/api/categories.ts
- [ ] T040 [P] [US1] Create fetchRandomProducts utility function (fetch all + shuffle client-side) in src/shared/api/products.ts
- [ ] T041 [P] [US1] Create fetchDiscountedProducts utility function (fetch + simulate discounts client-side) in src/shared/api/products.ts
- [ ] T042 [P] [US1] Create applyFilters utility function (client-side filtering) in src/shared/api/products.ts

### TanStack Query Hooks

- [ ] T043 [P] [US1] Create useProducts hook in src/features/product-list/api/useProducts.ts
- [ ] T044 [P] [US1] Create useRandomProducts hook in src/features/product-list/api/useRandomProducts.ts
- [ ] T045 [P] [US1] Create useDiscountedProducts hook in src/features/product-list/api/useDiscountedProducts.ts
- [ ] T046 [P] [US1] Create useCategories hook in src/widgets/category-slider/api/useCategories.ts

### Feature: Product Card

- [ ] T047 [P] [US1] Create ProductCard component in src/features/product-card/ui/ProductCard.tsx (image, wishlist button, title, price, "Buy" button)
- [ ] T048 [P] [US1] Create ProductCard styles in src/features/product-card/ui/ProductCard.module.scss

### Feature: Product List

- [ ] T049 [US1] Create ProductGrid component in src/features/product-list/ui/ProductGrid.tsx (renders array of ProductCards in grid layout)
- [ ] T050 [P] [US1] Create ProductGrid styles in src/features/product-list/ui/ProductGrid.module.scss

### Feature: Wishlist (Storage Only for US1)

- [ ] T051 [P] [US1] Create Zustand wishlist store in src/features/wishlist/model/useWishlistStore.ts with persist middleware (add, remove, toggle actions)
- [ ] T052 [P] [US1] Create WishlistButton component in src/features/wishlist/ui/WishlistButton.tsx (heart icon with toggle)
- [ ] T053 [P] [US1] Create WishlistButton styles in src/features/wishlist/ui/WishlistButton.module.scss

### Feature: Cart (Add to Cart for US1)

- [ ] T054 [P] [US1] Create Zustand cart store in src/features/cart/model/useCartStore.ts with persist middleware (addItem, updateQuantity, removeItem actions)
- [ ] T055 [P] [US1] Create cart calculations utility in src/features/cart/lib/calculations.ts (subtotal, tax, shipping, total)

### Widget: Header

- [ ] T056 [US1] Create Header widget in src/widgets/header/ui/Header.tsx (logo, search input, nav links, user icon, wishlist icon + counter, cart icon + counter)
- [ ] T057 [P] [US1] Create Header styles in src/widgets/header/ui/Header.module.scss
- [ ] T058 [P] [US1] Create useHeaderCounters hook in src/widgets/header/model/useHeaderCounters.ts (reads from cart + wishlist stores)

### Widget: Footer

- [ ] T059 [P] [US1] Create Footer widget in src/widgets/footer/ui/Footer.tsx (logo, social links, service links)
- [ ] T060 [P] [US1] Create Footer styles in src/widgets/footer/ui/Footer.module.scss

### Widget: Hero Banners

- [ ] T061 [P] [US1] Create HeroBanners widget in src/widgets/hero-banners/ui/HeroBanners.tsx (displays 2 full-width promotional banners)
- [ ] T062 [P] [US1] Create HeroBanners styles in src/widgets/hero-banners/ui/HeroBanners.module.scss

### Widget: Category Slider

- [ ] T063 [US1] Create CategorySlider widget in src/widgets/category-slider/ui/CategorySlider.tsx (horizontal scroll with arrow navigation, displays category icons + names)
- [ ] T064 [P] [US1] Create CategorySlider styles in src/widgets/category-slider/ui/CategorySlider.module.scss
- [ ] T065 [US1] Create category icon mapping utility in src/widgets/category-slider/lib/categoryIcons.ts (maps FakeStore categories to icon paths)

### Home Page

- [ ] T066 [US1] Create home page in src/app/page.tsx (assembles: Header, HeroBanners, CategorySlider, Random Products section, Mid Banner, Discounted Products section, Bottom Banner, Footer)
- [ ] T067 [P] [US1] Create home page styles in src/app/page.module.scss

### Assets

- [ ] T068 [P] [US1] Add placeholder banner images to public/images/banners/ (hero-1.jpg, hero-2.jpg, mid-banner.jpg, bottom-banner.jpg)
- [ ] T069 [P] [US1] Add category icon SVGs to public/images/categories/ (electronics.svg, jewelery.svg, mens-clothing.svg, womens-clothing.svg)
- [ ] T070 [P] [US1] Add icon SVGs to public/icons/ (heart.svg, heart-filled.svg, cart.svg, search.svg, user.svg, arrow-left.svg, arrow-right.svg)

**Checkpoint**: At this point, User Story 1 (Home Page) should be fully functional with browsing, category navigation, add to cart, and add to wishlist

---

## Phase 4: User Story 2 - Search Products (Priority: P1)

**Goal**: Users can search for products by name or category using a full-screen overlay with real-time filtering

**Independent Test**: Open home page, click on search input in Header, verify full-screen overlay opens with dark blurred background. Type "electronics" and verify matching products display in real-time. Click product card to navigate to detail page. Press Escape key or click X button to close overlay.

### Feature: Search

- [ ] T071 [P] [US2] Create Zustand search store in src/features/search/model/useSearchStore.ts (isOpen, query, toggleSearch, setQuery actions)
- [ ] T072 [P] [US2] Create useSearchProducts hook in src/features/search/api/useSearchProducts.ts (uses useProducts with search filter)
- [ ] T073 [US2] Create SearchOverlay component in src/features/search/ui/SearchOverlay.tsx (full-screen modal with search results, close button, Escape key handler)
- [ ] T074 [P] [US2] Create SearchOverlay styles in src/features/search/ui/SearchOverlay.module.scss (dark blur background, centered content)

### Shared UI Molecules

- [ ] T075 [P] [US2] Create SearchBar molecule in src/shared/ui/molecules/SearchBar/SearchBar.tsx (input with search icon, debounced onChange)
- [ ] T076 [P] [US2] Create SearchBar styles in src/shared/ui/molecules/SearchBar/SearchBar.module.scss

### Integration

- [ ] T077 [US2] Update Header component in src/widgets/header/ui/Header.tsx to integrate SearchBar and toggle SearchOverlay
- [ ] T078 [US2] Update root layout in src/app/layout.tsx to mount SearchOverlay (outside main content for proper z-index)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently (home page + search functionality)

---

## Phase 5: User Story 3 - Browse Category with Price Filter (Priority: P1)

**Goal**: Users can browse products by category with price range filtering and pagination (9 products per page in 3x3 grid)

**Independent Test**: Navigate to any category (e.g., click "electronics" from category slider). Verify breadcrumbs show "Home > Electronics". Adjust price slider and verify products filter by price range. Click page 2 in pagination and verify next 9 products display. Click product card to navigate to detail page.

### Feature: Category Filter

- [ ] T079 [P] [US3] Create Zustand filter store in src/features/category-filter/model/useFilterStore.ts (priceRange, page, setPriceRange, setPage actions)
- [ ] T080 [P] [US3] Create PriceFilter component in src/features/category-filter/ui/PriceFilter.tsx (dual-handle slider with min/max values)
- [ ] T081 [P] [US3] Create PriceFilter styles in src/features/category-filter/ui/PriceFilter.module.scss
- [ ] T082 [P] [US3] Create Pagination component in src/features/category-filter/ui/Pagination.tsx (Previous, page numbers, Next buttons)
- [ ] T083 [P] [US3] Create Pagination styles in src/features/category-filter/ui/Pagination.module.scss

### API Layer

- [ ] T084 [P] [US3] Create fetchProductsByCategory API function using FakeStoreAPI GET /products/category/{name} in src/shared/api/products.ts
- [ ] T085 [P] [US3] Create useProductsByCategory hook in src/features/product-list/api/useProductsByCategory.ts

### Widget: Breadcrumbs

- [ ] T086 [P] [US3] Create Breadcrumbs widget in src/widgets/breadcrumbs/ui/Breadcrumbs.tsx (Home > Category Name)
- [ ] T087 [P] [US3] Create Breadcrumbs styles in src/widgets/breadcrumbs/ui/Breadcrumbs.module.scss

### Category Page

- [ ] T088 [US3] Create category page in src/app/category/[id]/page.tsx (2-column layout: left sidebar with PriceFilter, right content with Breadcrumbs, ProductGrid with 9 items, Pagination)
- [ ] T089 [P] [US3] Create category page styles in src/app/category/[id]/page.module.scss

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently (home + search + category filtering)

---

## Phase 6: User Story 4 - View Product Details (Priority: P1)

**Goal**: Users can view detailed product information with large image, description, pricing, delivery info, and related products

**Independent Test**: Navigate to any product detail page (e.g., click product card from home page). Verify large image, title, price (with strikethrough if discounted), description, delivery time, availability, warranty display. Verify 4 related products from same category display. Click "Add to Cart" button and verify cart counter increments. Click related product card to navigate to that product's detail page.

### API Layer

- [ ] T090 [P] [US4] Create useProduct hook in src/features/product-list/api/useProduct.ts (fetches single product by ID)
- [ ] T091 [P] [US4] Create fetchRelatedProducts utility function in src/shared/api/products.ts (fetch by category, exclude current product, limit 4)
- [ ] T092 [P] [US4] Create useRelatedProducts hook in src/features/product-list/api/useRelatedProducts.ts

### Product Detail Page

- [ ] T093 [US4] Create product detail page in src/app/product/[id]/page.tsx (2-column layout: left = large image, right = title, price, description, "Add to Cart" button, delivery info, availability, warranty; below = Related Products section with 4 cards)
- [ ] T094 [P] [US4] Create product detail page styles in src/app/product/[id]/page.module.scss

**Checkpoint**: At this point, User Stories 1-4 should all work independently (home + search + category + product details)

---

## Phase 7: User Story 5 - Manage Wishlist (Priority: P1)

**Goal**: Users can view all wishlist items in a grid layout, navigate to product details, remove items, or add to cart

**Independent Test**: Add multiple products to wishlist from various pages (home, category, product detail). Navigate to Wishlist page via Header wishlist icon. Verify all products display in 3-column grid. Click product card to navigate to detail page. Click wishlist button to remove item and verify counter decrements. Add all items to cart and navigate to Cart page. Remove all items and verify "Your wishlist is empty" message displays.

### Wishlist Page

- [ ] T095 [US5] Create wishlist page in src/app/wishlist/page.tsx (displays ProductGrid with all wishlist items, empty state message)
- [ ] T096 [P] [US5] Create wishlist page styles in src/app/wishlist/page.module.scss

### Integration

- [ ] T097 [US5] Update Header widget in src/widgets/header/ui/Header.tsx to link wishlist icon to /wishlist page

**Checkpoint**: At this point, User Stories 1-5 should all work independently (home + search + category + product details + wishlist)

---

## Phase 8: User Story 6 - Manage Shopping Cart (Priority: P1)

**Goal**: Users can view cart items, adjust quantities, apply promo codes and bonus cards, see real-time calculations, and proceed to checkout

**Independent Test**: Add multiple products to cart. Navigate to Cart page via Header cart icon. Verify all items display with thumbnails, product IDs, quantity selectors, unit prices, remove buttons. Adjust quantity using +/- buttons and direct input, verify totals update. Enter promo code "SAVE5" and click Apply, verify 5% discount applies and success message shows. Enter bonus card "1234567890" and click Apply, verify 10% discount stacks with promo code. Enter invalid codes and verify error messages. Remove items and verify cart counter decrements. Click "Checkout" button to navigate to checkout flow.

### Feature: Promo/Bonus Validation

- [ ] T098 [P] [US6] Create validatePromoCode function in src/features/promo/api/validatePromo.ts (checks against VALID_PROMO_CODES, returns ValidationResult)
- [ ] T099 [P] [US6] Create validateBonusCard function in src/features/promo/api/validatePromo.ts (checks against VALID_BONUS_CARDS, returns ValidationResult)

### Feature: Cart UI Components

- [ ] T100 [P] [US6] Create CartItem component in src/features/cart/ui/CartItem.tsx (thumbnail, product ID, quantity selector with +/- buttons + input, unit price, remove button)
- [ ] T101 [P] [US6] Create CartItem styles in src/features/cart/ui/CartItem.module.scss
- [ ] T102 [US6] Create OrderSummary component in src/features/cart/ui/OrderSummary.tsx (displays subtotal, tax, shipping, total + promo code input + bonus card input with Apply buttons and validation messages + "Checkout" button)
- [ ] T103 [P] [US6] Create OrderSummary styles in src/features/cart/ui/OrderSummary.module.scss

### Feature: Promo/Bonus Input UI

- [ ] T104 [P] [US6] Create PromoCodeInput component in src/features/promo/ui/PromoCodeInput.tsx (text input + Apply button + validation message)
- [ ] T105 [P] [US6] Create BonusCardInput component in src/features/promo/ui/BonusCardInput.tsx (text input + Apply button + validation message)
- [ ] T106 [P] [US6] Create shared promo styles in src/features/promo/ui/PromoCodeInput.module.scss

### Cart Page

- [ ] T107 [US6] Create cart page in src/app/cart/page.tsx (2-column layout: left = list of CartItems, right = OrderSummary)
- [ ] T108 [P] [US6] Create cart page styles in src/app/cart/page.module.scss

### Integration

- [ ] T109 [US6] Update cart store in src/features/cart/model/useCartStore.ts to add setPromoCode, setBonusCard, clearPromoCode, clearBonusCard actions
- [ ] T110 [US6] Update cart calculations utility in src/features/cart/lib/calculations.ts to handle promo + bonus discount stacking
- [ ] T111 [US6] Update Header widget in src/widgets/header/ui/Header.tsx to link cart icon to /cart page

**Checkpoint**: At this point, User Stories 1-6 should all work independently (home + search + category + product details + wishlist + cart management with discounts)

---

## Phase 9: User Story 7 - Complete Checkout Flow (Priority: P1)

**Goal**: Users can complete 3-step checkout flow (Address → Delivery → Payment) with form validation, order summary, test payment processing, success popup, cart clearing, and redirect to home page

**Independent Test**: Add products to cart, navigate to Cart page, click "Checkout" button. Step 1: Fill in all address fields (Full Name, Street, City, Postal Code, Country), click "Next" to proceed to Step 2. Click "Back" to verify address data is preserved. Step 2: Select "Express Delivery" ($10), click "Next" to proceed to Step 3. Click "Back" to verify delivery selection is preserved. Step 3: Verify order summary displays all products, address, delivery method, and totals. Select "Credit Card" payment method, fill in dummy card details (any 16-digit number, any 3-digit CVV, any MM/YY), click "Pay". Verify success popup appears with "Thank you for your order!" message. After 2 seconds, verify redirect to home page and cart is cleared (cart counter = 0).

### Feature: Checkout State Management

- [ ] T112 [P] [US7] Create Zustand checkout store in src/features/checkout/model/useCheckoutStore.ts (address, deliveryOption, paymentMethod, setAddress, setDelivery, setPayment, clearCheckout actions)

### Feature: Checkout UI Components

- [ ] T113 [P] [US7] Create StepIndicator component in src/features/checkout/ui/StepIndicator.tsx (displays "1. Address → 2. Delivery → 3. Payment" with current step highlighted)
- [ ] T114 [P] [US7] Create AddressForm component in src/features/checkout/ui/AddressForm.tsx (5 required text inputs with validation, "Next" + "Back" buttons)
- [ ] T115 [P] [US7] Create DeliverySelector component in src/features/checkout/ui/DeliverySelector.tsx (radio buttons for Standard/Express, "Next" + "Back" buttons)
- [ ] T116 [US7] Create PaymentForm component in src/features/checkout/ui/PaymentForm.tsx (payment method radio buttons, conditional card fields or PayPal button, "Pay" + "Back" buttons, success popup modal)
- [ ] T117 [P] [US7] Create shared checkout styles in src/features/checkout/ui/checkout.module.scss

### Checkout Pages

- [ ] T118 [US7] Create checkout address page in src/app/checkout/address/page.tsx (renders StepIndicator + AddressForm)
- [ ] T119 [US7] Create checkout delivery page in src/app/checkout/delivery/page.tsx (renders StepIndicator + DeliverySelector)
- [ ] T120 [US7] Create checkout payment page in src/app/checkout/payment/page.tsx (2-column layout: left = order summary, right = PaymentForm)
- [ ] T121 [P] [US7] Create shared checkout page styles in src/app/checkout/checkout.module.scss

### Integration

- [ ] T122 [US7] Update OrderSummary component in src/features/cart/ui/OrderSummary.tsx to link "Checkout" button to /checkout/address
- [ ] T123 [US7] Implement navigation logic in AddressForm (Back → /cart, Next → /checkout/delivery)
- [ ] T124 [US7] Implement navigation logic in DeliverySelector (Back → /checkout/address, Next → /checkout/payment)
- [ ] T125 [US7] Implement payment processing logic in PaymentForm (mock validation → success popup → clear cart → redirect to home after 2s)

**Checkpoint**: At this point, User Stories 1-7 should all work independently (complete e-commerce flow from home to checkout completion)

---

## Phase 10: User Story 8 - View Static Pages (Priority: P1)

**Goal**: Users can access About and Contact pages via Header navigation with company information and functional contact form

**Independent Test**: Click "About" link in Header navigation, verify About page displays with company information and shared Header/Footer. Click "Contact" link in Header navigation, verify Contact page displays with contact form and company contact info. Fill in all form fields (Name, Email, Message) and click "Send", verify success message "Thank you! We'll get back to you soon." displays. Submit form with invalid email format and verify email validation error message.

### Static Pages

- [ ] T126 [P] [US8] Create About page in src/app/about/page.tsx (page title "About Us" + company information text + shared Header/Footer)
- [ ] T127 [P] [US8] Create About page styles in src/app/about/page.module.scss
- [ ] T128 [US8] Create Contact page in src/app/contact/page.tsx (page title "Contact Us" + contact form with Name/Email/Message fields + "Send" button + success message display + company contact info section)
- [ ] T129 [P] [US8] Create Contact page styles in src/app/contact/page.module.scss

### Integration

- [ ] T130 [US8] Update Header widget in src/widgets/header/ui/Header.tsx to link "About" and "Contact" navigation links to /about and /contact pages
- [ ] T131 [US8] Implement mock form submission logic in Contact page (validate email format → display success message)

**Checkpoint**: All user stories (US1-US8) should now be independently functional - complete E-Store MVP is ready

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T132 [P] Add loading states to all TanStack Query hooks (skeleton loaders or spinners)
- [ ] T133 [P] Add error boundaries in src/app/layout.tsx for graceful error handling
- [ ] T134 [P] Optimize images in public/images/ (compress, use Next.js Image component with width/height)
- [ ] T135 [P] Add meta tags and SEO optimization to all pages (title, description, OG tags)
- [ ] T136 [P] Test localStorage persistence across browser sessions (cart, wishlist)
- [ ] T137 [P] Test all navigation flows (home → category → product → cart → checkout → home)
- [ ] T138 [P] Validate all TypeScript strict mode compliance (no `any` types)
- [ ] T139 [P] Run ESLint and fix all linting errors across codebase
- [ ] T140 [P] Run Prettier and format all files
- [ ] T141 [P] Test responsive behavior on different screen sizes (minimum: 1024px+ desktop)
- [ ] T142 Validate quickstart.md instructions (npm install → npm run dev → http://localhost:3000)
- [ ] T143 [P] Add 404 page in src/app/not-found.tsx
- [ ] T144 [P] Add README.md with project overview and quick start instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P1...)
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (Home Page)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (Search)**: Depends on US1 (uses ProductCard, Header updates) - Extends US1
- **User Story 3 (Category)**: Can start after Foundational - No hard dependencies (uses ProductCard from US1)
- **User Story 4 (Product Detail)**: Can start after Foundational - No hard dependencies (uses ProductCard from US1)
- **User Story 5 (Wishlist)**: Depends on US1 (wishlist store created in US1, just needs dedicated page)
- **User Story 6 (Cart)**: Depends on US1 (cart store created in US1, needs full cart page + promo/bonus)
- **User Story 7 (Checkout)**: Depends on US6 (cart must be complete to checkout)
- **User Story 8 (Static Pages)**: Can start after Foundational - No dependencies on other stories

### Recommended Execution Order

1. **Phase 1 + Phase 2**: Setup + Foundational (MUST complete first)
2. **Phase 3**: User Story 1 (Home Page) - **MVP Foundation**
3. **Phase 4**: User Story 2 (Search) - Extends home page
4. **Phase 5**: User Story 3 (Category) - Core browsing
5. **Phase 6**: User Story 4 (Product Detail) - Core browsing
6. **Phase 7**: User Story 5 (Wishlist) - Engagement feature
7. **Phase 8**: User Story 6 (Cart) - Core e-commerce
8. **Phase 9**: User Story 7 (Checkout) - Complete transaction flow
9. **Phase 10**: User Story 8 (Static Pages) - Content pages
10. **Phase 11**: Polish - Final touches

### Within Each User Story

- API functions before TanStack Query hooks
- Types before components that use them
- Atoms/molecules before features that use them
- Features before widgets that compose them
- Widgets before pages that use them
- Core functionality before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (different files)
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, some user stories can start in parallel:
  - US1 (Home) + US8 (Static Pages) - no conflicts
  - US3 (Category) + US4 (Product Detail) - after US1 completes
- Within each story, all tasks marked [P] can run in parallel
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch all type definitions together:
Task: "Create Product type in src/shared/types/product.ts"
Task: "Create Category type in src/shared/types/category.ts"
Task: "Create Cart types in src/shared/types/cart.ts"
Task: "Create Wishlist type in src/shared/types/wishlist.ts"
Task: "Create Order types in src/shared/types/order.ts"

# Launch all shared UI atoms together:
Task: "Create Button atom component in src/shared/ui/atoms/Button/Button.tsx"
Task: "Create Input atom component in src/shared/ui/atoms/Input/Input.tsx"
Task: "Create Icon atom component in src/shared/ui/atoms/Icon/Icon.tsx"
Task: "Create Badge atom component in src/shared/ui/atoms/Badge/Badge.tsx"
```

---

## Parallel Example: User Story 1

```bash
# Launch all API functions together:
Task: "Create fetchProducts API function in src/shared/api/products.ts"
Task: "Create fetchProductById API function in src/shared/api/products.ts"
Task: "Create fetchCategories API function in src/shared/api/categories.ts"

# Launch all TanStack Query hooks together:
Task: "Create useProducts hook in src/features/product-list/api/useProducts.ts"
Task: "Create useRandomProducts hook in src/features/product-list/api/useRandomProducts.ts"
Task: "Create useDiscountedProducts hook in src/features/product-list/api/useDiscountedProducts.ts"

# Launch all widgets together (after hooks complete):
Task: "Create Header widget in src/widgets/header/ui/Header.tsx"
Task: "Create Footer widget in src/widgets/footer/ui/Footer.tsx"
Task: "Create HeroBanners widget in src/widgets/hero-banners/ui/HeroBanners.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1-2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Home Page)
4. **STOP and VALIDATE**: Test home page independently (browse, categories, wishlist, cart)
5. Complete Phase 4: User Story 2 (Search)
6. **STOP and VALIDATE**: Test search functionality
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Add User Story 6 → Test independently → Deploy/Demo
8. Add User Story 7 → Test independently → Deploy/Demo (Complete checkout flow!)
9. Add User Story 8 → Test independently → Deploy/Demo (All features complete)
10. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Home) → User Story 2 (Search)
   - Developer B: User Story 8 (Static Pages)
3. After US1 completes:
   - Developer A: User Story 2 (Search)
   - Developer B: User Story 3 (Category)
   - Developer C: User Story 4 (Product Detail)
4. After US1-4 complete:
   - Developer A: User Story 5 (Wishlist)
   - Developer B: User Story 6 (Cart)
5. After US6 completes:
   - Developer A: User Story 7 (Checkout)
6. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Tests are NOT included (not requested in specification)
- FakeStoreAPI provides ~20 products across 4 categories (sufficient for MVP demo)
- All product discounts are simulated client-side (FakeStoreAPI doesn't provide discount data)
- localStorage handles cart/wishlist persistence (no backend database)
- Payment processing is mocked (no real payment gateway integration)

---

## Summary

- **Total Tasks**: 144
- **Setup**: 10 tasks
- **Foundational**: 26 tasks (CRITICAL - blocks all user stories)
- **User Story 1 (Home Page)**: 34 tasks
- **User Story 2 (Search)**: 8 tasks
- **User Story 3 (Category)**: 12 tasks
- **User Story 4 (Product Detail)**: 5 tasks
- **User Story 5 (Wishlist)**: 3 tasks
- **User Story 6 (Cart)**: 14 tasks
- **User Story 7 (Checkout)**: 14 tasks
- **User Story 8 (Static Pages)**: 6 tasks
- **Polish**: 13 tasks

**MVP Scope Recommendation**: Complete User Stories 1-2 (Home Page + Search) = 52 tasks after Foundational = ~62 total tasks for initial MVP

**Parallel Opportunities**: 89 tasks marked [P] can run in parallel with other [P] tasks in same phase

**Independent Test Criteria**: Each user story phase includes detailed independent test scenario to validate functionality without dependencies on other stories

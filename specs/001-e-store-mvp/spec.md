# Feature Specification: E-Store MVP

**Feature Branch**: `001-e-store-mvp`
**Created**: 2025-12-05
**Status**: Draft
**Input**: User description: "E-commerce store MVP with full shopping flow: browse products, search, category filtering, product details, wishlist, cart management, and checkout"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Products on Home Page (Priority: P1)

Користувач відкриває головну сторінку магазину і бачить промо-банери, категорії та списки товарів.

**Page Structure**:
- Header (shared component): logo, search input, navigation (Home, About, Contact), user icon, wishlist icon with counter, cart icon with counter
- Hero Section: 2 promotional banners (full width, stacked vertically)
- Categories Section: section title (top left), category slider (horizontal scroll with arrow navigation, top right), each category shows icon and name
- Random Products Section: 8 product cards (4 per row, 2 rows) displaying random products
- Mid-page Banner: 1 promotional banner (full width)
- Discounted Products Section: 4 product cards (1 row) showing products with active discounts
- Bottom Banner: 1 promotional banner (full width)
- Footer (shared component): logo, social media links, service links

**Product Card Component** (reusable across site):
- Product image
- Wishlist button (heart icon)
- Product title
- Current price
- Original price (if discount exists, shown with strikethrough)
- "Buy" button

**Why this priority**: Home page is the primary entry point for users and showcases core catalog browsing functionality. It demonstrates the product discovery experience and sets the foundation for all other shopping flows.

**Independent Test**: Can be fully tested by navigating to home page and verifying all sections render with mock product data, banners load, category slider works, and product cards are clickable.

**Acceptance Scenarios**:

1. **Given** user navigates to home page, **When** page loads, **Then** display 2 hero banners, category slider, 8 random product cards, 4 discounted product cards, and 3 promotional banners
2. **Given** user clicks on a category in the slider, **When** click occurs, **Then** navigate to Category page filtered by selected category
3. **Given** user clicks on a product card, **When** click occurs, **Then** navigate to Product Detail page for that product
4. **Given** user clicks "Wishlist" button on product card, **When** click occurs, **Then** add product to wishlist (or remove if already added), update icon state, and increment/decrement wishlist counter in Header
5. **Given** user clicks "Buy" button on product card, **When** click occurs, **Then** add product to cart, increment cart counter in Header, and show success toast notification

---

### User Story 2 - Search Products (Priority: P1)

Користувач вводить текст у search input в Header і бачить результати пошуку в повноекранному overlay.

**Search Overlay Structure**:
- Dark blurred background (full screen overlay)
- Search results list (centered content area)
- Product cards matching search query
- Close button (X icon, top right corner)

**Search Logic**:
- Search by product name (partial match, case-insensitive)
- Search by category name (partial match, case-insensitive)
- Display all products matching either name or category
- Real-time filtering as user types

**Why this priority**: Search functionality is critical for users to quickly find specific products without browsing through categories, significantly improving user experience and conversion rates.

**Independent Test**: Open search overlay by clicking search input, type product name or category, verify matching results appear in real-time, and test navigation to product details.

**Acceptance Scenarios**:

1. **Given** user clicks on search input in Header, **When** click occurs, **Then** open full-screen search overlay with dark blurred background
2. **Given** user types "phone" in search input, **When** typing occurs, **Then** display all products with "phone" in name or in "Electronics" category in real-time
3. **Given** user clicks on a product card in search results, **When** click occurs, **Then** navigate to Product Detail page and close search overlay
4. **Given** search overlay is open, **When** user clicks close button (X) or presses Escape key, **Then** close search overlay and return to previous page state
5. **Given** user types text with no matching products, **When** search completes, **Then** display "No products found" message

---

### User Story 3 - Browse Category with Price Filter (Priority: P1)

Користувач вибирає категорію і переглядає відфільтровані товари з можливістю фільтрації по ціні та пагінацією.

**Page Structure**:
- Breadcrumbs: Home > [Category Name] (active category highlighted)
- Content Section (2 columns):
  - **Left sidebar**: Price filter (slider with min/max values and draggable handles)
  - **Right content**: Product grid (3 cards per row, maximum 3 rows = 9 products per page), pagination controls (bottom)

**Filter Logic**:
- Price slider displays min and max price range for current category
- User drags handles to adjust price range
- Filter applies when slider is released (not real-time during drag)
- Filtered products maintain category constraint
- Pagination resets to page 1 when filter is changed

**Pagination**:
- Display 9 products per page (3x3 grid)
- Pagination controls: Previous button, page numbers, Next button
- Clicking page number loads corresponding products for that page
- Disable Previous on page 1, disable Next on last page

**Why this priority**: Category browsing with filtering is essential e-commerce functionality that allows users to narrow down product selection efficiently and find products within their budget.

**Independent Test**: Navigate to any category page, adjust price filter slider, verify only 9 products display matching price range and category, test pagination navigation between pages.

**Acceptance Scenarios**:

1. **Given** user navigates to Category page, **When** page loads, **Then** display breadcrumbs, price filter sidebar, 9 products in 3x3 grid, and pagination controls
2. **Given** user adjusts price slider to range $50-$200, **When** slider handle is released, **Then** display only products within that price range for current category
3. **Given** category has 15 total products matching filter and user is on page 1, **When** user clicks page 2, **Then** display products 10-15 and update pagination controls
4. **Given** user clicks on product card, **When** click occurs, **Then** navigate to Product Detail page
5. **Given** user clicks "Wishlist" or "Buy" buttons on product cards, **When** click occurs, **Then** perform respective actions (add to wishlist, add to cart)

---

### User Story 4 - View Product Details (Priority: P1)

Користувач переглядає детальну інформацію про товар і може додати його в корзину.

**Page Structure**:
- **Product Section** (2 columns):
  - **Left**: Large product image
  - **Right**: Product title, current price (and original price with strikethrough if discounted), product description, "Add to Cart" button
  - **Additional Info Section** (below product details):
    - Delivery time (e.g., "2-3 days")
    - Availability status (e.g., "In Stock" or "Out of Stock")
    - Warranty duration (e.g., "1 Year Warranty")
- **Related Products Section**: Section title, 4 product cards (1 row, horizontal layout) from same category

**Why this priority**: Product detail page provides essential information users need to make purchase decisions. It's the conversion point where users commit to adding items to cart.

**Independent Test**: Navigate to any product detail page, verify all product information displays correctly (image, title, price, description, delivery info, availability, warranty), verify related products load, test "Add to Cart" functionality.

**Acceptance Scenarios**:

1. **Given** user navigates to Product Detail page, **When** page loads, **Then** display large product image, title, current price (and original price if discounted), description, delivery time, availability status, warranty duration, and 4 related product cards
2. **Given** user clicks "Add to Cart" button, **When** click occurs, **Then** add product to cart, increment cart counter in Header, and show success toast notification
3. **Given** user clicks on a related product card, **When** click occurs, **Then** navigate to that product's detail page
4. **Given** user clicks "Wishlist" button on related product cards, **When** click occurs, **Then** add/remove product from wishlist and update icon state

---

### User Story 5 - Manage Wishlist (Priority: P1)

Користувач переглядає список вибраних товарів і може перейти до їх деталей.

**Page Structure**:
- Page title: "My Wishlist"
- Product cards grid (3 per row, similar layout to Category page)
- No pagination (display all wishlist items)
- Empty state: "Your wishlist is empty" message when no items

**Why this priority**: Wishlist allows users to save products for later consideration, bookmark items they're interested in, and return to make purchase decisions without losing track of products.

**Independent Test**: Add multiple products to wishlist from various pages, navigate to Wishlist page, verify all products display in grid, test removing items, verify empty state message when no items remain.

**Acceptance Scenarios**:

1. **Given** user has 6 products in wishlist, **When** user navigates to Wishlist page, **Then** display 6 product cards in 3-column grid layout
2. **Given** user clicks on a product card, **When** click occurs, **Then** navigate to Product Detail page for that product
3. **Given** user clicks wishlist button (heart icon) on a product card, **When** click occurs, **Then** remove product from wishlist, update display immediately, and decrement wishlist counter in Header
4. **Given** user clicks "Buy" button on product card, **When** click occurs, **Then** add product to cart, increment cart counter, and show success toast
5. **Given** user has empty wishlist, **When** user navigates to Wishlist page, **Then** display "Your wishlist is empty" message with centered layout

---

### User Story 6 - Manage Shopping Cart (Priority: P1)

Користувач переглядає корзину, змінює кількість товарів, застосовує промо-коди та бонусну карту.

**Page Structure** (2 columns):

**Left Column - Cart Items**:
- List of cart items (vertical stack)
- Each item displays:
  - Product image (thumbnail)
  - Product ID
  - Quantity selector: minus button, number input field, plus button
  - Unit price
  - Remove button (X icon)

**Right Column - Order Summary**:
- Promo code section: text input field, "Apply" button, validation message (success/error)
- Bonus card section: text input field, "Apply" button (10% discount), validation message (success/error)
- Subtotal (sum of all item prices × quantities)
- Tax (calculated as percentage of subtotal)
- Shipping cost (flat rate or free based on order value)
- **Total** (bold, large font, final amount)
- "Checkout" button (proceeds to checkout flow)

**Promo Code Logic**:
- Valid promo code (e.g., "SAVE5"): Apply 5% discount to subtotal
- Invalid promo code: Display error message "Invalid promo code"
- Only one promo code can be active at a time
- Discount applies before tax calculation

**Bonus Card Logic**:
- Valid bonus card number: Apply 10% discount to subtotal
- Invalid bonus card: Display error message "Invalid bonus card"
- Can be combined with promo code (discounts stack)
- Discount applies before tax calculation

**Why this priority**: Cart management is the critical pre-purchase step where users review selections, adjust quantities, and apply discounts before committing to checkout.

**Independent Test**: Add multiple products to cart, navigate to Cart page, adjust quantities using +/- buttons and direct input, apply valid and invalid promo codes and bonus cards, verify all calculations update correctly, test item removal.

**Acceptance Scenarios**:

1. **Given** user has 3 items in cart, **When** user navigates to Cart page, **Then** display all items with images, IDs, quantity selectors, unit prices, remove buttons, and Order Summary with subtotal, tax, shipping, and total
2. **Given** user clicks "+" button on quantity selector, **When** click occurs, **Then** increment quantity by 1, update item subtotal, and recalculate order totals
3. **Given** user clicks "-" button on quantity selector with quantity > 1, **When** click occurs, **Then** decrement quantity by 1, update item subtotal, and recalculate order totals
4. **Given** user manually changes quantity input field, **When** input changes, **Then** update item subtotal and recalculate order totals (minimum quantity is 1)
5. **Given** user enters valid promo code "SAVE5" and clicks "Apply", **When** code validation completes, **Then** apply 5% discount to subtotal, display success message, and update total
6. **Given** user enters valid bonus card number and clicks "Apply", **When** card validation completes, **Then** apply 10% discount to subtotal (stacking with promo code if present), display success message, and update total
7. **Given** user enters invalid promo code and clicks "Apply", **When** validation fails, **Then** display "Invalid promo code" error message and do not apply discount
8. **Given** user clicks "Remove" (X) button on cart item, **When** click occurs, **Then** remove item from cart, update display immediately, recalculate all totals, and decrement cart counter in Header
9. **Given** user clicks "Checkout" button, **When** click occurs, **Then** navigate to Checkout Step 1 (Address)

---

### User Story 7 - Complete Checkout Flow (Priority: P1)

Користувач оформлює замовлення у 3 послідовні кроки: Address → Delivery → Payment.

#### **Step 1: Address Entry**

**Page Structure** (single column, centered):
- Step indicator: "1. Address → 2. Delivery → 3. Payment" (current step highlighted)
- Address form fields:
  - Full Name (text input, required)
  - Street Address (text input, required)
  - City (text input, required)
  - Postal Code (text input, required)
  - Country (dropdown or text input, required)
- "Next" button (proceeds to Step 2)
- "Back" button (returns to Cart page)

**Validation**:
- All fields are required
- "Next" button is disabled until all fields are filled
- Display field-level validation errors on blur

**Why this substep**: Collecting delivery address is mandatory for order fulfillment and shipping cost calculation.

**Acceptance Scenarios**:

1. **Given** user is on Checkout Step 1, **When** user fills in all address fields and clicks "Next", **Then** validate all fields and navigate to Step 2 (Delivery)
2. **Given** user is on Checkout Step 1 with empty fields, **When** page loads, **Then** "Next" button is disabled
3. **Given** user is on Checkout Step 1, **When** user clicks "Back", **Then** return to Cart page

---

#### **Step 2: Delivery Selection**

**Page Structure** (single column, centered):
- Step indicator: "1. Address → 2. Delivery → 3. Payment" (current step highlighted)
- Delivery options (radio button group):
  - **Standard Delivery**: Free shipping, 5-7 business days
  - **Express Delivery**: $10 shipping, 1-2 business days
- "Next" button (proceeds to Step 3)
- "Back" button (returns to Step 1)

**Default Selection**:
- Standard Delivery is selected by default

**Why this substep**: Allows users to choose delivery speed based on urgency and budget, directly affecting shipping cost in final total.

**Acceptance Scenarios**:

1. **Given** user is on Checkout Step 2, **When** page loads, **Then** Standard Delivery is selected by default and "Next" button is enabled
2. **Given** user selects a delivery option and clicks "Next", **When** click occurs, **Then** save delivery selection and navigate to Step 3 (Payment)
3. **Given** user is on Checkout Step 2, **When** user clicks "Back", **Then** return to Step 1 (Address) with previously entered address data preserved

---

#### **Step 3: Payment Processing**

**Page Structure** (2 columns):

**Left Column - Order Summary**:
- List of cart products (compact view):
  - Product image (thumbnail)
  - Product name
  - Unit price × quantity
- Delivery address (from Step 1)
- Delivery method (from Step 2)
- Subtotal (sum of all products)
- Tax (calculated percentage)
- Shipping cost (from delivery selection: $0 or $10)
- **Total** (bold, large font, final payment amount)

**Right Column - Payment Form**:
- Payment method selection (radio buttons):
  - Credit Card
  - PayPal
- **If Credit Card selected** (default):
  - Cardholder Name (text input, required)
  - Card Number (text input, 16 digits, required)
  - CVV (text input, 3 digits, required)
  - Expiration Date (text input, MM/YY format, required)
- **If PayPal selected**:
  - "Login with PayPal" button (mock button, no actual PayPal integration)
- "Pay" button (submits payment)
- "Back" button (returns to Step 2)

**Payment Logic** (TEST MODE - no real payment processing):
- Credit Card: Accept any 16-digit card number and 3-digit CVV (no actual validation)
- PayPal: Mock success immediately when "Login with PayPal" is clicked
- On successful "payment":
  1. Show success popup modal with "Thank you for your order!" message
  2. Wait 2 seconds
  3. Close modal and redirect to Home page
  4. Clear shopping cart (remove all items)
  5. Optionally: Clear applied promo codes and bonus cards

**Why this substep**: Final payment step completes the purchase flow, allowing users to submit order and choose payment method.

**Independent Test**: Progress through all 3 checkout steps with test data, select Credit Card payment method, fill in dummy card details, click "Pay", verify success popup appears, cart is cleared, and redirect to Home page occurs.

**Acceptance Scenarios**:

1. **Given** user is on Checkout Step 3, **When** page loads, **Then** display order summary on left (products, address, delivery, totals) and payment form on right with Credit Card selected by default
2. **Given** user selects Credit Card payment method, **When** selection changes, **Then** display card input fields (cardholder name, card number, CVV, expiration date)
3. **Given** user selects PayPal payment method, **When** selection changes, **Then** display "Login with PayPal" button and hide card input fields
4. **Given** user fills in all payment details and clicks "Pay", **When** click occurs, **Then** show "Thank you for your order!" success popup, wait 2 seconds, clear shopping cart, and redirect to Home page
5. **Given** user is on Checkout Step 3, **When** user clicks "Back", **Then** return to Step 2 (Delivery) with previous selections preserved

---

### User Story 8 - View Static Pages (Priority: P1)

Користувач може переглянути статичні сторінки About та Contact через навігацію в Header.

**About Page**:
- Page title: "About Us"
- Company information (text content, can use generic placeholder text about the e-commerce store)
- Simple single-column layout with paragraphs
- Shared Header and Footer components

**Contact Page**:
- Page title: "Contact Us"
- Contact form section:
  - Name (text input, required)
  - Email (email input, required with validation)
  - Message (textarea, required)
  - "Send" button (mock submission, no actual email sending)
- Company contact information section:
  - Email address
  - Phone number
  - Physical address (optional)
- Success message display: "Thank you! We'll get back to you soon." (shown after clicking Send)
- Shared Header and Footer components

**Why this priority**: These pages are linked in Header navigation and complete the site structure, providing users with company information and communication channel.

**Independent Test**: Navigate to About and Contact pages via Header navigation links, verify content displays correctly, test contact form submission and success message display.

**Acceptance Scenarios**:

1. **Given** user clicks "About" link in Header navigation, **When** click occurs, **Then** navigate to About page displaying company information
2. **Given** user clicks "Contact" link in Header navigation, **When** click occurs, **Then** navigate to Contact page displaying contact form and company contact information
3. **Given** user is on Contact page and fills in all form fields, **When** user clicks "Send" button, **Then** display success message "Thank you! We'll get back to you soon." (mock submission, no actual email sent)
4. **Given** user submits contact form with invalid email format, **When** validation runs, **Then** display email validation error message

---

### Edge Cases

- **What happens when user adds product to cart that is already in cart?** System increments quantity of existing cart item instead of creating duplicate entry
- **What happens when user applies multiple promo codes?** System only allows one promo code at a time; applying new code replaces previous code
- **What happens when user refreshes page during checkout flow?** System should preserve checkout progress and data entered in previous steps (address, delivery selection)
- **What happens when product goes out of stock while in cart?** Display availability warning on cart page; prevent checkout until out-of-stock items are removed
- **What happens when user navigates back from Product Detail page?** Return to previous page (home, category, search results, or wishlist) using browser history
- **What happens when search returns no results?** Display "No products found" message in search overlay
- **What happens when category has no products matching price filter?** Display "No products in this price range" message in product grid area
- **What happens when user tries to decrement quantity below 1?** Disable decrement button when quantity is 1; minimum quantity is always 1
- **What happens when wishlist is accessed from multiple devices?** Wishlist is stored locally per device (browser localStorage); no cross-device synchronization without user accounts

## Requirements *(mandatory)*

### Functional Requirements

**Navigation & Routing**:
- **FR-001**: System MUST provide Header component on all pages with logo, search input, navigation links (Home, About, Contact), user icon, wishlist icon with counter, and cart icon with counter
- **FR-002**: System MUST provide Footer component on all pages with logo, social media links, and service links
- **FR-003**: System MUST support client-side routing for all pages (Home, Category, Product Detail, Wishlist, Cart, Checkout Steps 1-3, About, Contact, Search Overlay)

**Product Display & Browsing**:
- **FR-004**: System MUST display home page with 2 hero promotional banners (full width), category slider with navigation arrows, 8 random product cards (4 per row × 2 rows), 1 mid-page banner, 4 discounted product cards (1 row), and 1 bottom banner
- **FR-005**: System MUST provide reusable Product Card component displaying image, wishlist button, title, current price, original price (if discounted with strikethrough), and "Buy" button
- **FR-006**: System MUST display product images, titles, prices, and discount badges on all product cards
- **FR-007**: System MUST support category filtering with breadcrumb navigation showing "Home > [Category Name]"
- **FR-008**: System MUST display 9 products per page in category view (3 cards per row × 3 rows)
- **FR-009**: System MUST provide pagination controls (Previous, page numbers, Next) for category product listings

**Search**:
- **FR-010**: System MUST provide full-screen search overlay with dark blurred background when search input is activated
- **FR-011**: System MUST support real-time search filtering by product name (partial match, case-insensitive)
- **FR-012**: System MUST support real-time search filtering by category name (partial match, case-insensitive)
- **FR-013**: System MUST display all matching products in search overlay as product cards
- **FR-014**: System MUST allow closing search overlay via close button (X icon) or Escape key

**Filtering**:
- **FR-015**: System MUST provide price range filter using slider with draggable min/max handles on category pages
- **FR-016**: System MUST apply price filter when slider is released (not during drag)
- **FR-017**: System MUST reset pagination to page 1 when price filter is changed
- **FR-018**: System MUST display only products within selected price range and selected category

**Product Details**:
- **FR-019**: System MUST display product detail page with large product image, title, current price, original price (if discounted), description, "Add to Cart" button, delivery time, availability status, and warranty duration
- **FR-020**: System MUST display 4 related product cards from same category on product detail page

**Wishlist**:
- **FR-021**: System MUST allow adding products to wishlist via heart icon button on product cards
- **FR-022**: System MUST allow removing products from wishlist via heart icon button on product cards
- **FR-023**: System MUST display wishlist counter in Header showing total number of wishlist items
- **FR-024**: System MUST update wishlist icon state (filled vs outline) based on whether product is in wishlist
- **FR-025**: System MUST display all wishlist items on Wishlist page in 3-column grid layout
- **FR-026**: System MUST display "Your wishlist is empty" message when wishlist has no items
- **FR-027**: System MUST persist wishlist data across browser sessions using local storage

**Shopping Cart**:
- **FR-028**: System MUST allow adding products to cart via "Buy" button on product cards or "Add to Cart" button on product detail page
- **FR-029**: System MUST display cart counter in Header showing total number of items in cart
- **FR-030**: System MUST show success toast notification when product is added to cart
- **FR-031**: System MUST display all cart items on Cart page with thumbnail image, product ID, quantity selector, unit price, and remove button
- **FR-032**: System MUST support quantity adjustment via plus/minus buttons and direct number input (minimum quantity is 1)
- **FR-033**: System MUST support item removal from cart via remove button (X icon)
- **FR-034**: System MUST automatically recalculate subtotal, tax, shipping, and total when cart contents or quantities change
- **FR-035**: System MUST persist cart data across browser sessions using local storage

**Discounts & Promotions**:
- **FR-036**: System MUST provide promo code input field and "Apply" button on Cart page
- **FR-037**: System MUST validate promo codes and apply 5% discount to subtotal for valid codes
- **FR-038**: System MUST display "Invalid promo code" error message for invalid promo codes
- **FR-039**: System MUST allow only one active promo code at a time (new code replaces previous)
- **FR-040**: System MUST provide bonus card input field and "Apply" button on Cart page
- **FR-041**: System MUST validate bonus cards and apply 10% discount to subtotal for valid cards
- **FR-042**: System MUST display "Invalid bonus card" error message for invalid bonus cards
- **FR-043**: System MUST allow stacking of promo code and bonus card discounts (both can be applied simultaneously)
- **FR-044**: System MUST apply discounts before calculating tax

**Checkout Flow**:
- **FR-045**: System MUST provide 3-step checkout flow with step indicator showing current step
- **FR-046**: System MUST collect delivery address in Step 1 with fields: Full Name, Street Address, City, Postal Code, Country (all required)
- **FR-047**: System MUST validate all address fields before allowing navigation to Step 2
- **FR-048**: System MUST provide "Back" button on each checkout step to return to previous step
- **FR-049**: System MUST provide delivery options in Step 2: Standard Delivery (Free, 5-7 days) and Express Delivery ($10, 1-2 days)
- **FR-050**: System MUST default to Standard Delivery selection in Step 2
- **FR-051**: System MUST display order summary in Step 3 showing all cart products, delivery address, delivery method, subtotal, tax, shipping cost, and total
- **FR-052**: System MUST provide payment method selection in Step 3: Credit Card (default) and PayPal
- **FR-053**: System MUST collect credit card details if Credit Card is selected: Cardholder Name, Card Number (16 digits), CVV (3 digits), Expiration Date (MM/YY)
- **FR-054**: System MUST display "Login with PayPal" button if PayPal is selected (mock, no integration)
- **FR-055**: System MUST process payment in test mode (no real payment processing)
- **FR-056**: System MUST display success popup with "Thank you for your order!" message after payment
- **FR-057**: System MUST clear shopping cart after successful payment
- **FR-058**: System MUST redirect to Home page 2 seconds after successful payment
- **FR-059**: System MUST preserve checkout data (address, delivery) when user navigates back between steps

**Static Pages**:
- **FR-060**: System MUST provide About page with company information accessible via Header navigation
- **FR-061**: System MUST provide Contact page with contact form (Name, Email, Message fields) and company contact information accessible via Header navigation
- **FR-062**: System MUST display success message "Thank you! We'll get back to you soon." when contact form is submitted (mock submission)
- **FR-063**: System MUST validate email format in contact form

### Key Entities

- **Product**: Represents a product available for purchase
  - Unique identifier (ID)
  - Title (product name)
  - Description (product details)
  - Current price (selling price as decimal number)
  - Original price (optional, for discounted products, as decimal number)
  - Discount flag (boolean indicating if product has active discount)
  - Image URL (link to product image)
  - Category (product category identifier)
  - Availability status (in stock, out of stock)
  - Delivery time (estimated delivery timeframe as string)
  - Warranty duration (warranty period as string)

- **Category**: Represents a product category for filtering and organization
  - Unique identifier (ID)
  - Category name
  - Icon identifier (for category display)

- **Cart Item**: Represents a product added to shopping cart
  - Product reference (link to Product entity)
  - Quantity (positive integer, minimum 1)
  - Added timestamp (when item was added to cart)

- **Cart**: Represents user's shopping cart
  - List of Cart Items
  - Subtotal (sum of all item prices × quantities)
  - Applied promo code (optional, string)
  - Promo discount amount (optional, decimal)
  - Applied bonus card (optional, string)
  - Bonus discount amount (optional, decimal)
  - Tax amount (calculated as percentage of discounted subtotal)
  - Shipping cost (based on delivery method: $0 or $10)
  - Total (final amount after all calculations)

- **Wishlist**: Represents user's saved products for later
  - List of Product references
  - Count (number of products in wishlist)

- **Delivery Address**: Represents shipping address for order
  - Full name (recipient name)
  - Street address
  - City
  - Postal code
  - Country

- **Delivery Option**: Represents shipping method choice
  - Delivery type (Standard or Express)
  - Cost (decimal: $0 for Standard, $10 for Express)
  - Estimated timeframe (string: "5-7 days" or "1-2 days")

- **Payment Details**: Represents payment information for order
  - Payment method (Credit Card or PayPal)
  - Cardholder name (if Credit Card)
  - Card number (if Credit Card, 16 digits)
  - CVV (if Credit Card, 3 digits)
  - Expiration date (if Credit Card, MM/YY format)

- **Order**: Represents completed purchase (created after successful payment)
  - Unique order identifier
  - List of purchased products with quantities
  - Delivery address
  - Delivery option
  - Payment method
  - Total amount paid
  - Order timestamp

### Assumptions

- **Data Source**: Product catalog, categories, and inventory data will be provided via mock data or API endpoints (implementation detail, not specified in this spec)
- **User Accounts**: No user authentication or registration required for MVP; all data (cart, wishlist) stored locally in browser using localStorage
- **Payment Processing**: All payment transactions are mocked for testing purposes; no real payment gateway integration required
- **Tax Calculation**: Tax is calculated as a fixed percentage of subtotal (specific percentage to be determined during implementation)
- **Promo Code Validation**: Valid promo codes and bonus card numbers will be predefined in the system (e.g., "SAVE5" for promo code)
- **Shipping Cost Logic**: Standard delivery is free, Express delivery costs $10; no additional logic for free shipping thresholds
- **Currency**: All prices displayed in USD ($)
- **Image Hosting**: Product images and banner images are hosted externally; system receives image URLs
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) with localStorage support
- **Responsive Design**: Focus on desktop experience for MVP; mobile responsiveness can be added in future iterations
- **Email Functionality**: Contact form submission is mocked; no actual email sending required for MVP
- **Related Products Logic**: Related products are determined by matching category; no advanced recommendation algorithm
- **Search Performance**: Real-time search operates on client-side filtering of loaded product data; no backend search API required for MVP
- **Data Persistence**: Cart and wishlist data persist in browser localStorage only; no backend database or cross-device synchronization

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can browse home page and view all sections (banners, categories, products) within 2 seconds of page load
- **SC-002**: Users can find and navigate to desired product within 3 clicks from home page (via category or search)
- **SC-003**: Users can complete product search and view results in under 1 second after typing query
- **SC-004**: Users can add product to cart from any page and see cart counter update immediately with success notification
- **SC-005**: Users can adjust cart quantities and see price recalculations update in real-time (under 500ms)
- **SC-006**: Users can apply promo codes and bonus cards with validation feedback appearing within 500ms
- **SC-007**: Users can complete entire checkout flow (all 3 steps) in under 3 minutes with test data
- **SC-008**: Users receive clear success confirmation after completing checkout with automatic redirect to home page
- **SC-009**: 100% of cart and wishlist data persists across browser sessions (page refreshes, closing and reopening browser)
- **SC-010**: Users can filter products by price range and see filtered results within 1 second of releasing slider
- **SC-011**: System handles shopping cart with up to 50 items without performance degradation
- **SC-012**: Users can navigate between all pages (home, category, product detail, cart, checkout, wishlist, static pages) without page reload (smooth SPA experience)
- **SC-013**: All user interactions (button clicks, form submissions, navigation) provide immediate visual feedback (button states, loading indicators, success messages)
- **SC-014**: Contact form submission provides success confirmation message immediately upon clicking Send button

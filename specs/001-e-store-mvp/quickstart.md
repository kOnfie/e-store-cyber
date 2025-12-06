# Quickstart Guide: E-Store MVP

**Feature**: E-Store MVP
**Date**: 2025-12-05
**Target Audience**: Developers setting up local development environment

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18.x or higher ([download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js) or **pnpm** 8.x
- **Git** (for cloning repository)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Code editor (VS Code recommended)

---

## Quick Start (5 minutes)

### 1. Clone Repository

```bash
cd ~/Projects  # or your preferred directory
git clone <repository-url> e-store
cd e-store
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using pnpm (faster):
```bash
pnpm install
```

Expected dependencies:
- next (^14.0.0)
- react (^18.2.0)
- @tanstack/react-query (^5.0.0)
- zustand (^4.4.0)
- axios (^1.6.0)
- sass (^1.69.0)
- typescript (^5.3.0)

### 3. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Server starts at: **http://localhost:3000**

### 4. Open in Browser

Navigate to http://localhost:3000

You should see:
- Home page with banners, categories, and products
- Mock product data auto-generated
- Fully functional shopping experience

---

## Project Structure Overview

```
e-store/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── features/      # Feature modules (FSD)
│   ├── widgets/       # Composite widgets (FSD)
│   ├── shared/        # Shared UI & utilities (FSD)
│   └── styles/        # Global styles
├── public/            # Static assets (images, icons)
├── specs/             # Feature specifications
└── .specify/          # SpecKit configuration
```

---

## Development Workflow

### Making Changes

1. **Components**: Edit files in `src/features/`, `src/widgets/`, or `src/shared/`
2. **Styles**: Edit corresponding `.module.scss` files
3. **Pages**: Edit files in `src/app/`
4. **Mock Data**: Edit `src/shared/api/mock/products.ts` and `categories.ts`

Hot reload is enabled - changes appear immediately in browser.

### Adding Products

Edit `src/shared/api/mock/products.ts`:

```typescript
export const mockProducts: Product[] = [
  {
    id: '101',
    title: 'New Product',
    description: 'Product description...',
    price: 299,
    originalPrice: 399, // Optional, for discounts
    discount: true,
    imageUrl: '/images/products/new-product.jpg',
    category: 'electronics',
    availability: 'in-stock',
    deliveryTime: '2-3 days',
    warranty: '1 Year Warranty'
  },
  // ... existing products
];
```

### Adding Categories

Edit `src/shared/api/mock/categories.ts`:

```typescript
export const mockCategories: Category[] = [
  {
    id: 'new-category',
    name: 'New Category',
    iconUrl: '/images/categories/new-category.svg'
  },
  // ... existing categories
];
```

---

## Testing Features

### Cart & Wishlist Persistence

1. Add products to cart/wishlist
2. Refresh page → data persists (localStorage)
3. Close browser → reopen → data still there

### Search

1. Click search input in header
2. Type product name or category (e.g., "phone")
3. See real-time filtered results
4. Press Escape or click X to close

### Price Filtering

1. Navigate to category page (click category in slider)
2. Use price slider in left sidebar
3. Release slider → products filter by price range
4. Pagination resets to page 1

### Promo Codes

Valid test codes:
- `SAVE5` → 5% discount
- `WELCOME10` → 10% discount
- `SUMMER20` → 20% discount

### Bonus Cards

Valid test cards:
- `1234567890`
- `0987654321`
- `1111222233`

Try invalid codes to see error validation.

### Checkout Flow

1. Add products to cart
2. Navigate to cart page
3. Apply promo code and/or bonus card
4. Click "Checkout"
5. Fill address form → Next
6. Select delivery option → Next
7. Fill payment details (any 16-digit card number) → Pay
8. See success modal → auto-redirect to home
9. Cart is cleared

---

## Development Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format  # if Prettier script configured
```

---

## Browser DevTools Tips

### Inspect localStorage
```javascript
// In browser console
localStorage.getItem('e-store-cart')
localStorage.getItem('e-store-wishlist')

// Clear cart/wishlist
localStorage.removeItem('e-store-cart')
localStorage.removeItem('e-store-wishlist')
// Then refresh page
```

### Inspect TanStack Query Cache
Install React DevTools and TanStack Query DevTools extensions for Chrome/Firefox.

Query DevTools show:
- Cached product data
- Query status (loading, success, error)
- Stale time and cache invalidation

---

## Common Issues & Solutions

### Port 3000 Already in Use

```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# If errors persist, restart TypeScript server in VS Code:
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Styles Not Applying

- Ensure file has `.module.scss` extension
- Import as: `import styles from './Component.module.scss'`
- Use as: `className={styles.className}`
- Check for typos in class names

---

## VS Code Setup (Recommended)

### Extensions

Install these VS Code extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- SCSS Intellisense
- Path Intellisense

### Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Next Steps

1. ✅ Development environment setup complete
2. 📋 Review [spec.md](spec.md) for full feature requirements
3. 🏗️ Review [plan.md](plan.md) for implementation architecture
4. 📊 Review [data-model.md](data-model.md) for entity definitions
5. 🔌 Review [contracts/](contracts/) for API interfaces
6. ⏭️ Ready to run `/speckit.tasks` to generate task breakdown
7. 🚀 Start implementation with `/speckit.implement`

---

## Getting Help

- **Spec Questions**: Review `specs/001-e-store-mvp/spec.md`
- **Architecture Questions**: Review `specs/001-e-store-mvp/plan.md`
- **Constitution Rules**: Review `.specify/memory/constitution.md`
- **Git Issues**: Check current branch with `git branch`
- **Dependency Issues**: Delete `node_modules` and reinstall

---

## Production Deployment

When ready to deploy:

1. **Build**:
   ```bash
   npm run build
   ```

2. **Test production build locally**:
   ```bash
   npm start
   ```

3. **Deploy to hosting**:
   - **Vercel** (recommended for Next.js): Connect GitHub repo
   - **Netlify**: Configure build command: `npm run build`
   - **Docker**: Use Next.js standalone output

4. **Environment Variables**:
   - No external APIs required for MVP
   - All configuration in `shared/lib/constants/config.ts`

---

## Summary

You now have a fully functional local development environment for E-Store MVP. All features work with mock data, localStorage persistence, and realistic async behavior. Ready for implementation!

**Happy coding! 🚀**

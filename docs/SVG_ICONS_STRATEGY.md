# SVG Icons Strategy

## Поточний підхід

Використовуємо **статичні SVG файли** у `/public/icons/` з компонентом-обгорткою `Icon`.

### Переваги

- ✅ Простота використання
- ✅ Легко додавати нові іконки з Figma
- ✅ `currentColor` для динамічного кольору
- ✅ Чистий JSX код без inline SVG

### Структура

```
public/icons/
  ├── search.svg
  ├── user.svg
  ├── heart.svg
  ├── heart-filled.svg
  └── cart.svg

src/shared/ui/atoms/Icon/
  ├── Icon.tsx          // Компонент
  ├── Icon.module.scss  // Стилі
  └── index.ts          // Export
```

### Використання

```tsx
import { Icon } from '@/shared/ui/atoms/Icon';

<Icon name="search" width={20} height={20} />
<Icon name="cart" width={32} height={32} />
```

---

## Оптимізація для Production (Майбутнє)

Для великих проектів з багатьма іконками рекомендую **SVGR** — конвертує SVG у React компоненти.

### Чому SVGR кращий для великих проектів?

1. **Tree-shaking** — webpack включає лише використані іконки
2. **Inline SVG** — не потребує окремих HTTP запитів
3. **TypeScript підтримка** — автокомпліт для імен іконок
4. **Customization** — props для `fill`, `stroke`, `className`

### Налаштування SVGR

#### 1. Встановлення

```bash
npm install --save-dev @svgr/webpack
```

#### 2. Налаштування Next.js (`next.config.js`)

```js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
```

#### 3. TypeScript types (`svg.d.ts`)

```ts
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
```

#### 4. Використання

```tsx
import SearchIcon from '@/public/icons/search.svg';
import CartIcon from '@/public/icons/cart.svg';

<SearchIcon width={20} height={20} className={styles.icon} />
<CartIcon width={32} height={32} fill="currentColor" />
```

### Порівняння підходів

| Критерій      | Статичні SVG (зараз)         | SVGR (майбутнє)          |
| ------------- | ---------------------------- | ------------------------ |
| Простота      | ✅ Дуже просто               | ⚠️ Потребує налаштування |
| Bundle size   | ⚠️ Усі іконки завантажуються | ✅ Tree-shaking          |
| HTTP запити   | ⚠️ Окремі запити для кожної  | ✅ Inline в JS           |
| TypeScript    | ⚠️ String literal            | ✅ Повна типізація       |
| Customization | ⚠️ Обмежена                  | ✅ Повна через props     |
| AI-First      | ✅ Легко генерувати          | ✅ Легко генерувати      |

---

## Рекомендації

### Для MVP (зараз)

Залишаємо статичні SVG — швидко, просто, працює.

### Для Production (>50 іконок)

Перейти на SVGR:

1. Налаштувати SVGR у `next.config.js`
2. Додати TypeScript types
3. Рефакторити `Icon` компонент для використання SVGR
4. Створити barrel export (`icons/index.ts`) для всіх іконок

### AI-First Workflow

При роботі з Copilot:

1. Експорт SVG з Figma → `/public/icons/`
2. Додати ім'я іконки у `IconName` type
3. Copilot автоматично підключає іконку через `<Icon name="..." />`

Для SVGR:

1. Експорт SVG з Figma → `/icons/`
2. Copilot автоматично генерує `import Icon from '@/icons/name.svg'`

---

## Міграція на SVGR (коли потрібно)

```bash
# 1. Встановити SVGR
npm install --save-dev @svgr/webpack

# 2. Оновити next.config.js (див. вище)

# 3. Перемістити іконки
mv public/icons/* src/shared/ui/icons/

# 4. Рефакторити компоненти (автоматично через Copilot)
# Before: <Icon name="search" />
# After:  <SearchIcon width={20} height={20} />
```

---

## Висновок

**Зараз**: Статичні SVG — оптимальний вибір для MVP.  
**Майбутнє**: SVGR — коли іконок стане >50 і потрібна оптимізація бандлу.

Обидва підходи AI-First friendly і легко підтримуються через Copilot.

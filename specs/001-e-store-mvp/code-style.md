# Code Style Conventions

**Single Source of Truth для всього проєкту**

---

## React/TypeScript Style

### 1. Імпорти

**Порядок імпортів** (автоматично через Prettier + `@trivago/prettier-plugin-sort-imports`):

```tsx
// 1. React хуки
import { ReactNode, useEffect, useState } from 'react';

import Image from 'next/image';
// 2. Next.js
import Link from 'next/link';

// 3. Third-party бібліотеки
import axios from 'axios';

// 4. FSD Layers (@/shared -> @/features -> @/widgets -> @/app)
import { Container } from '@/shared/ui/atoms/Container';
import { Icon } from '@/shared/ui/atoms/Icon';

// 5. Локальні файли
import { useHeaderCounters } from '../model/useHeaderCounters';

// 6. Стилі (завжди останні)
import styles from './Component.module.scss';
```

**Правила**:

- ❌ НЕ використовуй `import React from 'react'` (не потрібно у Next.js)
- ✅ Імпортуй тільки потрібні сутності: `import { useState, ReactNode } from 'react'`
- ✅ Використовуй `ReactNode` замість `React.ReactNode`

---

### 2. Компоненти

**❌ НЕ використовуй React.FC або FC<Props>**:

```tsx
// ❌ Погано
import React from 'react';
export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

// ✅ Добре
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
```

**Синтаксис props у сигнатурі функції**:

```tsx
// ✅ Правильно - props деструктуруються прямо у параметрах
export const Component = ({ title, count }: ComponentProps) => {
  ...
};

// ❌ Неправильно
export const Component = (props: ComponentProps) => {
  const { title, count } = props;
  ...
};
```

---

### 3. TypeScript Типізація

**Уникаємо надлишкової типізації enum-подібних значень**:

```tsx
// ❌ Надлишкова типізація (якщо можна перевірити runtime)
export type IconName = 'search' | 'user' | 'cart' | 'heart';
interface IconProps {
  name: IconName;
}

// ✅ Проста типізація + runtime перевірка
interface IconProps {
  name?: string;
  width?: number;
  height?: number;
}

export const Icon = ({ name, width, height }: IconProps) => {
  if (!name) return null; // Early return для валідації

  return <img src={`/icons/${name}.svg`} alt={name} width={width} height={height} />;
};
```

**Коли все ж використовувати union types**:

- Коли є фіксований набір значень з різною логікою (variants, states)
- Коли потрібен автокомпліт у IDE

```tsx
// ✅ Тут union type доречний
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button = ({ variant = 'primary' }: ButtonProps) => {
  const className = styles[`button-${variant}`];
  ...
};
```

---

### 4. Early Return Pattern

Використовуй early return для валідації та спрощення логіки:

```tsx
// ✅ Добре - early return
export const Component = ({ data }: { data?: DataType }) => {
  if (!data) return null;
  if (data.isEmpty) return <EmptyState />;

  return <Content data={data} />;
};

// ❌ Погано - вкладені умови
export const Component = ({ data }: { data?: DataType }) => {
  return (
    <>
      {data && (
        <>
          {!data.isEmpty && <Content data={data} />}
          {data.isEmpty && <EmptyState />}
        </>
      )}
    </>
  );
};
```

---

## SVG Icons Strategy

### Поточний підхід (MVP)

**Статичні SVG файли** у `/public/icons/` + компонент `Icon`:

```tsx
// public/icons/search.svg
<svg width="20" height="20">...</svg>

// Використання
import { Icon } from '@/shared/ui/atoms/Icon';

<Icon name="search" width={20} height={20} />
<Icon name="cart" width={32} height={32} />
```

**Переваги**:

- ✅ Простота — легко додавати нові іконки
- ✅ `currentColor` для динамічного кольору
- ✅ Чистий JSX без inline SVG
- ✅ AI-First friendly

**Компонент Icon**:

```tsx
interface IconProps {
  name?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ name, width, height, className }: IconProps) => {
  if (!name) return null;

  return (
    <span className={`${styles.icon} ${className || ''}`}>
      <img src={`/icons/${name}.svg`} alt={name} width={width} height={height} />
    </span>
  );
};
```

---

### Майбутня оптимізація (Production, >50 іконок)

**SVGR** — конвертує SVG у React компоненти:

```tsx
import SearchIcon from '@/icons/search.svg';
import CartIcon from '@/icons/cart.svg';

<SearchIcon width={20} height={20} className={styles.icon} />
<CartIcon width={32} height={32} fill="currentColor" />
```

**Переваги SVGR**:

- ✅ Tree-shaking — webpack включає лише використані іконки
- ✅ Inline SVG — без HTTP запитів
- ✅ TypeScript підтримка
- ✅ Повна customization через props

**Коли переходити на SVGR**:

- Іконок стане >50
- Потрібна оптимізація bundle size
- Потрібна повна типізація всіх іконок

---

## File Naming

### Компоненти

- **PascalCase** для файлів: `Button.tsx`, `Header.tsx`, `ProductCard.tsx`
- **PascalCase** для експортів: `export const Button = ...`

### Стилі

- **ComponentName.module.scss** для SCSS модулів
- **camelCase** для CSS класів: `.buttonPrimary`, `.headerContent`

### Утиліти/хуки

- **camelCase** для файлів: `useHeaderCounters.ts`, `formatters.ts`
- **camelCase** для експортів: `export const formatPrice = ...`

---

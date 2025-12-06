# Prettier Configuration

## Import Order

Prettier автоматично сортує імпорти у наступному порядку:

1. **React** — `import React from 'react'`
2. **Next.js** — `import { ... } from 'next/...'`
3. **Third-party бібліотеки** — npm packages (axios, zustand, etc.)
4. **FSD Layers** (за порядком):
   - `@/shared/...` — спільні утиліти, UI компоненти, типи
   - `@/features/...` — бізнес-фічі
   - `@/widgets/...` — складні UI блоки
   - `@/app/...` — сторінки та routing
5. **Локальні файли** — `./`, `../`
6. **Стилі** — `.css`, `.scss` файли (завжди останні)

## Приклад відформатованого файлу

```tsx
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useState } from 'react';

import { Container } from '@/shared/ui/atoms/Container';

import { useHeaderCounters } from '../model/useHeaderCounters';

import styles from './Header.module.scss';
```

## Налаштування

- **importOrderSeparation: true** — додає порожні рядки між групами
- **importOrderSortSpecifiers: true** — сортує named imports алфавітно

## Використання

### Автоформатування одного файлу

```bash
npx prettier --write src/path/to/file.tsx
```

### Автоформатування всього проєкту

```bash
npx prettier --write "src/**/*.{ts,tsx,js,jsx,scss,css,json}"
```

### Перевірка без зміни файлів

```bash
npx prettier --check "src/**/*.{ts,tsx,js,jsx}"
```

## Інтеграція з VS Code

Додай у `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## AI-First Workflow

Після генерації компонента через Copilot:

1. Copilot генерує код з довільним порядком імпортів
2. Prettier автоматично сортує їх при збереженні (якщо `formatOnSave: true`)
3. Або запусти `npx prettier --write <file>` вручну

Це економить час — не треба вручну переставляти імпорти.

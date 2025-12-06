# Git Commit Convention

Цей проект використовує **Conventional Commits** для стандартизації історії комітів.

## Формат коміту

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (Тип)

- **feat**: нова функціональність
- **fix**: виправлення помилки
- **docs**: зміни в документації
- **style**: форматування коду (без зміни логіки)
- **refactor**: рефакторинг коду (без нових фіч і фіксів)
- **perf**: покращення продуктивності
- **test**: додавання або виправлення тестів
- **build**: зміни в системі збірки або залежностях
- **ci**: зміни в CI/CD конфігурації
- **chore**: інші зміни (оновлення dev залежностей, тощо)
- **revert**: відкат попереднього коміту

### Scope (Область)

Опціональний, вказує на модуль або компонент:

- `header`, `footer`, `cart`, `product-card`
- `api`, `auth`, `ui`
- `deps`, `config`

### Subject (Тема)

Коротка тема коміту (50 символів max):

- Імперативний наказовий спосіб ("add", не "added")
- Маленька перша літера
- Без крапки в кінці

### Body (Тіло)

Опціональне, детальний опис:

- Пояснює "що" і "чому", а не "як"
- Розділяється порожнім рядком від subject

### Footer (Футер)

Опціональний, для:

- Breaking changes: `BREAKING CHANGE: опис`
- Посилання на issues: `Closes #123`

## Приклади

### Проста фіча

```
feat(header): add search functionality
```

### З body

```
feat(product-card): implement wishlist toggle

- Add heart icon with filled/unfilled states
- Connect to wishlist store
- Add hover animations
```

### Breaking change

```
refactor(api): change product API response structure

BREAKING CHANGE: Product.price is now an object with `current` and `original` fields instead of a number.
```

### Фікс з issue

```
fix(cart): prevent negative quantity values

Closes #42
```

### Множинні зміни

```
feat(checkout): implement 3-step checkout flow

- Add address form with validation
- Add delivery options selector
- Add payment method selection
- Integrate with order API

Closes #15
```

## Рекомендації

1. **Один коміт = одна логічна зміна**
2. **Коміть часто** (кожна завершена фіча/фікс)
3. **Пиши зрозумілі subject** (читай коміти як changelog)
4. **Використовуй scope** для великих проектів
5. **Додавай body** для складних змін

## Інтеграція з AI-First

При роботі з Copilot/Claude:

- Коміт після кожної завершеної генерації компонента
- Scope = FSD layer або feature name
- Body = список згенерованих файлів + ключові зміни

Приклад:

```
feat(atoms): generate Button component via Copilot

- Create Button.tsx with variants (primary, secondary, outline)
- Add Button.module.scss with Figma tokens
- Add hover/active states

Generated with GitHub Copilot based on Figma MSP spec
```

## Автоматизація

Для автоперевірки можна встановити **commitlint**:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

Додати husky hook для перевірки перед комітом.

# MCP Figma Server - Testing Checklist

## Статус конфігурації

- ✅ `.github/copilot/mcp.json` створено
- ✅ `FIGMA_PERSONAL_ACCESS_TOKEN` додано в `.env.local`
- ✅ `.env.local` додано в `.gitignore`

## Тестування підключення

### 1. Перезапуск VS Code

**ВАЖЛИВО:** MCP сервери завантажуються тільки при старті VS Code.

1. Повністю закрити VS Code (⌘Q на macOS)
2. Відкрити VS Code знову
3. Відкрити проект e-store

### 2. Перевірка доступності MCP Figma Server

#### Варіант 1: Через Copilot Chat

1. Відкрити Copilot Chat (⌘⇧I)
2. Ввести `@` та перевірити наявність `@figma` у списку
3. Спробувати команду:
   ```
   @figma get Figma file information
   ```

#### Варіант 2: Тестові запити

Спробуйте ці запити в Copilot Chat:

```
@figma show me the design system colors from our Figma file
```

```
@figma get component styles for the header
```

```
@figma export banner images
```

### 3. Очікувані результати

- MCP server повинен повернути інформацію з Figma
- Можливість запитувати дизайн-токени (кольори, відступи, шрифти)
- Можливість отримувати інформацію про компоненти
- Можливість експортувати зображення/іконки

### 4. Troubleshooting

#### Якщо `@figma` не з'являється:

1. Перевірити логи VS Code:
   - Help → Toggle Developer Tools → Console
   - Шукати помилки пов'язані з MCP

2. Перевірити, що `npx` працює:

   ```bash
   npx -y @modelcontextprotocol/server-figma --help
   ```

3. Перевірити формат токена в `.env.local`:
   ```bash
   echo $FIGMA_PERSONAL_ACCESS_TOKEN
   ```

#### Якщо є помилки доступу до Figma:

1. Перевірити валідність токена в Figma Settings
2. Переконатися, що токен має права на читання файлів
3. Перевірити, що ви додали правильний file ID у запитах

## Наступні кроки після успішного підключення

1. **Отримати дизайн-токени:**

   ```
   @figma get design tokens (colors, typography, spacing) from e-store file
   ```

2. **Створити/оновити SCSS змінні:**
   - Автоматично згенерувати `styles/variables.scss` на основі Figma токенів
   - Синхронізувати кольори, відступи, шрифти

3. **Експортувати assets:**
   - Банери для HeroBanner (PNG/WebP)
   - Іконки (SVG)
   - Зображення продуктів та категорій

4. **Валідація компонентів:**
   - Порівняти стилі Header з Figma
   - Перевірити відповідність HeroBanner дизайну
   - Синхронізувати розміри, відступи, кольори

## Корисні посилання

- [MCP Figma Server Documentation](https://github.com/modelcontextprotocol/servers/tree/main/src/figma)
- [Figma Personal Access Tokens](https://www.figma.com/developers/api#access-tokens)
- Project spec: `specs/001-e-store-mvp/mcp-figma-setup.md`

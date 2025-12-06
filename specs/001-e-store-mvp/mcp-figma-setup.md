# MCP Figma Server Setup

## Що таке MCP?

**Model Context Protocol (MCP)** — протокол для підключення AI-асистентів до зовнішніх джерел даних (Figma, GitHub, databases, тощо).

## Налаштування для GitHub Copilot

### 1. Конфігурація

Файл: `.github/copilot/mcp.json`

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "${FIGMA_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

### 2. Отримання Figma Personal Access Token

1. Відкрий Figma → Settings (іконка профілю)
2. Перейди у вкладку **Account**
3. Scroll вниз до **Personal Access Tokens**
4. Натисни **Generate new token**
5. Назва: `MCP Copilot` (або будь-яка)
6. Скопіюй токен (він показується лише один раз!)

### 3. Додавання токена у проєкт

Додай у `.env.local`:

```bash
FIGMA_PERSONAL_ACCESS_TOKEN=your_figma_token_here
```

⚠️ **ВАЖЛИВО**: `.env.local` у `.gitignore`, токен НЕ потрапить у git!

### 4. Перезапуск VS Code

Після налаштування:

1. Закрий VS Code
2. Відкрий знову
3. MCP server має автоматично підключитися

### 5. Перевірка роботи

У GitHub Copilot Chat напиши:

```
@workspace Отримай інформацію про Figma frame з node-id=91-643
```

Якщо MCP працює — Copilot отримає дані з Figma API.

---

## Використання у проєкті

### Отримання дизайн-токенів

```
Отримай колір primary button з Figma frame 91-647
```

Copilot поверне:

- Hex код кольору
- Розміри елементів
- Шрифти та їх параметри

### Експорт зображень

```
Експортуй зображення з Figma node-id=91-826 як PNG
```

### Отримання CSS стилів

```
Конвертуй стилі з Figma frame 91-643 у SCSS
```

---

## Альтернативи (якщо MCP не працює)

### 1. Figma Dev Mode (Manual)

1. Відкрий Figma
2. Увімкни **Dev Mode** (праворуч вгорі)
3. Вибери елемент
4. Скопіюй CSS/розміри вручну

### 2. Figma REST API (Manual)

```bash
# Отримати інформацію про файл
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY"

# Експортувати зображення
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/images/FILE_KEY?ids=NODE_ID&format=png&scale=2"
```

### 3. Figma Plugins

- **Batch Export** — масовий експорт зображень
- **Design Tokens** — експорт токенів у JSON

---

## Troubleshooting

### MCP server не підключається

1. Перевір, чи є токен у `.env.local`
2. Перевір, чи правильний формат `.github/copilot/mcp.json`
3. Перезапусти VS Code
4. Перевір логи: VS Code → View → Output → GitHub Copilot

### Токен не працює

1. Перевір термін дії токена у Figma Settings
2. Згенеруй новий токен
3. Онови `.env.local`

### Copilot не бачить Figma

1. Переконайся, що файл Figma публічний або ти маєш доступ
2. Перевір File Key у URL: `figma.com/design/FILE_KEY/...`
3. Використай правильний node-id з Figma

---

## AI-First Workflow з Figma

### Крок 1: Отримай дизайн-токени

```
@workspace Отримай всі кольори, шрифти та розміри з Figma Design System
```

### Крок 2: Генеруй компоненти

```
@workspace Створи React компонент Button згідно Figma frame 123-456
```

### Крок 3: Експортуй ассети

```
@workspace Експортуй всі іконки з Figma як SVG у /public/icons/
```

### Крок 4: Синхронізація

При зміні дизайну у Figma:

```
@workspace Оновити стилі Header компонента згідно нового Figma дизайну
```

---

## Статус у проєкті

- ✅ Конфігурація створена: `.github/copilot/mcp.json`
- ✅ Токен доданий у `.env.local`
- ⏳ Потрібен перезапуск VS Code для активації
- ⏳ Потрібна перевірка підключення

**Наступний крок**: Перезапусти VS Code і перевір роботу MCP у Copilot Chat.


# ARC Raiders Stats Calculator

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-7C4DFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)

[Live: raiders-stats.com](https://raiders-stats.com/)

</div>

## О проекте

Простой веб-калькулятор для игроков в ARC Raiders (Embark Studios). Вводите свои игровые статистики — получайте расчёты K/D, damage dealt/taken к роботам и игрокам, players downed/knocked out, time on surface и нормализованные метрики (на час игры или на типичный рейд 20/25/30 минут).

Полезно, потому что в игре нет встроенного K/D и детального трекинга — здесь можно быстро посчитать и сравнить прогресс.

- Поддержка языков: русский, английский, украинский
- Реал-тайм расчёты
- Чистый интерфейс на shadcn/ui

## Технологии

- React 18 + TypeScript
- Vite для сборки
- Tailwind CSS + shadcn/ui (Radix UI компоненты)
- React Router для роутинга
- Lucide иконки
- Дополнительно: TanStack Query, Recharts, Zod + React Hook Form

## Как запустить локально

### Требования
- Node.js (18+ рекомендуется)

### Установка

1. Клонируйте репозиторий
   ```bash
   git clone https://github.com/DeftSolutions-dev/ARC-Raiders-Stats.git
   cd ARC-Raiders-Stats
   ```

2. Установите зависимости
   ```bash
   npm install
   # или yarn / bun
   ```

3. Запустите dev-сервер
   ```bash
   npm run dev
   ```

Откроется на http://localhost:8080 (или другой порт).

### Сборка для продакшена
```bash
npm run build
```

Файлы в dist/. Предпросмотр:
```bash
npm run preview
```

## Структура проекта

```
src/
├── components/     # UI-компоненты (формы, таблицы, карты метрик)
├── hooks/          # Кастомные хуки
├── lib/            # Утилиты (логика расчётов)
├── pages/          # Страницы
└── ...             # Стили, роутинг и т.д.
```

## Live-сайт
https://raiders-stats.com/

## Лицензия
MIT

Проект от [DeftSolutions-dev](https://github.com/DeftSolutions-dev) - для коммьюнити ARC Raiders. Если есть идеи по улучшениям (добавить шаринг, графики или интеграции) - пишите в issues.

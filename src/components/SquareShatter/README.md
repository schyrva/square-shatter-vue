# SquareShatter Component

Компонент для отображения анимации "Square Shatter" с возможностью переключения между Canvas и SVG рендерингом.

## Использование

```vue
<script setup>
import SquareShatter from "@/components/SquareShatter";
</script>

<template>
  <div class="container">
    <SquareShatter />
  </div>
</template>
```

## Структура компонента

- `index.vue` - Точка входа для компонента
- `SquareShatter.vue` - Основная реализация компонента
- `README.md` - Документация

## Особенности

- Адаптивный дизайн, автоматически подстраивается под размер контейнера
- Переключение между Canvas и SVG рендерингом
- Анимация "взрыва" квадрата с настраиваемыми параметрами
- Оптимизирован для производительности

## Зависимости

- Использует composable `useRenderMode` для управления переключением режимов
- Использует UI компонент `Toggle` для переключателя
- Импортирует типы из `../types/types`
- Использует константы из `../constants/config`

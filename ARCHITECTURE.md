# Square Shatter Vue - Architecture Guide

This document outlines the architecture and coding standards for the Square Shatter Vue project.

## 1. Application Architecture

### Core Technologies

- **Vue 3 Composition API** - For component logic
- **TypeScript** - For type safety
- **Pinia** - For state management
- **Vue Router** - For navigation
- **Quasar** - For UI components

### Architecture Overview

```
  +----------------+
  |                |
  |      App       |
  |                |
  +-------+--------+
          |
  +-------v--------+      +-----------------+
  |                |      |                 |
  |    Router      +----->+     Views       |
  |                |      |                 |
  +-------+--------+      +---------+-------+
          |                         |
          |                         |
  +-------v--------+       +--------v-------+
  |                |       |                |
  |     Stores     <-------+   Components   |
  |                |       |                |
  +-------+--------+       +----------------+
          |
  +-------v--------+
  |                |
  |  Composables/  |
  |   Utilities    |
  |                |
  +----------------+
```

## 2. Directory Structure Guidelines

### Components

- Place in `src/components/`
- Organize by feature or function
- Use subdirectories for related components
- Component names should be PascalCase and descriptive

### Views

- Place in `src/views/`
- Name with the suffix `View` (e.g., `CatalogView.vue`)
- Each view should correspond to a route

### Stores

- Place in `src/stores/`
- Name with the suffix `Store` (e.g., `CartStore.ts`)
- Use Pinia setup syntax for better TypeScript support

### Composables

- Place in `src/composables/`
- Name with the prefix `use` (e.g., `useRenderMode.ts`)
- Focus on reusable logic that can be shared across components

### Types

- Place in `src/types/`
- Export interfaces and types for reuse across the application

### Utils

- Place in `src/utils/`
- Organize by function (e.g., geometry, canvas, svg)
- Write pure functions when possible

### Styles

- Global styles in `src/styles/`
- Component-specific styles should be scoped

## 3. Coding Standards

### Vue Component Structure

```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue';

// Props definition
const props = defineProps<{
  propName: PropType;
}>();

// Emits definition
const emit = defineEmits<{
  (e: 'event-name', param: ParamType): void;
}>();

// Component logic
const localState = ref(initialValue);

// Computed properties
const computedValue = computed(() => {
  // logic
});

// Methods
function handleAction() {
  // logic
}
</script>

<template>
  <div class="component-name">
    <!-- Component template -->
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
```

### TypeScript Best Practices

- Use explicit type annotations for function parameters and return values
- Create interfaces for complex objects
- Use type guards for runtime type checking when necessary
- Avoid `any` type when possible

### State Management Principles

- Use stores for shared state between components
- Keep component state local when not shared
- Use composables for reusable stateful logic
- Consider where state should live (component, composable, or store)

### CSS/Styling Guidelines

- Use CSS variables for theming and consistent values
- Prefer scoped styles for components
- Use meaningful class names following a consistent naming convention
- Consider using utility classes for common styling patterns

## 4. Performance Considerations

- Lazy load routes for better initial load time
- Use `v-once` for static content
- Consider component chunking for large components
- Use `watchEffect` instead of `watch` when appropriate
- Optimize expensive calculations with `computed` and memoization

## 5. Testing Strategy

- Unit test components with Vue Test Utils
- Test stores and utils with Jest
- Consider E2E testing with Cypress for critical user flows
- Aim for high coverage of business logic

## 6. Deployment and Build Process

- Use environment variables for configuration
- Optimize assets during build
- Consider using CDN for static assets
- Implement CI/CD pipeline for automated testing and deployment

## 7. Versioning and Documentation

- Follow semantic versioning for releases
- Document component APIs with JSDoc comments
- Keep this architecture document updated as the project evolves
- Create and maintain a changelog

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SquareShatter from "../components/SquareShatter/index.vue";
import Toggle from "../components/ui/Toggle.vue";
import useRenderMode from "../composables/useRenderMode";

// Використовуємо composable для керування режимом рендерингу на рівні батьківського компонента
const { useSvg, toggleLabel } = useRenderMode();
</script>

<template>
  <div class="animation-view">
    <div class="animation-header">
      <h1 class="animation-title">Square Shatter Animation</h1>
      <div class="render-mode-toggle">
        <span class="toggle-description">Render mode:</span>
        <Toggle v-model="useSvg" :label="toggleLabel" />
      </div>
    </div>
    <div class="animation-container">
      <SquareShatter :use-svg="useSvg" />
    </div>
  </div>
</template>

<style scoped>
.animation-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.animation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  border-radius: var(--radius-md);
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.animation-title {
  font-size: var(--font-size-lg);
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.render-mode-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.3rem 0.6rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-md);
}

.toggle-description {
  font-size: var(--font-size-xs);
  color: var(--color-text);
  font-weight: 500;
  white-space: nowrap;
}

.animation-container {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
}

/* Адаптивні стилі */
@media (max-width: 768px) {
  .animation-header {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .animation-title {
    font-size: clamp(1.3rem, 4vw, 2rem);
  }
}

@media (max-width: 480px) {
  .toggle-description {
    display: none; /* Ховаємо опис на малих екранах */
  }
}
</style>

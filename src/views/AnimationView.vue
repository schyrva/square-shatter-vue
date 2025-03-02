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
    <div class="background-decoration"></div>

    <div class="content-wrapper">
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

      <div class="animation-info">
        <div class="info-card">
          <h2>About This Animation</h2>
          <p>
            This animation demonstrates the Square Shatter effect - a dynamic
            visualization where a square is split into random fragments that
            scale in and out from their centroid.
          </p>
          <p>
            You can toggle between Canvas and SVG rendering modes to compare
            performance and visual differences between these two web rendering
            technologies.
          </p>
        </div>

        <div class="info-card tech-specs">
          <h2>Technical Details</h2>
          <ul>
            <li>
              <strong>Canvas:</strong> Pixel-based rendering, better for complex
              animations
            </li>
            <li>
              <strong>SVG:</strong> Vector-based rendering, scales perfectly but
              can be slower with many elements
            </li>
            <li>
              <strong>Fragments:</strong> Each piece has its own color and moves
              independently
            </li>
            <li>
              <strong>Algorithm:</strong> Uses geometric subdivision with random
              lines
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animation-view {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 1000px;
  margin-bottom: 2rem;
}

.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
  opacity: 0.1;
  z-index: -1;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  z-index: 1;
  flex: 1;
}

.animation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
  transform: translateZ(10px);
  transition: all 0.3s ease;
}

.animation-header:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.15), 0 2px 5px rgba(0, 0, 0, 0.1);
  transform: translateZ(15px);
}

.animation-title {
  font-size: var(--font-size-lg);
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  color: #2a3f5f;
  letter-spacing: -0.5px;
}

.render-mode-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.render-mode-toggle:hover {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
}

.toggle-description {
  font-size: var(--font-size-xs);
  color: #2a3f5f;
  font-weight: 600;
  white-space: nowrap;
}

.animation-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin: 1rem 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  transform: translateZ(5px);
}

.animation-info {
  display: flex;
  gap: 1.5rem;
  margin: 2rem 0 3rem;
  flex-wrap: wrap;
}

.info-card {
  flex: 1;
  min-width: 280px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
}

.info-card h2 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2a3f5f;
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 0.5rem;
}

.info-card p {
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1rem;
}

.info-card p:last-child {
  margin-bottom: 0;
}

.info-card.tech-specs ul {
  padding-left: 1.2rem;
  margin-top: 0.5rem;
}

.info-card.tech-specs li {
  margin-bottom: 0.8rem;
  color: #4a5568;
}

.info-card.tech-specs strong {
  color: #2a3f5f;
}

/* Адаптивні стилі */
@media (max-width: 768px) {
  .animation-header {
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;
  }

  .animation-title {
    font-size: clamp(1.3rem, 4vw, 2rem);
  }

  .animation-container {
    height: 350px;
  }
}

@media (max-width: 480px) {
  .toggle-description {
    display: none; /* Ховаємо опис на малих екранах */
  }

  .animation-container {
    height: 300px;
  }

  .info-card {
    padding: 1rem;
  }
}
</style>

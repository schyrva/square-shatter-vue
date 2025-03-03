<script setup lang="ts">
import SquareShatter from '../components/SquareShatter/index.vue';
import Toggle from '../components/ui/Toggle.vue';
import useRenderMode from '../composables/useRenderMode';

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
            This animation demonstrates the Square Shatter effect - a dynamic visualization where a
            square is split into random fragments that scale in and out from their centroid.
          </p>
          <p>
            You can toggle between Canvas and SVG rendering modes to compare performance and visual
            differences between these two web rendering technologies.
          </p>
        </div>

        <div class="info-card tech-specs">
          <h2>Technical Details</h2>
          <ul>
            <li><strong>Canvas:</strong> Pixel-based rendering, better for complex animations</li>
            <li>
              <strong>SVG:</strong> Vector-based rendering, scales perfectly but can be slower with
              many elements
            </li>
            <li>
              <strong>Fragments:</strong> Each piece has its own color and moves independently
            </li>
            <li><strong>Animation:</strong> Uses requestAnimationFrame for smooth performance</li>
            <li><strong>Responsive:</strong> Adapts to container size and window resizing</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


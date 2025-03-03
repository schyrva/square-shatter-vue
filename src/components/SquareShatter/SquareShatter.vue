<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSquareAnimation } from '../../composables/useSquareAnimation';
import CanvasRenderer from './Canvas.vue';
import SVGRenderer from './SVG.vue';

const props = defineProps<{
  useSvg: boolean;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const { state, updateDimensions } = useSquareAnimation();

function handleResize() {
  if (containerRef.value) {
    const { clientWidth, clientHeight } = containerRef.value;
    updateDimensions(clientWidth, clientHeight);
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div ref="containerRef" class="square-shatter-container">
    <CanvasRenderer
      v-if="!useSvg"
      :fragments="state.fragments"
      :scale="state.scale"
      :square-center="state.squareCenter"
      :width="state.canvasWidth"
      :height="state.canvasHeight"
    />
    <SVGRenderer
      v-else
      :fragments="state.fragments"
      :scale="state.scale"
      :square-center="state.squareCenter"
      :width="state.canvasWidth"
      :height="state.canvasHeight"
    />
  </div>
</template>

<style scoped>
.square-shatter-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background-color: rgba(255, 255, 255, 0.05);
}
</style>

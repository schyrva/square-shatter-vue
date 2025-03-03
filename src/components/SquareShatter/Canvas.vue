<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Fragment, Point } from '../../types';
import { drawFragment } from '../../utils/canvas';

const props = defineProps<{
  fragments: Fragment[];
  scale: number;
  squareCenter: Point;
  width: number;
  height: number;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

function updateCanvasSize() {
  if (canvasRef.value) {
    canvasRef.value.width = props.width;
    canvasRef.value.height = props.height;
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
    updateCanvasSize();
  }
});

watch(
  () => [props.width, props.height],
  () => {
    updateCanvasSize();
  }
);

watch(
  () => [props.fragments, props.scale],
  () => {
    if (ctx && canvasRef.value) {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      props.fragments.forEach((frag) => drawFragment(ctx!, frag, props.scale, props.squareCenter));
    }
  },
  { deep: true }
);
</script>

<template>
  <canvas ref="canvasRef" class="canvas-renderer"></canvas>
</template>

<style scoped>
.canvas-renderer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

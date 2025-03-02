<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { Point, Fragment, Polygon } from '../types/types';
import { SPEED, MAX_SCALE, AREA_THRESHOLD, MIN_LINES, MAX_LINES } from '../constants/config';
import { cutPolygonWithLine, computeCentroid, polygonArea } from '../utils/geometry';
import { generateRandomLines, getRandomColor } from '../utils/random';
import { drawFragment } from '../utils/canvas';
import { createSvgFragment, updateSvgFragment, clearSvg } from '../utils/svg';
import Toggle from './ui/Toggle.vue';
import useRenderMode from '../composables/useRenderMode';

// Используем composable для управления режимом рендеринга
const { useSvg, toggleLabel } = useRenderMode();

// Refs
const canvasRef = ref<HTMLCanvasElement | null>(null);
const svgContainerRef = ref<SVGSVGElement | null>(null);

// Global state variables
let ctx: CanvasRenderingContext2D | null = null;
let canvasWidth = 0;
let canvasHeight = 0;
let innerSquareSize = 0;
let offsetX = 0;
let offsetY = 0;
let squareCenter: Point = { x: 0, y: 0 };
let fragments: Fragment[] = [];
let svgPolygons: SVGPolygonElement[] = [];
let subdivisionGenerated = false;
let scale = 1.0;
let growing = true;
let animationId: number | null = null;

/**
 * Applies line cutting to multiple polygons.
 */
function cutPolygonsWithLine(polygons: Polygon[], p1: Point, p2: Point): Polygon[] {
  let result: Polygon[] = [];

  for (const poly of polygons) {
    result = result.concat(cutPolygonWithLine(poly, p1, p2));
  }

  return result;
}

/**
 * Converts polygons to fragments with colors and centroids.
 */
function polygonsToFragments(polygons: Polygon[]): Fragment[] {
  return polygons
    .filter((poly) => poly.length >= 3 && polygonArea(poly) > AREA_THRESHOLD)
    .map((poly) => {
      const centroid = computeCentroid(poly);
      const localOffsets = poly.map((v) => ({
        x: v.x - centroid.x,
        y: v.y - centroid.y,
      }));

      return {
        vertices: poly,
        centroid,
        localOffsets,
        color: getRandomColor(),
      };
    });
}

/**
 * Creates a new subdivision of the square using random lines.
 */
function createSubdivision(): void {
  let polygons: Polygon[] = [
    [
      { x: offsetX, y: offsetY },
      { x: offsetX + innerSquareSize, y: offsetY },
      { x: offsetX + innerSquareSize, y: offsetY + innerSquareSize },
      { x: offsetX, y: offsetY + innerSquareSize },
    ],
  ];

  const lineCount = Math.floor(Math.random() * (MAX_LINES - MIN_LINES + 1)) + MIN_LINES;
  const lines = generateRandomLines(lineCount, innerSquareSize);

  const adjustedLines = lines.map(([p1, p2]) => [
    { x: p1.x + offsetX, y: p1.y + offsetY },
    { x: p2.x + offsetX, y: p2.y + offsetY },
  ]);

  for (const [p1, p2] of adjustedLines) {
    polygons = cutPolygonsWithLine(polygons, p1, p2);
  }

  fragments = polygonsToFragments(polygons);

  // Create SVG elements if using SVG
  if (useSvg.value) {
    createSvgElements();
  }
}

/**
 * Creates SVG elements for all fragments
 */
function createSvgElements(): void {
  if (!svgContainerRef.value) return;

  // Clear existing SVG elements
  clearSvg(svgContainerRef.value);
  svgPolygons = [];

  // Create new SVG elements
  fragments.forEach((fragment) => {
    const polygon = createSvgFragment(fragment, scale, squareCenter);

    // Устанавливаем дополнительные атрибуты для соответствия Canvas
    polygon.setAttribute('vector-effect', 'non-scaling-stroke');

    svgContainerRef.value?.appendChild(polygon);
    svgPolygons.push(polygon);
  });
}

/**
 * Updates SVG elements with current scale
 */
function updateSvgElements(): void {
  fragments.forEach((fragment, index) => {
    if (index < svgPolygons.length) {
      updateSvgFragment(svgPolygons[index], fragment, scale, squareCenter);
    }
  });
}

/**
 * Handles canvas resize and recalculates dimensions.
 */
function resizeCanvas(): void {
  if (!canvasRef.value || !svgContainerRef.value) return;

  // Получаем размеры контейнера
  const container = canvasRef.value.parentElement as HTMLElement;
  if (!container) return;

  // Устанавливаем размеры canvas и svg по размеру контейнера
  canvasWidth = container.clientWidth;
  canvasHeight = container.clientHeight;

  canvasRef.value.width = canvasWidth;
  canvasRef.value.height = canvasHeight;
  svgContainerRef.value.setAttribute('width', '100%');
  svgContainerRef.value.setAttribute('height', '100%');
  svgContainerRef.value.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);

  const minDimension = Math.min(canvasWidth, canvasHeight);
  innerSquareSize = minDimension / 4;
  offsetX = (canvasWidth - innerSquareSize) / 2;
  offsetY = (canvasHeight - innerSquareSize) / 2;
  squareCenter = {
    x: offsetX + innerSquareSize / 2,
    y: offsetY + innerSquareSize / 2,
  };

  createSubdivision();
}

/**
 * Main animation loop.
 */
function animate(): void {
  animationId = requestAnimationFrame(animate);

  if (growing) {
    scale += SPEED;
    if (scale >= MAX_SCALE) {
      scale = MAX_SCALE;
      growing = false;
    }
  } else {
    scale -= SPEED;
    if (scale <= 1.0) {
      scale = 1.0;
      growing = true;
      if (!subdivisionGenerated) {
        createSubdivision();
        subdivisionGenerated = true;
      }
    }
  }

  if (scale > 1.0) {
    subdivisionGenerated = false;
  }

  if (useSvg.value) {
    updateSvgElements();
  } else if (ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    fragments.forEach((frag) => drawFragment(ctx!, frag, scale, squareCenter));
  }
}

// Обработчик изменения режима рендеринга
function handleRenderModeChange(newValue: boolean) {
  if (newValue) {
    // Если переключились на SVG, создаем элементы
    createSvgElements();
  }
}

// Lifecycle hooks
onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d');
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
});

// Watch for changes to useSvg
watch(useSvg, handleRenderModeChange);
</script>

<template>
  <div class="square-shatter-container">
    <div class="render-toggle">
      <Toggle v-model="useSvg" :label="toggleLabel" />
    </div>
    <canvas id="canvas" ref="canvasRef" :style="{ display: useSvg ? 'none' : 'block' }"></canvas>
    <svg
      id="svg-container"
      ref="svgContainerRef"
      :style="{ display: useSvg ? 'block' : 'none' }"
    ></svg>
  </div>
</template>

<style scoped>
.square-shatter-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

canvas,
#svg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.render-toggle {
  position: absolute;
  top: clamp(10px, 2vw, 20px);
  right: clamp(10px, 2vw, 20px);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
</style>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import type { Point, Fragment, Polygon } from '../../types/types';
import { SPEED, MAX_SCALE, AREA_THRESHOLD, MIN_LINES, MAX_LINES } from '../../constants/config';
import { cutPolygonWithLine, computeCentroid, polygonArea } from '../../utils/geometry';
import { generateRandomLines, getRandomColor } from '../../utils/random';
import { drawFragment } from '../../utils/canvas';
import { createSvgFragment, updateSvgFragment, clearSvg } from '../../utils/svg';

// Props
const props = defineProps<{
  useSvg: boolean;
}>();

// Refs
const canvasRef = ref<HTMLCanvasElement | null>(null);
const svgContainerRef = ref<SVGSVGElement | null>(null);

// Global state variables grouped using reactive for better state management
const state = reactive({
  ctx: null as CanvasRenderingContext2D | null,
  canvasWidth: 0,
  canvasHeight: 0,
  innerSquareSize: 0,
  offsetX: 0,
  offsetY: 0,
  squareCenter: { x: 0, y: 0 } as Point,
  fragments: [] as Fragment[],
  svgPolygons: [] as SVGPolygonElement[],
  subdivisionGenerated: false,
  scale: 1.0,
  growing: true,
  animationId: null as number | null,
});

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
      { x: state.offsetX, y: state.offsetY },
      { x: state.offsetX + state.innerSquareSize, y: state.offsetY },
      {
        x: state.offsetX + state.innerSquareSize,
        y: state.offsetY + state.innerSquareSize,
      },
      { x: state.offsetX, y: state.offsetY + state.innerSquareSize },
    ],
  ];

  const lineCount = Math.floor(Math.random() * (MAX_LINES - MIN_LINES + 1)) + MIN_LINES;
  const lines = generateRandomLines(lineCount, state.innerSquareSize);

  const adjustedLines = lines.map(([p1, p2]) => [
    { x: p1.x + state.offsetX, y: p1.y + state.offsetY },
    { x: p2.x + state.offsetX, y: p2.y + state.offsetY },
  ]);

  for (const [p1, p2] of adjustedLines) {
    polygons = cutPolygonsWithLine(polygons, p1, p2);
  }

  state.fragments = polygonsToFragments(polygons);

  // Create SVG elements if using SVG
  if (props.useSvg) {
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
  state.svgPolygons = [];

  // Create new SVG elements
  state.fragments.forEach((fragment) => {
    const polygon = createSvgFragment(fragment, state.scale, state.squareCenter);

    // Setting additional attributes for Canvas compatibility
    polygon.setAttribute('vector-effect', 'non-scaling-stroke');

    svgContainerRef.value?.appendChild(polygon);
    state.svgPolygons.push(polygon);
  });
}

/**
 * Updates SVG elements with current scale
 */
function updateSvgElements(): void {
  state.fragments.forEach((fragment, index) => {
    if (index < state.svgPolygons.length) {
      updateSvgFragment(state.svgPolygons[index], fragment, state.scale, state.squareCenter);
    }
  });
}

/**
 * Handles canvas resize and recalculates dimensions.
 */
function resizeCanvas(): void {
  if (!canvasRef.value || !svgContainerRef.value) return;

  // Get container dimensions
  const container = canvasRef.value.parentElement as HTMLElement;
  if (!container) return;

  // Set canvas and svg dimensions to match container
  state.canvasWidth = container.clientWidth;
  state.canvasHeight = container.clientHeight;

  canvasRef.value.width = state.canvasWidth;
  canvasRef.value.height = state.canvasHeight;
  svgContainerRef.value.setAttribute('width', '100%');
  svgContainerRef.value.setAttribute('height', '100%');
  svgContainerRef.value.setAttribute('viewBox', `0 0 ${state.canvasWidth} ${state.canvasHeight}`);

  const minDimension = Math.min(state.canvasWidth, state.canvasHeight);
  state.innerSquareSize = minDimension / 4;
  state.offsetX = (state.canvasWidth - state.innerSquareSize) / 2;
  state.offsetY = (state.canvasHeight - state.innerSquareSize) / 2;
  state.squareCenter = {
    x: state.offsetX + state.innerSquareSize / 2,
    y: state.offsetY + state.innerSquareSize / 2,
  };

  createSubdivision();
}

/**
 * Main animation loop.
 */
function animate(): void {
  state.animationId = requestAnimationFrame(animate);

  if (state.growing) {
    state.scale += SPEED;
    if (state.scale >= MAX_SCALE) {
      state.scale = MAX_SCALE;
      state.growing = false;
    }
  } else {
    state.scale -= SPEED;
    if (state.scale <= 1.0) {
      state.scale = 1.0;
      state.growing = true;
      if (!state.subdivisionGenerated) {
        createSubdivision();
        state.subdivisionGenerated = true;
      }
    }
  }

  if (state.scale > 1.0) {
    state.subdivisionGenerated = false;
  }

  if (props.useSvg) {
    updateSvgElements();
  } else if (state.ctx) {
    state.ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);
    state.fragments.forEach((frag) =>
      drawFragment(state.ctx!, frag, state.scale, state.squareCenter)
    );
  }
}

// Render mode change handler
function handleRenderModeChange(newValue: boolean) {
  if (newValue) {
    // If switched to SVG, create elements
    createSvgElements();
  }
}

// Lifecycle hooks
onMounted(() => {
  if (canvasRef.value) {
    state.ctx = canvasRef.value.getContext('2d');
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (state.animationId !== null) {
    cancelAnimationFrame(state.animationId);
  }
});

// Watch for changes to useSvg from props
watch(() => props.useSvg, handleRenderModeChange);
</script>

<template>
  <div class="square-shatter-container">
    <canvas
      ref="canvasRef"
      id="canvas"
      :style="{ display: props.useSvg ? 'none' : 'block' }"
    ></canvas>
    <svg
      ref="svgContainerRef"
      id="svg-container"
      :style="{ display: props.useSvg ? 'block' : 'none' }"
    ></svg>
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

canvas,
#svg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

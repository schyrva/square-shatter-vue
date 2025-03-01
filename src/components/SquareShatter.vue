<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Point, Fragment, Polygon } from '../types/types';
import { SPEED, MAX_SCALE, AREA_THRESHOLD, MIN_LINES, MAX_LINES } from '../constants/config';
import { cutPolygonWithLine, computeCentroid, polygonArea } from '../utils/geometry';
import { generateRandomLines, getRandomColor } from '../utils/random';
import { drawFragment } from '../utils/canvas';
import { createSvgFragment, updateSvgFragment, clearSvg } from '../utils/svg';

// Refs
const canvasRef = ref<HTMLCanvasElement | null>(null);
const svgContainerRef = ref<SVGSVGElement | null>(null);
const useSvg = ref(false);
const toggleLabel = ref('Canvas');

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
    svgContainerRef.value?.appendChild(polygon);
    svgPolygons.push(polygon);
  });
}

/**
 * Updates SVG elements with current scale
 */
function updateSvgElements(): void {
  fragments.forEach((fragment, index) => {
    updateSvgFragment(svgPolygons[index], fragment, scale, squareCenter);
  });
}

/**
 * Handles canvas resize and recalculates dimensions.
 */
function resizeCanvas(): void {
  if (!canvasRef.value || !svgContainerRef.value) return;

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight - 60; // Adjust for header height

  canvasRef.value.width = canvasWidth;
  canvasRef.value.height = canvasHeight;
  svgContainerRef.value.setAttribute('width', canvasWidth.toString());
  svgContainerRef.value.setAttribute('height', canvasHeight.toString());

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
 * Toggles between Canvas and SVG rendering
 */
function toggleRenderMode(): void {
  useSvg.value = !useSvg.value;
  toggleLabel.value = useSvg.value ? 'SVG' : 'Canvas';

  if (canvasRef.value && svgContainerRef.value) {
    if (useSvg.value) {
      canvasRef.value.style.display = 'none';
      svgContainerRef.value.style.display = 'block';
      createSvgElements();
    } else {
      canvasRef.value.style.display = 'block';
      svgContainerRef.value.style.display = 'none';
    }
  }
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
watch(useSvg, () => {
  toggleRenderMode();
});
</script>

<template>
  <div class="square-shatter-container">
    <div class="render-toggle">
      <label class="switch">
        <input type="checkbox" v-model="useSvg" />
        <span class="slider"></span>
      </label>
      <span class="toggle-label">{{ toggleLabel }}</span>
    </div>
    <canvas ref="canvasRef" id="canvas"></canvas>
    <svg ref="svgContainerRef" id="svg-container" style="display: none"></svg>
  </div>
</template>

<style scoped>
.square-shatter-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas,
#svg-container {
  display: block;
  position: absolute;
}

.render-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 10;
}

.toggle-label {
  margin-left: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>

import { ref, reactive, onMounted, onUnmounted } from 'vue';
import type { Point, Fragment, Polygon } from '../types';
import { SPEED, MAX_SCALE, AREA_THRESHOLD, MIN_LINES, MAX_LINES } from '../constants';
import { cutPolygonWithLine, computeCentroid, polygonArea } from '../utils/geometry';
import { generateRandomLines, getRandomColor } from '../utils/random';

export function useSquareAnimation() {
  const state = reactive({
    canvasWidth: 0,
    canvasHeight: 0,
    innerSquareSize: 0,
    offsetX: 0,
    offsetY: 0,
    squareCenter: { x: 0, y: 0 } as Point,
    fragments: [] as Fragment[],
    subdivisionGenerated: false,
    scale: 1.0,
    growing: true,
    animationId: null as number | null,
  });

  function cutPolygonsWithLine(polygons: Polygon[], p1: Point, p2: Point): Polygon[] {
    let result: Polygon[] = [];
    for (const poly of polygons) {
      result = result.concat(cutPolygonWithLine(poly, p1, p2));
    }
    return result;
  }

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

  function createSubdivision(): void {
    console.log('Creating subdivision...');
    let polygons: Polygon[] = [
      [
        { x: state.offsetX, y: state.offsetY },
        { x: state.offsetX + state.innerSquareSize, y: state.offsetY },
        { x: state.offsetX + state.innerSquareSize, y: state.offsetY + state.innerSquareSize },
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
  }

  function animate(): void {
    console.log('Animation frame - scale:', state.scale);
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
  }

  function updateDimensions(containerWidth: number, containerHeight: number): void {
    console.log('Updating dimensions:', containerWidth, containerHeight);
    state.canvasWidth = containerWidth;
    state.canvasHeight = containerHeight;

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

  onMounted(() => {
    console.log('useSquareAnimation mounted, starting animation');
    animate();
  });

  onUnmounted(() => {
    if (state.animationId !== null) {
      cancelAnimationFrame(state.animationId);
    }
  });

  return {
    state,
    updateDimensions,
    createSubdivision,
  };
}

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Fragment, Point } from '../../types';
import { createSvgFragment, updateSvgFragment, clearSvg } from '../../utils/svg';

const props = defineProps<{
  fragments: Fragment[];
  scale: number;
  squareCenter: Point;
  width: number;
  height: number;
}>();

const svgRef = ref<SVGSVGElement | null>(null);
const polygons = ref<SVGPolygonElement[]>([]);

function updateViewBox() {
  if (svgRef.value) {
    svgRef.value.setAttribute('viewBox', `0 0 ${props.width} ${props.height}`);
  }
}

function createSvgElements() {
  if (!svgRef.value) return;
  clearSvg(svgRef.value);
  polygons.value = [];

  props.fragments.forEach((fragment) => {
    const polygon = createSvgFragment(fragment, props.scale, props.squareCenter);
    polygon.setAttribute('vector-effect', 'non-scaling-stroke');
    svgRef.value?.appendChild(polygon);
    polygons.value.push(polygon);
  });
}

function updateSvgElements() {
  props.fragments.forEach((fragment, index) => {
    if (index < polygons.value.length) {
      updateSvgFragment(polygons.value[index], fragment, props.scale, props.squareCenter);
    }
  });
}

watch(
  () => [props.width, props.height],
  () => {
    updateViewBox();
  }
);

watch(
  () => props.fragments,
  () => createSvgElements(),
  { deep: true }
);

watch(
  () => props.scale,
  () => updateSvgElements()
);

onMounted(() => {
  updateViewBox();
  createSvgElements();
});
</script>

<template>
  <svg ref="svgRef" class="svg-renderer" width="100%" height="100%"></svg>
</template>

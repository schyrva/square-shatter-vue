<script setup lang="ts">
import SquareShatterComponent from "./SquareShatter.vue";

// Re-exporting component for easier imports
// We need to define props and proxy them along with other attributes
const props = defineProps<{
  useSvg: boolean;
}>();
</script>

<template>
  <SquareShatterComponent v-bind="$attrs" :use-svg="props.useSvg" />
</template>

<style>
/* No styles needed here as they're in the main component */
</style>

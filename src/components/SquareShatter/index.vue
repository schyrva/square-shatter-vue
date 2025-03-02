<script setup lang="ts">
import SquareShatterComponent from "./SquareShatter.vue";

// Re-exporting component for easier imports
// Although the component doesn't have explicit props, we need to proxy all attributes
// to ensure proper functioning
</script>

<template>
  <SquareShatterComponent v-bind="$attrs" />
</template>

<style>
/* No styles needed here as they're in the main component */
</style>

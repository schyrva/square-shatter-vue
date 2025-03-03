<script setup lang="ts">
import SquareShatterComponent from './SquareShatter.vue';

const props = defineProps<{
  useSvg: boolean;
}>();
</script>

<template>
  <SquareShatterComponent v-bind="$attrs" :use-svg="props.useSvg" />
</template>

<script setup lang="ts">
// Component for catalog header
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="catalog-header">
    <h1 class="catalog-title">{{ title }}</h1>
  </div>
</template>

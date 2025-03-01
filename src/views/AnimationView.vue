<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SquareShatter from '../components/SquareShatter.vue';
</script>

<template>
  <div class="animation-view">
    <h1>Square Shatter Animation</h1>
    <SquareShatter />
  </div>
</template>

<style scoped>
.animation-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

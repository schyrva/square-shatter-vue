<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SquareShatter from "../components/SquareShatter/index.vue";
</script>

<template>
  <div class="animation-view">
    <h1 class="animation-title">Square Shatter Animation</h1>
    <div class="animation-container">
      <SquareShatter />
    </div>
  </div>
</template>

<style scoped>
.animation-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.animation-title {
  font-size: var(--font-size-lg);
  margin: 0.5em 0;
  z-index: 10;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.3em 0.8em;
  border-radius: var(--radius-md);
  text-align: center;
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.animation-container {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
}
</style>

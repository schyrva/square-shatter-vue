<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SquareShatter from "../components/SquareShatter.vue";
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
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin: 0.5em 0;
  z-index: 10;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.3em 0.8em;
  border-radius: 4px;
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

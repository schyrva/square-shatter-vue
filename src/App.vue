<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import AppHeader from "./components/layout/AppHeader.vue";

const route = useRoute();

// Визначаємо, чи потрібен скрол на основі поточного маршруту
const needsScroll = computed(() => {
  return route.name === "landing" || route.name === "catalog";
});
</script>

<template>
  <!-- Новий загальний хедер для всіх сторінок -->
  <AppHeader />

  <main
    :class="{
      'scrollable-main': needsScroll,
      'landing-main': route.name === 'landing',
    }"
  >
    <router-view />
  </main>
</template>

<style scoped>
main {
  padding-top: 60px;
  height: calc(100vh - 60px);
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

/* Спільні стилі для сторінок, що потребують прокрутки */
.scrollable-main {
  overflow: auto;
}

.landing-main {
  padding-top: 60px; /* Залишаємо відступ для хедера */
  height: 100vh;
  overflow: auto;
}
</style>

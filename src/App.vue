<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import CartDialog from "./components/cart/CartDialog.vue";

const route = useRoute();

// Визначаємо, чи потрібен скрол на основі поточного маршруту
const needsScroll = computed(() => {
  return (
    route.name === "landing" ||
    route.name === "catalog" ||
    route.name === "animation"
  );
});
</script>

<template>
  <!-- Загальний хедер для всіх сторінок -->
  <AppHeader />

  <main
    :class="{
      'scrollable-main': needsScroll,
      'landing-main': route.name === 'landing',
      'animation-main': route.name === 'animation',
    }"
  >
    <router-view />
  </main>

  <!-- Загальний футер для всіх сторінок (окрім Landing, яка має власний) -->
  <AppFooter v-if="route.name !== 'landing'" />

  <!-- Діалог кошика для всіх сторінок -->
  <CartDialog />
</template>

<style scoped>
main {
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Спільні стилі для сторінок, що потребують прокрутки */
.scrollable-main {
  overflow: auto;
}

.landing-main {
  padding-top: 60px; /* Залишаємо відступ для хедера */
  min-height: 100vh; /* Змінюємо з height на min-height для кращої адаптивності */
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.animation-main {
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f9fafc;
  display: flex;
  flex-direction: column;
}

/* Стиль для компонента router-view, щоб він розширювався на всю доступну висоту */
main > :first-child:not(footer) {
  flex: 1;
}
</style>

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'animation',
      component: () => import('../views/AnimationView.vue'),
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/CatalogView.vue'),
    },
  ],
});

export default router;

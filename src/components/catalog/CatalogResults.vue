<script setup lang="ts">
import type { Product } from '../../types';
import ProductCard from './ProductCard.vue';
import NoResultsMessage from './NoResultsMessage.vue';

// Деструктуризацію не використовуємо для props, щоб уникнути втрати реактивності
const { products } = defineProps<{
  products: Product[];
}>();

const emit = defineEmits<{
  (e: 'viewDetails', product: Product): void;
  (e: 'resetFilters'): void;
}>();
</script>

<template>
  <div class="results-container q-pa-md">
    <NoResultsMessage v-if="products.length === 0" @reset-filters="emit('resetFilters')" />

    <div v-else class="row q-col-gutter-lg">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <ProductCard :product="product" @view-details="emit('viewDetails', $event)" />
      </div>
    </div>
  </div>
</template>

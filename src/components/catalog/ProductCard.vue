<script setup lang="ts">
import { useCartStore } from '../../stores/CartStore';
import type { Product } from '../../types';
import { useNotificationStore } from '../../stores/NotificationStore';

const _props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const notificationStore = useNotificationStore();

function addToCart(product: Product) {
  cartStore.addToCart(product.id);
  notificationStore.showNotification(`${product.name} added to cart`, 'positive', 2000);
}
</script>

<template>
  <q-card class="product-card">
    <q-img :src="product.image" style="height: 200px; object-fit: contain" />

    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ product.name }}</div>
          <div class="text-subtitle1 text-weight-bold text-primary">
            ${{ product.price.toFixed(2) }}
          </div>
        </div>
        <div class="col-auto">
          <q-rating v-model="product.rating" :max="5" size="1.5em" color="amber" readonly />
        </div>
      </div>

      <q-chip color="primary" text-color="white" size="sm" class="q-mt-sm text-capitalize">
        {{ product.category }}
      </q-chip>
    </q-card-section>

    <q-card-section>
      <p class="product-description">{{ product.description }}</p>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Details" @click="$emit('view-details', product)" />
      <q-btn color="primary" icon="shopping_cart" label="Add to Cart" @click="addToCart(product)" />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.product-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}

.product-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.8em;
}
</style>

<script setup lang="ts">
import { useCartStore } from '../../stores/CartStore';
import type { Product } from '../../types';
import { useNotificationStore } from '../../stores/NotificationStore';

const props = defineProps<{
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
    <q-img
      :src="props.product.image"
      class="product-image"
      style="height: 200px; object-fit: contain"
    />

    <q-card-section class="product-content">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ props.product.name }}</div>
          <div class="text-subtitle1 text-weight-bold text-primary">
            ${{ props.product.price.toFixed(2) }}
          </div>
        </div>
        <div class="col-auto">
          <q-rating v-model="props.product.rating" :max="5" size="1.5em" color="amber" readonly />
        </div>
      </div>

      <q-chip color="primary" text-color="white" size="sm" class="q-mt-sm text-capitalize">
        {{ props.product.category }}
      </q-chip>
    </q-card-section>

    <q-card-section>
      <p class="product-description">{{ props.product.description }}</p>
    </q-card-section>

    <q-card-actions align="right" class="product-actions">
      <q-btn flat color="primary" label="Details" @click="$emit('view-details', props.product)" />
      <q-btn
        color="primary"
        icon="shopping_cart"
        label="Add to Cart"
        @click="addToCart(props.product)"
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
/* Styles moved to global ui-components.css */
</style>

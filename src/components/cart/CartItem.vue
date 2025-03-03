<script setup lang="ts">
import { computed } from 'vue';
import type { CartProduct } from '../../types';
import { useFormatPrice } from '../../composables/useFormatPrice';

const props = defineProps<{
  cartItem: CartProduct;
}>();

const emit = defineEmits<{
  (e: 'updateQuantity', productId: number, quantity: number): void;
  (e: 'remove', productId: number): void;
}>();

const { formatPrice } = useFormatPrice();

const itemPrice = computed(() => formatPrice(props.cartItem.product?.price || 0));
const totalPrice = computed(() => formatPrice(props.cartItem.total));

function updateQuantity(delta: number) {
  emit('updateQuantity', props.cartItem.item.productId, props.cartItem.item.quantity + delta);
}

function removeItem() {
  emit('remove', props.cartItem.item.productId);
}
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <q-img
        :src="cartItem.product?.image"
        style="width: 80px; height: 80px; object-fit: contain"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ cartItem.product?.name }}</q-item-label>
      <q-item-label caption>{{ itemPrice }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="quantity-controls">
        <q-btn flat dense round icon="remove" @click="updateQuantity(-1)" />
        <span class="quantity">{{ cartItem.item.quantity }}</span>
        <q-btn flat dense round icon="add" @click="updateQuantity(1)" />
      </div>
    </q-item-section>

    <q-item-section side>
      <q-item-label>{{ totalPrice }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-btn flat dense round color="negative" icon="delete" @click="removeItem" />
    </q-item-section>
  </q-item>
</template>

<style scoped>
.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity {
  width: 30px;
  text-align: center;
}

@media (max-width: 600px) {
  .quantity-controls {
    flex-wrap: nowrap;
  }

  :deep(.q-item) {
    flex-wrap: wrap;
    padding: 12px;
  }

  :deep(.q-item__section--avatar) {
    min-width: 80px;
    padding-right: 12px;
  }

  :deep(.q-item__section--side) {
    padding-left: 8px;
    padding-right: 8px;
  }

  :deep(.q-item__section--main) {
    padding: 8px 0;
  }
}

@media (max-width: 400px) {
  :deep(.q-item) {
    padding: 8px;
  }

  :deep(.q-item__section--avatar) {
    min-width: 60px;
  }

  :deep(.q-img) {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>

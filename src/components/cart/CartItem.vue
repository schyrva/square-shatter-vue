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
      <q-img :src="cartItem.product?.image" class="cart-item-image" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ cartItem.product?.name }}</q-item-label>
      <q-item-label caption>{{ itemPrice }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="quantity-controls">
        <q-btn flat dense round icon="remove" @click="updateQuantity(-1)" />
        <span class="quantity-input">{{ cartItem.item.quantity }}</span>
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

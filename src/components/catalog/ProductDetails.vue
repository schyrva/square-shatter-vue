<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../../stores/CartStore';
import type { Product } from '../../types';
import { useNotificationStore } from '../../stores/NotificationStore';

const props = defineProps<{
  product: Product | null;
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const quantity = ref(1);

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => {
    emit('update:visible', value);
    // Reset quantity when dialog closes
    if (!value) {
      quantity.value = 1;
    }
  },
});

function addToCart() {
  if (props.product) {
    cartStore.addToCart(props.product.id, quantity.value);
    notificationStore.showNotification(
      `${quantity.value} ${props.product.name} added to cart`,
      'positive',
      2000
    );
    dialogVisible.value = false;
  }
}

function closeDialog() {
  dialogVisible.value = false;
}
</script>

<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card v-if="props.product" style="width: 700px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ props.product.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>

      <q-separator />

      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-img
            :src="props.product.image"
            style="width: 100%; height: 300px; object-fit: contain"
          />
        </div>

        <div class="col-12 col-sm-6">
          <div class="text-subtitle1 text-weight-bold text-primary q-mb-md">
            ${{ props.product.price.toFixed(2) }}
          </div>

          <div class="q-mb-md">
            <q-rating
              :model-value="props.product?.rating ?? 0"
              :max="5"
              size="1.5em"
              color="amber"
              readonly
            />
          </div>

          <q-chip color="primary" text-color="white" class="q-mb-md text-capitalize">
            {{ props.product?.category }}
          </q-chip>

          <p class="text-body1">{{ props.product?.description }}</p>

          <div class="row items-center q-mt-lg">
            <div class="col-6">
              <q-input
                :model-value="quantity"
                type="number"
                label="Quantity"
                dense
                :min="1"
                :max="99"
                style="max-width: 120px"
                @update:model-value="(val) => (quantity = typeof val === 'number' ? val : 1)"
              >
                <template v-slot:prepend>
                  <q-btn icon="remove" flat dense @click="quantity = Math.max(1, quantity - 1)" />
                </template>
                <template v-slot:append>
                  <q-btn icon="add" flat dense @click="quantity = Math.min(99, quantity + 1)" />
                </template>
              </q-input>
            </div>

            <div class="col-6 text-right">
              <q-btn color="primary" icon="shopping_cart" label="Add to Cart" @click="addToCart" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

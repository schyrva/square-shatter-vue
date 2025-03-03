<script setup lang="ts">
const emit = defineEmits<{
  (e: 'resetFilters'): void;
}>();
</script>

<template>
  <div class="no-results">
    <q-icon name="search_off" size="4rem" color="grey-5" />
    <p>No products found. Try changing your filters.</p>
    <q-btn label="Reset Filters" color="primary" @click="emit('resetFilters')" />
  </div>
</template>

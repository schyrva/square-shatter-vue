<script setup lang="ts">
import type { ProductFilterOptions, SortOption } from '../../composables/useProductFiltering';

defineProps<{
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortOption;
  filterOptions: ProductFilterOptions;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:selectedCategory', value: string): void;
  (e: 'update:sortBy', value: SortOption): void;
  (e: 'resetFilters'): void;
}>();

function updateSearchQuery(val: string | number | null) {
  emit('update:searchQuery', val === null ? '' : String(val));
}
</script>

<template>
  <div class="filters-container q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Search input -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-input
          :model-value="searchQuery"
          outlined
          dense
          placeholder="Search products..."
          clearable
          @update:model-value="updateSearchQuery"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Category select -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          :model-value="selectedCategory"
          :options="filterOptions.categoryOptions"
          outlined
          dense
          emit-value
          map-options
          label="Category"
          @update:model-value="(val) => emit('update:selectedCategory', val)"
        />
      </div>

      <!-- Sort select -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          :model-value="sortBy"
          :options="filterOptions.sortOptions"
          outlined
          dense
          emit-value
          map-options
          label="Sort By"
          @update:model-value="(val) => emit('update:sortBy', val)"
        />
      </div>

      <!-- Reset button -->
      <div class="col-12 col-sm-6 col-md-3 flex items-center">
        <q-btn
          label="Reset Filters"
          outline
          color="primary"
          icon="refresh"
          @click="emit('resetFilters')"
        />
      </div>
    </div>
  </div>
</template>

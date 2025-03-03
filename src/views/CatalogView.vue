<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import ProductCard from '../components/catalog/ProductCard.vue';
import ProductDetails from '../components/catalog/ProductDetails.vue';
import CartDialog from '../components/cart/CartDialog.vue';
import type { Product } from '../types';

const productStore = useProductStore();

// Filters
const selectedCategory = ref<string>('all');
const searchQuery = ref<string>('');
const sortBy = ref<string>('name-asc');

// Selected product for details modal
const selectedProduct = ref<Product | null>(null);
const productDetailsVisible = ref<boolean>(false);

// Computed filtered and sorted products
const filteredProducts = computed(() => {
  let result = productStore.products;

  // Apply category filter
  if (selectedCategory.value !== 'all') {
    result = result.filter((product) => product.category === selectedCategory.value);
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Apply sorting
  const [field, direction] = sortBy.value.split('-');
  result = [...result].sort((a, b) => {
    let comparison = 0;

    if (field === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (field === 'price') {
      comparison = a.price - b.price;
    } else if (field === 'rating') {
      comparison = a.rating - b.rating;
    }

    return direction === 'asc' ? comparison : -comparison;
  });

  return result;
});

// Show product details
function viewProductDetails(product: Product) {
  selectedProduct.value = product;
  productDetailsVisible.value = true;
}

// Reset filters
function resetFilters() {
  selectedCategory.value = 'all';
  searchQuery.value = '';
  sortBy.value = 'name-asc';
}
</script>

<template>
  <div class="catalog-view">
    <div class="background-decoration"></div>

    <div class="catalog-header">
      <h1 class="catalog-title">Product Catalog</h1>
    </div>

    <!-- Filters Section -->
    <div class="filters-container q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-3">
          <q-input
            :model-value="searchQuery"
            outlined
            dense
            placeholder="Search products..."
            clearable
            @update:model-value="
              (val) => (searchQuery = val === null || val === undefined ? '' : String(val))
            "
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-select
            v-model="selectedCategory"
            :options="[
              { label: 'All Categories', value: 'all' },
              ...productStore.categories.map((cat) => ({
                label: cat.charAt(0).toUpperCase() + cat.slice(1),
                value: cat,
              })),
            ]"
            outlined
            dense
            emit-value
            map-options
            label="Category"
          />
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-select
            v-model="sortBy"
            :options="[
              { label: 'Name (A-Z)', value: 'name-asc' },
              { label: 'Name (Z-A)', value: 'name-desc' },
              { label: 'Price (Low to High)', value: 'price-asc' },
              { label: 'Price (High to Low)', value: 'price-desc' },
              { label: 'Rating (Low to High)', value: 'rating-asc' },
              { label: 'Rating (High to Low)', value: 'rating-desc' },
            ]"
            outlined
            dense
            emit-value
            map-options
            label="Sort By"
          />
        </div>

        <div class="col-12 col-sm-6 col-md-3 flex items-center">
          <q-btn
            label="Reset Filters"
            outline
            color="primary"
            icon="refresh"
            @click="resetFilters"
          />
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="results-container q-pa-md">
      <div v-if="filteredProducts.length === 0" class="no-results">
        <q-icon name="search_off" size="4rem" color="grey-5" />
        <p>No products found. Try changing your filters.</p>
        <q-btn label="Reset Filters" color="primary" @click="resetFilters" />
      </div>

      <div v-else class="row q-col-gutter-lg">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <ProductCard :product="product" @view-details="viewProductDetails" />
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ProductDetails v-model:visible="productDetailsVisible" :product="selectedProduct" />

    <CartDialog />
  </div>
</template>

<style scoped>
/* Styles moved to global catalog.css */
</style>

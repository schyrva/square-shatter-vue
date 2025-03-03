<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import { useProductFiltering } from '../composables/useProductFiltering';
import type { Product } from '../types';

import CatalogHeader from '../components/catalog/CatalogHeader.vue';
import CatalogFilters from '../components/catalog/CatalogFilters.vue';
import CatalogResults from '../components/catalog/CatalogResults.vue';
import ProductDetails from '../components/catalog/ProductDetails.vue';
import CartDialog from '../components/cart/CartDialog.vue';

const productStore = useProductStore();

const { selectedCategory, searchQuery, sortBy, filteredProducts, filterOptions, resetFilters } =
  useProductFiltering(productStore.products, productStore.categories);

const selectedProduct = ref<Product | null>(null);
const productDetailsVisible = ref<boolean>(false);

function viewProductDetails(product: Product) {
  selectedProduct.value = product;
  productDetailsVisible.value = true;
}
</script>

<template>
  <div class="catalog-view">
    <div class="background-decoration"></div>

    <CatalogHeader title="Product Catalog" />

    <CatalogFilters
      v-model:search-query="searchQuery"
      v-model:selected-category="selectedCategory"
      v-model:sort-by="sortBy"
      :filter-options="filterOptions"
      @reset-filters="resetFilters"
    />

    <CatalogResults
      :products="filteredProducts"
      @view-details="viewProductDetails"
      @reset-filters="resetFilters"
    />

    <ProductDetails v-model:visible="productDetailsVisible" :product="selectedProduct" />

    <CartDialog />
  </div>
</template>

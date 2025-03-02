<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/ProductStore";
import ProductCard from "../components/catalog/ProductCard.vue";
import ProductDetails from "../components/catalog/ProductDetails.vue";
import CartDialog from "../components/cart/CartDialog.vue";
import { useCartStore } from "../stores/CartStore";
import type { Product } from "../stores/ProductStore";

const productStore = useProductStore();
const cartStore = useCartStore();

// Filters
const selectedCategory = ref<string>("all");
const searchQuery = ref<string>("");
const sortBy = ref<string>("name-asc");

// Selected product for details modal
const selectedProduct = ref<Product | null>(null);
const productDetailsVisible = ref<boolean>(false);

// Computed filtered and sorted products
const filteredProducts = computed(() => {
  let result = productStore.products;

  // Apply category filter
  if (selectedCategory.value !== "all") {
    result = result.filter(
      (product) => product.category === selectedCategory.value
    );
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
  const [field, direction] = sortBy.value.split("-");
  result = [...result].sort((a, b) => {
    let comparison = 0;

    if (field === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (field === "price") {
      comparison = a.price - b.price;
    } else if (field === "rating") {
      comparison = a.rating - b.rating;
    }

    return direction === "asc" ? comparison : -comparison;
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
  selectedCategory.value = "all";
  searchQuery.value = "";
  sortBy.value = "name-asc";
}
</script>

<template>
  <div class="catalog-view">
    <div class="catalog-header">
      <h1>Product Catalog</h1>
    </div>

    <!-- Filters Section -->
    <div class="filters-container q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-3">
          <q-input
            v-model="searchQuery"
            outlined
            dense
            placeholder="Search products..."
            clearable
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
            @click="resetFilters"
            icon="refresh"
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
    <ProductDetails
      v-model:visible="productDetailsVisible"
      :product="selectedProduct"
    />

    <CartDialog />
  </div>
</template>

<style scoped>
.catalog-view {
  width: 100%;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100%;
}

.catalog-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.filters-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 2rem;
  z-index: 1;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}

.no-results p {
  margin: 1rem 0;
  font-size: 1.2rem;
  color: var(--color-text);
}

.results-container {
  padding-bottom: 2rem;
}
</style>

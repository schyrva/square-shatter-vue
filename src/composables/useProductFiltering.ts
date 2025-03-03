import { ref, computed } from 'vue';
import type { Product } from '../types';

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc';

export interface ProductFilterOptions {
  categoryOptions: { label: string; value: string }[];
  sortOptions: { label: string; value: SortOption }[];
}

export function useProductFiltering(products: Product[], categories: string[]) {
  const selectedCategory = ref<string>('all');
  const searchQuery = ref<string>('');
  const sortBy = ref<SortOption>('name-asc');

  const filterOptions = computed<ProductFilterOptions>(() => ({
    categoryOptions: [
      { label: 'All Categories', value: 'all' },
      ...categories.map((cat) => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: cat,
      })),
    ],
    sortOptions: [
      { label: 'Name (A-Z)', value: 'name-asc' },
      { label: 'Name (Z-A)', value: 'name-desc' },
      { label: 'Price (Low to High)', value: 'price-asc' },
      { label: 'Price (High to Low)', value: 'price-desc' },
      { label: 'Rating (Low to High)', value: 'rating-asc' },
      { label: 'Rating (High to Low)', value: 'rating-desc' },
    ],
  }));

  const sortFunctions = {
    name: (a: Product, b: Product) => a.name.localeCompare(b.name),
    price: (a: Product, b: Product) => a.price - b.price,
    rating: (a: Product, b: Product) => a.rating - b.rating,
  };

  function applySorting(products: Product[], sortOption: SortOption): Product[] {
    const [field, direction] = sortOption.split('-') as [
      keyof typeof sortFunctions,
      'asc' | 'desc',
    ];
    const sortFn = sortFunctions[field];

    return [...products].sort((a, b) => {
      return direction === 'asc' ? sortFn(a, b) : sortFn(b, a);
    });
  }

  function applyCategoryFilter(products: Product[], category: string): Product[] {
    if (category === 'all') return products;
    return products.filter((product) => product.category === category);
  }

  function applySearchFilter(products: Product[], query: string): Product[] {
    if (!query) return products;

    const normalizedQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
    );
  }

  const filteredProducts = computed(() => {
    const categoryFiltered = applyCategoryFilter(products, selectedCategory.value);
    const searchFiltered = applySearchFilter(categoryFiltered, searchQuery.value);
    return applySorting(searchFiltered, sortBy.value);
  });

  function resetFilters() {
    selectedCategory.value = 'all';
    searchQuery.value = '';
    sortBy.value = 'name-asc';
  }

  function updateSearchQuery(value: string | null | undefined) {
    searchQuery.value = value === null || value === undefined ? '' : String(value);
  }

  return {
    selectedCategory,
    searchQuery,
    sortBy,
    filteredProducts,
    filterOptions,

    resetFilters,
    updateSearchQuery,
  };
}

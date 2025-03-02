import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Define the Product type
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  rating: number;
}

export const useProductStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Sporty 4',
      description: 'The iconic frame brought to a new performance height as a sporty, active ride.',
      price: 2590,
      image: '/src/assets/landing/images/products/sporty-4.png',
      category: 'mountain',
      available: true,
      rating: 4,
    },
    {
      id: 2,
      name: 'Ride in town ST',
      description:
        'An open frame for an upright riding position as the most comfortable ride in town.',
      price: 2590,
      image: '/src/assets/landing/images/products/ride-in-town-st.png',
      category: 'urban',
      available: true,
      rating: 5,
    },
    {
      id: 3,
      name: 'Agile ride 3',
      description: 'The lightweight frame that has earned its street tread as a sleek, agile ride.',
      price: 2090,
      image: '/src/assets/landing/images/products/agile-ride-3.png',
      category: 'road',
      available: true,
      rating: 1,
    },
    {
      id: 4,
      name: 'Mountain Explorer',
      description: 'Designed for challenging terrains and mountain trails. Robust and reliable.',
      price: 2990,
      image: '/src/assets/landing/images/products/sporty-4.png', // Reusing existing image
      category: 'mountain',
      available: true,
      rating: 4,
    },
    {
      id: 5,
      name: 'Urban Commuter',
      description: 'Perfect for daily commuting in the city. Lightweight and comfortable.',
      price: 1890,
      image: '/src/assets/landing/images/products/ride-in-town-st.png', // Reusing existing image
      category: 'urban',
      available: true,
      rating: 3,
    },
    {
      id: 6,
      name: 'Speed Pro',
      description: 'Built for speed and efficiency on roads. Aerodynamic design for performance.',
      price: 3290,
      image: '/src/assets/landing/images/products/agile-ride-3.png', // Reusing existing image
      category: 'road',
      available: true,
      rating: 2,
    },
  ]);

  // Getters
  const getProductById = computed(() => {
    return (productId: number) => products.value.find((p) => p.id === productId);
  });

  const getProductsByCategory = computed(() => {
    return (category: string) => products.value.filter((p) => p.category === category);
  });

  const categories = computed(() => {
    const categorySet = new Set<string>();
    products.value.forEach((product) => categorySet.add(product.category));
    return Array.from(categorySet);
  });

  // Actions
  function updateProduct(product: Product) {
    const index = products.value.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.value[index] = { ...product };
    }
  }

  return {
    products,
    getProductById,
    getProductsByCategory,
    categories,
    updateProduct,
  };
});

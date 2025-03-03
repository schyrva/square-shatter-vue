/**
 * Types barrel file
 * Exports all types from their respective modules
 */

// Export all types from specific domain modules
export * from './geometry';
export * from './product'; // Changed from store.ts to product.ts for clarity
export * from './cart';
export * from './components';

// Remove animation.ts exports as they are duplicated from geometry.ts

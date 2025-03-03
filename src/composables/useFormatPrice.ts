export function useFormatPrice() {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return {
    formatPrice,
  };
}

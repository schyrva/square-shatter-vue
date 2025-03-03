export interface ToggleProps {
  modelValue: boolean;
  label?: string;
}

export interface SquareShatterProps {
  useSvg: boolean;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductDetailsProps {
  product: Product | null;
  visible: boolean;
}

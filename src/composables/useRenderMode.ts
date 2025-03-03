import { ref, computed } from 'vue';

export default function useRenderMode() {
  const useSvg = ref(false);

  const toggleLabel = computed(() => (useSvg.value ? 'SVG' : 'Canvas'));

  function toggleRenderMode() {
    useSvg.value = !useSvg.value;
  }

  return {
    useSvg,
    toggleLabel,
    toggleRenderMode,
  };
}

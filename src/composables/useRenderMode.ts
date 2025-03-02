import { ref, computed } from 'vue';

export default function useRenderMode() {
  const useSvg = ref(false);

  // Using computed property instead of watch for label updates
  const toggleLabel = computed(() => (useSvg.value ? 'SVG' : 'Canvas'));

  // Function for direct mode toggling
  function toggleRenderMode() {
    useSvg.value = !useSvg.value;
  }

  return {
    useSvg,
    toggleLabel,
    toggleRenderMode,
  };
}

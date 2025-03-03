<script setup lang="ts">
// Define props with interface and validation
const props = defineProps<{
  modelValue: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

function toggle(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<template>
  <div class="toggle-wrapper">
    <label class="toggle">
      <input type="checkbox" :checked="props.modelValue" @input="toggle" />
      <span class="toggle-slider"></span>
    </label>
    <span v-if="props.label" class="toggle-label">{{ props.label }}</span>
  </div>
</template>

<style scoped>
/* Styles moved to global ui-components.css */
</style>

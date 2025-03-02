<script setup lang="ts">
// Define props with interface and validation
const props = defineProps<{
  modelValue: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function toggle(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>

<template>
  <div class="toggle-wrapper">
    <label class="toggle">
      <input type="checkbox" :checked="modelValue" @input="toggle" />
      <span class="toggle-slider"></span>
    </label>
    <span v-if="label" class="toggle-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.toggle-wrapper {
  display: flex;
  align-items: center;
}

.toggle-label {
  margin-left: var(--spacing-xs);
  font-weight: bold;
  color: var(--color-text);
  font-size: var(--font-size-xs);
}

/* Toggle styles */
.toggle {
  position: relative;
  display: inline-block;
  width: clamp(40px, 8vw, 60px);
  height: clamp(24px, 4vw, 34px);
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-muted);
  transition: var(--transition-normal);
  border-radius: var(--radius-full);
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: calc(100% - 8px);
  width: calc(50% - 8px);
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: var(--transition-normal);
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--color-primary);
}

input:focus + .toggle-slider {
  box-shadow: 0 0 1px var(--color-primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(calc(100% + 8px));
}
</style>

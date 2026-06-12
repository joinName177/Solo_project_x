<template>
  <div class="category-filter">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-btn"
      :class="{ active: modelValue === tab.key }"
      @click="$emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
import { CATEGORY_LABELS } from '../utils/constants.js'

defineProps({
  modelValue: { type: String, default: '' },
})
defineEmits(['update:modelValue'])

const tabs = [
  { key: '', label: '全部' },
  ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label })),
]
</script>

<style scoped>
.category-filter {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.tab-btn {
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 18px;
  background: #fff;
  cursor: pointer;
  font-size: 0.95em;
  color: #555;
  transition: all 0.2s;
}
.tab-btn:hover { border-color: #4CAF50; color: #4CAF50; }
.tab-btn.active {
  background: #4CAF50;
  color: #fff;
  border-color: #4CAF50;
}
</style>

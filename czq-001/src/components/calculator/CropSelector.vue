<!--
  CropSelector - 作物种类选择器
-->
<template>
  <div class="crop-selector">
    <label class="crop-selector__label">🌾 作物种类</label>
    <div class="crop-selector__options">
      <button
        v-for="crop in cropList"
        :key="crop.key"
        class="crop-option"
        :class="{ 'crop-option--active': modelValue === crop.key }"
        @click="$emit('update:modelValue', crop.key)"
      >
        <span class="crop-option__icon">{{ crop.icon }}</span>
        <span class="crop-option__name">{{ crop.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { getCropList } from '../../constants/cropStandards.js'

defineProps({
  modelValue: { type: String, default: 'corn' },
})

defineEmits(['update:modelValue'])

const cropList = getCropList()
</script>

<style scoped>
.crop-selector__label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
}
.crop-selector__options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.crop-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
}
.crop-option:hover {
  border-color: #86efac;
  background: #f0fdf4;
}
.crop-option--active {
  border-color: #16a34a;
  background: #dcfce7;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
}
.crop-option__icon {
  font-size: 28px;
}
.crop-option__name {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}
</style>

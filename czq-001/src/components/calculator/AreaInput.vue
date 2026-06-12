<!--
  AreaInput - 种植面积输入
-->
<template>
  <div class="area-input">
    <label class="area-input__label">📐 种植面积</label>
    <div class="area-input__row">
      <NumberInput
        :modelValue="modelValue"
        @update:modelValue="onChange"
        :min="0.1"
        :max="100000"
        :step="1"
        unit="亩"
        :error="error"
        size="xlarge"
      />
      <div class="area-input__presets">
        <button
          v-for="preset in presets"
          :key="preset.value"
          class="area-preset"
          :class="{ 'area-preset--active': modelValue === preset.value }"
          @click="onChange(preset.value)"
        >{{ preset.label }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NumberInput from '../common/NumberInput.vue'
import { validateArea } from '../../utils/validators.js'

const props = defineProps({
  modelValue: { type: Number, default: 10 },
})

const emit = defineEmits(['update:modelValue'])

const error = ref('')

const presets = [
  { label: '1亩', value: 1 },
  { label: '5亩', value: 5 },
  { label: '10亩', value: 10 },
  { label: '50亩', value: 50 },
  { label: '100亩', value: 100 },
]

function onChange(val) {
  error.value = validateArea(val)
  if (!error.value) {
    emit('update:modelValue', val)
  }
}
</script>

<style scoped>
.area-input__label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
}
.area-input__row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.area-input__presets {
  display: flex;
  gap: 6px;
}
.area-preset {
  padding: 8px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.area-preset:hover {
  border-color: #86efac;
  color: #16a34a;
}
.area-preset--active {
  border-color: #16a34a;
  background: #f0fdf4;
  color: #16a34a;
  font-weight: 600;
}
</style>

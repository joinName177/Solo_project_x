<!--
  NumberInput - 大号数字输入框组件
  用于所有数字输入场景，保持一致的交互体验
-->
<template>
  <div class="number-input" :class="{ 'has-error': !!error }">
    <label v-if="label" class="number-input__label">{{ label }}</label>
    <div class="number-input__wrapper">
      <button
        class="number-input__btn number-input__btn--minus"
        @click="decrement"
        :disabled="disabled || (min != null && modelValue <= min)"
      >−</button>
      <input
        type="number"
        class="number-input__field"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :placeholder="placeholder"
      />
      <button
        class="number-input__btn number-input__btn--plus"
        @click="increment"
        :disabled="disabled || (max != null && modelValue >= max)"
      >+</button>
    </div>
    <span v-if="unit" class="number-input__unit">{{ unit }}</span>
    <span v-if="error" class="number-input__error">{{ error }}</span>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { safeParseNumber } from '../../utils/validators.js'

const props = defineProps({
  modelValue: { type: [Number, String], default: 0 },
  label: { type: String, default: '' },
  unit: { type: String, default: '' },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  size: { type: String, default: 'normal' }, // 'normal' | 'large' | 'xlarge'
})

const emit = defineEmits(['update:modelValue', 'change'])

function emitValue(val) {
  const num = safeParseNumber(val, 0)
  if (props.min != null && num < props.min) return
  if (props.max != null && num > props.max) return
  emit('update:modelValue', num)
  emit('change', num)
}

function onInput(e) {
  emitValue(e.target.value)
}

function onBlur(e) {
  emitValue(e.target.value)
}

function increment() {
  emitValue(Number(props.modelValue || 0) + props.step)
}

function decrement() {
  emitValue(Number(props.modelValue || 0) - props.step)
}
</script>

<style scoped>
.number-input {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.number-input__label {
  font-size: 14px;
  color: #666;
  min-width: 50px;
}
.number-input__wrapper {
  display: flex;
  align-items: center;
  border: 2px solid #d0d5dd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.2s;
}
.number-input__wrapper:focus-within {
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12);
}
.has-error .number-input__wrapper {
  border-color: #dc2626;
}
.number-input__btn {
  width: 44px;
  height: 48px;
  border: none;
  background: #f0fdf4;
  color: #16a34a;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  user-select: none;
}
.number-input__btn:hover:not(:disabled) {
  background: #dcfce7;
}
.number-input__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.number-input__field {
  width: 120px;
  height: 48px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  background: transparent;
  -moz-appearance: textfield;
}
.number-input__field::-webkit-outer-spin-button,
.number-input__field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.number-input__field:disabled {
  color: #999;
  background: #f9fafb;
}
.number-input__unit {
  font-size: 15px;
  color: #888;
  min-width: 40px;
}
.number-input__error {
  font-size: 12px;
  color: #dc2626;
  margin-left: 4px;
}
</style>

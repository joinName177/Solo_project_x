<template>
  <div class="denom-pad">
    <button
      v-for="d in denominations"
      :key="d"
      class="denom-btn"
      :class="{ disabled: isDisabled(d) }"
      :disabled="isDisabled(d)"
      @click="$emit('select', d)"
    >
      <span class="denom-value">{{ d }}</span>
      <span class="denom-unit">元</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  denominations: { type: Array, required: true },
  isDisabled: { type: Function, required: true },
})

defineEmits(['select'])
</script>

<style scoped>
.denom-pad {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 16px;
}

.denom-btn {
  position: relative;
  height: 72px;
  border: 2px solid #8B7355;
  border-radius: 12px;
  background: linear-gradient(180deg, #f5f0e8 0%, #e8dcc8 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  box-shadow: 0 3px 0 #8B7355;
  transition: all 0.1s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.denom-btn:hover:not(.disabled) {
  background: linear-gradient(180deg, #fff8ec 0%, #f0e4d0 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 0 #8B7355;
}

.denom-btn:active:not(.disabled) {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #8B7355;
}

.denom-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(0.6);
}

.denom-value {
  font-size: 28px;
  font-weight: bold;
  color: #4a3728;
}

.denom-unit {
  font-size: 14px;
  color: #8B7355;
  margin-top: 4px;
}
</style>

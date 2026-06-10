<template>
  <div class="change-input">
    <div class="input-display">
      <div class="input-label">找零金额</div>
      <div class="input-amount" :class="{ correct: changeMade, wrong: overpaid }">
        <span class="amount-value">{{ totalSelected.toFixed(2) }}</span>
        <span class="amount-unit">元</span>
      </div>
      <div class="input-target">
        应找：<strong>{{ target.toFixed(2) }}元</strong>
      </div>
    </div>
    <div class="selected-list" v-if="selected.length > 0">
      <span
        v-for="(d, i) in selected"
        :key="i"
        class="selected-chip"
      >
        {{ d }}元
      </span>
    </div>
    <div class="input-actions">
      <button class="undo-btn" :disabled="selected.length === 0" @click="$emit('undo')">
        ← 撤销
      </button>
      <button class="clear-btn" :disabled="selected.length === 0" @click="$emit('clear')">
        清空
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  selected: { type: Array, required: true },
  totalSelected: { type: Number, required: true },
  target: { type: Number, required: true },
})

defineEmits(['undo', 'clear'])

const changeMade = computed(() => props.totalSelected === props.target)
const overpaid = computed(() => props.totalSelected > props.target)
</script>

<style scoped>
.change-input {
  background: #fff;
  border: 2px solid #d4c5a9;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.input-display {
  text-align: center;
  margin-bottom: 12px;
}

.input-label {
  font-size: 13px;
  color: #8B7355;
  margin-bottom: 4px;
}

.input-amount {
  font-size: 36px;
  font-weight: bold;
  color: #4a3728;
  transition: color 0.3s;
}

.input-amount.correct {
  color: #2e7d32;
}

.input-amount.wrong {
  color: #c62828;
}

.amount-unit {
  font-size: 16px;
  margin-left: 2px;
}

.input-target {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 12px;
  min-height: 28px;
}

.selected-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  color: #2e7d32;
  animation: chipIn 0.2s ease-out;
}

@keyframes chipIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.input-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.undo-btn, .clear-btn {
  padding: 8px 24px;
  border: 1px solid #d4c5a9;
  border-radius: 8px;
  background: #f5f0e8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  color: #4a3728;
}

.undo-btn:hover:not(:disabled), .clear-btn:hover:not(:disabled) {
  background: #e8dcc8;
}

.undo-btn:disabled, .clear-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

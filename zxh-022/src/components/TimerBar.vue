<template>
  <div class="timer-bar">
    <div class="timer-icon">⏱️</div>
    <div class="timer-track">
      <div
        class="timer-fill"
        :class="urgencyClass"
        :style="{ width: percent + '%' }"
      ></div>
    </div>
    <div class="timer-text" :class="urgencyClass">{{ displayTime }}s</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TIME_LIMIT } from '../utils/constants.js'

const props = defineProps({
  timeLeft: { type: Number, required: true }
})

const percent = computed(() =>
  (props.timeLeft / TIME_LIMIT) * 100
)

const urgencyClass = computed(() => {
  if (props.timeLeft <= 3) return 'urgent'
  if (props.timeLeft <= 6) return 'warning'
  return 'normal'
})

const displayTime = computed(() =>
  Math.max(0, Math.ceil(props.timeLeft))
)
</script>

<style scoped>
.timer-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

.timer-icon {
  font-size: 18px;
}

.timer-track {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.1s linear, background 0.3s ease;
}

.timer-fill.normal {
  background: linear-gradient(90deg, #22c55e, #4ade80);
}

.timer-fill.warning {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.timer-fill.urgent {
  background: linear-gradient(90deg, #ef4444, #f87171);
  animation: pulse 0.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { opacity: 1; }
  to { opacity: 0.6; }
}

.timer-text {
  font-size: 18px;
  font-weight: 900;
  min-width: 36px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.timer-text.normal { color: #4ade80; }
.timer-text.warning { color: #fbbf24; }
.timer-text.urgent { color: #f87171; }
</style>

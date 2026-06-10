<template>
  <div class="timer-bar">
    <div class="timer-track">
      <div
        class="timer-fill"
        :class="{ warning: fraction < 0.4, critical: fraction < 0.2 }"
        :style="{ width: fraction * 100 + '%' }"
      ></div>
    </div>
    <div class="timer-text" :class="{ warning: fraction < 0.4, critical: fraction < 0.2 }">
      {{ remaining }}s
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  remaining: { type: Number, required: true },
  total: { type: Number, required: true },
})

const fraction = computed(() => props.total > 0 ? props.remaining / props.total : 0)
</script>

<style scoped>
.timer-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.timer-track {
  flex: 1;
  height: 10px;
  background: #e0d5c5;
  border-radius: 5px;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  border-radius: 5px;
  transition: width 1s linear;
}

.timer-fill.warning {
  background: linear-gradient(90deg, #ff9800, #ffb74d);
}

.timer-fill.critical {
  background: linear-gradient(90deg, #f44336, #e57373);
  animation: pulse 0.5s infinite alternate;
}

@keyframes pulse {
  from { opacity: 1; }
  to { opacity: 0.6; }
}

.timer-text {
  font-size: 20px;
  font-weight: bold;
  color: #4a3728;
  min-width: 36px;
  text-align: right;
}

.timer-text.warning { color: #e65100; }
.timer-text.critical { color: #c62828; }
</style>

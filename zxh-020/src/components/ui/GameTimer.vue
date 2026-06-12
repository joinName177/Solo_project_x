<template>
  <div class="game-timer" :class="{ urgent: isUrgent }">
    <div class="timer-icon">⏱️</div>
    <div class="timer-display">{{ formattedTime }}</div>
    <div class="timer-bar">
      <div class="timer-bar-fill" :style="{ width: progress * 100 + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  formattedTime: { type: String, required: true },
  progress: { type: Number, required: true },
  isUrgent: { type: Boolean, default: false },
})
</script>

<style scoped>
.game-timer {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  padding: 6px 14px;
  color: #fff;
  min-width: 180px;
}

.game-timer.urgent {
  animation: pulse 0.5s ease-in-out infinite;
  background: rgba(200, 30, 30, 0.8);
}

.timer-icon {
  font-size: 20px;
}

.timer-display {
  font-family: 'Courier New', monospace;
  font-size: 22px;
  font-weight: bold;
  min-width: 55px;
}

.timer-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.timer-bar-fill {
  height: 100%;
  background: #4caf50;
  border-radius: 3px;
  transition: width 1s linear;
}

.urgent .timer-bar-fill {
  background: #ff4444;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>

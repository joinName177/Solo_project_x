<template>
  <div class="score-board">
    <div class="score-item main-score">
      <span class="score-label">🏆 分数</span>
      <span class="score-value">{{ score }}</span>
    </div>
    <div class="score-item">
      <span class="score-label">✅ 正确</span>
      <span class="score-value correct">{{ correctCount }}</span>
    </div>
    <div class="score-item">
      <span class="score-label">❌ 错误</span>
      <span class="score-value wrong">{{ wrongCount }}</span>
    </div>
    <div class="score-item" v-if="combo > 1">
      <span class="score-label">🔥 连击</span>
      <span class="score-value combo">x{{ combo }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, default: 0 },
  correctCount: { type: Number, default: 0 },
  wrongCount: { type: Number, default: 0 },
  combo: { type: Number, default: 0 },
})
</script>

<style scoped>
.score-board {
  display: flex;
  gap: 12px;
  align-items: center;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 6px 12px;
  color: #fff;
}

.main-score {
  background: rgba(255, 152, 0, 0.85);
}

.score-label {
  font-size: 13px;
  opacity: 0.9;
}

.score-value {
  font-size: 18px;
  font-weight: bold;
  min-width: 28px;
  text-align: center;
}

.score-value.correct { color: #4caf50; }
.score-value.wrong { color: #f44336; }
.score-value.combo { color: #ff9800; }
</style>

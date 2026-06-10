<template>
  <div class="score-board">
    <div class="score-item">
      <span class="score-label">关卡</span>
      <span class="score-value level">{{ level }}</span>
    </div>
    <div class="score-divider"></div>
    <div class="score-item">
      <span class="score-label">得分</span>
      <span class="score-value">{{ score }}</span>
    </div>
    <div class="score-divider"></div>
    <div class="score-item">
      <span class="score-label">连击</span>
      <span class="score-value streak" :class="{ hot: streak >= 3 }">
        {{ streak }}
        <span v-if="streak >= 3" class="fire">🔥</span>
      </span>
    </div>
    <div class="score-divider"></div>
    <div class="score-item">
      <span class="score-label">最高</span>
      <span class="score-value best">{{ bestStreak }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, required: true },
  level: { type: Number, required: true },
  streak: { type: Number, required: true },
  bestStreak: { type: Number, required: true },
})
</script>

<style scoped>
.score-board {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, #1a237e, #283593);
  border-radius: 12px;
  padding: 12px 8px;
  color: #fff;
  margin-bottom: 12px;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.score-label {
  font-size: 11px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.score-value {
  font-size: 22px;
  font-weight: bold;
}

.score-value.level {
  color: #64b5f6;
}

.score-value.streak.hot {
  color: #ffd54f;
}

.score-value.best {
  color: #ef9a9a;
}

.fire {
  font-size: 16px;
}

.score-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.2);
}
</style>

<template>
  <div class="gameover-overlay">
    <div class="gameover-card">
      <div class="result-icon">{{ isGoodScore ? '🎉' : '💪' }}</div>
      <h2>游戏结束</h2>
      <p class="scene-tag">{{ sceneName }}</p>

      <div class="stats-grid">
        <div class="stat-item highlight">
          <div class="stat-value">{{ score }}</div>
          <div class="stat-label">最终得分</div>
        </div>
        <div class="stat-item">
          <div class="stat-value correct">{{ correctCount }}</div>
          <div class="stat-label">正确摆放</div>
        </div>
        <div class="stat-item">
          <div class="stat-value wrong">{{ wrongCount }}</div>
          <div class="stat-label">错误摆放</div>
        </div>
        <div class="stat-item">
          <div class="stat-value special">{{ specialHandled }}</div>
          <div class="stat-label">违停处理</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ accuracy }}%</div>
          <div class="stat-label">准确率</div>
        </div>
        <div class="stat-item">
          <div class="stat-value warn">{{ unplacedCount }}</div>
          <div class="stat-label">未摆放</div>
        </div>
      </div>

      <div v-if="newUnlock" class="unlock-notice">
        🎊 恭喜解锁 <strong>{{ newUnlock }}</strong>！
      </div>

      <div class="actions">
        <button class="btn-cert" @click="$emit('certificate')">
          🏅 生成文明贡献证书
        </button>
        <button class="btn-retry" @click="$emit('retry')">
          🔄 再来一局
        </button>
        <button class="btn-home" @click="$emit('home')">
          🏠 返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Number, default: 0 },
  correctCount: { type: Number, default: 0 },
  wrongCount: { type: Number, default: 0 },
  specialHandled: { type: Number, default: 0 },
  unplacedCount: { type: Number, default: 0 },
  sceneName: { type: String, default: '' },
  newUnlock: { type: String, default: null },
})

defineEmits(['certificate', 'retry', 'home'])

const accuracy = computed(() => {
  const total = props.correctCount + props.wrongCount
  return total > 0 ? Math.round((props.correctCount / total) * 100) : 100
})

const isGoodScore = computed(() => props.score >= 100)
</script>

<style scoped>
.gameover-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: fadeIn 0.5s ease;
}

.gameover-card {
  background: linear-gradient(145deg, #1e293b, #0f172a);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  max-width: 440px;
  width: 90%;
  text-align: center;
  color: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.result-icon {
  font-size: 56px;
  margin-bottom: 8px;
}

h2 {
  font-size: 28px;
  margin: 0 0 4px;
}

.scene-tag {
  color: #8ab4f8;
  font-size: 14px;
  margin: 0 0 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px 8px;
}

.stat-item.highlight {
  grid-column: 1 / -1;
  background: rgba(255, 152, 0, 0.2);
  border: 1px solid rgba(255, 152, 0, 0.4);
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.stat-value.correct { color: #4caf50; }
.stat-value.wrong { color: #f44336; }
.stat-value.special { color: #ff9800; }
.stat-value.warn { color: #ffc107; }

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.unlock-notice {
  background: rgba(255, 213, 79, 0.15);
  border: 1px solid rgba(255, 213, 79, 0.4);
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 20px;
  color: #ffd54f;
  font-size: 15px;
  animation: glowPulse 1.5s ease-in-out infinite;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-cert {
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #c8a45c, #a08040);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cert:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(200, 164, 92, 0.4);
}

.btn-retry {
  padding: 12px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-retry:hover {
  transform: translateY(-2px);
}

.btn-home {
  padding: 10px;
  font-size: 14px;
  color: #999;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-home:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(255, 213, 79, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 213, 79, 0.4); }
}
</style>

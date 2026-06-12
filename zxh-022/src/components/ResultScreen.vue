<template>
  <div class="result-screen">
    <div class="result-card">
      <div class="result-icon">{{ displayResult.icon }}</div>
      <h1 class="result-title">{{ displayResult.title }}</h1>
      <p class="result-subtitle">{{ displayResult.subtitle }}</p>
      <p class="result-desc">{{ displayResult.description }}</p>

      <div class="final-stats">
        <h3>📊 最终属性</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-icon">⚡</span>
            <span class="stat-label">体力值</span>
            <span class="stat-value" :class="valueClass(attrs.stamina)">{{ attrs.stamina }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⭐</span>
            <span class="stat-label">客户好评度</span>
            <span class="stat-value" :class="valueClass(attrs.rating)">{{ attrs.rating }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⚙️</span>
            <span class="stat-label">效率值</span>
            <span class="stat-value" :class="valueClass(attrs.efficiency)">{{ attrs.efficiency }}</span>
          </div>
        </div>
        <div class="avg-score">
          综合评分：<strong :class="valueClass(avgScore)">{{ avgScore.toFixed(1) }}</strong>
        </div>
      </div>

      <div class="history-summary" v-if="history.length > 0">
        <h3>📜 本局回顾</h3>
        <div class="timeline">
          <div
            class="timeline-item"
            v-for="(entry, index) in history"
            :key="index"
          >
            <span class="tl-num">{{ index + 1 }}</span>
            <span class="tl-scene">{{ entry.scenarioTitle }}</span>
            <span class="tl-choice">{{ entry.choiceText }}</span>
          </div>
        </div>
      </div>

      <div class="result-actions">
        <button class="btn btn-primary" @click="$emit('new-round')">
          🔄 再来一局（第{{ nextRound }}周目）
        </button>
        <button class="btn btn-secondary" @click="$emit('menu')">
          🏠 返回主菜单
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { HIDDEN_ENDING } from '../utils/constants.js'

const props = defineProps({
  rating: { type: Object, default: null },
  isHiddenEnding: { type: Boolean, default: false },
  attrs: { type: Object, required: true },
  history: { type: Array, required: true },
  round: { type: Number, default: 1 }
})

defineEmits(['new-round', 'menu'])

const nextRound = computed(() => props.round + 1)

const avgScore = computed(() => {
  const { stamina, rating, efficiency } = props.attrs
  return (stamina + rating + efficiency) / 3
})

const displayResult = computed(() => {
  if (props.isHiddenEnding) return HIDDEN_ENDING
  return props.rating || { icon: '❓', title: '未知', subtitle: '', description: '' }
})

function valueClass(val) {
  if (val >= 70) return 'text-good'
  if (val >= 40) return 'text-warn'
  return 'text-bad'
}
</script>

<style scoped>
.result-screen {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100%;
  padding: 20px;
}

.result-card {
  width: 100%;
  max-width: 480px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 140, 0, 0.25);
  border-radius: 16px;
  padding: 30px 24px;
  text-align: center;
}

.result-icon {
  font-size: 72px;
  margin-bottom: 10px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.result-title {
  font-size: 28px;
  font-weight: 900;
  color: #fff;
  margin: 0 0 6px;
}

.result-subtitle {
  font-size: 16px;
  color: #FFB347;
  margin: 0 0 10px;
}

.result-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0 0 20px;
}

.final-stats {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: left;
}

.final-stats h3 {
  color: #FF8C00;
  font-size: 14px;
  margin: 0 0 10px;
}

.stats-grid {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.stat-icon { font-size: 18px; }
.stat-label { font-size: 11px; color: rgba(255,255,255,0.5); }
.stat-value { font-size: 22px; font-weight: 900; }

.avg-score {
  text-align: center;
  font-size: 14px;
  color: rgba(255,255,255,0.6);
}

.avg-score strong { font-size: 20px; }

.text-good { color: #4ade80; }
.text-warn { color: #fbbf24; }
.text-bad { color: #f87171; }

.history-summary {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: left;
  max-height: 200px;
  overflow-y: auto;
}

.history-summary h3 {
  color: #FF8C00;
  font-size: 14px;
  margin: 0 0 10px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 4px 0;
}

.tl-num {
  width: 22px;
  height: 22px;
  background: #FF8C00;
  color: #000;
  font-weight: 700;
  font-size: 11px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tl-scene {
  color: rgba(255,255,255,0.5);
  min-width: 90px;
}

.tl-choice {
  color: rgba(255,255,255,0.8);
  flex: 1;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

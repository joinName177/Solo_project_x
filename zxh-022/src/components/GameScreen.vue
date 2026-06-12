<template>
  <div class="game-screen">
    <!-- 顶部：属性条 + 计时器 -->
    <div class="top-panel">
      <StatusBar :attrs="attrs" />
      <TimerBar :time-left="timeLeft" />
    </div>

    <!-- 进度指示 -->
    <div class="progress-indicator">
      <div class="progress-text">
        📍 场景 {{ progress.current }} / {{ progress.total }}
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progress.percent + '%' }"></div>
      </div>
    </div>

    <!-- 场景卡片 -->
    <ScenarioCard
      v-if="currentScenario"
      :scenario="currentScenario"
      :progress="progress"
      :round="round"
      @choose="onChoose"
    />

    <!-- 决策记录 -->
    <GameLog :history="history" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import StatusBar from './StatusBar.vue'
import TimerBar from './TimerBar.vue'
import ScenarioCard from './ScenarioCard.vue'
import GameLog from './GameLog.vue'

const props = defineProps({
  attrs: { type: Object, required: true },
  timeLeft: { type: Number, required: true },
  progress: { type: Object, required: true },
  currentScenario: { type: Object, default: null },
  history: { type: Array, required: true },
  round: { type: Number, default: 1 }
})

const emit = defineEmits(['choose', 'timeout'])

function onChoose(index) {
  emit('choose', index)
}
</script>

<style scoped>
.game-screen {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  max-width: 520px;
  margin: 0 auto;
  width: 100%;
}

.top-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-indicator {
  padding: 0 4px;
}

.progress-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
}

.progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF8C00, #FFB347);
  border-radius: 2px;
  transition: width 0.4s ease;
}
</style>

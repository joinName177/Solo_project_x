<template>
  <div class="game-log" v-if="history.length > 0">
    <h3 class="log-title">📜 决策记录</h3>
    <div class="log-list">
      <div
        class="log-item"
        v-for="(entry, index) in history"
        :key="index"
      >
        <div class="log-scenario">{{ entry.scenarioTitle }}</div>
        <div class="log-choice">
          <span class="log-arrow">→</span>
          {{ entry.choiceText }}
        </div>
        <div class="log-effects">
          <span v-if="entry.effects.stamina" :class="effectClass(entry.effects.stamina)">
            体力{{ signed(entry.effects.stamina) }}
          </span>
          <span v-if="entry.effects.rating" :class="effectClass(entry.effects.rating)">
            好评{{ signed(entry.effects.rating) }}
          </span>
          <span v-if="entry.effects.efficiency" :class="effectClass(entry.effects.efficiency)">
            效率{{ signed(entry.effects.efficiency) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  history: { type: Array, required: true }
})

function signed(val) {
  if (!val) return ''
  return val > 0 ? `+${val}` : `${val}`
}

function effectClass(val) {
  if (val > 0) return 'effect-positive'
  if (val < 0) return 'effect-negative'
  return ''
}
</script>

<style scoped>
.game-log {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.log-title {
  color: #FFB347;
  font-size: 13px;
  margin: 0 0 8px;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.log-item {
  font-size: 12px;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.log-scenario {
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2px;
}

.log-choice {
  color: rgba(255, 255, 255, 0.8);
}

.log-arrow {
  color: #FF8C00;
  margin-right: 4px;
}

.log-effects {
  display: flex;
  gap: 8px;
  margin-top: 3px;
  font-size: 11px;
}

.effect-positive { color: #4ade80; }
.effect-negative { color: #f87171; }
</style>

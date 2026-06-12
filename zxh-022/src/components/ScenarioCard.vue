<template>
  <div class="scenario-card">
    <div class="scenario-header">
      <span class="scenario-badge">场景 {{ progress.current }}/{{ progress.total }}</span>
      <span class="scenario-round" v-if="round > 1">第{{ round }}周目</span>
    </div>

    <h2 class="scenario-title">{{ scenario.title }}</h2>
    <p class="scenario-desc">{{ scenario.description }}</p>

    <div class="choices">
      <button
        v-for="(choice, index) in scenario.choices"
        :key="index"
        class="choice-btn"
        :disabled="chosen"
        @click="select(index)"
      >
        <span class="choice-key">{{ keyLabel(index) }}</span>
        <span class="choice-text">{{ choice.text }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  scenario: { type: Object, required: true },
  progress: { type: Object, required: true },
  round: { type: Number, default: 1 }
})

const emit = defineEmits(['choose'])

const chosen = ref(false)

// 场景切换时重置选择状态
watch(() => props.scenario, () => {
  chosen.value = false
})

function keyLabel(index) {
  return ['A', 'B', 'C'][index] || String(index + 1)
}

function select(index) {
  if (chosen.value) return
  chosen.value = true
  emit('choose', index)
}
</script>

<style scoped>
.scenario-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: 14px;
  padding: 20px;
}

.scenario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.scenario-badge {
  background: #FF8C00;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}

.scenario-round {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.scenario-title {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 10px;
}

.scenario-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 18px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border-left: 3px solid #FF8C00;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.choice-btn:hover:not(:disabled) {
  background: rgba(255, 140, 0, 0.2);
  border-color: rgba(255, 140, 0, 0.5);
  transform: translateX(4px);
}

.choice-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.choice-key {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #FF8C00;
  color: #000;
  font-weight: 900;
  font-size: 13px;
  border-radius: 6px;
  flex-shrink: 0;
}

.choice-text {
  flex: 1;
}
</style>

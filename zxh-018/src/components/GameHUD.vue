<template>
  <div class="hud">
    <div class="hud-left">
      <button class="btn btn-primary" @click="$emit('start')" v-if="phase === 'idle'">
        开始游戏
      </button>
      <button class="btn btn-restart" @click="$emit('restart')" v-else>
        重新开始
      </button>
    </div>

    <div class="hud-center">
      <div class="stat">
        <span class="stat-icon">⏱</span>
        <span class="stat-value" :class="{ urgent: time <= 10 }">{{ time }}s</span>
      </div>
      <div class="stat">
        <span class="stat-icon">⭐</span>
        <span class="stat-value">{{ score }}</span>
      </div>
      <div class="stat">
        <span class="stat-icon">🔧</span>
        <span class="stat-value">{{ fixedCount }}/{{ totalFloors }}</span>
      </div>
    </div>

    <div class="hud-right">
      <label class="rainy-toggle" :class="{ active: rainyMode }">
        <input type="checkbox" :checked="rainyMode" @change="$emit('toggleRainy')" />
        <span class="toggle-label">🌧 雨夜模式</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  phase: { type: String, required: true },
  time: { type: Number, required: true },
  score: { type: Number, required: true },
  fixedCount: { type: Number, required: true },
  totalFloors: { type: Number, required: true },
  rainyMode: { type: Boolean, default: false },
})

defineEmits(['start', 'restart', 'toggleRainy'])
</script>

<style scoped>
.hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  border-bottom: 2px solid #FFC107;
  gap: 16px;
  flex-shrink: 0;
}

.hud-left,
.hud-right {
  flex: 0 0 auto;
}

.hud-center {
  display: flex;
  gap: 24px;
  align-items: center;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  font-weight: bold;
}

.stat-icon {
  font-size: 22px;
}

.stat-value {
  min-width: 40px;
  text-align: center;
  color: #FFD54F;
}

.stat-value.urgent {
  color: #FF5252;
  animation: pulse 0.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #FFC107, #FFA000);
  color: #1a1a2e;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
}

.btn-restart {
  background: linear-gradient(135deg, #FF7043, #F4511E);
  color: #fff;
}

.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 112, 67, 0.4);
}

.rainy-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

.rainy-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.rainy-toggle.active {
  background: rgba(33, 150, 243, 0.2);
  border: 1px solid rgba(33, 150, 243, 0.4);
}

.rainy-toggle input {
  display: none;
}

.toggle-label {
  white-space: nowrap;
}
</style>

<template>
  <div class="scene-select">
    <button
      v-for="scene in scenes"
      :key="scene.id"
      class="scene-card"
      :class="{
        selected: scene.id === selectedId,
        locked: !scene.unlocked,
        'new-unlock': scene.name === newUnlock,
      }"
      :disabled="!scene.unlocked"
      @click="$emit('select', scene.id)"
    >
      <div class="scene-icon">{{ sceneIcons[scene.id] || '📍' }}</div>
      <div class="scene-name">{{ scene.name }}</div>
      <div class="scene-desc">{{ scene.description }}</div>
      <div v-if="!scene.unlocked" class="lock-overlay">
        <span class="lock-icon">🔒</span>
        <span>{{ scene.unlockScore }}分解锁</span>
      </div>
      <div v-if="scene.name === newUnlock" class="new-badge">NEW</div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  scenes: { type: Array, required: true },
  selectedId: { type: String, default: '' },
  newUnlock: { type: String, default: null },
})

defineEmits(['select'])

const sceneIcons = {
  subway: '🚇',
  mall: '🏬',
  school: '🏫',
  scenic: '🏯',
}
</script>

<style scoped>
.scene-select {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.scene-card {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 14px 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
  color: #fff;
  overflow: hidden;
}

.scene-card:hover:not(:disabled) {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.12);
  transform: translateY(-2px);
}

.scene-card.selected {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.2);
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
}

.scene-card.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.scene-card.new-unlock {
  animation: glow 1s ease-in-out infinite;
  border-color: #ffd54f;
}

.scene-icon {
  font-size: 28px;
  margin-bottom: 4px;
}

.scene-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
}

.scene-desc {
  font-size: 11px;
  color: #999;
  line-height: 1.3;
}

.lock-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  color: #aaa;
}

.lock-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.new-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #ff4444;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 8px;
  animation: blink 0.6s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(255, 213, 79, 0.3); }
  50% { box-shadow: 0 0 25px rgba(255, 213, 79, 0.6); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

<template>
  <div
    class="bike-item"
    :class="{
      'bike-blue': bike.color === 'blue',
      'bike-yellow': bike.color === 'yellow',
      'bike-special': bike.isSpecial,
      'bike-placed': bike.placed,
      'bike-selected': isSelected,
      'bike-dragging': isDragging,
    }"
    :style="bikeStyle"
    @pointerdown.prevent="onPointerDown"
    @click.stop="onClick"
  >
    <div class="bike-body">
      <svg viewBox="0 0 40 40" class="bike-svg">
        <!-- 车架 -->
        <circle cx="20" cy="20" r="14" :fill="bike.color === 'blue' ? '#2196f3' : '#ffc107'" stroke="#333" stroke-width="1.5" />
        <!-- 车轮 -->
        <circle cx="16" cy="26" r="5" fill="none" stroke="#333" stroke-width="2" />
        <circle cx="24" cy="26" r="5" fill="none" stroke="#333" stroke-width="2" />
        <circle cx="16" cy="26" r="1.5" fill="#333" />
        <circle cx="24" cy="26" r="1.5" fill="#333" />
        <!-- 车把 -->
        <line x1="16" y1="12" x2="24" y2="12" stroke="#333" stroke-width="1.5" />
        <!-- 车座 -->
        <rect x="17" y="14" width="6" height="4" rx="2" fill="#333" />
      </svg>
    </div>
    <div v-if="bike.isSpecial" class="special-tag">违停</div>
    <div v-if="bike.placed" class="placed-check">✅</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  bike: { type: Object, required: true },
  isSelected: { type: Boolean, default: false },
  isDragging: { type: Boolean, default: false },
})

const emit = defineEmits(['drag-start', 'click-select'])

const bikeStyle = computed(() => ({
  left: `${props.bike.x}px`,
  top: `${props.bike.y}px`,
}))

function onPointerDown(e) {
  emit('drag-start', props.bike.id, e)
}

function onClick() {
  emit('click-select', props.bike.id)
}
</script>

<style scoped>
.bike-item {
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: grab;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  z-index: 10;
  user-select: none;
  touch-action: none;
}

.bike-item:hover {
  transform: scale(1.15);
  z-index: 20;
}

.bike-item:active {
  cursor: grabbing;
}

.bike-selected {
  transform: scale(1.15);
  filter: brightness(1.3);
  z-index: 15;
}

.bike-selected::after {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px dashed #fff;
  border-radius: 50%;
  animation: rotate 3s linear infinite;
}

.bike-dragging {
  opacity: 0.4;
}

.bike-placed {
  cursor: default;
  opacity: 0.6;
  pointer-events: none;
}

.bike-special {
  animation: specialGlow 0.8s ease-in-out infinite;
  z-index: 25;
}

.bike-body {
  width: 100%;
  height: 100%;
}

.bike-svg {
  width: 100%;
  height: 100%;
}

.special-tag {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4444;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 1px 6px;
  border-radius: 8px;
  white-space: nowrap;
}

.placed-check {
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 14px;
}

@keyframes specialGlow {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(255, 0, 0, 0.6)); }
  50% { filter: drop-shadow(0 0 12px rgba(255, 0, 0, 0.9)); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

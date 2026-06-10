<template>
  <div class="repair-panel" @click.stop>
    <!-- Dead: drop-zone hint -->
    <div v-if="failureType === FAILURE_TYPES.DEAD" class="drop-zone" :class="{ 'drag-over': dragOver }">
      {{ dragOver ? '🔄 松开更换灯泡' : '📍 拖拽灯泡到此处' }}
    </div>

    <!-- Stuck on: cut power button -->
    <button
      v-else-if="failureType === FAILURE_TYPES.STUCK_ON"
      class="repair-btn cut-power"
      @click="$emit('repair')"
    >
      ⚡ 拉闸断电
    </button>

    <!-- Low sensitivity: rapid stomp -->
    <div v-else-if="failureType === FAILURE_TYPES.LOW_SENSITIVITY" class="stomp-zone">
      <div class="stomp-progress">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="click-count">{{ remaining }}</span>
      </div>
      <div class="stomp-hint" @click="$emit('stomp')">
        👣 使劲跺脚！
      </div>
    </div>

    <!-- Delayed off: slider -->
    <div v-else-if="failureType === FAILURE_TYPES.DELAYED_OFF" class="slider-zone">
      <div class="slider-track-container">
        <input
          type="range"
          :min="SLIDER_MIN"
          :max="SLIDER_MAX"
          :value="sliderValue"
          @input="$emit('sliderInput', Number($event.target.value))"
          class="repair-slider"
        />
        <div class="slider-target-zone" :style="targetZoneStyle"></div>
      </div>
      <div class="slider-labels">
        <span>快</span>
        <span class="target-label">正常区间</span>
        <span>慢</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FAILURE_TYPES, DIFFICULTY } from '../config/gameConfig.js'

const SLIDER_MIN = DIFFICULTY.SLIDER_MIN
const SLIDER_MAX = DIFFICULTY.SLIDER_MAX

const props = defineProps({
  failureType: { type: String, default: null },
  dragOver: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  remaining: { type: Number, default: 0 },
  sliderValue: { type: Number, default: 1 },
  sliderTarget: {
    type: Object,
    default: () => ({ min: DIFFICULTY.DELAYED_OFF_TARGET_MIN, max: DIFFICULTY.DELAYED_OFF_TARGET_MAX }),
  },
})

defineEmits(['repair', 'stomp', 'sliderInput'])

const targetZoneStyle = computed(() => {
  const range = SLIDER_MAX - SLIDER_MIN
  const left = ((props.sliderTarget.min - SLIDER_MIN) / range) * 100
  const width = ((props.sliderTarget.max - props.sliderTarget.min) / range) * 100
  return { left: `${left}%`, width: `${width}%` }
})
</script>

<style scoped>
.repair-panel {
  display: flex;
  justify-content: center;
}

/* Drop zone (dead) */
.drop-zone {
  padding: 6px 14px;
  border: 2px dashed #FFA000;
  border-radius: 8px;
  background: rgba(255, 160, 0, 0.1);
  font-size: 12px;
  color: #E65100;
  text-align: center;
  transition: all 0.2s;
}

.drop-zone.drag-over {
  background: rgba(255, 193, 7, 0.3);
  border-color: #FF6F00;
  transform: scale(1.05);
  font-weight: bold;
}

/* Stuck on button */
.repair-btn {
  padding: 6px 16px;
  border: 2px solid #F44336;
  border-radius: 6px;
  background: linear-gradient(135deg, #FFEBEE, #FFCDD2);
  color: #C62828;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.repair-btn:hover {
  background: linear-gradient(135deg, #FFCDD2, #EF9A9A);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}

.repair-btn:active {
  transform: scale(0.95);
}

/* Stomp zone */
.stomp-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stomp-progress {
  display: flex;
  align-items: center;
  gap: 6px;
}

.progress-track {
  width: 100px;
  height: 8px;
  background: #BCAAA4;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFC107, #FF6F00);
  border-radius: 4px;
  transition: width 0.1s;
}

.click-count {
  font-size: 14px;
  font-weight: bold;
  color: #E65100;
  min-width: 20px;
  text-align: center;
}

.stomp-hint {
  padding: 6px 16px;
  background: linear-gradient(135deg, #FFF3E0, #FFE0B2);
  border: 2px solid #FF9800;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #E65100;
  cursor: pointer;
  transition: all 0.1s;
  animation: stomp-bounce 1s ease-in-out infinite;
}

.stomp-hint:active {
  transform: scale(0.9);
  background: #FFE0B2;
}

@keyframes stomp-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* Slider zone */
.slider-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
  max-width: 200px;
}

.slider-track-container {
  position: relative;
  width: 100%;
  height: 28px;
  display: flex;
  align-items: center;
}

.repair-slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #BCAAA4;
  border-radius: 3px;
  outline: none;
  position: relative;
  z-index: 2;
}

.repair-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFC107, #FFA000);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.slider-target-zone {
  position: absolute;
  height: 100%;
  background: rgba(76, 175, 80, 0.3);
  border: 2px solid rgba(76, 175, 80, 0.6);
  border-radius: 3px;
  z-index: 1;
  pointer-events: none;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 11px;
  color: #8D6E63;
}

.target-label {
  color: #4CAF50;
  font-weight: bold;
}
</style>

<template>
  <div class="building-wrapper">
    <!-- Building roof -->
    <div class="building-roof">
      <div class="roof-ridge"></div>
    </div>

    <!-- Building body -->
    <div class="building-body">
      <!-- Floors -->
      <FloorUnit
        v-for="light in lights"
        :key="light.id"
        :light="light"
        :isActive="activeFloorId === light.id"
        :requiredClicks="requiredClicks"
        :sliderTarget="sliderTarget"
        @activate="$emit('activateFloor', light.id)"
        @repaired="$emit('repairLight', light.id)"
      />
    </div>

    <!-- Building ground -->
    <div class="building-ground">
      <div class="ground-line"></div>
    </div>

    <!-- Spare bulb for drag (always available when game is playing) -->
    <div
      v-if="showSpareBulb"
      class="spare-bulb"
      draggable="true"
      @dragstart="onDragStart"
    >
      <div class="bulb-icon">💡</div>
      <span class="bulb-label">备用灯泡</span>
    </div>
  </div>
</template>

<script setup>
import FloorUnit from './FloorUnit.vue'

defineProps({
  lights: { type: Array, required: true },
  activeFloorId: { type: Number, default: null },
  showSpareBulb: { type: Boolean, default: false },
  requiredClicks: { type: Number, default: 8 },
  sliderTarget: {
    type: Object,
    default: () => ({ min: 3, max: 5 }),
  },
})

const emit = defineEmits(['activateFloor', 'repairLight'])

function onDragStart(e) {
  e.dataTransfer.setData('text/plain', 'bulb')
  e.dataTransfer.effectAllowed = 'copy'
  // Add a subtle visual effect
  if (e.target) {
    e.target.style.opacity = '0.6'
  }
}
</script>

<style scoped>
.building-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 520px;
}

/* Roof */
.building-roof {
  width: 100%;
  height: 20px;
  background: linear-gradient(180deg, #5D4037, #4E342E);
  border-radius: 6px 6px 0 0;
  position: relative;
  overflow: hidden;
}

.roof-ridge {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 6px;
  background: linear-gradient(180deg, #795548, #5D4037);
  border-radius: 0 0 4px 4px;
}

/* Building body */
.building-body {
  width: 100%;
  border-left: 4px solid #4E342E;
  border-right: 4px solid #4E342E;
  background: #4E342E;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
}

/* Ground */
.building-ground {
  width: 100%;
  height: 12px;
  background: linear-gradient(180deg, #4E342E, #3E2723);
  border-radius: 0 0 6px 6px;
  position: relative;
  overflow: hidden;
}

.ground-line {
  position: absolute;
  bottom: 0;
  left: -10%;
  right: -10%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #33691E, #558B2F, #33691E, transparent);
  opacity: 0.4;
}

/* Spare bulb drag source */
.spare-bulb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 6px 16px;
  background: linear-gradient(135deg, #FFF8E1, #FFECB3);
  border: 2px dashed #FFA000;
  border-radius: 20px;
  cursor: grab;
  transition: all 0.2s;
  user-select: none;
}

.spare-bulb:hover {
  background: linear-gradient(135deg, #FFECB3, #FFE082);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 160, 0, 0.3);
}

.spare-bulb:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.bulb-icon {
  font-size: 20px;
}

.bulb-label {
  font-size: 13px;
  color: #E65100;
  font-weight: bold;
}
</style>

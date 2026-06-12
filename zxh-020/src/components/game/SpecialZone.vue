<template>
  <div
    class="special-zone"
    :class="zone.type"
    :style="zoneStyle"
  >
    <div class="zone-pattern">
      <div class="zone-indicator">
        <span class="zone-type-icon">{{ zone.type === 'blind_lane' ? '👨‍🦯' : '🌿' }}</span>
        <span class="zone-type-label">{{ zone.type === 'blind_lane' ? '盲道' : '绿化带' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  zone: { type: Object, required: true },
})

const zoneStyle = computed(() => ({
  left: `${props.zone.x}px`,
  top: `${props.zone.y}px`,
  width: `${props.zone.width}px`,
  height: `${props.zone.height}px`,
}))
</script>

<style scoped>
.special-zone {
  position: absolute;
  overflow: hidden;
  pointer-events: none;
}

.zone-pattern {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.special-zone.blind_lane .zone-pattern {
  background: repeating-linear-gradient(
    90deg,
    #ffc107 0px,
    #ffc107 8px,
    #ff9800 8px,
    #ff9800 12px,
    #e0e0e0 12px,
    #e0e0e0 20px
  );
  opacity: 0.5;
}

.special-zone.green_belt .zone-pattern {
  background: repeating-linear-gradient(
    45deg,
    #4caf50 0px,
    #4caf50 4px,
    #66bb6a 4px,
    #66bb6a 8px
  );
  opacity: 0.4;
  border-radius: 6px;
}

.zone-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 10px;
  border-radius: 10px;
}

.zone-type-icon {
  font-size: 14px;
}

.zone-type-label {
  font-size: 11px;
  color: #fff;
  font-weight: bold;
}
</style>

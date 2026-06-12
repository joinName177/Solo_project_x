<template>
  <div
    class="parking-zone"
    :style="zoneStyle"
  >
    <div class="zone-border">
      <div class="zone-icon">🅿️</div>
      <div class="zone-label">停车框</div>
      <div class="zone-dashes">
        <div v-for="i in 8" :key="i" class="dash"></div>
      </div>
    </div>
    <!-- 已停放单车计数 -->
    <div v-if="parkedCount > 0" class="parked-count">{{ parkedCount }}/{{ capacity }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  zone: { type: Object, required: true },
  parkedCount: { type: Number, default: 0 },
  capacity: { type: Number, default: 6 },
})

const zoneStyle = computed(() => ({
  left: `${props.zone.x}px`,
  top: `${props.zone.y}px`,
  width: `${props.zone.width}px`,
  height: `${props.zone.height}px`,
}))
</script>

<style scoped>
.parking-zone {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zone-border {
  width: 100%;
  height: 100%;
  border: 3px dashed rgba(76, 175, 80, 0.7);
  border-radius: 12px;
  background: rgba(76, 175, 80, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.parking-zone:hover .zone-border {
  background: rgba(76, 175, 80, 0.2);
  border-color: rgba(76, 175, 80, 1);
}

.zone-icon {
  font-size: 22px;
  opacity: 0.6;
}

.zone-label {
  font-size: 11px;
  color: rgba(76, 175, 80, 0.8);
  margin-top: 2px;
}

.zone-dashes {
  display: none;
}

.parked-count {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: #4caf50;
  font-size: 11px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 8px;
  white-space: nowrap;
}
</style>

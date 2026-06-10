<template>
  <div
    class="light-fixture"
    :class="[`state-${state}`, `failure-${failureType}`, { fixed: isFixed }]"
  >
    <!-- Light base / holder -->
    <div class="light-base"></div>

    <!-- Bulb glow -->
    <div class="light-bulb">
      <div class="glow" v-if="isGlowing"></div>
    </div>

    <!-- Failure indicator icon -->
    <div class="failure-icon" v-if="!isFixed && failureType">
      <span v-if="failureType === 'dead'">💡</span>
      <span v-else-if="failureType === 'stuck_on'">⚡</span>
      <span v-else-if="failureType === 'low_sensitivity'">📉</span>
      <span v-else-if="failureType === 'delayed_off'">⏳</span>
    </div>

    <!-- Fixed checkmark -->
    <div class="fixed-mark" v-if="isFixed">✅</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FAILURE_TYPES } from '../config/gameConfig.js'

const props = defineProps({
  state: { type: String, default: 'broken' },
  failureType: { type: String, default: null },
})

const isFixed = computed(() => props.state === 'fixed')

const isGlowing = computed(() => {
  if (props.state === 'fixed') return true
  if (props.failureType === FAILURE_TYPES.STUCK_ON) return true
  if (props.failureType === FAILURE_TYPES.DELAYED_OFF) return true
  return false
})
</script>

<style scoped>
.light-fixture {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 48px;
}

.light-base {
  width: 28px;
  height: 10px;
  background: linear-gradient(180deg, #616161, #424242);
  border-radius: 3px 3px 0 0;
  z-index: 2;
}

.light-bulb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #e0e0e0, #9e9e9e);
  position: relative;
  overflow: visible;
  transition: all 0.3s;
  z-index: 1;
}

/* Glow effect */
.glow {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 213, 79, 0.6) 0%,
    rgba(255, 193, 7, 0.3) 40%,
    transparent 70%
  );
  animation: soft-glow 2s ease-in-out infinite alternate;
}

@keyframes soft-glow {
  from { opacity: 0.7; transform: scale(1); }
  to { opacity: 1; transform: scale(1.1); }
}

/* Stuck on - intense flicker */
.failure-stuck_on .glow {
  background: radial-gradient(
    circle,
    rgba(255, 235, 59, 0.8) 0%,
    rgba(255, 193, 7, 0.5) 30%,
    rgba(244, 67, 54, 0.2) 60%,
    transparent 80%
  );
  animation: flicker 0.3s ease-in-out infinite alternate;
}

@keyframes flicker {
  0% { opacity: 0.6; transform: scale(1); }
  25% { opacity: 1; transform: scale(1.15); }
  50% { opacity: 0.5; transform: scale(0.95); }
  75% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.7; transform: scale(1); }
}

/* Low sensitivity - dim */
.failure-low_sensitivity .glow {
  opacity: 0.3;
  animation: dim-pulse 2s ease-in-out infinite alternate;
}

@keyframes dim-pulse {
  from { opacity: 0.2; transform: scale(0.9); }
  to { opacity: 0.4; transform: scale(1.05); }
}

/* Delayed off - slow cycling */
.failure-delayed_off .glow {
  animation: slow-cycle 3s ease-in-out infinite;
}

@keyframes slow-cycle {
  0% { opacity: 1; transform: scale(1.1); }
  30% { opacity: 1; transform: scale(1.1); }
  50% { opacity: 0.2; transform: scale(0.9); }
  80% { opacity: 0.2; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1.1); }
}

/* Dead - no glow, but show dim bulb */
.failure-dead .light-bulb {
  background: radial-gradient(circle at 40% 35%, #757575, #424242);
}

.failure-icon {
  position: absolute;
  top: -4px;
  right: -12px;
  font-size: 12px;
  z-index: 3;
}

.fixed-mark {
  position: absolute;
  top: -8px;
  right: -12px;
  font-size: 14px;
  z-index: 3;
  animation: pop-in 0.3s ease-out;
}

@keyframes pop-in {
  0% { transform: scale(0); }
  70% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Fixed state */
.light-fixture.fixed .light-bulb {
  background: radial-gradient(circle at 40% 35%, #fff8e1, #FFD54F);
}

.light-fixture.fixed .glow {
  background: radial-gradient(
    circle,
    rgba(255, 213, 79, 0.7) 0%,
    rgba(255, 193, 7, 0.4) 30%,
    transparent 70%
  );
  animation: soft-glow 2s ease-in-out infinite alternate;
}
</style>

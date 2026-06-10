<template>
  <div
    class="floor-unit"
    :class="{
      active: isActive,
      fixed: light.state === 'fixed',
      broken: light.state === 'broken',
    }"
  >
    <div class="floor-label">{{ light.floor }}F</div>

    <div class="floor-body" @click.stop="activate">
      <!-- Door decoration -->
      <div class="door-area">
        <div class="door">🚪</div>
      </div>

      <!-- Light area -->
      <div class="light-area">
        <div
          class="light-wrapper"
          :class="{ 'drop-target': isDead, 'drag-over': isDragOver }"
          @dragover.prevent="onDragOver"
          @dragleave="onDragLeave"
          @drop.prevent="onDropBulb"
        >
          <LightFixture
            :state="light.state"
            :failureType="light.failureType"
          />
        </div>

        <!-- Repair controls for active floor -->
        <Transition name="slide">
          <div v-if="isActive && isBroken" class="repair-area">
            <RepairPanel
              :failureType="light.failureType"
              :dragOver="isDragOver"
              :progress="clickProgress"
              :remaining="clicksRemaining"
              :sliderValue="sliderValue"
              :sliderTarget="sliderTarget"
              @repair="emitRepair"
              @stomp="handleStomp"
              @sliderInput="handleSliderInput"
            />
          </div>
        </Transition>
      </div>

      <!-- Status badge -->
      <div class="status-area">
        <span v-if="isFixed" class="status fixed-status">✅ 已修复</span>
        <span v-else class="status broken-status">{{ failureLabel }}</span>
      </div>

      <!-- Stairs decoration -->
      <div class="stairs-area">
        <div class="stairs-line" v-for="n in 3" :key="n"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import LightFixture from './LightFixture.vue'
import RepairPanel from './RepairPanel.vue'
import { FAILURE_LABELS, FAILURE_TYPES, DIFFICULTY } from '../config/gameConfig.js'

const SLIDER_MIN = DIFFICULTY.SLIDER_MIN
const SLIDER_MAX = DIFFICULTY.SLIDER_MAX

const props = defineProps({
  light: { type: Object, required: true },
  isActive: { type: Boolean, default: false },
  requiredClicks: { type: Number, default: DIFFICULTY.LOW_SENSITIVITY_CLICKS },
  sliderTarget: {
    type: Object,
    default: () => ({
      min: DIFFICULTY.DELAYED_OFF_TARGET_MIN,
      max: DIFFICULTY.DELAYED_OFF_TARGET_MAX,
    }),
  },
})

const emit = defineEmits(['activate', 'repaired'])

const isDragOver = ref(false)
const clickCount = ref(0)
const sliderValue = ref(SLIDER_MIN)

const isBroken = computed(() => props.light.state === 'broken')
const isFixed = computed(() => props.light.state === 'fixed')
const isDead = computed(() => props.light.failureType === FAILURE_TYPES.DEAD)

const failureLabel = computed(() => FAILURE_LABELS[props.light.failureType] || '？')
const clicksRemaining = computed(() => Math.max(0, props.requiredClicks - clickCount.value))
const clickProgress = computed(() =>
  Math.min(100, (clickCount.value / props.requiredClicks) * 100)
)

watch(
  () => props.isActive,
  (active) => {
    if (!active) {
      clickCount.value = 0
      sliderValue.value = SLIDER_MIN
      isDragOver.value = false
    }
  }
)

function activate() {
  if (isFixed.value) return
  emit('activate')
}

/* Drag & Drop for DEAD type */
function onDragOver(e) {
  if (isDead.value && isBroken.value) {
    isDragOver.value = true
    e.dataTransfer.dropEffect = 'copy'
  }
}

function onDragLeave() {
  isDragOver.value = false
}

function onDropBulb() {
  isDragOver.value = false
  if (isDead.value && isBroken.value) {
    emit('repaired')
  }
}

function emitRepair() {
  emit('repaired')
}

/* Low Sensitivity: track stomp clicks */
function handleStomp() {
  clickCount.value++
  if (clickCount.value >= props.requiredClicks) {
    emit('repaired')
  }
}

/* Delayed Off: check slider position */
function handleSliderInput(val) {
  sliderValue.value = val
  if (val >= props.sliderTarget.min && val <= props.sliderTarget.max) {
    emit('repaired')
  }
}
</script>

<style scoped>
.floor-unit {
  display: flex;
  flex-direction: column;
  border-bottom: 3px solid #8D6E63;
  position: relative;
  transition: background 0.3s;
}

.floor-unit:last-child {
  border-bottom: none;
}

.floor-unit.broken {
  background: linear-gradient(180deg, #F5E6CC 0%, #EFE0C8 100%);
}

.floor-unit.active {
  background: linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 100%);
  box-shadow: inset 0 0 20px rgba(255, 193, 7, 0.15);
}

.floor-unit.fixed {
  background: linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%);
}

.floor-label {
  position: absolute;
  left: 8px;
  top: 4px;
  font-size: 11px;
  font-weight: bold;
  color: #795548;
  opacity: 0.7;
  z-index: 2;
}

.floor-body {
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 28px;
  min-height: 72px;
  gap: 8px;
  cursor: pointer;
  position: relative;
}

.floor-unit.fixed .floor-body {
  cursor: default;
}

.door-area {
  flex: 0 0 36px;
  display: flex;
  justify-content: center;
}

.door {
  font-size: 22px;
  opacity: 0.8;
}

.light-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.light-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s;
}

.light-wrapper.drop-target.drag-over {
  background: rgba(255, 193, 7, 0.3);
  box-shadow: 0 0 16px rgba(255, 193, 7, 0.5);
  transform: scale(1.05);
}

.repair-area {
  margin-top: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.status-area {
  flex: 0 0 80px;
  text-align: center;
}

.status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.broken-status {
  background: rgba(244, 67, 54, 0.1);
  color: #C62828;
}

.fixed-status {
  background: rgba(76, 175, 80, 0.15);
  color: #2E7D32;
}

.stairs-area {
  flex: 0 0 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  opacity: 0.4;
}

.stairs-line {
  width: 20px;
  height: 2px;
  background: #795548;
  transform: rotate(-15deg);
  transform-origin: right center;
}

.stairs-line:nth-child(2) {
  width: 14px;
}

.stairs-line:nth-child(3) {
  width: 8px;
}

.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.15s ease-in;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

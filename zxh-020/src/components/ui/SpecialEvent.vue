<template>
  <Transition name="slide">
    <div v-if="active" class="special-event-toast" :class="zoneType">
      <div class="toast-icon">🚨</div>
      <div class="toast-content">
        <div class="toast-title">违停举报！</div>
        <div class="toast-desc">
          有单车违规停放在<strong>{{ zoneLabel }}</strong>上，请优先处理！
        </div>
        <div class="toast-bonus">⭐ 处理成功可获得双倍积分（+20分）</div>
      </div>
      <div class="toast-timer">
        <div class="countdown-ring">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" />
            <circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-dasharray="94.2"
              :stroke-dashoffset="94.2 * (1 - countdownProgress)"
              transform="rotate(-90 18 18)"
              stroke-linecap="round"
            />
          </svg>
          <span class="countdown-text">{{ countdownLeft }}s</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  active: { type: Boolean, default: false },
  zoneType: { type: String, default: 'blind_lane' }, // 'blind_lane' | 'green_belt'
})

const zoneLabel = computed(() => (props.zoneType === 'blind_lane' ? '盲道' : '绿化带'))

const totalTime = 30
const elapsed = ref(0)
let intervalId = null

const countdownLeft = computed(() => Math.max(0, totalTime - elapsed.value))
const countdownProgress = computed(() => elapsed.value / totalTime)

onMounted(() => {
  intervalId = setInterval(() => {
    if (props.active) {
      elapsed.value = Math.min(totalTime, elapsed.value + 1)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.special-event-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(30, 20, 10, 0.95);
  border: 2px solid #ff9800;
  border-radius: 16px;
  padding: 14px 18px;
  color: #fff;
  z-index: 500;
  max-width: 360px;
  box-shadow: 0 8px 32px rgba(255, 152, 0, 0.3);
}

.special-event-toast.blind_lane {
  border-color: #ffc107;
}

.special-event-toast.green_belt {
  border-color: #4caf50;
}

.toast-icon {
  font-size: 32px;
  animation: shake 0.5s ease-in-out infinite;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: 16px;
  font-weight: bold;
  color: #ff9800;
}

.toast-desc {
  font-size: 13px;
  color: #ccc;
  margin-top: 2px;
}

.toast-desc strong {
  color: #fff;
}

.toast-bonus {
  font-size: 12px;
  color: #ffd54f;
  margin-top: 4px;
}

.toast-timer {
  display: flex;
  align-items: center;
}

.countdown-ring {
  position: relative;
  width: 40px;
  height: 40px;
}

.countdown-ring svg {
  width: 100%;
  height: 100%;
}

.countdown-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #ff9800;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  transform: translateX(120%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(120%);
  opacity: 0;
}

@keyframes shake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}
</style>

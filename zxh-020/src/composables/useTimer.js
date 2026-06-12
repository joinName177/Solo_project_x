/**
 * 计时器逻辑
 * 提供倒计时功能，支持开始、暂停、恢复、重置
 */
import { ref, computed, onUnmounted } from 'vue'

export function useTimer() {
  const totalSeconds = ref(90)
  const remaining = ref(90)
  const isRunning = ref(false)
  const isPaused = ref(false)
  let intervalId = null

  const progress = computed(() => {
    if (totalSeconds.value === 0) return 0
    return remaining.value / totalSeconds.value
  })

  const formattedTime = computed(() => {
    const mins = Math.floor(remaining.value / 60)
    const secs = remaining.value % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  })

  const isUrgent = computed(() => remaining.value <= 10 && remaining.value > 0)
  const isTimeUp = computed(() => remaining.value <= 0)

  function start(duration) {
    stop()
    if (duration !== undefined) {
      totalSeconds.value = duration
    }
    remaining.value = totalSeconds.value
    isRunning.value = true
    isPaused.value = false
    intervalId = setInterval(() => {
      if (remaining.value > 0) {
        remaining.value--
      } else {
        stop()
      }
    }, 1000)
  }

  function pause() {
    if (!isRunning.value) return
    isPaused.value = true
    isRunning.value = false
    clearInterval(intervalId)
    intervalId = null
  }

  function resume() {
    if (!isPaused.value) return
    isPaused.value = false
    isRunning.value = true
    intervalId = setInterval(() => {
      if (remaining.value > 0) {
        remaining.value--
      } else {
        stop()
      }
    }, 1000)
  }

  function stop() {
    isRunning.value = false
    isPaused.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    stop()
    remaining.value = totalSeconds.value
  }

  onUnmounted(() => {
    stop()
  })

  return {
    totalSeconds,
    remaining,
    isRunning,
    isPaused,
    progress,
    formattedTime,
    isUrgent,
    isTimeUp,
    start,
    pause,
    resume,
    stop,
    reset,
  }
}

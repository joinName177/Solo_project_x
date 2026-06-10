import { ref, onUnmounted } from 'vue'

export function useTimer(seconds = 10) {
  const remaining = ref(seconds)
  const total = ref(seconds)
  const isRunning = ref(false)
  let intervalId = null

  function start() {
    stop()
    remaining.value = total.value
    isRunning.value = true
    intervalId = setInterval(() => {
      remaining.value--
      if (remaining.value <= 0) {
        stop()
      }
    }, 1000)
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isRunning.value = false
  }

  function reset() {
    stop()
    remaining.value = total.value
  }

  function setDuration(sec) {
    total.value = sec
    remaining.value = sec
  }

  onUnmounted(stop)

  return {
    remaining,
    total,
    isRunning,
    start,
    stop,
    reset,
    setDuration,
  }
}

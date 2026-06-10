import { ref, onUnmounted } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig.js'

export function useTimer(onTimeout) {
  const timeRemaining = ref(GAME_CONFIG.GAME_DURATION)
  const isRunning = ref(false)
  let intervalId = null

  function start() {
    stop()
    timeRemaining.value = GAME_CONFIG.GAME_DURATION
    isRunning.value = true
    intervalId = setInterval(() => {
      timeRemaining.value--
      if (timeRemaining.value <= 0) {
        timeRemaining.value = 0
        stop()
        if (onTimeout) onTimeout()
      }
    }, 1000)
  }

  function stop() {
    isRunning.value = false
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    stop()
    timeRemaining.value = GAME_CONFIG.GAME_DURATION
  }

  onUnmounted(stop)

  return { timeRemaining, isRunning, start, stop, reset }
}

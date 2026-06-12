// ============================================================
// 倒计时逻辑 —— 从 App.vue 中抽离
// ============================================================

import { ref, onUnmounted } from 'vue'
import { TIME_LIMIT } from '../utils/constants.js'

/**
 * 倒计时 composable
 * @param {Function} onTimeout - 超时回调
 * @returns {{ timeLeft, startTimer, stopTimer, resetTimer }}
 */
export function useTimer(onTimeout) {
  const timeLeft = ref(TIME_LIMIT)
  let intervalId = null

  function clear() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  /** 启动/重启计时器 */
  function startTimer() {
    clear()
    timeLeft.value = TIME_LIMIT
    intervalId = setInterval(() => {
      timeLeft.value = Math.max(0, timeLeft.value - 0.1)
      if (timeLeft.value <= 0) {
        clear()
        onTimeout()
      }
    }, 100)
  }

  /** 停止计时器 */
  function stopTimer() {
    clear()
  }

  /** 重置计时器（不启动） */
  function resetTimer() {
    clear()
    timeLeft.value = TIME_LIMIT
  }

  onUnmounted(() => clear())

  return { timeLeft, startTimer, stopTimer, resetTimer }
}

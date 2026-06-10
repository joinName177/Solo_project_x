import { ref, computed, watch } from 'vue'
import { useOrder } from './useOrder.js'
import { useTimer } from './useTimer.js'
import { useCustomer } from './useCustomer.js'
import { useScore } from './useScore.js'

const DENOMINATIONS = [1, 5, 10, 20]
const MAX_PER_DENOM = 3

export function useGameState() {
  const order = useOrder()
  const timer = useTimer(10)
  const customerMgr = useCustomer()
  const score = useScore()

  const selected = ref([])
  const feedback = ref(null)
  // 'correct' | 'wrong' | 'timeout' | 'overpaid_prompt' | null
  const gameStarted = ref(false)
  const showSaleOverlay = ref(false)

  const totalSelected = computed(() =>
    parseFloat(selected.value.reduce((s, v) => s + v, 0).toFixed(2))
  )

  const denomCounts = computed(() => {
    const counts = {}
    DENOMINATIONS.forEach(d => (counts[d] = 0))
    selected.value.forEach(d => counts[d]++)
    return counts
  })

  function isDenomDisabled(denom) {
    const cust = customerMgr.customer.value
    if (!cust || feedback.value) return true
    const special = cust.special?.type
    if (special === 'no_coins' && denom === 1) return true
    if (special === 'all_five' && denom !== 5) return true
    if (denomCounts.value[denom] >= MAX_PER_DENOM) return true
    return false
  }

  function selectDenomination(denom) {
    if (!timer.isRunning.value || feedback.value) return
    if (isDenomDisabled(denom)) return
    selected.value.push(denom)
    autoCheck()
  }

  function undo() {
    if (feedback.value) return
    selected.value.pop()
  }

  function autoCheck() {
    const diff = parseFloat((totalSelected.value - order.changeDue.value).toFixed(2))
    if (diff < 0) return
    if (diff === 0) {
      timer.stop()
      if (customerMgr.customer.value?.special?.type === 'overpaid') {
        feedback.value = 'overpaid_prompt'
      } else {
        feedback.value = 'correct'
        score.onCorrect()
        setTimeout(() => finishRound(), 1200)
      }
    } else {
      timer.stop()
      feedback.value = 'wrong'
      score.onWrong()
      setTimeout(() => finishRound(), 1200)
    }
  }

  function handleTimeout() {
    if (feedback.value) return
    feedback.value = 'timeout'
    score.onWrong()
    setTimeout(() => finishRound(), 1200)
  }

  function overpaidFix() {
    // Remove 2 yuan from selected - try 2 first, then 1+1
    const i2 = selected.value.lastIndexOf(2)
    if (i2 !== -1) {
      selected.value.splice(i2, 1)
    } else {
      const i1 = selected.value.lastIndexOf(1)
      if (i1 === -1) { handleWrongFallback(); return }
      const i1b = selected.value.slice(0, i1).lastIndexOf(1)
      if (i1b === -1) { handleWrongFallback(); return }
      // Splice higher index first to preserve indices
      selected.value.splice(i1, 1)
      selected.value.splice(i1b, 1)
    }
    feedback.value = 'correct'
    score.onCorrect()
    setTimeout(() => finishRound(), 1200)
  }

  function handleWrongFallback() {
    feedback.value = 'wrong'
    score.onWrong()
    setTimeout(() => finishRound(), 1200)
  }

  function finishRound() {
    feedback.value = null
    selected.value = []

    if (score.isSaleMode.value) {
      score.completeSaleOrder()
      if (score.isSaleDone()) {
        score.addScore(20)
        showSaleOverlay.value = true
        setTimeout(() => {
          showSaleOverlay.value = false
          score.nextLevel()
          startRound()
        }, 2000)
      } else {
        startRound()
      }
    } else {
      score.nextLevel()
      startRound()
    }
  }

  function startRound() {
    order.generateOrder()
    customerMgr.nextCustomer()
    selected.value = []
    feedback.value = null
    timer.start()
  }

  function startGame() {
    score.reset()
    gameStarted.value = true
    startRound()
  }

  watch(() => timer.remaining.value, (val) => {
    if (val <= 0 && !timer.isRunning.value && !feedback.value) {
      handleTimeout()
    }
  })

  return {
    selected,
    totalSelected,
    feedback,
    gameStarted,
    showSaleOverlay,
    denomCounts,
    order,
    timer,
    customer: customerMgr,
    score,
    selectDenomination,
    undo,
    isDenomDisabled,
    overpaidFix,
    startGame,
    DENOMINATIONS,
  }
}

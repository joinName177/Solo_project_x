/**
 * 计分逻辑
 * 管理得分、扣分、连击等计分规则
 */
import { ref, computed } from 'vue'

// 计分常量
const SCORE_CORRECT = 10
const SCORE_WRONG = -5
const SCORE_SPECIAL_CORRECT = 20
const SCORE_SPECIAL_WRONG = -10

export function useScoring() {
  const score = ref(0)
  const correctCount = ref(0)
  const wrongCount = ref(0)
  const specialHandled = ref(0)
  const combo = ref(0)
  const lastAction = ref(null) // { type, points, message, timestamp }

  const stats = computed(() => ({
    score: score.value,
    correctCount: correctCount.value,
    wrongCount: wrongCount.value,
    specialHandled: specialHandled.value,
    combo: combo.value,
    accuracy:
      correctCount.value + wrongCount.value > 0
        ? Math.round((correctCount.value / (correctCount.value + wrongCount.value)) * 100)
        : 100,
  }))

  /**
   * 处理单车摆放结果
   * @param {'correct'|'wrong'} result - 摆放结果
   * @param {boolean} isSpecial - 是否为特殊事件单车
   * @returns {object} 本次得分信息
   */
  function handlePlacement(result, isSpecial = false) {
    let points = 0
    let message = ''

    if (result === 'correct') {
      correctCount.value++
      combo.value++
      points = isSpecial ? SCORE_SPECIAL_CORRECT : SCORE_CORRECT
      if (isSpecial) {
        specialHandled.value++
        message = combo.value > 1 ? `违规举报成功！+${points} (${combo.value}连击)` : `违规举报成功！+${points}`
      } else {
        message = combo.value > 1 ? `摆放正确！+${points} (${combo.value}连击)` : `摆放正确！+${points}`
      }
    } else {
      wrongCount.value++
      combo.value = 0
      points = isSpecial ? SCORE_SPECIAL_WRONG : SCORE_WRONG
      message = isSpecial ? `违规处理失败！${points}` : `未放入停车框 ${points}`
    }

    score.value = Math.max(0, score.value + points)
    lastAction.value = { type: result, points, message, timestamp: Date.now() }

    return { points, message }
  }

  function reset() {
    score.value = 0
    correctCount.value = 0
    wrongCount.value = 0
    specialHandled.value = 0
    combo.value = 0
    lastAction.value = null
  }

  return {
    score,
    correctCount,
    wrongCount,
    specialHandled,
    combo,
    lastAction,
    stats,
    handlePlacement,
    reset,
  }
}

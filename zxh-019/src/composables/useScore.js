/*
 * @Author: chengzhiqiang chengzhiqiang
 * @Date: 2026-06-10 17:19:09
 * @LastEditors: chengzhiqiang chengzhiqiang
 * @LastEditTime: 2026-06-10 19:00:49
 * @FilePath: \zxh-019\src\composables\useScore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, computed } from 'vue'

export function useScore() {
  const score = ref(0)
  const level = ref(1)
  const streak = ref(0)
  const bestStreak = ref(0)

  const isSaleMode = computed(() => level.value % 5 === 0)
  const saleOrders = ref([])
  const saleCompleted = ref(0)
  const saleTotal = ref(3)

  function addScore(points) {
    score.value += points
    if (score.value < 0) score.value = 0
  }

  function onCorrect() {
    streak.value++
    if (streak.value > bestStreak.value) {
      bestStreak.value = streak.value
    }
    const bonus = Math.floor(Math.sqrt(streak.value))
    addScore(10 + bonus)
  }

  function onWrong() {
    streak.value = 0
    addScore(-5)
  }

  function nextLevel() {
    level.value++
    if (isSaleMode.value) {
      saleOrders.value = Array(3).fill(null)
      saleCompleted.value = 0
    }
  }

  function completeSaleOrder() {
    saleCompleted.value++
  }

  function isSaleDone() {
    return saleCompleted.value >= saleTotal.value
  }

  function reset() {
    score.value = 0
    level.value = 1
    streak.value = 0
    bestStreak.value = 0
    saleOrders.value = []
    saleCompleted.value = 0
  }

  return {
    score,
    level,
    streak,
    bestStreak,
    isSaleMode,
    saleCompleted,
    saleTotal,
    addScore,
    onCorrect,
    onWrong,
    nextLevel,
    completeSaleOrder,
    isSaleDone,
    reset,
  }
}

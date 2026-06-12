/**
 * useComparison - 对比模式逻辑
 * 管理两个方案的并排对比
 */
import { reactive, computed, ref } from 'vue'
import { useCalculator } from './useCalculator.js'

export function useComparison() {
  const isComparisonMode = ref(false)

  // 方案A 和 方案B 各自独立的计算器实例
  const planA = useCalculator({ planName: '常规种植', id: 'plan_a' })
  const planB = useCalculator({ planName: '绿色种植', id: 'plan_b' })

  // ---- 计算差异 ----
  const costDiff = computed(() =>
    planB.totalCost.value - planA.totalCost.value
  )

  const profitDiff = computed(() =>
    planB.estimatedProfit.value - planA.estimatedProfit.value
  )

  const revenueDiff = computed(() =>
    planB.estimatedRevenue.value - planA.estimatedRevenue.value
  )

  /** 差异百分比 */
  const costDiffPercent = computed(() => {
    if (planA.totalCost.value === 0) return 'N/A'
    return ((costDiff.value / planA.totalCost.value) * 100).toFixed(1) + '%'
  })

  const profitDiffPercent = computed(() => {
    if (planA.estimatedProfit.value === 0) return 'N/A'
    return ((profitDiff.value / Math.abs(planA.estimatedProfit.value)) * 100).toFixed(1) + '%'
  })

  /** 对比摘要 */
  const comparisonSummary = computed(() => {
    const better = profitDiff.value >= 0 ? 'B' : 'A'
    const diffAbs = Math.abs(profitDiff.value)
    return {
      better,
      message: better === 'B'
        ? `方案B「${planB.state.planName}」利润更高，多 ${diffAbs.toFixed(2)} 元`
        : `方案A「${planA.state.planName}」利润更高，多 ${diffAbs.toFixed(2)} 元`,
      costDiff: costDiff.value,
      profitDiff: profitDiff.value,
    }
  })

  function toggleComparison() {
    isComparisonMode.value = !isComparisonMode.value
  }

  /** 将方案A的设置复制到方案B */
  function copyAToB() {
    planB.loadSnapshot(planA.getSnapshot())
    planB.state.planName = '方案B'
  }

  return {
    isComparisonMode,
    planA,
    planB,
    costDiff,
    profitDiff,
    revenueDiff,
    costDiffPercent,
    profitDiffPercent,
    comparisonSummary,
    toggleComparison,
    copyAToB,
  }
}

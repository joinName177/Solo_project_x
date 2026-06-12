import { computed } from 'vue'
import { RANK_SORT } from '../utils/constants'
import { calcCompositeScore, calcAverageRating } from '../utils/helpers'

/**
 * 排行榜逻辑封装
 * 提供多种排序维度的排行榜计算
 *
 * @param {import('vue').Ref<Array>} craftsmenRef - 手艺人列表
 */
export function useLeaderboard(craftsmenRef) {
  /**
   * 按综合分数排序（接单量 + 评分加权）
   */
  const compositeRanking = computed(() => {
    return [...craftsmenRef.value]
      .map((c) => ({
        ...c,
        avgRating: calcAverageRating(c.ratings || []),
        compositeScore: calcCompositeScore(c.orderCount, calcAverageRating(c.ratings || []))
      }))
      .sort((a, b) => b.compositeScore - a.compositeScore)
      .slice(0, 10)
  })

  /**
   * 按接单量排序
   */
  const ordersRanking = computed(() => {
    return [...craftsmenRef.value]
      .filter((c) => c.orderCount > 0)
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 10)
  })

  /**
   * 按评分排序
   */
  const ratingRanking = computed(() => {
    return [...craftsmenRef.value]
      .map((c) => ({
        ...c,
        avgRating: calcAverageRating(c.ratings || [])
      }))
      .filter((c) => c.avgRating > 0)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10)
  })

  /**
   * 获取指定排序方式的排行榜
   * @param {string} sortType
   * @returns {Array}
   */
  function getRanking(sortType = RANK_SORT.COMPREHENSIVE) {
    switch (sortType) {
      case RANK_SORT.ORDERS:
        return ordersRanking.value
      case RANK_SORT.RATING:
        return ratingRanking.value
      case RANK_SORT.COMPREHENSIVE:
      default:
        return compositeRanking.value
    }
  }

  return {
    compositeRanking,
    ordersRanking,
    ratingRanking,
    getRanking
  }
}

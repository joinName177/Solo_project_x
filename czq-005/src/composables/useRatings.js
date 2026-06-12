import { computed } from 'vue'
import { calcAverageRating } from '../utils/helpers'

/**
 * 评价系统逻辑封装
 * 管理评价的读写与计算
 *
 * @param {Function} getCraftsmanById - 根据 ID 获取手艺人的函数
 * @param {Function} onUpdate - 更新手艺人的回调函数
 */
export function useRatings(getCraftsmanById, onUpdate) {
  /**
   * 添加评价
   * @param {string} craftsmanId - 手艺人 ID
   * @param {{ score: number, comment: string, reviewer: string }} ratingData
   * @returns {boolean} 是否成功
   */
  function addRating(craftsmanId, ratingData) {
    const craftsman = getCraftsmanById(craftsmanId)
    if (!craftsman) return false

    const rating = {
      id: Date.now().toString(36),
      score: ratingData.score,
      comment: ratingData.comment.trim(),
      reviewer: ratingData.reviewer.trim() || '匿名村民',
      createdAt: Date.now()
    }

    const updatedRatings = [...(craftsman.ratings || []), rating]
    onUpdate(craftsmanId, { ratings: updatedRatings })
    return true
  }

  /**
   * 获取手艺人的平均评分
   * @param {string} craftsmanId
   * @returns {number}
   */
  function getAverageRating(craftsmanId) {
    const craftsman = getCraftsmanById(craftsmanId)
    if (!craftsman) return 0
    return calcAverageRating(craftsman.ratings || [])
  }

  /**
   * 获取手艺人的评价列表
   * @param {string} craftsmanId
   * @returns {Array}
   */
  function getRatings(craftsmanId) {
    const craftsman = getCraftsmanById(craftsmanId)
    if (!craftsman) return []
    return [...(craftsman.ratings || [])].sort((a, b) => b.createdAt - a.createdAt)
  }

  /**
   * 计算一个手艺人对象的平均评分（用于批量计算）
   * @param {Object} craftsman
   * @returns {number}
   */
  function calcAvgForDisplay(craftsman) {
    return calcAverageRating(craftsman?.ratings || [])
  }

  return {
    addRating,
    getAverageRating,
    getRatings,
    calcAvgForDisplay
  }
}

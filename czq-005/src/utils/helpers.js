/**
 * 生成唯一 ID
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
}

/**
 * 格式化日期为中文格式
 * @param {string|number|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}年${month}月${day}日`
}

/**
 * 计算平均评分
 * @param {Array<{score: number}>} ratings
 * @returns {number}
 */
export function calcAverageRating(ratings) {
  if (!ratings || ratings.length === 0) return 0
  const sum = ratings.reduce((acc, r) => acc + r.score, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

/**
 * 计算综合排名分数
 * 接单量每单 +1 分，评分每颗星 +5 分
 * @param {number} orderCount
 * @param {number} avgRating
 * @returns {number}
 */
export function calcCompositeScore(orderCount, avgRating) {
  return orderCount * 1 + avgRating * 5
}

/**
 * 过滤手艺人列表
 * @param {Array} craftsmen
 * @param {{ craftType?: string, village?: string, keyword?: string }} filters
 * @returns {Array}
 */
export function filterCraftsmen(craftsmen, filters = {}) {
  const { craftType, village, keyword } = filters
  return craftsmen.filter((c) => {
    if (craftType && c.craftType !== craftType) return false
    if (village && !c.serviceArea.includes(village)) return false
    if (keyword) {
      const kw = keyword.toLowerCase()
      const matchName = c.name.toLowerCase().includes(kw)
      const matchType = c.craftType.toLowerCase().includes(kw)
      const matchArea = c.serviceArea.some((v) => v.toLowerCase().includes(kw))
      if (!matchName && !matchType && !matchArea) return false
    }
    return true
  })
}

/**
 * 排序手艺人：可接单的优先
 * @param {Array} craftsmen
 * @returns {Array}
 */
export function sortByAvailability(craftsmen) {
  return [...craftsmen].sort((a, b) => {
    if (a.status === 'available' && b.status !== 'available') return -1
    if (a.status !== 'available' && b.status === 'available') return 1
    return 0
  })
}

/**
 * 检查是否为有效的图片 base64 字符串
 * @param {string} str
 * @returns {boolean}
 */
export function isValidBase64Image(str) {
  return typeof str === 'string' && /^data:image\//.test(str)
}

/**
 * 截断文本
 * @param {string} text
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(text, maxLen = 20) {
  if (!text || text.length <= maxLen) return text
  return text.substring(0, maxLen) + '...'
}

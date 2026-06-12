/**
 * 时间格式化工具
 * 提供统一的时间展示逻辑
 */

/**
 * 将 ISO 时间字符串格式化为相对时间描述
 * @param {string} isoString - ISO 8601 时间字符串
 * @returns {string} 人类可读的时间描述
 */
export function formatRelativeTime(isoString) {
  const now = Date.now()
  const then = new Date(isoString).getTime()
  const diff = now - then

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`
  if (days < 365) return `${Math.floor(days / 30)}个月前`
  return `${Math.floor(days / 365)}年前`
}

/**
 * 格式化为完整日期字符串
 * @param {string} isoString
 * @returns {string} yyyy-MM-dd HH:mm
 */
export function formatFullDate(isoString) {
  const d = new Date(isoString)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/**
 * 生成唯一 ID
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

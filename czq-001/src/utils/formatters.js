/**
 * 格式化工具函数
 */

/** 格式化为人民币 */
export function formatCurrency(value) {
  if (value == null || isNaN(value)) return '¥0.00'
  return '¥' + Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** 格式化为数字(保留2位小数) */
export function formatNumber(value, decimals = 2) {
  if (value == null || isNaN(value)) return '0.' + '0'.repeat(decimals)
  return Number(value).toFixed(decimals)
}

/** 格式化面积 */
export function formatArea(value) {
  if (value == null || isNaN(value)) return '0 亩'
  return Number(value).toFixed(1) + ' 亩'
}

/** 格式化日期 */
export function formatDate(dateStr) {
  const d = new Date(dateStr)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** 生成唯一ID */
export function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
}

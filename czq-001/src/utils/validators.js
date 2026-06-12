/**
 * 输入验证工具
 */

/** 验证非负数 */
export function isNonNegative(value) {
  const num = Number(value)
  return !isNaN(num) && num >= 0
}

/** 验证正数 */
export function isPositive(value) {
  const num = Number(value)
  return !isNaN(num) && num > 0
}

/** 验证面积 (0.1 - 100000 亩) */
export function validateArea(value) {
  const num = Number(value)
  if (isNaN(num)) return '请输入有效数字'
  if (num <= 0) return '面积必须大于0'
  if (num > 100000) return '面积不能超过100000亩'
  return ''
}

/** 安全解析数字 */
export function safeParseNumber(value, fallback = 0) {
  const num = Number(value)
  return isNaN(num) ? fallback : num
}

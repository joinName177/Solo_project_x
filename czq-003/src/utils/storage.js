/**
 * localStorage 封装层
 * 职责: 提供类型安全的持久化读写，统一错误处理
 */

/**
 * 从 localStorage 读取并解析 JSON 数据
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 解析后的数据或默认值
 */
export function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch (error) {
    console.error(`[Storage] 读取 "${key}" 失败:`, error)
    return defaultValue
  }
}

/**
 * 将数据序列化为 JSON 并写入 localStorage
 * @param {string} key - 存储键名
 * @param {*} value - 要存储的数据
 * @returns {boolean} 是否写入成功
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`[Storage] 写入 "${key}" 失败:`, error)
    return false
  }
}

/**
 * 从 localStorage 中删除指定键
 * @param {string} key - 存储键名
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`[Storage] 删除 "${key}" 失败:`, error)
  }
}

/**
 * 生成唯一 ID
 * @returns {string} 唯一标识符
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

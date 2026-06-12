/**
 * localStorage 抽象层
 * 职责：统一的本地存储读写，键名管理与异常处理
 */

const STORAGE_KEY = 'farm_machinery_board_items'

/**
 * 从 localStorage 读取所有信息条目
 * @returns {Array} 条目数组
 */
export function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    console.warn('localStorage 读取失败，返回空数组')
    return []
  }
}

/**
 * 将所有信息条目写入 localStorage
 * @param {Array} items
 */
export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('localStorage 写入失败:', e)
  }
}

/**
 * 获取下一条目的唯一 ID
 * @param {Array} items
 * @returns {number}
 */
export function generateId(items) {
  if (items.length === 0) return 1
  return Math.max(...items.map(item => item.id)) + 1
}

/**
 * 清空所有数据（调试用）
 */
export function clearAll() {
  localStorage.removeItem(STORAGE_KEY)
}

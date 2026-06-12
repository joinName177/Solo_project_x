// ============================================================
// localStorage 持久化管理
// ============================================================

import { STORAGE_KEY } from '../utils/constants.js'

/**
 * 保存游戏数据到 localStorage
 * @param {Object} data - 游戏存档数据
 */
export function saveGame(data) {
  try {
    const json = JSON.stringify(data)
    localStorage.setItem(STORAGE_KEY, json)
    return true
  } catch (e) {
    console.warn('存档失败:', e)
    return false
  }
}

/**
 * 从 localStorage 读取存档
 * @returns {Object|null} 存档数据或 null
 */
export function loadGame() {
  try {
    const json = localStorage.getItem(STORAGE_KEY)
    if (!json) return null
    const data = JSON.parse(json)
    // 基本数据校验
    if (!data || typeof data !== 'object') return null
    return data
  } catch (e) {
    console.warn('读档失败:', e)
    return null
  }
}

/**
 * 删除存档
 */
export function clearGame() {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * 检查是否有存档
 */
export function hasSaveData() {
  return loadGame() !== null
}

/**
 * 本地存储模块（纯函数）
 *
 * 对 localStorage 的封装，提供类型安全的读写操作，
 * 包含错误处理和容量检测。
 */

const STORAGE_PREFIX = 'crop_disease_'
const STORAGE_KEYS = {
  DIARY: `${STORAGE_PREFIX}diary`,
  SETTINGS: `${STORAGE_PREFIX}settings`
}

// ---- localStorage 基础操作 ----

/**
 * 安全写入 localStorage
 * @param {string} key
 * @param {*} value
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('localStorage 存储空间不足，请清理旧数据')
    } else {
      console.error('localStorage 写入失败:', e)
    }
    return false
  }
}

/**
 * 安全读取 localStorage
 * @param {string} key
 * @param {*} fallback - 默认值
 * @returns {*}
 */
function safeGetItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    console.error('localStorage 读取失败:', e)
    return fallback
  }
}

// ---- 农田日记 CRUD ----

/**
 * 获取全部日记记录
 * @returns {object[]}
 */
export function getDiaryEntries() {
  return safeGetItem(STORAGE_KEYS.DIARY, [])
}

/**
 * 添加日记记录
 * @param {{cropId:string, cropName:string, diseaseName:string, method:string, notes:string, image:string|null, date:string}} entry
 * @returns {object} 添加后的记录（含id）
 */
export function addDiaryEntry(entry) {
  const entries = getDiaryEntries()
  const newEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString()
  }
  entries.unshift(newEntry)
  safeSetItem(STORAGE_KEYS.DIARY, entries)
  return newEntry
}

/**
 * 删除日记记录
 * @param {string} id
 * @returns {boolean}
 */
export function deleteDiaryEntry(id) {
  const entries = getDiaryEntries()
  const filtered = entries.filter(e => e.id !== id)
  if (filtered.length === entries.length) return false
  safeSetItem(STORAGE_KEYS.DIARY, filtered)
  return true
}

/**
 * 按日期范围查询日记
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {object[]}
 */
export function getDiaryByDateRange(startDate, endDate) {
  const entries = getDiaryEntries()
  return entries.filter(e => e.date >= startDate && e.date <= endDate)
}

/**
 * 获取日记总数
 * @returns {number}
 */
export function getDiaryCount() {
  return getDiaryEntries().length
}

// ---- 设置操作 ----

/**
 * 获取用户设置
 * @returns {object}
 */
export function getSettings() {
  return safeGetItem(STORAGE_KEYS.SETTINGS, {
    lastCropId: null
  })
}

/**
 * 保存用户设置
 * @param {object} settings
 */
export function saveSettings(settings) {
  const current = getSettings()
  safeSetItem(STORAGE_KEYS.SETTINGS, { ...current, ...settings })
}

// ---- 工具函数 ----

/**
 * 生成唯一ID
 * @returns {string}
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

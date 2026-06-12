/**
 * localStorage 封装层
 *
 * 职责：
 * - 提供类型安全的读写接口
 * - 统一错误处理（quota 超限、解析失败）
 * - 对上层完全透明，可随时替换为 IndexedDB / 远程 API
 */

/**
 * 从 localStorage 读取 JSON 数据
 * @param {string} key - 键名
 * @param {*} fallback - 读取失败或不存在时的默认值
 * @returns {*} 解析后的数据
 */
export function read(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (e) {
    console.warn(`[storage] 读取 "${key}" 失败:`, e.message)
    return fallback
  }
}

/**
 * 将数据以 JSON 格式写入 localStorage
 * @param {string} key - 键名
 * @param {*} value - 要存储的数据
 * @returns {boolean} 是否写入成功
 */
export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error(`[storage] 写入 "${key}" 失败:`, e.message)
    return false
  }
}

/**
 * 从 localStorage 中删除指定键
 * @param {string} key - 键名
 */
export function remove(key) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn(`[storage] 删除 "${key}" 失败:`, e.message)
  }
}

/**
 * 检查 localStorage 是否可用
 * @returns {boolean}
 */
export function isAvailable() {
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

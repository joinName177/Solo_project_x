import { ref, watch } from 'vue'

/**
 * localStorage 响应式封装
 * 提供统一的持久化读写接口，隔离存储实现细节
 *
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {{ data: import('vue').Ref, save: Function, clear: Function }}
 */
export function useStorage(key, defaultValue) {
  const data = ref(defaultValue)

  // 初始化时从 localStorage 读取
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      data.value = JSON.parse(stored)
    }
  } catch (e) {
    console.warn(`[useStorage] 读取 "${key}" 失败:`, e.message)
    data.value = defaultValue
  }

  // 数据变更时自动持久化
  watch(
    data,
    (val) => {
      try {
        if (val === null || val === undefined) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(val))
        }
      } catch (e) {
        console.warn(`[useStorage] 写入 "${key}" 失败:`, e.message)
      }
    },
    { deep: true }
  )

  /**
   * 手动触发保存
   */
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(data.value))
    } catch (e) {
      console.warn(`[useStorage] 保存 "${key}" 失败:`, e.message)
    }
  }

  /**
   * 清除数据
   */
  function clear() {
    data.value = defaultValue
    localStorage.removeItem(key)
  }

  return { data, save, clear }
}

import { ref, watch } from 'vue'
import { loadFromStorage, saveToStorage } from '../utils/storage.js'
import { STORAGE_KEYS } from '../utils/constants.js'

/**
 * 用户信息管理 Composable
 * 职责: 管理当前用户的姓名（从 useEvents 中解耦）
 */

// ---- 模块级共享状态 ----
const userName = ref(loadFromStorage(STORAGE_KEYS.USER_NAME, ''))

// 自动持久化
watch(userName, (val) => {
  saveToStorage(STORAGE_KEYS.USER_NAME, val)
})

export function useUser() {
  return { userName }
}

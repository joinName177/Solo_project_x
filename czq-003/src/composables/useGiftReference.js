import { ref, watch } from 'vue'
import { loadFromStorage, saveToStorage, generateId } from '../utils/storage.js'
import { STORAGE_KEYS, DEFAULT_GIFT_REFERENCES } from '../utils/constants.js'

/**
 * 随礼行情参考 Composable
 * 职责: 随礼标准的增删改查，支持自定义修改
 */

// ---- 模块级共享状态 ----
const giftReferences = ref(
  loadFromStorage(STORAGE_KEYS.GIFT_REFERENCES, DEFAULT_GIFT_REFERENCES)
)

// 自动持久化
watch(giftReferences, (val) => {
  saveToStorage(STORAGE_KEYS.GIFT_REFERENCES, val)
}, { deep: true })

// ---- 操作方法 ----

/**
 * 添加自定义随礼标准
 * @param {Object} refData - { relationship, minAmount, maxAmount }
 */
function addGiftReference(refData) {
  giftReferences.value.push({
    id: generateId(),
    relationship: refData.relationship.trim(),
    minAmount: Number(refData.minAmount),
    maxAmount: Number(refData.maxAmount)
  })
}

/**
 * 更新随礼标准
 * @param {string} id - 标准ID
 * @param {Object} updates - 更新字段
 */
function updateGiftReference(id, updates) {
  const index = giftReferences.value.findIndex(r => r.id === id)
  if (index !== -1) {
    giftReferences.value[index] = {
      ...giftReferences.value[index],
      ...updates,
      minAmount: Number(updates.minAmount),
      maxAmount: Number(updates.maxAmount)
    }
  }
}

/**
 * 删除随礼标准
 * @param {string} id - 标准ID
 */
function deleteGiftReference(id) {
  giftReferences.value = giftReferences.value.filter(r => r.id !== id)
}

/**
 * 重置为默认随礼标准
 */
function resetGiftReferences() {
  giftReferences.value = DEFAULT_GIFT_REFERENCES.map(r => ({ ...r }))
}

// ---- 导出 ----
export function useGiftReference() {
  return {
    giftReferences,
    addGiftReference,
    updateGiftReference,
    deleteGiftReference,
    resetGiftReferences
  }
}

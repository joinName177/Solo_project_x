import { computed } from 'vue'
import { useStorage } from './useStorage'
import { STORAGE_KEYS, STATUS_MAP } from '../utils/constants'
import { generateId } from '../utils/helpers'

/**
 * 手艺人数据管理层
 * 封装所有手艺人的 CRUD 操作，是手艺人数据的唯一出入口
 */
export function useCraftsmen() {
  const { data: craftsmen, save, clear } = useStorage(STORAGE_KEYS.CRAFTSMEN, [])

  // ========== 计算属性 ==========

  /** 可接单的手艺人 */
  const availableList = computed(() =>
    craftsmen.value.filter((c) => c.status === 'available')
  )

  /** 忙碌中的手艺人 */
  const busyList = computed(() =>
    craftsmen.value.filter((c) => c.status === 'busy')
  )

  // ========== CRUD 操作 ==========

  /**
   * 添加入驻手艺人
   * @param {Object} formData - 表单数据
   * @returns {Object} 创建的手艺人对象
   */
  function addCraftsman(formData) {
    const craftsman = {
      id: generateId(),
      name: formData.name.trim(),
      craftType: formData.craftType,
      phone: formData.phone.trim(),
      serviceArea: [...formData.serviceArea],
      pricing: formData.pricing.trim(),
      photos: formData.photos || [],
      description: formData.description?.trim() || '',
      status: 'available',
      ratings: [],
      orderCount: 0,
      createdAt: Date.now()
    }
    craftsmen.value.unshift(craftsman)
    return craftsman
  }

  /**
   * 更新手艺人信息
   * @param {string} id
   * @param {Object} updates
   */
  function updateCraftsman(id, updates) {
    const index = craftsmen.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      craftsmen.value[index] = { ...craftsmen.value[index], ...updates }
    }
  }

  /**
   * 删除手艺人
   * @param {string} id
   */
  function removeCraftsman(id) {
    const index = craftsmen.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      craftsmen.value.splice(index, 1)
    }
  }

  /**
   * 切换手艺人状态（可接单/忙碌中）
   * @param {string} id
   */
  function toggleStatus(id) {
    const craftsman = craftsmen.value.find((c) => c.id === id)
    if (craftsman) {
      craftsman.status = craftsman.status === 'available' ? 'busy' : 'available'
    }
  }

  /**
   * 增加接单计数
   * @param {string} id
   */
  function incrementOrderCount(id) {
    const craftsman = craftsmen.value.find((c) => c.id === id)
    if (craftsman) {
      craftsman.orderCount++
    }
  }

  /**
   * 根据 ID 获取手艺人
   * @param {string} id
   * @returns {Object|undefined}
   */
  function getById(id) {
    return craftsmen.value.find((c) => c.id === id)
  }

  /**
   * 获取手艺类型标签
   * @param {string} craftType
   * @returns {string}
   */
  function getStatusLabel(status) {
    return STATUS_MAP[status]?.label || '未知'
  }

  return {
    // 数据
    craftsmen,
    availableList,
    busyList,
    // 操作
    addCraftsman,
    updateCraftsman,
    removeCraftsman,
    toggleStatus,
    incrementOrderCount,
    getById,
    getStatusLabel,
    save,
    clear
  }
}

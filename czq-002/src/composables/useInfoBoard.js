/**
 * 信息板核心业务逻辑
 * 职责：信息的增删改查、筛选、状态管理
 * 耦合：仅依赖 core/storage
 *
 * 高内聚：所有信息板的数据和操作集中在此单一模块
 * 低耦合：对外仅暴露数据和方法，不依赖任何 UI 组件
 */

import { ref, reactive, computed } from 'vue'
import { loadItems, saveItems, generateId } from '../core/storage.js'

// --- 全局共享状态（模块级单例，跨组件共享） ---
const items = ref(loadItems())

// --- 默认筛选条件 ---
const DEFAULT_FILTERS = {
  type: '',           // '' | 'supply' | 'demand'
  machineType: '',    // '' | 'tractor' | 'harvester' | 'seeder' | 'drone'
  village: '',        // 村庄关键词
  status: 'active'    // 'active' | 'completed' | 'all'
}

export function useInfoBoard() {
  // --- 筛选条件（单对象替代多 ref，减少接口表面积） ---
  const filters = reactive({ ...DEFAULT_FILTERS })

  // --- 筛选后的列表 ---
  const filteredItems = computed(() => {
    let result = items.value

    // 状态筛选
    if (filters.status === 'active') {
      result = result.filter(item => item.status === 'active')
    } else if (filters.status === 'completed') {
      result = result.filter(item => item.status === 'completed')
    }
    // 'all' 不筛选

    // 农机类型筛选
    if (filters.machineType) {
      result = result.filter(item => item.machineType === filters.machineType)
    }

    // 信息类型筛选（出租/求租）
    if (filters.type) {
      result = result.filter(item => item.type === filters.type)
    }

    // 村庄关键词匹配
    if (filters.village.trim()) {
      const keyword = filters.village.trim()
      result = result.filter(item => item.village.includes(keyword))
    }

    // 按时间倒序
    return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  // --- 统计数据 ---
  const stats = computed(() => ({
    total: items.value.filter(i => i.status === 'active').length,
    supply: items.value.filter(i => i.status === 'active' && i.type === 'supply').length,
    demand: items.value.filter(i => i.status === 'active' && i.type === 'demand').length
  }))

  // --- 操作 ---

  /** 添加一条信息 */
  function addItem(data) {
    const item = {
      id: generateId(items.value),
      ...data,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    items.value.push(item)
    persist()
    return item
  }

  /** 标记为已租出/已完成 */
  function markCompleted(id) {
    const target = items.value.find(i => i.id === id)
    if (target) {
      target.status = 'completed'
      persist()
    }
  }

  /** 重新激活 */
  function markActive(id) {
    const target = items.value.find(i => i.id === id)
    if (target) {
      target.status = 'active'
      persist()
    }
  }

  /** 删除一条信息 */
  function deleteItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    persist()
  }

  /** 根据 ID 获取条目 */
  function getItemById(id) {
    return items.value.find(i => i.id === id)
  }

  /** 重置筛选条件 */
  function resetFilters() {
    Object.assign(filters, DEFAULT_FILTERS)
  }

  /** 写回 localStorage */
  function persist() {
    saveItems(items.value)
  }

  return {
    // 数据
    items,
    // 筛选（单一对象，便于整体传递）
    filters,
    DEFAULT_FILTERS,
    // 计算
    filteredItems,
    stats,
    // 操作
    addItem,
    markCompleted,
    markActive,
    deleteItem,
    getItemById,
    resetFilters
  }
}

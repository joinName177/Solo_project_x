/**
 * 零工数据管理 composable
 *
 * 职责：
 * - 零工信息的 CRUD
 * - localStorage 持久化
 * - 数据排序（按发布时间倒序）
 * - 首次使用时写入种子数据
 *
 * 这是整个应用的核心状态层，所有组件通过此 composable 读写数据。
 */
import { reactive, computed } from 'vue'
import { read, write } from '../utils/storage.js'
import { STORAGE_KEYS, SEED_GIGS } from '../utils/constants.js'
import { generateId } from '../utils/time.js'

/** @typedef {import('../utils/constants.js').GigItem} GigItem */

const state = reactive({
  /** @type {GigItem[]} */
  items: [],
  initialized: false,
})

function init() {
  if (state.initialized) return
  const stored = read(STORAGE_KEYS.GIGS)
  if (stored && stored.length > 0) {
    state.items = stored
  } else {
    state.items = [...SEED_GIGS]
    persist()
  }
  state.initialized = true
}

function persist() {
  write(STORAGE_KEYS.GIGS, state.items)
}

/**
 * 零工数据管理入口
 * 在应用根组件中调用一次以初始化数据
 */
export function useGigs() {
  init()

  /** 按时间倒序排列的零工列表 */
  const gigs = computed(() => {
    return [...state.items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  /** 进行中的零工数量 */
  const activeCount = computed(() => state.items.filter((g) => !g.completed).length)

  // ---- CRUD 操作 ----

  /**
   * 发布新零工信息
   * @param {Omit<GigItem, 'id' | 'createdAt' | 'completed'>} data
   * @returns {GigItem}
   */
  function addGig(data) {
    const gig = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      completed: false,
    }
    state.items.unshift(gig)
    persist()
    return gig
  }

  /**
   * 更新零工信息
   * @param {string} id
   * @param {Partial<GigItem>} updates
   */
  function updateGig(id, updates) {
    const index = state.items.findIndex((g) => g.id === id)
    if (index === -1) return
    state.items[index] = { ...state.items[index], ...updates }
    persist()
  }

  /**
   * 删除零工信息
   * @param {string} id
   */
  function removeGig(id) {
    const index = state.items.findIndex((g) => g.id === id)
    if (index === -1) return
    state.items.splice(index, 1)
    persist()
  }

  /**
   * 切换零工的完成状态
   * @param {string} id
   */
  function toggleComplete(id) {
    const gig = state.items.find((g) => g.id === id)
    if (gig) {
      gig.completed = !gig.completed
      persist()
    }
  }

  /**
   * 根据 ID 查找零工
   * @param {string} id
   * @returns {GigItem | undefined}
   */
  function getGigById(id) {
    return state.items.find((g) => g.id === id)
  }

  return {
    gigs,
    activeCount,
    addGig,
    updateGig,
    removeGig,
    toggleComplete,
    getGigById,
  }
}

import { ref, computed, watch } from 'vue'
import { loadFromStorage, saveToStorage, generateId } from '../utils/storage.js'
import { STORAGE_KEYS, EVENT_STATUS } from '../utils/constants.js'

/**
 * 事件管理 Composable
 * 职责: 事件 CRUD、筛选、归档、帮忙事项认领
 * 单一数据源: localStorage
 * 注: 用户姓名管理已解耦至 useUser.js
 */

// ---- 模块级共享状态（单例） ----
const events = ref([])
const filterType = ref('all')
const searchKeyword = ref('')

// 初始化时从 localStorage 加载
events.value = loadFromStorage(STORAGE_KEYS.EVENTS, [])

// 任何变更自动持久化
watch(events, (val) => {
  saveToStorage(STORAGE_KEYS.EVENTS, val)
}, { deep: true })

// ---- 计算属性 ----
const activeEvents = computed(() =>
  events.value.filter(e => e.status === 'active')
)

const archivedEvents = computed(() =>
  events.value.filter(e => e.status === 'completed')
)

const filteredEvents = computed(() => {
  let result = events.value

  // 'completed' 作为特殊的筛选类型，按状态筛选
  if (filterType.value === 'completed') {
    result = result.filter(e => e.status === 'completed')
  } else if (filterType.value !== 'all') {
    result = result.filter(e =>
      e.eventType === filterType.value && e.status === 'active'
    )
  } else {
    // 默认只显示进行中的事件
    result = result.filter(e => e.status === 'active')
  }

  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(e =>
      e.hostName.toLowerCase().includes(keyword) ||
      e.helpItems.some(h => h.description.toLowerCase().includes(keyword))
    )
  }

  // 按日期降序排列: 最近的在前
  return result.slice().sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  )
})

const eventTypeCounts = computed(() => {
  const counts = { all: activeEvents.value.length }
  activeEvents.value.forEach(e => {
    counts[e.eventType] = (counts[e.eventType] || 0) + 1
  })
  return counts
})

// ---- 操作方法 ----

/**
 * 创建新事件
 * @param {Object} eventData - 事件数据
 */
function createEvent(eventData) {
  const newEvent = {
    id: generateId(),
    hostName: eventData.hostName.trim(),
    eventType: eventData.eventType,
    eventDate: eventData.eventDate,
    notes: eventData.notes || '',
    helpItems: (eventData.helpItems || []).map(item => ({
      id: generateId(),
      description: typeof item === 'string' ? item : item.description,
      claimedBy: '',
      claimedAt: ''
    })),
    status: EVENT_STATUS.active.label === '进行中' ? 'active' : 'active',
    createdAt: new Date().toISOString(),
    completedAt: ''
  }
  events.value.push(newEvent)
  return newEvent
}

/**
 * 更新事件
 * @param {string} eventId - 事件ID
 * @param {Object} updates - 更新字段
 */
function updateEvent(eventId, updates) {
  const index = events.value.findIndex(e => e.id === eventId)
  if (index !== -1) {
    events.value[index] = { ...events.value[index], ...updates }
  }
}

/**
 * 删除事件
 * @param {string} eventId - 事件ID
 */
function deleteEvent(eventId) {
  events.value = events.value.filter(e => e.id !== eventId)
}

/**
 * 将事件标记为已完成（归档）
 * @param {string} eventId - 事件ID
 */
function archiveEvent(eventId) {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    event.status = 'completed'
    event.completedAt = new Date().toISOString()
  }
}

/**
 * 将已归档事件恢复为进行中
 * @param {string} eventId - 事件ID
 */
function unarchiveEvent(eventId) {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    event.status = 'active'
    event.completedAt = ''
  }
}

/**
 * 为事件添加帮忙事项
 * @param {string} eventId - 事件ID
 * @param {string} description - 事项描述
 */
function addHelpItem(eventId, description) {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    event.helpItems.push({
      id: generateId(),
      description: description.trim(),
      claimedBy: '',
      claimedAt: ''
    })
  }
}

/**
 * 删除帮忙事项
 * @param {string} eventId - 事件ID
 * @param {string} itemId - 事项ID
 */
function removeHelpItem(eventId, itemId) {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    event.helpItems = event.helpItems.filter(h => h.id !== itemId)
  }
}

/**
 * 认领帮忙事项
 * @param {string} eventId - 事件ID
 * @param {string} itemId - 事项ID
 * @param {string} claimerName - 认领人姓名
 */
function claimHelpItem(eventId, itemId, claimerName) {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    const item = event.helpItems.find(h => h.id === itemId)
    if (item && !item.claimedBy) {
      item.claimedBy = claimerName.trim()
      item.claimedAt = new Date().toISOString()
    }
  }
}

/**
 * 取消认领帮忙事项
 * @param {string} eventId - 事件ID
 * @param {string} itemId - 事项ID
 */
function unclaimHelpItem(eventId, itemId) {
  const event = events.value.find(e => e.id === eventId)
  if (event) {
    const item = event.helpItems.find(h => h.id === itemId)
    if (item) {
      item.claimedBy = ''
      item.claimedAt = ''
    }
  }
}

// ---- 导出 ----
export function useEvents() {
  return {
    // 状态
    events,
    filterType,
    searchKeyword,

    // 计算属性
    activeEvents,
    archivedEvents,
    filteredEvents,
    eventTypeCounts,

    // 事件操作
    createEvent,
    updateEvent,
    deleteEvent,
    archiveEvent,
    unarchiveEvent,

    // 帮忙事项操作
    addHelpItem,
    removeHelpItem,
    claimHelpItem,
    unclaimHelpItem
  }
}

/**
 * 事件类型常量
 * 红事: 喜庆类事件 / 白事: 丧葬类事件
 */
export const EVENT_TYPES = {
  wedding: { label: '结婚', category: 'red', icon: '💒' },
  fullMoon: { label: '满月', category: 'red', icon: '👶' },
  housewarming: { label: '乔迁', category: 'red', icon: '🏠' },
  funeral: { label: '丧葬', category: 'white', icon: '🕯️' }
}

/**
 * 事件分类: 红事 / 白事
 */
export const EVENT_CATEGORIES = {
  red: { label: '红事', color: '#c0392b', bgColor: '#fde8e8' },
  white: { label: '白事', color: '#2c3e50', bgColor: '#e8e8e8' }
}

/**
 * 事件状态
 */
export const EVENT_STATUS = {
  active: { label: '进行中' },
  completed: { label: '已完成' }
}

/**
 * 常见帮忙事项类型（供快速选择）
 */
export const DEFAULT_HELP_TYPES = [
  '搭棚子',
  '借桌椅',
  '帮厨',
  '随礼登记',
  '联系唢呐班',
  '采购食材',
  '洗碗打杂',
  '接待宾客',
  '布置场地',
  '接送亲友',
  '烧水递茶',
  '记账管账'
]

/**
 * 默认随礼行情参考（按关系远近）
 */
export const DEFAULT_GIFT_REFERENCES = [
  { id: '1', relationship: '至亲', minAmount: 500, maxAmount: 1000 },
  { id: '2', relationship: '近亲', minAmount: 300, maxAmount: 500 },
  { id: '3', relationship: '远亲', minAmount: 200, maxAmount: 300 },
  { id: '4', relationship: '邻居', minAmount: 100, maxAmount: 200 },
  { id: '5', relationship: '朋友', minAmount: 200, maxAmount: 500 },
  { id: '6', relationship: '同村乡亲', minAmount: 50, maxAmount: 100 }
]

/**
 * localStorage 存储键名
 */
export const STORAGE_KEYS = {
  EVENTS: 'village_board_events',
  GIFT_REFERENCES: 'village_board_gift_refs',
  USER_NAME: 'village_board_user_name'
}

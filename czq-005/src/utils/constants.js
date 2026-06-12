/**
 * 手艺类型枚举及其图标和标签
 */
export const CRAFT_TYPES = [
  { key: 'carpenter', label: '木匠', icon: '🪵' },
  { key: 'mason', label: '泥瓦匠', icon: '🧱' },
  { key: 'electrician', label: '电工', icon: '⚡' },
  { key: 'welder', label: '焊工', icon: '🔥' },
  { key: 'mechanic', label: '修农机', icon: '🚜' },
  { key: 'phone_repair', label: '修手机', icon: '📱' },
  { key: 'barber', label: '剃头匠', icon: '✂️' },
  { key: 'tailor', label: '裁缝', icon: '🧵' },
  { key: 'painter', label: '油漆工', icon: '🎨' },
  { key: 'plumber', label: '水管工', icon: '🔧' },
  { key: 'cook', label: '乡厨', icon: '🍳' },
  { key: 'other', label: '其他', icon: '🛠️' }
]

/**
 * 手艺人的接单状态
 */
export const STATUS_MAP = {
  available: { label: '可接单', className: 'status-available' },
  busy: { label: '忙碌中', className: 'status-busy' }
}

/**
 * 本地存储的键名常量
 */
export const STORAGE_KEYS = {
  CRAFTSMEN: 'rural_craftsmen_data',
  SETTINGS: 'rural_craftsmen_settings'
}

/**
 * 村庄列表（示例数据，实际可由用户扩展）
 */
export const DEFAULT_VILLAGES = [
  '张家村', '李家庄', '王家屯', '赵家沟', '孙家湾',
  '周家坡', '吴家堡', '郑家寨', '钱家桥', '陈家庄'
]

/**
 * 排行榜排序方式
 */
export const RANK_SORT = {
  COMPREHENSIVE: 'comprehensive', // 综合排序（接单量 + 评分）
  ORDERS: 'orders',               // 按接单量
  RATING: 'rating'                // 按评分
}

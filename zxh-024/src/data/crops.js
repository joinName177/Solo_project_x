/**
 * 农作物数据模块
 * 定义10种常见作物的基础信息
 */

export const crops = [
  { id: 'rice', name: '水稻', icon: '🌾', season: '夏秋季', category: '粮食作物' },
  { id: 'wheat', name: '小麦', icon: '🌿', season: '冬春季', category: '粮食作物' },
  { id: 'corn', name: '玉米', icon: '🌽', season: '夏秋季', category: '粮食作物' },
  { id: 'apple', name: '苹果', icon: '🍎', season: '夏秋季', category: '果树' },
  { id: 'tomato', name: '番茄', icon: '🍅', season: '春夏秋季', category: '蔬菜' },
  { id: 'cucumber', name: '黄瓜', icon: '🥒', season: '春夏秋季', category: '蔬菜' },
  { id: 'potato', name: '马铃薯', icon: '🥔', season: '春秋季', category: '蔬菜' },
  { id: 'grape', name: '葡萄', icon: '🍇', season: '夏秋季', category: '果树' },
  { id: 'soybean', name: '大豆', icon: '🫘', season: '夏秋季', category: '经济作物' },
  { id: 'citrus', name: '柑橘', icon: '🍊', season: '秋冬春季', category: '果树' }
]

/**
 * 根据ID获取作物信息
 * @param {string} id
 * @returns {object|undefined}
 */
export function getCropById(id) {
  return crops.find(c => c.id === id)
}

/**
 * 根据名称获取作物信息
 * @param {string} name
 * @returns {object|undefined}
 */
export function getCropByName(name) {
  return crops.find(c => c.name === name)
}

/**
 * 农产品分类及对应作物
 * 单一数据源：所有分类和作物在此统一定义
 */
export const CATEGORIES = {
  GRAIN: 'grain',
  VEGETABLE: 'vegetable',
  FRUIT: 'fruit',
  LIVESTOCK: 'livestock',
}

export const CATEGORY_LABELS = {
  [CATEGORIES.GRAIN]: '粮食',
  [CATEGORIES.VEGETABLE]: '蔬菜',
  [CATEGORIES.FRUIT]: '水果',
  [CATEGORIES.LIVESTOCK]: '畜禽',
}

export const CATEGORY_CROPS = {
  [CATEGORIES.GRAIN]: ['小麦', '玉米', '水稻', '大豆', '高粱', '谷子', '红薯', '马铃薯', '花生', '油菜籽'],
  [CATEGORIES.VEGETABLE]: ['白菜', '萝卜', '黄瓜', '西红柿', '茄子', '辣椒', '豆角', '菠菜', '芹菜', '韭菜', '生菜', '西兰花', '菜花', '冬瓜', '南瓜'],
  [CATEGORIES.FRUIT]: ['苹果', '梨', '桃', '葡萄', '西瓜', '草莓', '橘子', '香蕉', '柚子', '猕猴桃', '樱桃', '荔枝', '芒果', '李子', '杏'],
  [CATEGORIES.LIVESTOCK]: ['猪肉', '牛肉', '羊肉', '鸡肉', '鸡蛋', '鸭蛋', '牛奶', '蜂蜜', '兔肉', '鹅肉'],
}

export const PRICE_UNITS = ['元/斤', '元/公斤', '元/吨', '元/个', '元/袋']

export const DEFAULT_UNIT = '元/斤'

export const CHART_COLORS = {
  line: '#4CAF50',
  point: '#2E7D32',
  alert: '#F44336',
  comparison: {
    up: '#F44336',
    down: '#4CAF50',
    same: '#9E9E9E',
  },
}

export const STORAGE_KEYS = {
  PRICE_RECORDS: 'agri_price_records',
  TARGET_PRICES: 'agri_target_prices',
  FONT_SIZE: 'agri_font_size',
}

export const FONT_SIZE_MIN = 14
export const FONT_SIZE_MAX = 24
export const FONT_SIZE_DEFAULT = 16

/**
 * 根据作物名获取其所属分类
 * @param {string} cropName
 * @returns {string | null}
 */
export function getCategoryByCrop(cropName) {
  for (const [category, crops] of Object.entries(CATEGORY_CROPS)) {
    if (crops.includes(cropName)) return category
  }
  return null
}

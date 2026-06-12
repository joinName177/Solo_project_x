/**
 * 作物种植参考标准
 * 每项投入包含：名称、单位、默认每亩用量、默认单价(元/单位)
 * 所有数值均可由用户自定义调整
 */
export const INPUT_CATEGORIES = [
  { key: 'seed', label: '种子', icon: '🌱' },
  { key: 'fertilizerBase', label: '基肥', icon: '🧪' },
  { key: 'fertilizerTop', label: '追肥', icon: '💧' },
  { key: 'pesticide', label: '农药', icon: '🛡️' },
  { key: 'mulchFilm', label: '地膜', icon: '📋' },
  { key: 'irrigation', label: '灌溉', icon: '🚿' },
  { key: 'labor', label: '人工', icon: '👨‍🌾' },
  { key: 'machinery', label: '机械', icon: '🚜' },
]

/**
 * 各作物每亩参考标准
 * usage: 每亩用量
 * unit: 用量单位
 * price: 单价(元/单位)
 * yield: 预估每亩产量(公斤)
 * yieldPrice: 预估每公斤售价(元)
 */
export const CROP_STANDARDS = {
  corn: {
    name: '玉米',
    icon: '🌽',
    yield: 600,        // 公斤/亩
    yieldPrice: 2.4,   // 元/公斤
    inputs: {
      seed:        { usage: 2.5,  unit: '公斤', price: 30 },
      fertilizerBase: { usage: 30,   unit: '公斤', price: 3.0 },
      fertilizerTop:  { usage: 20,   unit: '公斤', price: 3.2 },
      pesticide:   { usage: 1,    unit: '次',   price: 40 },
      mulchFilm:   { usage: 3,    unit: '公斤', price: 14 },
      irrigation:  { usage: 3,    unit: '次',   price: 30 },
      labor:       { usage: 4,    unit: '工日', price: 120 },
      machinery:   { usage: 1,    unit: '次',   price: 80 },
    },
  },
  wheat: {
    name: '小麦',
    icon: '🌾',
    yield: 450,
    yieldPrice: 2.6,
    inputs: {
      seed:        { usage: 15,   unit: '公斤', price: 4.5 },
      fertilizerBase: { usage: 25,   unit: '公斤', price: 3.0 },
      fertilizerTop:  { usage: 15,   unit: '公斤', price: 3.2 },
      pesticide:   { usage: 1,    unit: '次',   price: 35 },
      mulchFilm:   { usage: 0,    unit: '公斤', price: 0 },
      irrigation:  { usage: 2,    unit: '次',   price: 35 },
      labor:       { usage: 3,    unit: '工日', price: 120 },
      machinery:   { usage: 1,    unit: '次',   price: 70 },
    },
  },
  rice: {
    name: '水稻',
    icon: '🍚',
    yield: 550,
    yieldPrice: 2.8,
    inputs: {
      seed:        { usage: 3,    unit: '公斤', price: 40 },
      fertilizerBase: { usage: 25,   unit: '公斤', price: 3.5 },
      fertilizerTop:  { usage: 15,   unit: '公斤', price: 3.5 },
      pesticide:   { usage: 1,    unit: '次',   price: 55 },
      mulchFilm:   { usage: 0,    unit: '公斤', price: 0 },
      irrigation:  { usage: 5,    unit: '次',   price: 25 },
      labor:       { usage: 5,    unit: '工日', price: 120 },
      machinery:   { usage: 1,    unit: '次',   price: 90 },
    },
  },
  soybean: {
    name: '大豆',
    icon: '🫘',
    yield: 200,
    yieldPrice: 5.5,
    inputs: {
      seed:        { usage: 5,    unit: '公斤', price: 12 },
      fertilizerBase: { usage: 15,   unit: '公斤', price: 3.5 },
      fertilizerTop:  { usage: 5,    unit: '公斤', price: 3.5 },
      pesticide:   { usage: 1,    unit: '次',   price: 30 },
      mulchFilm:   { usage: 0,    unit: '公斤', price: 0 },
      irrigation:  { usage: 2,    unit: '次',   price: 30 },
      labor:       { usage: 3,    unit: '工日', price: 120 },
      machinery:   { usage: 1,    unit: '次',   price: 60 },
    },
  },
  vegetable: {
    name: '蔬菜',
    icon: '🥬',
    yield: 2000,
    yieldPrice: 1.8,
    inputs: {
      seed:        { usage: 0.1,  unit: '公斤', price: 200 },
      fertilizerBase: { usage: 50,   unit: '公斤', price: 2.5 },
      fertilizerTop:  { usage: 30,   unit: '公斤', price: 2.8 },
      pesticide:   { usage: 1,    unit: '次',   price: 60 },
      mulchFilm:   { usage: 5,    unit: '公斤', price: 14 },
      irrigation:  { usage: 6,    unit: '次',   price: 25 },
      labor:       { usage: 10,   unit: '工日', price: 120 },
      machinery:   { usage: 1,    unit: '次',   price: 60 },
    },
  },
}

/** 获取所有作物列表 */
export function getCropList() {
  return Object.entries(CROP_STANDARDS).map(([key, val]) => ({
    key,
    name: val.name,
    icon: val.icon,
  }))
}

/** 根据作物key获取默认输入项 */
export function getDefaultInputs(cropKey) {
  const crop = CROP_STANDARDS[cropKey]
  if (!crop) return []
  return INPUT_CATEGORIES.map((cat) => {
    const standard = crop.inputs[cat.key]
    if (!standard || standard.usage === 0) return null // 跳过不适用项(如小麦地膜)
    return {
      categoryKey: cat.key,
      categoryLabel: cat.label,
      categoryIcon: cat.icon,
      usage: standard.usage,
      unit: standard.unit,
      price: standard.price,
    }
  }).filter(Boolean)
}

/** 获取作物产量参考 */
export function getCropYield(cropKey) {
  const crop = CROP_STANDARDS[cropKey]
  if (!crop) return { yield: 0, yieldPrice: 0 }
  return { yield: crop.yield, yieldPrice: crop.yieldPrice }
}

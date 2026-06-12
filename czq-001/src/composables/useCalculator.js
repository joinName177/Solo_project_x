/**
 * useCalculator - 核心计算逻辑
 * 管理单个种植方案的所有输入项和计算
 */
import { reactive, computed, watch, toRaw } from 'vue'
import { getDefaultInputs, getCropYield } from '../constants/cropStandards.js'
import { safeParseNumber } from '../utils/validators.js'
import { generateId } from '../utils/formatters.js'

export function useCalculator(initialData = null) {
  // ---- 状态 ----
  const state = reactive({
    id: initialData?.id || generateId(),
    cropKey: initialData?.cropKey || 'corn',
    area: initialData?.area || 10,
    planName: initialData?.planName || '方案一',
    items: initialData?.items || [],
    customYield: initialData?.customYield ?? null,
    customYieldPrice: initialData?.customYieldPrice ?? null,
  })

  // 初始化时加载默认数据
  if (!initialData?.items || initialData.items.length === 0) {
    state.items = getDefaultInputs(state.cropKey)
  }

  // ---- 计算属性 ----
  const cropYield = computed(() => getCropYield(state.cropKey))

  /** 每项投入的小计 */
  const itemCosts = computed(() =>
    state.items.map((item) => ({
      ...item,
      subtotal: safeParseNumber(item.usage) * safeParseNumber(item.price) * state.area,
    }))
  )

  /** 总成本 */
  const totalCost = computed(() =>
    itemCosts.value.reduce((sum, item) => sum + item.subtotal, 0)
  )

  /** 每亩成本 */
  const costPerMu = computed(() =>
    state.area > 0 ? totalCost.value / state.area : 0
  )

  /** 预估产量 */
  const estimatedYield = computed(() => {
    const y = state.customYield ?? cropYield.value.yield
    return y * state.area
  })

  /** 预估收入 */
  const estimatedRevenue = computed(() => {
    const price = state.customYieldPrice ?? cropYield.value.yieldPrice
    return estimatedYield.value * price
  })

  /** 预估利润 */
  const estimatedProfit = computed(() =>
    estimatedRevenue.value - totalCost.value
  )

  /** 投入产出比 */
  const roi = computed(() =>
    totalCost.value > 0 ? (estimatedProfit.value / totalCost.value * 100).toFixed(1) : '0.0'
  )

  // ---- 方法 ----
  function setCrop(cropKey) {
    state.cropKey = cropKey
    state.items = getDefaultInputs(cropKey)
  }

  function setArea(area) {
    state.area = safeParseNumber(area, 0)
  }

  function updateItem(index, field, value) {
    if (index >= 0 && index < state.items.length) {
      state.items[index][field] = safeParseNumber(value, 0)
    }
  }

  /** 添加自定义投入项 */
  function addCustomItem(categoryLabel = '自定义') {
    state.items.push({
      categoryKey: 'custom_' + Date.now(),
      categoryLabel,
      categoryIcon: '📦',
      usage: 0,
      unit: '份',
      price: 0,
    })
  }

  /** 删除投入项 */
  function removeItem(index) {
    if (index >= 0 && index < state.items.length) {
      state.items.splice(index, 1)
    }
  }

  /** 重置为默认值 */
  function resetToDefaults() {
    state.items = getDefaultInputs(state.cropKey)
    state.customYield = null
    state.customYieldPrice = null
  }

  /** 获取当前方案的快照数据(用于保存) */
  function getSnapshot() {
    return {
      id: state.id,
      cropKey: state.cropKey,
      area: state.area,
      planName: state.planName,
      items: toRaw(state.items).map((item) => ({ ...item })),
      customYield: state.customYield,
      customYieldPrice: state.customYieldPrice,
      totals: {
        totalCost: totalCost.value,
        costPerMu: costPerMu.value,
        estimatedYield: estimatedYield.value,
        estimatedRevenue: estimatedRevenue.value,
        estimatedProfit: estimatedProfit.value,
        roi: roi.value,
      },
    }
  }

  /** 从快照恢复 */
  function loadSnapshot(snapshot) {
    state.id = snapshot.id || generateId()
    state.cropKey = snapshot.cropKey
    state.area = snapshot.area
    state.planName = snapshot.planName
    state.items = snapshot.items.map((item) => ({ ...item }))
    state.customYield = snapshot.customYield
    state.customYieldPrice = snapshot.customYieldPrice
  }

  return {
    state,
    // 计算属性
    itemCosts,
    totalCost,
    costPerMu,
    estimatedYield,
    estimatedRevenue,
    estimatedProfit,
    roi,
    cropYield,
    // 方法
    setCrop,
    setArea,
    updateItem,
    addCustomItem,
    removeItem,
    resetToDefaults,
    getSnapshot,
    loadSnapshot,
  }
}

/**
 * 价格数据管理 composable
 * 职责：价格记录的 CRUD、筛选、排序、与 storage 同步
 */
import { ref, watch } from 'vue'
import { loadRecords, saveRecords, loadTargetPrices, saveTargetPrices } from '../utils/storage.js'
import { getCategoryByCrop } from '../utils/constants.js'

// ---- 模块级单例 ----
const records = ref([])
const targetPrices = ref({})
let initialized = false

function init() {
  if (initialized) return
  records.value = loadRecords()
  targetPrices.value = loadTargetPrices()
  initialized = true
}

// 持久化
watch(records, val => saveRecords(val), { deep: true })
watch(targetPrices, val => saveTargetPrices(val), { deep: true })

// ---- 记录 CRUD ----
function addRecord({ cropName, price, unit, date, location, note }) {
  records.value.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    cropName,
    category: getCategoryByCrop(cropName),
    price: Number(price),
    unit,
    date,
    location,
    note: note || '',
    createdAt: Date.now(),
  })
}

function updateRecord(id, updates) {
  const idx = records.value.findIndex(r => r.id === id)
  if (idx === -1) return false
  const updated = { ...records.value[idx], ...updates, id: records.value[idx].id }
  if (updates.cropName) {
    updated.category = getCategoryByCrop(updates.cropName)
  }
  records.value[idx] = updated
  return true
}

function deleteRecord(id) {
  const idx = records.value.findIndex(r => r.id === id)
  if (idx === -1) return false
  records.value.splice(idx, 1)
  return true
}

// ---- 筛选 ----
function getFilteredRecords(category) {
  if (!category) return [...records.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  return records.value
    .filter(r => r.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

// ---- 目标价格 ----
function setTargetPrice(cropName, price) {
  if (price === null || price === undefined || price === '') {
    delete targetPrices.value[cropName]
  } else {
    targetPrices.value[cropName] = Number(price)
  }
  // 显式触发响应式更新
  targetPrices.value = { ...targetPrices.value }
}

function getTargetPrice(cropName) {
  return targetPrices.value[cropName] ?? null
}

// ---- 导出 ----
export function usePriceData() {
  init()

  return {
    records,
    targetPrices,
    addRecord,
    updateRecord,
    deleteRecord,
    getFilteredRecords,
    setTargetPrice,
    getTargetPrice,
  }
}

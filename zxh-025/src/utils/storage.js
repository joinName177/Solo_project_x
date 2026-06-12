/**
 * localStorage 操作封装
 * 职责：纯粹的存储读写，不包含任何业务逻辑
 */
import { STORAGE_KEYS } from './constants.js'

function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function loadRecords() {
  return safeGet(STORAGE_KEYS.PRICE_RECORDS, [])
}

export function saveRecords(records) {
  return safeSet(STORAGE_KEYS.PRICE_RECORDS, records)
}

export function loadTargetPrices() {
  return safeGet(STORAGE_KEYS.TARGET_PRICES, {})
}

export function saveTargetPrices(targets) {
  return safeSet(STORAGE_KEYS.TARGET_PRICES, targets)
}

export function loadFontSize() {
  return safeGet(STORAGE_KEYS.FONT_SIZE, null)
}

export function saveFontSize(size) {
  return safeSet(STORAGE_KEYS.FONT_SIZE, size)
}

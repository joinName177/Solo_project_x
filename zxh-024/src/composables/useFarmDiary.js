/**
 * 农田日记 Composable
 *
 * 封装农田日记的创建、查询、删除等响应式操作。
 * 协调 storage 工具函数与 Vue 响应式系统之间的交互。
 */

import { ref, computed } from 'vue'
import { getDiaryEntries, addDiaryEntry, deleteDiaryEntry, getDiaryByDateRange } from '@/utils/storage'

export function useFarmDiary() {
  const entries = ref(getDiaryEntries())
  const filterDate = ref(null) // 日期筛选 YYYY-MM-DD

  const filteredEntries = computed(() => {
    if (!filterDate.value) return entries.value
    return entries.value.filter(e => e.date === filterDate.value)
  })

  const entryCount = computed(() => entries.value.length)

  /**
   * 添加一条日记记录
   * @param {{cropId:string, cropName:string, diseaseName:string, method:string, notes:string, image:string|null, date:string}} entry
   * @returns {object}
   */
  function addEntry(entry) {
    const newEntry = addDiaryEntry(entry)
    entries.value.unshift(newEntry) // 增量添加，避免全量刷新
    return newEntry
  }

  /**
   * 删除日记记录
   * @param {string} id
   */
  function removeEntry(id) {
    const success = deleteDiaryEntry(id)
    if (success) {
      entries.value = getDiaryEntries()
    }
    return success
  }

  /**
   * 按日期筛选
   * @param {string} dateStr - YYYY-MM-DD
   */
  function setDateFilter(dateStr) {
    filterDate.value = dateStr || null
  }

  /**
   * 清除筛选
   */
  function clearFilter() {
    filterDate.value = null
  }

  /**
   * 刷新列表
   */
  function refresh() {
    entries.value = getDiaryEntries()
  }

  return {
    entries,
    filteredEntries,
    filterDate,
    entryCount,
    addEntry,
    removeEntry,
    setDateFilter,
    clearFilter,
    refresh
  }
}

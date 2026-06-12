/**
 * useArchive - 成本档案管理
 * 使用 localStorage 持久化保存的方案
 */
import { reactive, ref } from 'vue'
import { generateId, formatDate } from '../utils/formatters.js'

const STORAGE_KEY = 'agri_calculator_archives'

function loadArchives() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveArchives(archives) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(archives))
  } catch (e) {
    console.error('保存档案失败:', e)
  }
}

export function useArchive() {
  const archives = reactive(loadArchives())
  const selectedArchiveId = ref(null)

  /** 保存当前方案为档案 */
  function saveArchive(snapshot) {
    const archive = {
      ...snapshot,
      id: generateId(),
      savedAt: new Date().toISOString(),
      notes: snapshot.notes || '',
    }
    archives.push(archive)
    saveArchives(archives)
    return archive
  }

  /** 更新已有档案 */
  function updateArchive(id, snapshot) {
    const index = archives.findIndex((a) => a.id === id)
    if (index !== -1) {
      archives[index] = { ...archives[index], ...snapshot, updatedAt: new Date().toISOString() }
      saveArchives(archives)
    }
  }

  /** 删除档案 */
  function deleteArchive(id) {
    const index = archives.findIndex((a) => a.id === id)
    if (index !== -1) {
      archives.splice(index, 1)
      if (selectedArchiveId.value === id) selectedArchiveId.value = null
      saveArchives(archives)
    }
  }

  /** 清空所有档案 */
  function clearAllArchives() {
    archives.length = 0
    selectedArchiveId.value = null
    saveArchives(archives)
  }

  /** 格式化档案保存时间 */
  function formatArchiveDate(isoStr) {
    return formatDate(isoStr)
  }

  return {
    archives,
    selectedArchiveId,
    saveArchive,
    updateArchive,
    deleteArchive,
    clearAllArchives,
    formatArchiveDate,
  }
}

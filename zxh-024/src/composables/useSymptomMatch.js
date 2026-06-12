/**
 * 症状匹配 Composable
 *
 * 封装作物选择、症状选择、病害匹配的响应式状态。
 * 协调 symptomMatcher 工具函数与 Vue 响应式系统之间的交互。
 */

import { ref, computed, watch } from 'vue'
import { matchDiseasesBySymptoms, getAdviceByDisease } from '@/utils/symptomMatcher'
import { crops } from '@/data/crops'
import { symptomTypes } from '@/data/symptoms'
import { saveSettings, getSettings } from '@/utils/storage'

export function useSymptomMatch() {
  const selectedCropId = ref(null)
  const selectedSymptoms = ref([])
  const matchResults = ref([])

  const selectedCrop = computed(() => crops.find(c => c.id === selectedCropId.value))
  const hasSelection = computed(() => selectedCropId.value !== null && selectedSymptoms.value.length > 0)
  const topMatch = computed(() => matchResults.value[0] || null)

  // 恢复上次选择的作物
  const settings = getSettings()
  if (settings.lastCropId) {
    selectedCropId.value = settings.lastCropId
  }

  // 当作物变化时重新匹配
  watch([selectedCropId, selectedSymptoms], () => {
    if (hasSelection.value) {
      matchResults.value = matchDiseasesBySymptoms(selectedCropId.value, selectedSymptoms.value)
    } else {
      matchResults.value = []
    }
  }, { deep: true })

  /**
   * 选择作物
   * @param {string} cropId
   */
  function selectCrop(cropId) {
    selectedCropId.value = cropId
    saveSettings({ lastCropId: cropId })
  }

  /**
   * 切换症状选择
   * @param {string} symptomId
   */
  function toggleSymptom(symptomId) {
    const idx = selectedSymptoms.value.indexOf(symptomId)
    if (idx >= 0) {
      selectedSymptoms.value.splice(idx, 1)
    } else {
      selectedSymptoms.value.push(symptomId)
    }
  }

  /**
   * 检查症状是否选中
   * @param {string} symptomId
   * @returns {boolean}
   */
  function isSymptomSelected(symptomId) {
    return selectedSymptoms.value.includes(symptomId)
  }

  /**
   * 获取病害防治建议
   * @param {string} diseaseId
   */
  function getAdvice(diseaseId) {
    return getAdviceByDisease(diseaseId)
  }

  /**
   * 重置选择
   */
  function reset() {
    selectedSymptoms.value = []
    matchResults.value = []
  }

  return {
    selectedCropId,
    selectedSymptoms,
    matchResults,
    selectedCrop,
    hasSelection,
    topMatch,
    selectCrop,
    toggleSymptom,
    isSymptomSelected,
    getAdvice,
    reset,
    symptomTypes
  }
}

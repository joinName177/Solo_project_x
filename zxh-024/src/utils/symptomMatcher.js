/**
 * 症状匹配模块（纯函数）
 *
 * 根据用户选择作物种类和症状组合，通过加权匹配算法
 * 推荐最可能的病害及防治建议。
 */

import { diseases } from '@/data/diseases'

/**
 * 根据作物和症状匹配病害
 * @param {string} cropId - 作物ID
 * @param {string[]} selectedSymptoms - 已选症状ID列表
 * @returns {Array<{disease:object, matchRate:number, matchedSymptoms:string[], unmatchedSymptoms:string[]}>}
 */
export function matchDiseasesBySymptoms(cropId, selectedSymptoms) {
  if (!cropId || selectedSymptoms.length === 0) return []

  const cropDiseases = diseases.filter(d => d.cropId === cropId)

  const results = cropDiseases.map(disease => {
    const matched = disease.symptoms.filter(s => selectedSymptoms.includes(s))
    const unmatched = disease.symptoms.filter(s => !selectedSymptoms.includes(s))
    const matchRate = disease.symptoms.length > 0
      ? Math.round((matched.length / disease.symptoms.length) * 100)
      : 0

    return { disease, matchRate, matchedSymptoms: matched, unmatchedSymptoms: unmatched }
  })

  // 过滤匹配率>0的结果，按匹配率降序排列
  return results
    .filter(r => r.matchRate > 0)
    .sort((a, b) => b.matchRate - a.matchRate)
}

/**
 * 根据病害获取详细防治建议
 * @param {string} diseaseId
 * @returns {{disease:object, advice:string}|null}
 */
export function getAdviceByDisease(diseaseId) {
  const disease = diseases.find(d => d.id === diseaseId)
  if (!disease) return null

  return {
    disease,
    advice: disease.advice
  }
}

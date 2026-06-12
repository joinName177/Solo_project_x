/**
 * 症状描述模块
 * 定义病害相关的症状类型及其描述
 */

export const symptomTypes = [
  { id: 'leaf_spots', name: '叶片有斑点', icon: '🔴', description: '叶片上出现圆形或不规则的斑点' },
  { id: 'yellowing', name: '叶片发黄', icon: '🟡', description: '叶片整体或局部变黄、褪绿' },
  { id: 'curling', name: '叶片卷曲', icon: '🌀', description: '叶片边缘或整体卷曲、皱缩' },
  { id: 'mold_layer', name: '有霉层', icon: '🦠', description: '叶片表面出现霉状物或粉状物' },
  { id: 'blight', name: '叶片枯焦', icon: '🔥', description: '叶片干枯焦黄、似火烧状' },
  { id: 'water_soaked', name: '水渍状斑', icon: '💧', description: '叶片出现水渍状病斑' },
  { id: 'perforation', name: '穿孔', icon: '🕳️', description: '叶片病斑脱落形成穿孔' },
  { id: 'powdery', name: '粉末状物', icon: '⬜', description: '叶片表面有白色或灰色粉末' }
]

/**
 * 根据症状ID获取症状信息
 * @param {string} id
 * @returns {object|undefined}
 */
export function getSymptomById(id) {
  return symptomTypes.find(s => s.id === id)
}

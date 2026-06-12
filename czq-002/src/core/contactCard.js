/**
 * 联系卡片内容生成器
 * 职责：根据信息条目生成格式化的联系卡片数据
 * 耦合：仅依赖 core/constants（农机类型标签映射）
 *
 * 纯函数模块 — 无 Vue 依赖，输入确定则输出确定
 */

import { MACHINE_TYPES } from './constants.js'

/**
 * 生成联系卡片结构化内容
 * @param {Object} item - 信息条目
 * @returns {{ title: string, fields: Array<{label: string, value: string}> }}
 */
export function generateContactCard(item) {
  if (!item) return { title: '', fields: [] }

  const typeLabel = item.type === 'supply' ? '农机出租' : '农机求租'
  const machineLabel = getMachineLabel(item.machineType)

  const fields = [
    { label: '信息类型', value: typeLabel },
    { label: '农机类型', value: machineLabel },
    { label: '品牌型号', value: item.brandModel || '未填写' }
  ]

  if (item.type === 'supply') {
    fields.push({ label: '日租金', value: `${item.dailyRent} 元/天` })
  } else {
    fields.push(
      { label: '使用日期', value: item.useDate || '未填写' },
      { label: '期望租金', value: item.expectedRent ? `${item.expectedRent} 元/天` : '未填写' }
    )
  }

  fields.push(
    { label: '所在村庄', value: item.village || '未填写' },
    { label: '联系方式', value: item.contact || '未填写' },
    { label: '发布时间', value: formatDate(item.createdAt) }
  )

  return { title: `${typeLabel} - ${machineLabel}`, fields }
}

// --- 内部辅助函数 ---

function getMachineLabel(type) {
  const found = MACHINE_TYPES.find(m => m.value === type)
  return found ? found.label : type
}

function formatDate(isoString) {
  if (!isoString) return '未知'
  const d = new Date(isoString)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

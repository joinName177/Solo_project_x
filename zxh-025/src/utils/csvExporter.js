/**
 * CSV 导出工具
 * 职责：将价格记录导出为 CSV 文件，纯函数
 */

/**
 * 将价格记录导出为 CSV 并触发下载
 * @param {Array} records - 价格记录
 * @param {string} [filename] - 文件名
 */
export function exportToCSV(records, filename = '农产品价格记录.csv') {
  const headers = ['日期', '作物名称', '分类', '价格', '单位', '地点', '备注']
  const rows = records.map(r => [
    r.date,
    r.cropName,
    r.category || '',
    r.price,
    r.unit,
    r.location,
    r.note || '',
  ])

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => escapeCSV(cell)).join(','))
    .join('\n')

  const bom = '﻿'
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()

  URL.revokeObjectURL(url)
}

function escapeCSV(value) {
  const str = String(value ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

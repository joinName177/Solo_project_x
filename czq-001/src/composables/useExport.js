/**
 * useExport - 导出功能 (PDF / Excel)
 */
import { formatCurrency, formatNumber, formatArea, formatDate } from '../utils/formatters.js'
import { CROP_STANDARDS } from '../constants/cropStandards.js'

/**
 * 将快照数据转为导出用的表格行
 */
function snapshotToRows(snapshot) {
  const cropName = CROP_STANDARDS[snapshot.cropKey]?.name || snapshot.cropKey
  const rows = [
    ['方案名称', snapshot.planName],
    ['作物种类', cropName],
    ['种植面积', formatArea(snapshot.area)],
    ['', ''],
    ['投入项目', '用量(每亩)', '单价(元)', '小计(元)'],
  ]

  for (const item of snapshot.items) {
    rows.push([
      item.categoryLabel,
      `${formatNumber(item.usage)} ${item.unit}`,
      formatCurrency(item.price),
      formatCurrency(item.usage * item.price * snapshot.area),
    ])
  }

  rows.push(
    ['', '', '', ''],
    ['总成本', '', '', formatCurrency(snapshot.totals.totalCost)],
    ['每亩成本', '', '', formatCurrency(snapshot.totals.costPerMu)],
    ['预估产量', '', '', `${formatNumber(snapshot.totals.estimatedYield)} 公斤`],
    ['预估收入', '', '', formatCurrency(snapshot.totals.estimatedRevenue)],
    ['预估利润', '', '', formatCurrency(snapshot.totals.estimatedProfit)],
    ['投入产出比', '', '', `${snapshot.totals.roi}%`],
  )

  return rows
}

/** 导出为 Excel (CSV格式) */
export function exportToExcel(snapshot) {
  const rows = snapshotToRows(snapshot)
  const BOM = '﻿'
  const csvContent = BOM + rows.map((row) => row.join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `农资成本档案_${snapshot.planName}_${formatDate(snapshot.savedAt || new Date().toISOString())}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

/** 导出为 PDF */
export async function exportToPDF(snapshot, elementId = 'print-area') {
  // 动态导入，避免阻塞主流程
  const { default: jsPDF } = await import('jspdf')
  const { default: html2canvas } = await import('html2canvas')

  const element = document.getElementById(elementId)
  if (!element) {
    alert('未找到打印区域')
    return
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/png')
  const imgWidth = 210 // A4 mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  const pdf = new jsPDF('p', 'mm', 'a4')
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, 297))
  pdf.save(`农资成本档案_${snapshot.planName}_${formatDate(snapshot.savedAt || new Date().toISOString())}.pdf`)
}

/** 对比模式导出 */
export function exportComparisonToExcel(snapshotA, snapshotB) {
  const rowsA = snapshotToRows(snapshotA)
  const rowsB = snapshotToRows(snapshotB)

  const BOM = '﻿'
  const lines = []
  lines.push('方案对比')
  lines.push('')
  lines.push('=== 方案A ===')
  rowsA.forEach((r) => lines.push(r.join(',')))
  lines.push('')
  lines.push('=== 方案B ===')
  rowsB.forEach((r) => lines.push(r.join(',')))
  lines.push('')
  lines.push('差异对比')
  lines.push(`成本差异,${formatCurrency(snapshotB.totals.totalCost - snapshotA.totals.totalCost)}`)
  lines.push(`利润差异,${formatCurrency(snapshotB.totals.estimatedProfit - snapshotA.totals.estimatedProfit)}`)

  const csvContent = BOM + lines.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `方案对比_${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

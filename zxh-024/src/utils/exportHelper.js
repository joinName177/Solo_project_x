/**
 * 导出助手模块（纯函数）
 *
 * 支持将农田日记导出为 PDF 或图片格式。
 * 纯前端实现，不依赖服务端。
 */

/**
 * 将日记条目格式化为纯文本
 * @param {object[]} entries
 * @returns {string}
 */
export function formatDiaryAsText(entries) {
  if (entries.length === 0) return '暂无农田日记记录'

  const lines = ['═══════════════════════', '   🌿 农田日记  🌿', '═══════════════════════', '']

  entries.forEach((entry, index) => {
    lines.push(`【记录 ${index + 1}】`)
    lines.push(`  日期：${entry.date}`)
    lines.push(`  作物：${entry.cropName || '未指定'}`)
    lines.push(`  病害：${entry.diseaseName || '未指定'}`)
    lines.push(`  识别方式：${entry.method === 'image' ? '图像识别' : '症状匹配'}`)
    if (entry.notes) {
      lines.push(`  备注：${entry.notes}`)
    }
    lines.push('')
  })

  lines.push('═══════════════════════')
  lines.push(`  导出时间：${new Date().toLocaleString('zh-CN')}`)
  lines.push('  农作物病害识别助手')

  return lines.join('\n')
}

/**
 * 导出为文本文件 (.txt)
 * @param {string} text
 * @param {string} filename
 */
export function exportAsTextFile(text, filename = '农田日记.txt') {
  const blob = new Blob(['﻿' + text], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, filename)
}

/**
 * 导出HTML元素为图片（使用html2canvas）
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} filename
 * @returns {Promise<void>}
 */
export async function exportAsImage(element, filename = '农田日记.png') {
  // 动态加载html2canvas（如果已导入则直接使用）
  const html2canvas = (await import('html2canvas')).default
  const canvas = await html2canvas(element, {
    backgroundColor: '#FFF8E1',
    scale: 2,
    useCORS: true,
    logging: false
  })
  const blob = await canvasToBlob(canvas)
  downloadBlob(blob, filename)
}

/**
 * 导出为PDF（使用jsPDF）
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} filename
 * @returns {Promise<void>}
 */
export async function exportAsPDF(element, filename = '农田日记.pdf') {
  const html2canvas = (await import('html2canvas')).default
  const { jsPDF } = await import('jspdf')

  const canvas = await html2canvas(element, {
    backgroundColor: '#FFF8E1',
    scale: 2,
    useCORS: true,
    logging: false
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth - 20
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 10

  pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
  heightLeft -= pageHeight - 20

  // 内容超过一页时分页
  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 10
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    heightLeft -= pageHeight - 20
  }

  pdf.save(filename)
}

// ---- 内部工具 ----

/**
 * Canvas转Blob
 * @param {HTMLCanvasElement} canvas
 * @returns {Promise<Blob>}
 */
function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(blob => resolve(blob), 'image/png')
  })
}

/**
 * 触发浏览器下载
 * @param {Blob} blob
 * @param {string} filename
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 导出日记为可打印的HTML窗口
 * @param {object[]} entries
 */
export function printDiary(entries) {
  const text = formatDiaryAsText(entries)
  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) return

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>农田日记</title>
      <style>
        body { font-family: 'Microsoft YaHei', sans-serif; padding: 40px; color: #3E2723; }
        pre { white-space: pre-wrap; line-height: 1.8; font-family: 'Microsoft YaHei', sans-serif; }
      </style>
    </head>
    <body><pre>${escapeHtml(text)}</pre></body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()
  setTimeout(() => printWindow.print(), 500)
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

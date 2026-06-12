/**
 * 导出功能 Composable
 *
 * 封装导出操作的响应式状态。
 * 协调 exportHelper 工具函数与 Vue 响应式系统之间的交互。
 */

import { ref } from 'vue'
import { exportAsImage, exportAsPDF, exportAsTextFile, formatDiaryAsText, printDiary } from '@/utils/exportHelper'

export function useExport() {
  const isExporting = ref(false)
  const exportError = ref(null)

  /**
   * 导出为图片
   * @param {HTMLElement} element
   * @param {string} filename
   */
  async function toImage(element, filename) {
    isExporting.value = true
    exportError.value = null
    try {
      await exportAsImage(element, filename)
    } catch (e) {
      exportError.value = '图片导出失败：' + e.message
      console.error('导出图片失败:', e)
    } finally {
      isExporting.value = false
    }
  }

  /**
   * 导出为PDF
   * @param {HTMLElement} element
   * @param {string} filename
   */
  async function toPDF(element, filename) {
    isExporting.value = true
    exportError.value = null
    try {
      await exportAsPDF(element, filename)
    } catch (e) {
      exportError.value = 'PDF导出失败：' + e.message
      console.error('导出PDF失败:', e)
    } finally {
      isExporting.value = false
    }
  }

  /**
   * 导出为文本文件
   * @param {object[]} entries
   * @param {string} filename
   */
  function toText(entries, filename = '农田日记.txt') {
    const text = formatDiaryAsText(entries)
    exportAsTextFile(text, filename)
  }

  /**
   * 打印日记
   * @param {object[]} entries
   */
  function print(entries) {
    printDiary(entries)
  }

  return {
    isExporting,
    exportError,
    toImage,
    toPDF,
    toText,
    print
  }
}

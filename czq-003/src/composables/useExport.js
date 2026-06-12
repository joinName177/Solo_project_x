import { ref } from 'vue'
import html2canvas from 'html2canvas'

/**
 * 导出为图片 Composable
 * 职责: 将 DOM 元素导出为图片并触发下载
 */

export function useExport() {
  const isExporting = ref(false)
  const exportError = ref('')

  /**
   * 将指定 DOM 元素导出为图片
   * @param {HTMLElement} element - 要导出的 DOM 元素
   * @param {string} filename - 文件名（不含扩展名）
   * @returns {Promise<boolean>} 是否成功
   */
  async function exportToImage(element, filename = '互助记录') {
    if (!element) {
      exportError.value = '未找到要导出的内容'
      return false
    }

    isExporting.value = true
    exportError.value = ''

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#f5f0eb',
        scale: 2,          // 高清输出
        useCORS: true,
        logging: false
      })

      // 触发下载
      const link = document.createElement('a')
      link.download = `${filename}_${formatDate(new Date())}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      return true
    } catch (error) {
      console.error('[Export] 导出失败:', error)
      exportError.value = '导出失败，请重试'
      return false
    } finally {
      isExporting.value = false
    }
  }

  /**
   * 格式化日期为文件名友好格式
   * @param {Date} date
   * @returns {string}
   */
  function formatDate(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}${m}${d}`
  }

  return {
    isExporting,
    exportError,
    exportToImage
  }
}

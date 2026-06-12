/**
 * 导出逻辑
 * 封装文本/图片导出触发
 */
import { bookStore } from '../stores/bookStore.js'
import { exportAsText, exportAsImage } from '../utils/export.js'

export function useExport() {
  function exportText(village = '') {
    exportAsText(bookStore.books.value, village)
  }

  function exportImage(elementOrSelector, filename = '乡村图书清单') {
    const el = typeof elementOrSelector === 'string'
      ? document.querySelector(elementOrSelector)
      : elementOrSelector
    if (el) {
      exportAsImage(el, filename)
    }
  }

  return { exportText, exportImage }
}

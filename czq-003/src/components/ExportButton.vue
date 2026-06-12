<template>
  <div class="export-btn-wrapper">
    <button
      class="export-btn"
      :disabled="isExporting"
      @click="handleExport"
    >
      {{ isExporting ? '⏳ 导出中…' : '📸 ' + buttonText }}
    </button>
    <span v-if="exportError" class="export-error">{{ exportError }}</span>
  </div>
</template>

<script setup>
import { useExport } from '../composables/useExport.js'

const props = defineProps({
  /** 要导出的 DOM 元素的选择器或 ref */
  targetSelector: { type: String, default: '#export-area' },
  /** 文件名前缀 */
  filename: { type: String, default: '互助记录' },
  /** 按钮文字 */
  buttonText: { type: String, default: '导出为图片' }
})

const { isExporting, exportError, exportToImage } = useExport()

async function handleExport() {
  const element = document.querySelector(props.targetSelector)
  if (!element) {
    console.error(`[Export] 未找到目标元素: ${props.targetSelector}`)
    return
  }
  await exportToImage(element, props.filename)
}
</script>

<style scoped>
.export-btn-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
.export-btn {
  padding: 10px 20px;
  border: 2px solid #27ae60;
  border-radius: 10px;
  background: #fff;
  color: #27ae60;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.export-btn:hover:not(:disabled) {
  background: #27ae60;
  color: #fff;
}
.export-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.export-error {
  font-size: 12px;
  color: #c0392b;
  margin-top: 4px;
}
</style>

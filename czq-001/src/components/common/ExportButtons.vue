<!--
  ExportButtons - 导出按钮组
  支持 Excel/PDF 导出
-->
<template>
  <div class="export-buttons">
    <button class="export-btn export-btn--excel" @click="$emit('export-excel')" :disabled="disabled">
      <span class="export-btn__icon">📊</span>
      <span>导出 Excel</span>
    </button>
    <button class="export-btn export-btn--pdf" @click="$emit('export-pdf')" :disabled="disabled">
      <span class="export-btn__icon">📄</span>
      <span>导出 PDF</span>
    </button>
    <button v-if="showPrint" class="export-btn export-btn--print" @click="$emit('print')">
      <span class="export-btn__icon">🖨️</span>
      <span>打印</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
  showPrint: { type: Boolean, default: false },
})

defineEmits(['export-excel', 'export-pdf', 'print'])
</script>

<style scoped>
.export-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border: 2px solid #d0d5dd;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.export-btn:hover:not(:disabled) {
  border-color: #16a34a;
  color: #16a34a;
  background: #f0fdf4;
}
.export-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.export-btn__icon {
  font-size: 18px;
}
</style>

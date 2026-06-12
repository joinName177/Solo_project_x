<template>
  <div class="diary-export card">
    <h3 class="diary-export__title">📤 导出农田日记</h3>
    <p class="diary-export__desc">将当前{{ filtered ? '筛选后的' : '全部' }}记录导出为文件</p>

    <div class="diary-export__actions">
      <BigButton variant="primary" :loading="isExporting" @click="$emit('export-pdf')">
        📄 导出为 PDF
      </BigButton>
      <BigButton variant="secondary" :loading="isExporting" @click="$emit('export-image')">
        🖼️ 导出为图片
      </BigButton>
      <BigButton variant="outline" @click="$emit('export-text')">
        📝 导出为文本
      </BigButton>
      <BigButton variant="outline" @click="$emit('print')">
        🖨️ 打印
      </BigButton>
    </div>

    <div v-if="error" class="diary-export__error">{{ error }}</div>
  </div>
</template>

<script setup>
import BigButton from '@/components/common/BigButton.vue'

defineProps({
  isExporting: { type: Boolean, default: false },
  error: { type: String, default: null },
  filtered: { type: Boolean, default: false }
})

defineEmits(['export-pdf', 'export-image', 'export-text', 'print'])
</script>

<style scoped>
.diary-export {
  margin-top: var(--space-lg);
}

.diary-export__title {
  font-size: var(--font-lg);
  color: var(--color-soil-dark);
  margin-bottom: var(--space-xs);
}

.diary-export__desc {
  font-size: var(--font-sm);
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.diary-export__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.diary-export__error {
  margin-top: var(--space-sm);
  color: var(--color-rust);
  font-size: var(--font-sm);
  font-weight: 600;
}
</style>

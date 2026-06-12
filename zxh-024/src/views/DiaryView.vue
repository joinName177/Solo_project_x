<template>
  <div class="diary-view" ref="diaryContent">
    <h2 class="section-title">农田日记</h2>

    <DiaryList
      :entries="diary.entries.value"
      :filter-date="diary.filterDate.value"
      @set-filter="diary.setDateFilter"
      @clear-filter="diary.clearFilter"
      @delete="onDelete"
    />

    <DiaryExport
      v-if="diary.entryCount.value > 0"
      :is-exporting="exportHelper.isExporting.value"
      :error="exportHelper.exportError.value"
      :filtered="!!diary.filterDate.value"
      @export-pdf="onExportPDF"
      @export-image="onExportImage"
      @export-text="onExportText"
      @print="onPrint"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFarmDiary } from '@/composables/useFarmDiary'
import { useExport } from '@/composables/useExport'
import DiaryList from '@/components/diary/DiaryList.vue'
import DiaryExport from '@/components/diary/DiaryExport.vue'

const diary = useFarmDiary()
const exportHelper = useExport()
const diaryContent = ref(null)

function onDelete(id) {
  if (!confirm('确定要删除这条记录吗？')) return
  diary.removeEntry(id)
}

async function onExportPDF() {
  if (!diaryContent.value) return
  const dateStr = new Date().toISOString().split('T')[0]
  await exportHelper.toPDF(diaryContent.value, `农田日记_${dateStr}.pdf`)
}

async function onExportImage() {
  if (!diaryContent.value) return
  const dateStr = new Date().toISOString().split('T')[0]
  await exportHelper.toImage(diaryContent.value, `农田日记_${dateStr}.png`)
}

function onExportText() {
  const entries = diary.filteredEntries.value
  const dateStr = new Date().toISOString().split('T')[0]
  exportHelper.toText(entries, `农田日记_${dateStr}.txt`)
}

function onPrint() {
  const entries = diary.filteredEntries.value
  exportHelper.print(entries)
}
</script>

<style scoped>
.diary-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
</style>

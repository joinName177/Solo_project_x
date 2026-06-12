<template>
  <div class="app-container">
    <!-- 顶部栏 -->
    <header class="app-header">
      <h1 class="app-title" :title="titleAlert">🌾 农产品价格行情记录本</h1>
      <div class="header-actions">
        <NotificationBadge
          :hasAlerts="hasAlerts"
          :alertList="alertList"
          @clear="clearAlerts"
        />
        <FontSizeControl
          :fontSize="fontSize"
          :min="min"
          :max="max"
          @increase="increase"
          @decrease="decrease"
          @reset="reset"
        />
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="app-main">
      <!-- 录入表单 -->
      <section class="section">
        <h2>📝 录入价格</h2>
        <PriceForm
          :editingRecord="editingRecord"
          @submit="handleFormSubmit"
          @cancel="editingRecord = null"
        />
      </section>

      <!-- 分类筛选 + 导出 -->
      <section class="section section-toolbar">
        <CategoryFilter v-model="selectedCategory" />
        <CsvExport :count="filteredRecords.length" @export="handleExport" />
      </section>

      <!-- 环比涨跌 -->
      <section class="section" v-if="selectedCropForCompare">
        <PriceComparison
          :comparison="comparison"
          :selectedCrop="selectedCropForCompare"
        />
      </section>

      <!-- 价格走势图 -->
      <section class="section">
        <PriceChart :records="records" :cropList="allCrops" />
      </section>

      <!-- 价格列表 -->
      <section class="section">
        <h2>📋 价格记录</h2>
        <PriceTable
          :records="filteredRecords"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </section>

      <!-- 目标价格设置 -->
      <section class="section">
        <TargetPriceSetting
          :cropList="allCrops"
          :targetPrices="targetPrices"
          @set-target="handleSetTarget"
        />
      </section>
    </main>

    <!-- 底部 -->
    <footer class="app-footer">
      <p>数据保存在本地浏览器中 · 不会上传到任何服务器</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePriceData } from './composables/usePriceData.js'
import { useNotification } from './composables/useNotification.js'
import { useFontSize } from './composables/useFontSize.js'
import { calcComparison } from './utils/calculator.js'
import { exportToCSV } from './utils/csvExporter.js'

import FontSizeControl from './components/FontSizeControl.vue'
import NotificationBadge from './components/NotificationBadge.vue'
import CategoryFilter from './components/CategoryFilter.vue'
import PriceForm from './components/PriceForm.vue'
import PriceChart from './components/PriceChart.vue'
import PriceTable from './components/PriceTable.vue'
import PriceComparison from './components/PriceComparison.vue'
import TargetPriceSetting from './components/TargetPriceSetting.vue'
import CsvExport from './components/CsvExport.vue'

// ---- 状态 ----
const { records, targetPrices, addRecord, updateRecord, deleteRecord, getFilteredRecords, setTargetPrice } = usePriceData()
const { hasAlerts, alertList, clearAlerts } = useNotification(records, targetPrices)
const { fontSize, increase, decrease, reset, min, max } = useFontSize()

const selectedCategory = ref('')
const editingRecord = ref(null)
const selectedCropForCompare = ref('')

// ---- 计算属性 ----
const filteredRecords = computed(() => getFilteredRecords(selectedCategory.value))

const allCrops = computed(() => {
  const set = new Set()
  records.value.forEach(r => set.add(r.cropName))
  return [...set].sort()
})

const comparison = computed(() => {
  if (!selectedCropForCompare.value) return { yesterday: null, lastWeek: null }
  return calcComparison(records.value, selectedCropForCompare.value)
})

const titleAlert = computed(() => {
  if (alertList.value.length === 0) return ''
  return alertList.value.map(a => `${a.cropName} 价格 ${a.price} ≥ 目标 ${a.target}`).join('；')
})

// ---- 事件处理 ----
function handleFormSubmit(formData) {
  if (editingRecord.value) {
    updateRecord(editingRecord.value.id, formData)
    editingRecord.value = null
  } else {
    addRecord(formData)
  }
  selectedCropForCompare.value = formData.cropName
}

function handleEdit(record) {
  editingRecord.value = record
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleDelete(id) {
  if (confirm('确定要删除这条记录吗？')) {
    deleteRecord(id)
  }
}

function handleExport() {
  exportToCSV(filteredRecords.value)
}

function handleSetTarget(cropName, price) {
  setTargetPrice(cropName, price || null)
}

// watch 页面标题红点
import { watch } from 'vue'
watch(hasAlerts, (val) => {
  document.title = (val ? '🔴 ' : '') + '农产品价格行情记录本'
}, { immediate: true })
</script>

<style scoped>
.app-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}

/* ---- Header ---- */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 2px solid #4CAF50;
  margin-bottom: 18px;
}
.app-title {
  font-size: 1.4em;
  color: #2E7D32;
  margin: 0;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* ---- Main ---- */
.app-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.section {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.section h2 {
  font-size: 1.1em;
  margin: 0 0 12px;
  color: #333;
}
.section-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

/* ---- Footer ---- */
.app-footer {
  text-align: center;
  padding: 20px;
  color: #aaa;
  font-size: 0.8em;
  margin-top: 10px;
}
</style>

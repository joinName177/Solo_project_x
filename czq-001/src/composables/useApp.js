/**
 * useApp - 应用根级别状态协调
 * 将 App.vue 中的协调逻辑提取出来，保持组件层的简洁
 */
import { ref } from 'vue'
import { useCalculator } from './useCalculator.js'
import { useComparison } from './useComparison.js'
import { useArchive } from './useArchive.js'
import { exportToExcel, exportToPDF, exportComparisonToExcel } from './useExport.js'

export function useApp() {
  // ---- 视图状态 ----
  const currentView = ref('calculator')

  // ---- 主计算器 ----
  const mainCalculator = useCalculator({ planName: '当前方案' })

  // ---- 对比模式 ----
  const {
    isComparisonMode,
    planA, planB,
    costDiff, profitDiff,
    comparisonSummary,
    toggleComparison,
    copyAToB,
  } = useComparison()

  // ---- 档案管理 ----
  const {
    archives,
    selectedArchiveId,
    saveArchive,
    updateArchive,
    deleteArchive,
    clearAllArchives,
    formatArchiveDate,
  } = useArchive()

  // ---- 档案加载 ----
  const loadedArchive = ref(null)
  const archiveCalculator = useCalculator({ planName: '已加载档案' })

  function selectArchive(archive) {
    selectedArchiveId.value = archive.id
  }

  function loadArchive(archive) {
    loadedArchive.value = archive
    archiveCalculator.loadSnapshot(archive)
    selectedArchiveId.value = archive.id
  }

  // ---- 保存操作 ----
  function savePlan(calculator) {
    const snapshot = calculator.getSnapshot()
    saveArchive(snapshot)
    return snapshot
  }

  function saveMainPlan() {
    savePlan(mainCalculator)
    alert('✅ 方案已保存到档案！')
  }

  function savePlanA() {
    savePlan(planA)
    alert('✅ 方案A已保存到档案！')
  }

  function savePlanB() {
    savePlan(planB)
    alert('✅ 方案B已保存到档案！')
  }

  function saveArchiveUpdate() {
    if (loadedArchive.value) {
      const snapshot = archiveCalculator.getSnapshot()
      updateArchive(loadedArchive.value.id, snapshot)
      loadedArchive.value = { ...loadedArchive.value, ...snapshot }
      alert('✅ 档案已更新！')
    }
  }

  // ---- 导出操作 ----
  function exportPlanExcel(calculator) {
    exportToExcel(calculator.getSnapshot())
  }

  function exportPlanPDF(calculator, elementId) {
    exportToPDF(calculator.getSnapshot(), elementId)
  }

  function exportComparisonToExcelBoth() {
    exportComparisonToExcel(planA.getSnapshot(), planB.getSnapshot())
  }

  function exportComparisonToPDFBoth() {
    const snapshot = { ...planA.getSnapshot(), planName: '对比报告' }
    exportToPDF(snapshot, 'comparison-print-area')
  }

  return {
    // 视图
    currentView,

    // 主计算器
    mainCalculator,

    // 对比模式
    isComparisonMode,
    planA,
    planB,
    costDiff,
    profitDiff,
    comparisonSummary,
    toggleComparison,
    copyAToB,

    // 档案
    archives,
    selectedArchiveId,
    loadedArchive,
    archiveCalculator,
    selectArchive,
    loadArchive,
    deleteArchive,
    clearAllArchives,
    formatArchiveDate,

    // 保存
    saveMainPlan,
    savePlanA,
    savePlanB,
    saveArchiveUpdate,

    // 导出
    exportPlanExcel,
    exportPlanPDF,
    exportComparisonToExcelBoth,
    exportComparisonToPDFBoth,
  }
}

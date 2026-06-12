<!--
  App.vue - 应用根组件
  管理顶层状态和视图切换
-->
<template>
  <div class="app">
    <!-- 顶部导航 -->
    <header class="app-header">
      <div class="app-header__inner">
        <div class="app-logo">
          <span class="app-logo__icon">🧮</span>
          <h1 class="app-logo__title">农资投入计算器</h1>
        </div>
        <nav class="app-nav">
          <button
            class="nav-btn"
            :class="{ 'nav-btn--active': currentView === 'calculator' }"
            @click="currentView = 'calculator'"
          >🧮 计算器</button>
          <button
            class="nav-btn"
            :class="{ 'nav-btn--active': currentView === 'archives' }"
            @click="currentView = 'archives'"
          >🗄️ 档案 ({{ archives.length }})</button>
          <button
            class="nav-btn nav-btn--compare"
            :class="{ 'nav-btn--active': isComparisonMode }"
            @click="toggleComparison"
          >📊 {{ isComparisonMode ? '退出对比' : '对比模式' }}</button>
        </nav>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="app-main">
      <!-- 对比模式 -->
      <ComparisonView
        v-if="isComparisonMode"
        :planA="planA"
        :planB="planB"
        :costDiff="costDiff"
        :profitDiff="profitDiff"
        :summary="comparisonSummary"
        @toggle="toggleComparison"
        @copy-a-to-b="copyAToB"
        @save-a="savePlanA"
        @save-b="savePlanB"
        @export-excel-a="() => exportPlanExcel(planA)"
        @export-pdf-a="() => exportPlanPDF(planA, 'plan-a-panel')"
        @export-excel-b="() => exportPlanExcel(planB)"
        @export-pdf-b="() => exportPlanPDF(planB, 'plan-b-panel')"
        @export-comparison-excel="exportComparisonToExcelBoth"
        @export-comparison-pdf="exportComparisonToPDFBoth"
      />

      <!-- 计算器视图 -->
      <div v-show="currentView === 'calculator' && !isComparisonMode" class="view-calculator">
        <div class="calculator-layout">
          <CalculatorPanel
            :calculator="mainCalculator"
            panel-id="main-calc-panel"
            @export-excel="() => exportPlanExcel(mainCalculator)"
            @export-pdf="() => exportPlanPDF(mainCalculator, 'main-calc-panel')"
            @save="saveMainPlan"
          />
          <ProfitChart
            :totalCost="mainCalculator.totalCost.value"
            :estimatedRevenue="mainCalculator.estimatedRevenue.value"
            :estimatedProfit="mainCalculator.estimatedProfit.value"
            :itemCosts="mainCalculator.itemCosts.value"
          />
        </div>
      </div>

      <!-- 档案视图 -->
      <div v-show="currentView === 'archives' && !isComparisonMode" class="view-archives">
        <ArchivePanel
          :archives="archives"
          :selectedId="selectedArchiveId"
          :formatArchiveDate="formatArchiveDate"
          @select="selectArchive"
          @load="loadArchive"
          @delete="deleteArchive"
          @clear-all="clearAllArchives"
        />
        <!-- 加载的档案详情 -->
        <div v-if="loadedArchive" class="loaded-archive">
          <h3>📋 已加载：{{ loadedArchive.planName }}</h3>
          <div class="loaded-archive__layout">
            <CalculatorPanel
              :calculator="archiveCalculator"
              panel-id="archive-calc-panel"
              @export-excel="() => exportPlanExcel(archiveCalculator)"
              @export-pdf="() => exportPlanPDF(archiveCalculator, 'archive-calc-panel')"
              @save="saveArchiveUpdate"
            />
            <ProfitChart
              :totalCost="archiveCalculator.totalCost.value"
              :estimatedRevenue="archiveCalculator.estimatedRevenue.value"
              :estimatedProfit="archiveCalculator.estimatedProfit.value"
              :itemCosts="archiveCalculator.itemCosts.value"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <p>农资投入计算器 · 数据保存在本地浏览器 · 仅供参考</p>
    </footer>
  </div>
</template>

<script setup>
/**
 * App.vue - 应用根组件 (薄视图层)
 * 所有协调逻辑委托给 useApp composable
 */
import CalculatorPanel from './components/calculator/CalculatorPanel.vue'
import ComparisonView from './components/comparison/ComparisonView.vue'
import ArchivePanel from './components/archive/ArchivePanel.vue'
import ProfitChart from './components/analysis/ProfitChart.vue'

import { useApp } from './composables/useApp.js'

const {
  currentView,
  mainCalculator,
  isComparisonMode,
  planA, planB,
  costDiff, profitDiff,
  comparisonSummary,
  toggleComparison,
  copyAToB,
  archives,
  selectedArchiveId,
  loadedArchive,
  archiveCalculator,
  selectArchive,
  loadArchive,
  deleteArchive,
  clearAllArchives,
  formatArchiveDate,
  saveMainPlan,
  savePlanA,
  savePlanB,
  saveArchiveUpdate,
  exportPlanExcel,
  exportPlanPDF,
  exportComparisonToExcelBoth,
  exportComparisonToPDFBoth,
} = useApp()
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f3f4f6;
}

/* ---- Header ---- */
.app-header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.app-header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.app-logo__icon { font-size: 32px; }
.app-logo__title {
  font-size: 22px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
}
.app-nav {
  display: flex;
  gap: 6px;
}
.nav-btn {
  padding: 10px 18px;
  border: 1.5px solid transparent;
  border-radius: 10px;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.nav-btn:hover { color: #16a34a; background: #f0fdf4; }
.nav-btn--active {
  color: #16a34a;
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.nav-btn--compare {
  color: #7c3aed;
}
.nav-btn--compare:hover,
.nav-btn--compare.nav-btn--active {
  color: #6d28d9;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

/* ---- Main ---- */
.app-main {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 24px auto;
  padding: 0 24px;
}

/* ---- Calculator layout ---- */
.calculator-layout {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 900px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }
}

.loaded-archive {
  margin-top: 24px;
}
.loaded-archive h3 {
  font-size: 18px;
  margin: 0 0 16px 0;
}
.loaded-archive__layout {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 900px) {
  .loaded-archive__layout {
    grid-template-columns: 1fr;
  }
}

/* ---- Footer ---- */
.app-footer {
  text-align: center;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  margin-top: 40px;
}
.app-footer p {
  margin: 0;
  font-size: 13px;
  color: #9ca3af;
}
</style>

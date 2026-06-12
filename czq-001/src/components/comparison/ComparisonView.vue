<!--
  ComparisonView - 对比模式视图
  并排展示方案A和方案B，显示差异
-->
<template>
  <div class="comparison-view" id="comparison-print-area">
    <!-- 对比控制栏 -->
    <div class="comparison-controls">
      <div class="comparison-controls__left">
        <h2>📊 方案对比</h2>
        <button class="btn-compare-toggle" @click="$emit('toggle')">
          ✕ 退出对比
        </button>
      </div>
      <div class="comparison-controls__right">
        <button class="btn-compare-action" @click="$emit('copy-a-to-b')">
          📋 复制方案A → 方案B
        </button>
        <ExportButtons
          @export-excel="$emit('export-comparison-excel')"
          @export-pdf="$emit('export-comparison-pdf')"
        />
      </div>
    </div>

    <!-- 差异摘要 -->
    <div class="comparison-diff" v-if="summary">
      <div class="diff-card" :class="summary.better === 'B' ? 'diff-card--b' : 'diff-card--a'">
        <span class="diff-icon">{{ summary.better === 'B' ? '🏆' : '📉' }}</span>
        <span class="diff-text">{{ summary.message }}</span>
      </div>
      <div class="diff-numbers">
        <div class="diff-number">
          <span class="diff-number__label">成本差异</span>
          <span class="diff-number__value" :class="costDiff >= 0 ? 'text-red' : 'text-green'">
            {{ costDiff >= 0 ? '+' : '' }}{{ formatCurrency(costDiff) }}
          </span>
        </div>
        <div class="diff-number">
          <span class="diff-number__label">利润差异</span>
          <span class="diff-number__value" :class="profitDiff >= 0 ? 'text-green' : 'text-red'">
            {{ profitDiff >= 0 ? '+' : '' }}{{ formatCurrency(profitDiff) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 双面板 -->
    <div class="comparison-panels">
      <div class="comparison-panel-wrapper">
        <div class="comparison-panel-label plan-a-label">方案 A</div>
        <CalculatorPanel
          :calculator="planA"
          panel-id="plan-a-panel"
          @export-excel="$emit('export-excel-a')"
          @export-pdf="$emit('export-pdf-a')"
          @save="$emit('save-a')"
        />
      </div>
      <div class="comparison-divider">
        <span class="vs-badge">VS</span>
      </div>
      <div class="comparison-panel-wrapper">
        <div class="comparison-panel-label plan-b-label">方案 B</div>
        <CalculatorPanel
          :calculator="planB"
          panel-id="plan-b-panel"
          @export-excel="$emit('export-excel-b')"
          @export-pdf="$emit('export-pdf-b')"
          @save="$emit('save-b')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CalculatorPanel from '../calculator/CalculatorPanel.vue'
import ExportButtons from '../common/ExportButtons.vue'
import { formatCurrency } from '../../utils/formatters.js'

const props = defineProps({
  planA: { type: Object, required: true },
  planB: { type: Object, required: true },
  costDiff: { type: Number, default: 0 },
  profitDiff: { type: Number, default: 0 },
  summary: { type: Object, default: null },
})

defineEmits([
  'toggle', 'copy-a-to-b',
  'export-excel-a', 'export-pdf-a', 'save-a',
  'export-excel-b', 'export-pdf-b', 'save-b',
  'export-comparison-excel', 'export-comparison-pdf',
])
</script>

<style scoped>
.comparison-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.comparison-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.comparison-controls__left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.comparison-controls__left h2 { margin: 0; font-size: 20px; }
.comparison-controls__right {
  display: flex;
  gap: 10px;
}
.btn-compare-toggle {
  padding: 6px 14px;
  border: 1.5px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.btn-compare-action {
  padding: 8px 16px;
  border: 1.5px solid #d0d5dd;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
}
.btn-compare-action:hover {
  border-color: #16a34a;
  background: #f0fdf4;
  color: #16a34a;
}

.comparison-diff {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  flex-wrap: wrap;
}
.diff-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
}
.diff-card--a { background: #eff6ff; color: #1d4ed8; }
.diff-card--b { background: #f0fdf4; color: #16a34a; }
.diff-icon { font-size: 20px; }
.diff-numbers {
  display: flex;
  gap: 24px;
}
.diff-number { text-align: center; }
.diff-number__label { font-size: 12px; color: #9ca3af; display: block; }
.diff-number__value { font-size: 18px; font-weight: 700; }
.text-green { color: #16a34a; }
.text-red { color: #dc2626; }

.comparison-panels {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  align-items: start;
}
.comparison-panel-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.comparison-panel-label {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  padding: 6px 0;
  border-radius: 8px;
}
.plan-a-label { background: #eff6ff; color: #1d4ed8; }
.plan-b-label { background: #f0fdf4; color: #16a34a; }
.comparison-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  padding-top: 50px;
}
.vs-badge {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 900px) {
  .comparison-panels {
    grid-template-columns: 1fr;
  }
  .comparison-divider {
    padding: 10px 0;
  }
}
</style>

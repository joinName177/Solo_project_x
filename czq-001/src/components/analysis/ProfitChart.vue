<!--
  ProfitChart - 投入产出分析图
  使用 Chart.js 展示成本-收入-利润关系
-->
<template>
  <div class="profit-chart">
    <div class="profit-chart__header">
      <h3>📈 投入产出分析</h3>
      <div class="profit-chart__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="chart-tab"
          :class="{ 'chart-tab--active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >{{ tab.label }}</button>
      </div>
    </div>
    <div class="profit-chart__canvas-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import { formatCurrency } from '../../utils/formatters.js'

Chart.register(...registerables)

const props = defineProps({
  totalCost: { type: Number, default: 0 },
  estimatedRevenue: { type: Number, default: 0 },
  estimatedProfit: { type: Number, default: 0 },
  itemCosts: { type: Array, default: () => [] },
  // 对比模式数据(可选)
  comparisonData: { type: Object, default: null },
})

const chartCanvas = ref(null)
const activeTab = ref('overview')
let chartInstance = null

const tabs = [
  { key: 'overview', label: '总览' },
  { key: 'breakdown', label: '成本构成' },
]

function buildOverviewData() {
  const labels = ['总成本', '预估收入', '预估利润']
  const data = [props.totalCost, props.estimatedRevenue, props.estimatedProfit]
  const colors = [
    'rgba(59, 130, 246, 0.7)',
    'rgba(245, 158, 11, 0.7)',
    props.estimatedProfit >= 0 ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.7)',
  ]

  if (props.comparisonData) {
    return {
      labels,
      datasets: [
        {
          label: '方案A',
          data: [props.totalCost, props.estimatedRevenue, props.estimatedProfit],
          backgroundColor: colors,
          borderColor: colors.map((c) => c.replace('0.7', '1')),
          borderWidth: 2,
        },
        {
          label: '方案B',
          data: [
            props.comparisonData.totalCost,
            props.comparisonData.estimatedRevenue,
            props.comparisonData.estimatedProfit,
          ],
          backgroundColor: colors.map(() => 'rgba(168, 85, 247, 0.5)'),
          borderColor: colors.map(() => 'rgba(168, 85, 247, 1)'),
          borderWidth: 2,
        },
      ],
    }
  }

  return {
    labels,
    datasets: [{
      label: '金额(元)',
      data,
      backgroundColor: colors,
      borderColor: colors.map((c) => c.replace('0.7', '1')),
      borderWidth: 2,
    }],
  }
}

function buildBreakdownData() {
  const items = props.itemCosts || []
  const labels = items.map((i) => i.categoryLabel)
  const data = items.map((i) => i.subtotal)

  const palette = [
    'rgba(59, 130, 246, 0.7)',
    'rgba(16, 185, 129, 0.7)',
    'rgba(245, 158, 11, 0.7)',
    'rgba(239, 68, 68, 0.7)',
    'rgba(168, 85, 247, 0.7)',
    'rgba(236, 72, 153, 0.7)',
    'rgba(20, 184, 166, 0.7)',
    'rgba(251, 146, 60, 0.7)',
  ]

  return {
    labels,
    datasets: [{
      label: '成本(元)',
      data,
      backgroundColor: palette.slice(0, labels.length),
      borderColor: palette.slice(0, labels.length).map((c) => c.replace('0.7', '1')),
      borderWidth: 1,
    }],
  }
}

function renderChart() {
  if (!chartCanvas.value) return

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const chartData = activeTab.value === 'overview'
    ? buildOverviewData()
    : buildBreakdownData()

  const isOverview = activeTab.value === 'overview'

  chartInstance = new Chart(chartCanvas.value, {
    type: isOverview ? 'bar' : 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20, usePointStyle: true },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`,
          },
        },
      },
      scales: isOverview ? {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => formatCurrency(v) },
        },
      } : {},
    },
  })
}

watch(() => [props.totalCost, props.estimatedRevenue, props.estimatedProfit, activeTab.value], () => {
  nextTick(renderChart)
}, { deep: true })

watch(() => props.itemCosts, () => {
  nextTick(renderChart)
}, { deep: true })

onMounted(() => {
  nextTick(renderChart)
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<style scoped>
.profit-chart {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
}
.profit-chart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.profit-chart__header h3 { margin: 0; font-size: 18px; }
.profit-chart__tabs { display: flex; gap: 4px; }
.chart-tab {
  padding: 6px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.chart-tab--active {
  border-color: #16a34a;
  background: #f0fdf4;
  color: #16a34a;
  font-weight: 600;
}
.profit-chart__canvas-wrapper {
  height: 350px;
  position: relative;
}
</style>

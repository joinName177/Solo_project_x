<template>
  <div class="price-chart-panel">
    <div class="chart-header">
      <h3>📈 价格走势（近30天）</h3>
      <div class="chart-controls">
        <select v-model="selectedCrop">
          <option value="">请选择作物</option>
          <option v-for="c in cropList" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="selectedLocation" v-if="locationList.length">
          <option value="">全部地点</option>
          <option v-for="l in locationList" :key="l" :value="l">{{ l }}</option>
        </select>
      </div>
    </div>
    <div class="chart-body" v-if="selectedCrop && chartData">
      <canvas ref="canvasRef"></canvas>
    </div>
    <div class="chart-empty" v-else>
      请选择一个作物查看价格走势
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import { getPriceTrend30Days } from '../utils/calculator.js'
import { CHART_COLORS } from '../utils/constants.js'

Chart.register(...registerables)

const props = defineProps({
  records: { type: Array, default: () => [] },
  cropList: { type: Array, default: () => [] },
})

const selectedCrop = ref('')
const selectedLocation = ref('')
const canvasRef = ref(null)
let chartInstance = null

const locationList = computed(() => {
  if (!selectedCrop.value) return []
  const locs = new Set()
  props.records
    .filter(r => r.cropName === selectedCrop.value)
    .forEach(r => locs.add(r.location))
  return [...locs].sort()
})

// 当所选作物或地点变化时，重新计算图表数据
const chartData = computed(() => {
  if (!selectedCrop.value) return null
  const data = getPriceTrend30Days(
    props.records,
    selectedCrop.value,
    selectedLocation.value || null
  )
  return data.length > 0 ? data : null
})

function buildConfig(data) {
  if (!data || data.length === 0) return null
  return {
    type: 'line',
    data: {
      labels: data.map(d => d.date.slice(5)),
      datasets: [{
        label: `${selectedCrop.value} 价格`,
        data: data.map(d => d.price),
        borderColor: CHART_COLORS.line,
        backgroundColor: 'rgba(76,175,80,0.1)',
        pointBackgroundColor: CHART_COLORS.point,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `价格: ${ctx.parsed.y} ${data[ctx.dataIndex]?.unit || ''}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: '价格' },
        },
        x: {
          title: { display: true, text: '日期 (月-日)' },
        },
      },
    },
  }
}

function render() {
  if (chartInstance) { chartInstance.destroy(); chartInstance = null }
  if (!canvasRef.value || !chartData.value) return
  const config = buildConfig(chartData.value)
  if (!config) return
  chartInstance = new Chart(canvasRef.value, config)
}

watch([chartData, selectedCrop], () => nextTick(render))
onUnmounted(() => { if (chartInstance) chartInstance.destroy() })
</script>

<style scoped>
.price-chart-panel {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}
.chart-header h3 { margin: 0; font-size: 1.1em; }
.chart-controls {
  display: flex;
  gap: 8px;
}
.chart-controls select {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
}
.chart-body {
  height: 300px;
  position: relative;
}
.chart-empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}
</style>

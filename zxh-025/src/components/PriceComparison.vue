<template>
  <div class="comparison-panel" v-if="comparison.yesterday || comparison.lastWeek">
    <h3>📊 环比涨跌</h3>
    <div class="compare-items">
      <div class="compare-item" v-if="comparison.yesterday">
        <span class="compare-label">{{ comparison.yesterday.label }}</span>
        <span class="compare-value" :class="comparison.yesterday.direction">
          {{ formatDiff(comparison.yesterday.diff) }}
          <span class="compare-pct">({{ comparison.yesterday.percent >= 0 ? '+' : '' }}{{ comparison.yesterday.percent }}%)</span>
        </span>
      </div>
      <div class="compare-item" v-if="comparison.lastWeek">
        <span class="compare-label">{{ comparison.lastWeek.label }}</span>
        <span class="compare-value" :class="comparison.lastWeek.direction">
          {{ formatDiff(comparison.lastWeek.diff) }}
          <span class="compare-pct">({{ comparison.lastWeek.percent >= 0 ? '+' : '' }}{{ comparison.lastWeek.percent }}%)</span>
        </span>
      </div>
    </div>
    <div class="compare-detail">
      当前查看：<strong>{{ selectedCrop }}</strong>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comparison: { type: Object, default: () => ({ yesterday: null, lastWeek: null }) },
  selectedCrop: { type: String, default: '' },
})

function formatDiff(val) {
  if (val > 0) return `+${val}`
  return String(val)
}
</script>

<style scoped>
.comparison-panel {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px;
}
.comparison-panel h3 { margin: 0 0 10px; font-size: 1.1em; }
.compare-items {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.compare-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.compare-label { font-size: 0.85em; color: #888; }
.compare-value { font-size: 1.3em; font-weight: bold; }
.compare-value.up { color: #F44336; }
.compare-value.down { color: #4CAF50; }
.compare-value.same { color: #9E9E9E; }
.compare-pct { font-size: 0.65em; font-weight: normal; }
.compare-detail { margin-top: 8px; font-size: 0.85em; color: #888; }
</style>

<template>
  <div class="stats-view">
    <div class="view-header">
      <h2>📊 数据统计</h2>
      <button class="btn-export" @click="handleExportImg">🖼️ 导出统计图</button>
    </div>
    <div ref="statsRef">
      <StatsPanel />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatsPanel from '../components/stats/StatsPanel.vue'
import { exportAsImage } from '../utils/export.js'

const statsRef = ref(null)

function handleExportImg() {
  if (statsRef.value) {
    exportAsImage(statsRef.value, '乡村图书统计')
  }
}
</script>

<style scoped>
.stats-view { display: flex; flex-direction: column; gap: 1rem; }
.view-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
.view-header h2 { margin: 0; color: #4A2C0A; font-family: "KaiTi","楷体",serif; }
.btn-export {
  background: #CD853F; color: #fff; border: none; border-radius: 8px;
  padding: 0.5rem 1rem; cursor: pointer; font-size: 0.9rem; transition: background .2s;
}
.btn-export:hover { background: #DAA520; }
</style>

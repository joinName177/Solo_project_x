<!--
  ArchivePanel - 成本档案管理面板
  展示已保存的档案列表，支持加载和删除
-->
<template>
  <div class="archive-panel">
    <div class="archive-header">
      <h2>🗄️ 成本档案</h2>
      <span class="archive-count">共 {{ archives.length }} 条记录</span>
      <button
        v-if="archives.length > 0"
        class="btn-clear-all"
        @click="confirmClear"
      >🗑️ 清空全部</button>
    </div>

    <div v-if="archives.length === 0" class="archive-empty">
      <span class="archive-empty__icon">📭</span>
      <p>暂无保存的档案</p>
      <p class="archive-empty__hint">点击计算器中的「保存档案」按钮来保存当前方案</p>
    </div>

    <TransitionGroup name="archive-list" tag="div" class="archive-list" v-else>
      <div
        v-for="archive in archives"
        :key="archive.id"
        class="archive-card"
        :class="{ 'archive-card--selected': selectedId === archive.id }"
      >
        <div class="archive-card__main" @click="$emit('select', archive)">
          <div class="archive-card__header">
            <span class="archive-card__name">{{ archive.planName }}</span>
            <span class="archive-card__crop">{{ archive.cropKey }}</span>
          </div>
          <div class="archive-card__stats">
            <span>{{ formatArea(archive.area) }}</span>
            <span>成本 {{ formatCurrency(archive.totals?.totalCost) }}</span>
            <span>利润 {{ formatCurrency(archive.totals?.estimatedProfit) }}</span>
          </div>
          <div class="archive-card__date">{{ formatArchiveDate(archive.savedAt) }}</div>
        </div>
        <div class="archive-card__actions">
          <button class="archive-btn archive-btn--load" @click="$emit('load', archive)">📥 加载</button>
          <button class="archive-btn archive-btn--delete" @click="$emit('delete', archive.id)">🗑️</button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { formatCurrency, formatArea } from '../../utils/formatters.js'

defineProps({
  archives: { type: Array, default: () => [] },
  selectedId: { type: String, default: null },
  formatArchiveDate: { type: Function, required: true },
})

const emit = defineEmits(['select', 'load', 'delete', 'clear-all'])

function confirmClear() {
  if (window.confirm('确定要清空所有档案吗？此操作不可撤销。')) {
    emit('clear-all')
  }
}
</script>

<style scoped>
.archive-panel {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
}
.archive-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.archive-header h2 { margin: 0; font-size: 18px; }
.archive-count {
  font-size: 13px;
  color: #9ca3af;
  flex: 1;
}
.btn-clear-all {
  padding: 6px 14px;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  background: #fff;
  color: #dc2626;
  font-size: 12px;
  cursor: pointer;
}
.btn-clear-all:hover {
  background: #fef2f2;
}

.archive-empty {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
}
.archive-empty__icon { font-size: 48px; }
.archive-empty__hint { font-size: 13px; }

.archive-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.archive-card {
  display: flex;
  align-items: stretch;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.archive-card:hover { border-color: #86efac; }
.archive-card--selected {
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.12);
}
.archive-card__main {
  flex: 1;
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.archive-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.archive-card__name { font-size: 16px; font-weight: 600; color: #1a1a1a; }
.archive-card__crop {
  padding: 2px 8px;
  border-radius: 4px;
  background: #f0fdf4;
  color: #16a34a;
  font-size: 12px;
  font-weight: 600;
}
.archive-card__stats {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6b7280;
}
.archive-card__date { font-size: 12px; color: #b0b7c3; }
.archive-card__actions {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #f3f4f6;
}
.archive-btn {
  flex: 1;
  padding: 0 14px;
  border: none;
  background: #fafbfc;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s;
}
.archive-btn--load:hover { background: #dcfce7; }
.archive-btn--delete:hover { background: #fee2e2; }

.archive-list-enter-active,
.archive-list-leave-active {
  transition: all 0.3s ease;
}
.archive-list-enter-from { opacity: 0; transform: translateX(-20px); }
.archive-list-leave-to { opacity: 0; transform: translateX(20px); }
</style>

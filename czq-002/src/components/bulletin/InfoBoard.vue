<template>
  <div class="info-board">
    <!-- 统计栏 -->
    <div class="stats-bar">
      <span class="stat-item">📋 全部信息：<strong>{{ stats.total }}</strong></span>
      <span class="stat-item">🏠 出租中：<strong>{{ stats.supply }}</strong></span>
      <span class="stat-item">🔍 求租中：<strong>{{ stats.demand }}</strong></span>
    </div>

    <!-- 操作栏 -->
    <div class="action-bar">
      <button class="btn-post" @click="openForm('supply')">＋ 发布出租</button>
      <button class="btn-post demand-btn" @click="openForm('demand')">＋ 发布求租</button>
    </div>

    <!-- 筛选栏 -->
    <FilterBar
      :filters="filters"
      @update="handleFilterUpdate"
      @reset="resetFilters"
    />

    <!-- 发布表单 -->
    <PostForm
      :visible="showForm"
      :initialType="formType"
      @submit="handleAdd"
      @cancel="showForm = false"
    />

    <!-- 信息列表 -->
    <InfoList
      :items="filteredItems"
      :emptyMessage="emptyMessage"
      @complete="markCompleted"
      @delete="handleDelete"
      @contact="item => $emit('contact', item)"
      @reactivate="markActive"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInfoBoard } from '../../composables/useInfoBoard.js'
import FilterBar from './FilterBar.vue'
import PostForm from './PostForm.vue'
import InfoList from './InfoList.vue'

const emit = defineEmits(['contact'])

const {
  filters,
  filteredItems,
  stats,
  addItem,
  markCompleted,
  markActive,
  deleteItem,
  resetFilters
} = useInfoBoard()

// --- 表单控制（组件内部状态，不需要暴露） ---
const showForm = ref(false)
const formType = ref('supply')

const emptyMessage = computed(() => {
  if (filters.status === 'completed') return '暂无已完成的信息'
  if (filters.type || filters.machineType || filters.village.trim()) {
    return '没有匹配的信息，请调整筛选条件'
  }
  return '📋 信息板还是空的，快来发布第一条信息吧！'
})

// --- 事件处理 ---

/** 筛选条件更新 — 从 FilterBar 的单一 update 事件中解构 */
function handleFilterUpdate({ key, value }) {
  filters[key] = value
}

function openForm(type) {
  formType.value = type
  showForm.value = true
}

function handleAdd(data) {
  addItem(data)
  showForm.value = false
}

function handleDelete(id) {
  if (window.confirm('确定要删除这条信息吗？')) {
    deleteItem(id)
  }
}
</script>

<style scoped>
.info-board {
  max-width: 1000px;
  margin: 0 auto;
}

.stats-bar {
  display: flex;
  gap: 20px;
  padding: 12px 20px;
  background: #fffbe6;
  border: 2px solid #d4a574;
  border-radius: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 17px;
  color: #5c3317;
}

.stat-item strong {
  color: #d32f2f;
  font-size: 20px;
}

.action-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.btn-post {
  padding: 12px 28px;
  font-size: 18px;
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-post:hover {
  background: #3e9142;
}

.demand-btn {
  background: #1565c0;
}

.demand-btn:hover {
  background: #1976d2;
}
</style>

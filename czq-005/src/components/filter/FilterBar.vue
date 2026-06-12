<template>
  <div class="filter-bar">
    <div class="filter-row">
      <!-- 手艺类型筛选 -->
      <select v-model="craftType" class="filter-select" @change="$emit('update:craftType', craftType)">
        <option value="">🔧 全部手艺</option>
        <option v-for="t in craftTypes" :key="t.key" :value="t.key">
          {{ t.icon }} {{ t.label }}
        </option>
      </select>

      <!-- 村庄筛选 -->
      <select v-model="village" class="filter-select" @change="$emit('update:village', village)">
        <option value="">📍 全部村庄</option>
        <option v-for="v in villages" :key="v" :value="v">{{ v }}</option>
      </select>

      <!-- 关键词搜索 -->
      <div class="filter-search">
        <input
          v-model="keyword"
          type="text"
          class="filter-input"
          placeholder="🔍 搜索手艺人、村庄..."
          @input="debouncedSearch"
        />
      </div>

      <!-- 只看可接单 -->
      <label class="filter-toggle">
        <input
          type="checkbox"
          :checked="showAvailableOnly"
          @change="toggleAvailable"
        />
        <span>只看可接单</span>
      </label>

      <!-- 重置 -->
      <button v-if="hasFilter" class="btn btn-sm btn-outline" @click="resetAll">✕ 清除筛选</button>
    </div>

    <!-- 结果统计 -->
    <div class="filter-info">
      共找到 <strong>{{ resultCount }}</strong> 位手艺人
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CRAFT_TYPES, DEFAULT_VILLAGES } from '../../utils/constants'

const props = defineProps({
  craftType: { type: String, default: '' },
  village: { type: String, default: '' },
  keyword: { type: String, default: '' },
  showAvailableOnly: { type: Boolean, default: false },
  resultCount: { type: Number, default: 0 }
})

const emit = defineEmits([
  'update:craftType',
  'update:village',
  'update:keyword',
  'update:showAvailableOnly',
  'reset'
])

const craftTypes = CRAFT_TYPES
const villages = DEFAULT_VILLAGES

const craftType = ref(props.craftType)
const village = ref(props.village)
const keyword = ref(props.keyword)
const showAvailableOnly = ref(props.showAvailableOnly)

// 本地代理，同步 props 变化
watch(() => props.craftType, (v) => { craftType.value = v })
watch(() => props.village, (v) => { village.value = v })
watch(() => props.keyword, (v) => { keyword.value = v })
watch(() => props.showAvailableOnly, (v) => { showAvailableOnly.value = v })

const hasFilter = computed(() => {
  return craftType.value || village.value || keyword.value || showAvailableOnly.value
})

let debounceTimer = null
function debouncedSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:keyword', keyword.value)
  }, 300)
}

function toggleAvailable(e) {
  showAvailableOnly.value = e.target.checked
  emit('update:showAvailableOnly', showAvailableOnly.value)
}

function resetAll() {
  craftType.value = ''
  village.value = ''
  keyword.value = ''
  showAvailableOnly.value = false
  emit('reset')
}
</script>

<style scoped>
.filter-bar {
  background: #fffdf7;
  border: 1px solid #f0e6d3;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}
.filter-select {
  padding: 0.45rem 0.75rem;
  border: 1.5px solid #e0d5c1;
  border-radius: 8px;
  background: #fff;
  font-size: 0.85rem;
  color: #4e342e;
  outline: none;
  cursor: pointer;
  min-width: 130px;
}
.filter-select:focus {
  border-color: #e67e22;
}
.filter-search {
  flex: 1;
  min-width: 180px;
}
.filter-input {
  width: 100%;
  padding: 0.45rem 0.75rem;
  border: 1.5px solid #e0d5c1;
  border-radius: 8px;
  font-size: 0.85rem;
  background: #fff;
  color: #4e342e;
  outline: none;
  box-sizing: border-box;
}
.filter-input:focus {
  border-color: #e67e22;
}
.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #5d4037;
  cursor: pointer;
  white-space: nowrap;
}
.filter-toggle input[type="checkbox"] {
  accent-color: #e67e22;
}
.filter-info {
  margin-top: 0.6rem;
  font-size: 0.82rem;
  color: #8d6e63;
}
.filter-info strong {
  color: #e67e22;
}
</style>

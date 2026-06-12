<template>
  <div class="filter-bar">
    <div class="filter-item">
      <label>信息类型</label>
      <select :value="filters.type" @change="update('type', $event.target.value)">
        <option value="">全部</option>
        <option value="supply">📋 出租</option>
        <option value="demand">🔍 求租</option>
      </select>
    </div>

    <div class="filter-item">
      <label>农机类型</label>
      <select :value="filters.machineType" @change="update('machineType', $event.target.value)">
        <option value="">全部</option>
        <option v-for="m in MACHINE_TYPES" :key="m.value" :value="m.value">{{ m.label }}</option>
      </select>
    </div>

    <div class="filter-item">
      <label>我的村庄</label>
      <input
        :value="filters.village"
        @input="update('village', $event.target.value)"
        type="text"
        placeholder="输入村庄名筛选"
        list="village-datalist"
      />
      <datalist id="village-datalist">
        <option v-for="v in VILLAGES" :key="v" :value="v" />
      </datalist>
    </div>

    <div class="filter-item">
      <label>状态</label>
      <select :value="filters.status" @change="update('status', $event.target.value)">
        <option value="active">进行中</option>
        <option value="completed">已完成</option>
        <option value="all">全部</option>
      </select>
    </div>

    <button class="btn-reset" @click="$emit('reset')">🔄 重置筛选</button>
  </div>
</template>

<script setup>
import { MACHINE_TYPES, VILLAGES } from '../../core/constants.js'

defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'reset'])

/**
 * 统一更新入口 — 单一 emit 替代多 emit
 * key 对应 filters 对象中的字段名
 */
function update(key, value) {
  emit('update', { key, value })
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 20px;
  background: #fffbe6;
  border: 2px solid #d4a574;
  border-radius: 8px;
  margin-bottom: 16px;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 130px;
  flex: 1;
}

.filter-item label {
  font-size: 14px;
  font-weight: bold;
  color: #8b4513;
}

.filter-item select,
.filter-item input {
  padding: 8px 12px;
  font-size: 15px;
  border: 2px solid #d4a574;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-family: inherit;
}

.btn-reset {
  padding: 8px 16px;
  font-size: 15px;
  background: #8b4513;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  height: fit-content;
}

.btn-reset:hover {
  background: #a0522d;
}
</style>

<template>
  <div class="price-table-wrap">
    <table v-if="records.length" class="price-table">
      <thead>
        <tr>
          <th>日期</th>
          <th>作物</th>
          <th>分类</th>
          <th>价格</th>
          <th>地点</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in records" :key="r.id">
          <td>{{ r.date }}</td>
          <td>{{ r.cropName }}</td>
          <td><span class="cat-tag" :class="'cat-' + r.category">{{ catLabel(r.category) }}</span></td>
          <td class="price-cell">{{ r.price }} <span class="unit">{{ r.unit }}</span></td>
          <td>{{ r.location }}</td>
          <td class="note-cell">{{ r.note }}</td>
          <td class="action-cell">
            <button class="btn-sm" @click="$emit('edit', r)">✎</button>
            <button class="btn-sm btn-danger" @click="$emit('delete', r.id)">✕</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty">暂无价格记录，请在上方添加</div>
  </div>
</template>

<script setup>
import { CATEGORY_LABELS } from '../utils/constants.js'

defineProps({ records: { type: Array, default: () => [] } })
defineEmits(['edit', 'delete'])

function catLabel(cat) { return CATEGORY_LABELS[cat] || '' }
</script>

<style scoped>
.price-table-wrap {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow-x: auto;
}
.price-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95em;
}
.price-table th {
  background: #f5f5f5;
  padding: 10px 8px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
  white-space: nowrap;
}
.price-table td {
  padding: 8px;
  border-bottom: 1px solid #eee;
}
.price-table tbody tr:hover { background: #fafafa; }
.price-cell { font-weight: bold; font-size: 1.05em; color: #333; }
.unit { font-weight: normal; color: #888; font-size: 0.85em; }
.note-cell { color: #888; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cat-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8em;
  color: #fff;
}
.cat-grain { background: #FF9800; }
.cat-vegetable { background: #4CAF50; }
.cat-fruit { background: #E91E63; }
.cat-livestock { background: #2196F3; }
.action-cell { white-space: nowrap; }
.btn-sm {
  width: 2em;
  height: 2em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 4px;
}
.btn-sm:hover { background: #f0f0f0; }
.btn-danger:hover { background: #ffebee; border-color: #F44336; color: #F44336; }
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 1.05em;
}
</style>

<template>
  <div class="csv-export">
    <button class="btn-export" @click="$emit('export')">
      📥 导出CSV
    </button>
    <span class="hint">共 {{ count }} 条记录</span>
  </div>
</template>

<script setup>
defineProps({ count: { type: Number, default: 0 } })
defineEmits(['export'])
</script>

<style scoped>
.csv-export {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-export {
  padding: 8px 18px;
  background: #2196F3;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.95em;
  cursor: pointer;
}
.btn-export:hover { background: #1976D2; }
.hint { color: #888; font-size: 0.85em; }
</style>

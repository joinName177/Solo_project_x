<template>
  <div class="target-panel">
    <h3>🎯 目标价格提醒</h3>
    <p class="hint">设置目标价格后，当录入价格达到或超过目标价时，页面顶部会出现红点提醒。</p>
    <div class="target-list">
      <div
        v-for="crop in cropList"
        :key="crop"
        class="target-row"
      >
        <span class="target-crop">{{ crop }}</span>
        <input
          type="number"
          step="0.01"
          min="0"
          :placeholder="'目标价'"
          :value="targetPrices[crop] ?? ''"
          @change="e => $emit('set-target', crop, e.target.value)"
          class="target-input"
        />
        <button
          v-if="targetPrices[crop] != null"
          class="btn-clear"
          @click="$emit('set-target', crop, null)"
          title="清除目标价"
        >✕</button>
      </div>
    </div>
    <div v-if="!cropList.length" class="empty">暂无可设置目标价的作物</div>
  </div>
</template>

<script setup>
defineProps({
  cropList: { type: Array, default: () => [] },
  targetPrices: { type: Object, default: () => ({}) },
})
defineEmits(['set-target'])
</script>

<style scoped>
.target-panel {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px;
}
.target-panel h3 { margin: 0 0 6px; font-size: 1.1em; }
.hint { color: #888; font-size: 0.85em; margin: 0 0 12px; }
.target-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 240px;
  overflow-y: auto;
}
.target-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.target-crop {
  min-width: 80px;
  font-size: 0.95em;
}
.target-input {
  width: 100px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95em;
}
.target-input:focus {
  border-color: #F44336;
  outline: none;
  box-shadow: 0 0 0 2px rgba(244,67,54,0.2);
}
.btn-clear {
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
  font-size: 0.9em;
}
.btn-clear:hover { color: #F44336; }
.empty { color: #999; text-align: center; padding: 10px; }
</style>

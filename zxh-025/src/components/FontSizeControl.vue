<template>
  <div class="font-size-control">
    <button class="btn-icon" @click="$emit('decrease')" title="缩小字体" :disabled="fontSize <= min">A-</button>
    <span class="font-size-value">{{ fontSize }}px</span>
    <button class="btn-icon" @click="$emit('increase')" title="放大字体" :disabled="fontSize >= max">A+</button>
    <button class="btn-icon btn-reset" @click="$emit('reset')" title="恢复默认">↺</button>
  </div>
</template>

<script setup>
defineProps({
  fontSize: { type: Number, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
})
defineEmits(['increase', 'decrease', 'reset'])
</script>

<style scoped>
.font-size-control {
  display: flex;
  align-items: center;
  gap: 6px;
}
.font-size-value {
  font-size: 0.85em;
  color: #666;
  min-width: 2.8em;
  text-align: center;
}
.btn-icon {
  width: 2.2em;
  height: 2.2em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-icon:disabled { opacity: 0.4; cursor: default; }
.btn-icon:hover:not(:disabled) { background: #f0f0f0; }
.btn-reset { font-size: 1.1em; }
</style>

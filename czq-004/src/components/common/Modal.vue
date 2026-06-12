<!--
  通用模态框组件
  职责：提供统一的弹出层容器，支持标题、内容插槽、关闭回调
-->
<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container" :class="sizeClass">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="modal-close" @click="$emit('close')" title="关闭">✕</button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'medium', validator: (v) => ['small', 'medium', 'large'].includes(v) },
})

defineEmits(['close'])

const sizeClass = computed(() => `modal--${props.size}`)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}
.modal-container {
  background: #fffef7;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.25s ease;
}
.modal--small  { width: 360px; }
.modal--medium { width: 520px; }
.modal--large  { width: 680px; }
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e8dcc8;
}
.modal-title {
  margin: 0;
  font-size: 18px;
  color: #5d4037;
}
.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #8d6e63;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;
}
.modal-close:hover {
  background: #efebe9;
}
.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}
.modal-footer {
  padding: 12px 20px;
  border-top: 1px solid #e8dcc8;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>

<template>
  <Modal :model-value="modelValue" :title="title || '确认操作'" @update:model-value="$emit('update:modelValue', $event)">
    <p class="confirm-message">{{ message }}</p>
    <template #footer>
      <button class="btn btn-outline" @click="cancel">取消</button>
      <button class="btn" :class="confirmClass" @click="confirm">{{ confirmText }}</button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '确认操作' },
  message: { type: String, default: '确定要执行此操作吗？' },
  confirmText: { type: String, default: '确定' },
  confirmClass: { type: String, default: 'btn-primary' }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function confirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function cancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.confirm-message {
  color: #5d4037;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}
</style>

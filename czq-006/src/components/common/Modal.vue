<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content" :style="{ maxWidth }">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="modal-close" @click="$emit('close')">✕</button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  maxWidth: { type: String, default: '500px' }
})
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 1rem;
}
.modal-content {
  background: #fef9f2; border: 3px solid #d4b896; border-radius: 16px;
  width: 100%; box-shadow: 4px 5px 20px rgba(0,0,0,.3);
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.8rem 1.2rem; border-bottom: 1px solid #d4b896;
}
.modal-header h3 { margin: 0; color: #4A2C0A; font-family: "KaiTi","楷体",serif; }
.modal-close {
  background: none; border: none; font-size: 1.2rem; cursor: pointer;
  color: #8B5E3C; padding: 0.2rem 0.5rem; border-radius: 4px;
}
.modal-close:hover { background: #f5e6d3; }
.modal-body { padding: 1.2rem; }
</style>

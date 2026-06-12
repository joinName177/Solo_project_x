<template>
  <Teleport to="body">
    <div class="confirm-overlay" @click.self="$emit('cancel')">
      <div class="confirm-box">
        <p class="confirm-message">{{ message }}</p>
        <div class="confirm-actions">
          <button class="btn-confirm" @click="$emit('confirm')">确认</button>
          <button class="btn-cancel" @click="$emit('cancel')">取消</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  message: { type: String, default: '确定执行此操作吗？' }
})
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.confirm-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 1100;
}
.confirm-box {
  background: #fef9f2; border: 3px solid #d4b896; border-radius: 14px;
  padding: 1.5rem 2rem; text-align: center;
  box-shadow: 4px 5px 20px rgba(0,0,0,.25);
}
.confirm-message { color: #4A2C0A; font-size: 1rem; margin: 0 0 1.2rem; }
.confirm-actions { display: flex; gap: 0.8rem; justify-content: center; }
.btn-confirm {
  background: #d32f2f; color: #fff; border: none; border-radius: 8px;
  padding: 0.5rem 1.2rem; cursor: pointer; transition: background .2s;
}
.btn-confirm:hover { background: #b71c1c; }
.btn-cancel {
  background: transparent; color: #5D3A1A; border: 2px solid #8B5E3C;
  border-radius: 8px; padding: 0.4rem 1.2rem; cursor: pointer; transition: all .2s;
}
.btn-cancel:hover { background: #f5e6d3; }
</style>

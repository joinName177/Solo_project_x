<template>
  <transition name="overlay">
    <div v-if="visible" class="sale-overlay">
      <div class="sale-content">
        <div class="sale-icon">🎉</div>
        <div class="sale-title">大促模式完成！</div>
        <div class="sale-subtitle">额外奖励 +20分</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
})
</script>

<style scoped>
.sale-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 152, 0, 0.3);
  z-index: 200;
}

.sale-content {
  text-align: center;
  background: #fff;
  padding: 40px 60px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  animation: bounceIn 0.5s ease-out;
}

@keyframes bounceIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.sale-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.sale-title {
  font-size: 28px;
  font-weight: bold;
  color: #e65100;
  margin-bottom: 8px;
}

.sale-subtitle {
  font-size: 18px;
  color: #8B7355;
}

.overlay-enter-active {
  transition: opacity 0.3s;
}

.overlay-leave-active {
  transition: opacity 0.3s;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>

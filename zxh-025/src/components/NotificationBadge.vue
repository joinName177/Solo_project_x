<template>
  <div class="notification-badge" v-if="hasAlerts" @click="$emit('clear')" title="点击清除提醒">
    <span class="badge-dot" :class="{ pulse: alertList.length > 0 }"></span>
    <span class="badge-text">{{ alertList.length }} 个价格提醒</span>
  </div>
</template>

<script setup>
defineProps({
  hasAlerts: { type: Boolean, default: false },
  alertList: { type: Array, default: () => [] },
})
defineEmits(['clear'])
</script>

<style scoped>
.notification-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 16px;
  background: #fff0f0;
  border: 1px solid #ffcdd2;
}
.badge-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #F44336;
}
.badge-dot.pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.badge-text { font-size: 0.9em; color: #c62828; }
</style>

<!--
  通用徽章组件
  职责：展示分类标签、状态标记等彩色小标签
-->
<template>
  <span class="badge" :class="[`badge--${variant}`, { 'badge--clickable': clickable }]" @click="clickable && $emit('click')">
    <span v-if="icon" class="badge-icon">{{ icon }}</span>
    <span class="badge-text"><slot /></span>
  </span>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'default' },
  icon: { type: String, default: '' },
  clickable: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: transform 0.12s, box-shadow 0.12s;
}
.badge--clickable {
  cursor: pointer;
  user-select: none;
}
.badge--clickable:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}
.badge--clickable:active {
  transform: translateY(0);
}

/* 变体颜色 — 村口公告板暖色调 */
.badge--default  { background: #efebe9; color: #5d4037; }
.badge--demand   { background: #fff3e0; color: #e65100; }
.badge--supply   { background: #e8f5e9; color: #2e7d32; }
.badge--planting { background: #f1f8e9; color: #558b2f; }
.badge--breeding { background: #fff8e1; color: #f9a825; }
.badge--building { background: #eceff1; color: #546e7a; }
.badge--moving   { background: #fce4ec; color: #c62828; }
.badge--domestic { background: #e8eaf6; color: #283593; }
.badge--other    { background: #f3e5f5; color: #6a1b9a; }
.badge--success  { background: #e8f5e9; color: #2e7d32; }
.badge--warning  { background: #fff3e0; color: #ef6c00; }

.badge-icon { font-size: 14px; }
</style>

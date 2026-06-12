<template>
  <div class="archive-panel" v-if="visible">
    <div class="archive-panel__overlay" @click="$emit('close')"></div>
    <div class="archive-panel__content">
      <div class="archive-panel__header">
        <h2 class="archive-panel__title">📦 已归档事件</h2>
        <button class="archive-panel__close-btn" @click="$emit('close')">✕</button>
      </div>

      <div v-if="archivedEvents.length === 0" class="archive-panel__empty">
        <div class="empty-icon">📭</div>
        <div>暂无已归档事件</div>
        <div class="empty-hint">将进行中的事件标记为"已完成"后会自动归档到此处</div>
      </div>

      <div v-else class="archive-panel__list">
        <div
          v-for="event in archivedEvents"
          :key="event.id"
          class="archive-panel__item"
        >
          <div class="archive-item__header">
            <span class="archive-item__icon">{{ getTypeIcon(event.eventType) }}</span>
            <span class="archive-item__type">{{ getTypeLabel(event.eventType) }}</span>
            <span class="archive-item__host">{{ event.hostName }}</span>
            <span class="archive-item__date">{{ event.eventDate }}</span>
          </div>
          <div class="archive-item__meta">
            完成于 {{ formatDate(event.completedAt) }}
            · {{ event.helpItems.filter(h => h.claimedBy).length }}/{{ event.helpItems.length }} 事项已认领
          </div>
          <div class="archive-item__actions">
            <button class="archive-item__restore-btn" @click="$emit('restore', event.id)">
              ↩ 恢复
            </button>
            <button class="archive-item__delete-btn" @click="handleDelete(event.id)">
              🗑 删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEvents } from '../composables/useEvents.js'
import { EVENT_TYPES } from '../utils/constants.js'

defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'restore'])
const { archivedEvents, deleteEvent } = useEvents()

function getTypeIcon(type) {
  return EVENT_TYPES[type]?.icon || '📋'
}
function getTypeLabel(type) {
  return EVENT_TYPES[type]?.label || '未知'
}
function formatDate(isoString) {
  if (!isoString) return ''
  return isoString.split('T')[0]
}
function handleDelete(eventId) {
  if (confirm('确定要永久删除此归档事件吗？此操作不可恢复。')) {
    deleteEvent(eventId)
  }
}
</script>

<style scoped>
.archive-panel__overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99;
}
.archive-panel__content {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 92%; max-width: 560px; max-height: 85vh; overflow-y: auto;
  background: #fffef9; border-radius: 16px; padding: 24px;
  z-index: 100; box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.archive-panel__header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.archive-panel__title { margin: 0; font-size: 20px; color: #5d4037; }
.archive-panel__close-btn {
  border: none; background: transparent; font-size: 22px; cursor: pointer; color: #8d6e63;
}
.archive-panel__empty {
  text-align: center; padding: 40px 20px; color: #999;
}
.empty-icon { font-size: 40px; margin-bottom: 8px; }
.empty-hint { font-size: 13px; margin-top: 6px; color: #bbb; }
.archive-panel__list { display: flex; flex-direction: column; gap: 10px; }
.archive-panel__item {
  padding: 14px; border-radius: 10px; background: #f5f5f5; border: 1px solid #ddd;
}
.archive-item__header {
  display: flex; gap: 8px; align-items: center; font-size: 16px;
}
.archive-item__icon { font-size: 20px; }
.archive-item__type { font-weight: 600; color: #5d4037; }
.archive-item__host { color: #4a3728; }
.archive-item__date { color: #8d6e63; font-size: 14px; margin-left: auto; }
.archive-item__meta { font-size: 13px; color: #999; margin-top: 6px; }
.archive-item__actions { display: flex; gap: 8px; margin-top: 10px; }
.archive-item__restore-btn {
  padding: 6px 14px; border: none; border-radius: 6px;
  background: #27ae60; color: #fff; font-size: 13px; cursor: pointer;
}
.archive-item__delete-btn {
  padding: 6px 14px; border: 1px solid #c0392b; border-radius: 6px;
  background: transparent; color: #c0392b; font-size: 13px; cursor: pointer;
}
</style>

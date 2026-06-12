<template>
  <div class="event-card" :class="`event-card--${category}`">
    <!-- 头部信息 -->
    <div class="event-card__header">
      <div class="event-card__title-row">
        <span class="event-card__icon">{{ typeConfig.icon }}</span>
        <span class="event-card__type">{{ typeConfig.label }}</span>
        <span v-if="event.status === 'completed'" class="event-card__badge">已归档</span>
      </div>
      <div class="event-card__host">
        <span class="event-card__host-label">事主：</span>
        <strong>{{ event.hostName }}</strong>
      </div>
      <div class="event-card__date">
        📅 {{ event.eventDate }}
      </div>
      <div v-if="event.notes" class="event-card__notes">
        📝 {{ event.notes }}
      </div>
    </div>

    <!-- 帮忙事项 -->
    <div class="event-card__help-section">
      <div class="event-card__help-header">
        <span>🤝 需要帮忙的事项（{{ claimedCount }}/{{ event.helpItems.length }}）</span>
        <button
          v-if="event.status === 'active'"
          class="event-card__add-btn"
          @click="showAddItem = !showAddItem"
        >
          ＋ 添加
        </button>
      </div>

      <!-- 添加新事项 -->
      <HelpItemForm
        v-if="showAddItem"
        @add="handleAddItem"
      />

      <!-- 事项列表 -->
      <div v-if="event.helpItems.length === 0" class="event-card__empty">
        暂无帮忙事项
      </div>
      <HelpItem
        v-for="item in event.helpItems"
        :key="item.id"
        :item="item"
        :can-manage="event.status === 'active'"
        @claim="handleClaim"
        @unclaim="handleUnclaim"
        @remove="handleRemove"
      />

      <!-- 进度条 -->
      <div v-if="event.helpItems.length > 0" class="event-card__progress">
        <div class="event-card__progress-bar">
          <div
            class="event-card__progress-fill"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <span class="event-card__progress-text">{{ progressPercent }}%</span>
      </div>
    </div>

    <!-- 底部操作 -->
    <div class="event-card__footer">
      <button
        v-if="event.status === 'active'"
        class="event-card__archive-btn"
        @click="$emit('archive', event.id)"
      >
        📦 标记完成并归档
      </button>
      <button
        v-else
        class="event-card__restore-btn"
        @click="$emit('restore', event.id)"
      >
        ↩ 恢复为进行中
      </button>
      <button class="event-card__delete-btn" @click="$emit('delete', event.id)">
        🗑 删除
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EVENT_TYPES } from '../utils/constants.js'
import HelpItem from './HelpItem.vue'
import HelpItemForm from './HelpItemForm.vue'

const props = defineProps({
  event: { type: Object, required: true }
})

const emit = defineEmits(['claim', 'unclaim', 'remove-item', 'add-item', 'archive', 'restore', 'delete'])

const showAddItem = ref(false)

const typeConfig = computed(() => EVENT_TYPES[props.event.eventType] || {})
const category = computed(() => typeConfig.value.category || 'red')
const claimedCount = computed(() =>
  props.event.helpItems.filter(h => h.claimedBy).length
)
const progressPercent = computed(() => {
  if (props.event.helpItems.length === 0) return 0
  return Math.round((claimedCount.value / props.event.helpItems.length) * 100)
})

function handleAddItem(description) {
  emit('add-item', { eventId: props.event.id, description })
  showAddItem.value = false
}

function handleClaim({ itemId, claimerName }) {
  emit('claim', { eventId: props.event.id, itemId, claimerName })
}

function handleUnclaim(itemId) {
  emit('unclaim', { eventId: props.event.id, itemId })
}

function handleRemove(itemId) {
  emit('remove-item', { eventId: props.event.id, itemId })
}
</script>

<style scoped>
.event-card {
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  font-size: 16px;
}
.event-card--red {
  background: #fff5f5;
  border: 2px solid #e8b4b4;
}
.event-card--white {
  background: #f8f8f8;
  border: 2px solid #ccc;
}
.event-card__header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #d0c5b5;
}
.event-card__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.event-card__icon { font-size: 24px; }
.event-card__type {
  font-size: 20px;
  font-weight: 700;
}
.event-card--red .event-card__type { color: #c0392b; }
.event-card--white .event-card__type { color: #2c3e50; }
.event-card__badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: #bdc3c7;
  color: #fff;
}
.event-card__host { font-size: 18px; margin-bottom: 4px; color: #4a3728; }
.event-card__host-label { color: #8d6e63; }
.event-card__date { color: #8d6e63; font-size: 14px; }
.event-card__notes { color: #6d5d4b; font-size: 14px; margin-top: 4px; font-style: italic; }

.event-card__help-section { margin-bottom: 16px; }
.event-card__help-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #5d4037;
  margin-bottom: 8px;
}
.event-card__add-btn {
  font-size: 13px;
  padding: 4px 12px;
  border: 1px dashed #8d6e63;
  border-radius: 6px;
  background: transparent;
  color: #8d6e63;
  cursor: pointer;
}
.event-card__empty {
  text-align: center;
  padding: 16px;
  color: #999;
  font-size: 14px;
}
.event-card__progress {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}
.event-card__progress-bar {
  flex: 1;
  height: 8px;
  background: #e0d5c7;
  border-radius: 4px;
  overflow: hidden;
}
.event-card__progress-fill {
  height: 100%;
  background: #6d4c41;
  border-radius: 4px;
  transition: width 0.3s;
}
.event-card__progress-text {
  font-size: 13px;
  color: #8d6e63;
  font-weight: 600;
  min-width: 36px;
}
.event-card__footer {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px dashed #d0c5b5;
}
.event-card__archive-btn,
.event-card__restore-btn,
.event-card__delete-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
.event-card__archive-btn { background: #6d4c41; color: #fff; }
.event-card__restore-btn { background: #27ae60; color: #fff; }
.event-card__delete-btn { background: transparent; color: #c0392b; border: 1px solid #c0392b; }
</style>

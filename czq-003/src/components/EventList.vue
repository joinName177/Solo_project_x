<template>
  <div class="event-list">
    <!-- 筛选栏 -->
    <div class="event-list__filters">
      <div class="event-list__filter-group">
        <button
          v-for="filter in typeFilters"
          :key="filter.key"
          class="event-list__filter-btn"
          :class="{ active: filterType === filter.key }"
          @click="filterType = filter.key"
        >
          {{ filter.label }}
          <span v-if="filter.count !== undefined" class="filter-count">
            ({{ filter.count }})
          </span>
        </button>
      </div>
      <div class="event-list__search">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="🔍 搜索事主或事项…"
          class="event-list__search-input"
        />
      </div>
    </div>

    <!-- 事件列表 -->
    <div v-if="filteredEvents.length === 0" class="event-list__empty">
      <div class="empty-icon">📭</div>
      <div class="empty-text">暂无事件记录</div>
      <div class="empty-hint">点击下方按钮登记第一条事件吧</div>
    </div>

    <TransitionGroup name="list" tag="div">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @claim="handleClaim"
        @unclaim="handleUnclaim"
        @remove-item="handleRemoveItem"
        @add-item="handleAddItem"
        @archive="handleArchive"
        @restore="handleRestore"
        @delete="handleDelete"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEvents } from '../composables/useEvents.js'
import { EVENT_TYPES } from '../utils/constants.js'
import EventCard from './EventCard.vue'

const {
  filterType,
  searchKeyword,
  filteredEvents,
  eventTypeCounts,
  claimHelpItem,
  unclaimHelpItem,
  addHelpItem,
  removeHelpItem,
  archiveEvent,
  unarchiveEvent,
  deleteEvent
} = useEvents()

const typeFilters = computed(() => {
  const filters = [
    { key: 'all', label: '全部', count: eventTypeCounts.value.all || 0 }
  ]
  Object.entries(EVENT_TYPES).forEach(([key, config]) => {
    filters.push({
      key,
      label: `${config.icon} ${config.label}`,
      count: eventTypeCounts.value[key] || 0
    })
  })
  filters.push({ key: 'completed', label: '📦 已归档' })
  return filters
})

function handleClaim({ eventId, itemId, claimerName }) {
  claimHelpItem(eventId, itemId, claimerName)
}
function handleUnclaim({ eventId, itemId }) {
  unclaimHelpItem(eventId, itemId)
}
function handleAddItem({ eventId, description }) {
  addHelpItem(eventId, description)
}
function handleRemoveItem({ eventId, itemId }) {
  removeHelpItem(eventId, itemId)
}
function handleArchive(eventId) {
  if (confirm('确定将此事件标记为已完成并归档吗？')) {
    archiveEvent(eventId)
  }
}
function handleRestore(eventId) {
  unarchiveEvent(eventId)
}
function handleDelete(eventId) {
  if (confirm('确定要删除此事件吗？此操作不可恢复。')) {
    deleteEvent(eventId)
  }
}
</script>

<style scoped>
.event-list__filters {
  display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
  margin-bottom: 16px; padding: 12px; background: #fffef9;
  border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.event-list__filter-group { display: flex; flex-wrap: wrap; gap: 6px; flex: 1; }
.event-list__filter-btn {
  padding: 8px 14px; border: 1px solid #d0c5b5; border-radius: 20px;
  background: #fff; font-size: 14px; cursor: pointer; transition: all 0.2s;
}
.event-list__filter-btn.active {
  background: #5d4037; color: #fff; border-color: #5d4037;
}
.filter-count { font-size: 12px; opacity: 0.8; }
.event-list__search { min-width: 200px; }
.event-list__search-input {
  width: 100%; padding: 8px 14px; border: 1px solid #d0c5b5; border-radius: 20px;
  font-size: 14px; outline: none; box-sizing: border-box;
}
.event-list__search-input:focus { border-color: #8d6e63; }
.event-list__empty {
  text-align: center; padding: 60px 20px; color: #999;
}
.empty-icon { font-size: 48px; margin-bottom: 12px; }
.empty-text { font-size: 18px; margin-bottom: 6px; }
.empty-hint { font-size: 14px; }

/* 列表动画 */
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from { opacity: 0; transform: translateY(20px); }
.list-leave-to { opacity: 0; transform: translateX(-20px); }
</style>

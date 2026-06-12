<template>
  <div class="info-list">
    <div v-if="items.length === 0" class="empty-state">
      <p class="empty-icon">📭</p>
      <p class="empty-text">{{ emptyMessage }}</p>
    </div>

    <div v-else class="list-header">
      <span>共找到 <strong>{{ items.length }}</strong> 条信息</span>
    </div>

    <TransitionGroup name="list" tag="div" class="cards-grid">
      <InfoCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @complete="id => $emit('complete', id)"
        @delete="id => $emit('delete', id)"
        @contact="item => $emit('contact', item)"
        @reactivate="id => $emit('reactivate', id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import InfoCard from './InfoCard.vue'

defineProps({
  items: { type: Array, default: () => [] },
  emptyMessage: { type: String, default: '暂无信息，快来发布第一条吧！' }
})

defineEmits(['complete', 'delete', 'contact', 'reactivate'])
</script>

<style scoped>
.info-list {
  min-height: 150px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

.empty-icon {
  font-size: 64px;
  margin: 0 0 12px 0;
}

.empty-text {
  font-size: 20px;
  margin: 0;
  color: #8b4513;
}

.list-header {
  margin-bottom: 12px;
  font-size: 15px;
  color: #666;
}

.cards-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}

/* TransitionGroup 动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>

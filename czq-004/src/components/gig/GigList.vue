<!--
  零工列表组件
  职责：渲染零工卡片列表，处理空状态
-->
<template>
  <div class="gig-list">
    <!-- 统计信息 -->
    <div class="list-stats">
      <span>共 <strong>{{ gigs.length }}</strong> 条信息</span>
      <span v-if="activeCount !== undefined">（<strong>{{ activeCount }}</strong> 条进行中）</span>
    </div>

    <!-- 空状态 -->
    <div v-if="gigs.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p class="empty-title">
        {{ hasFilters ? '没有匹配的信息' : '公告板上还没有信息' }}
      </p>
      <p class="empty-desc">
        {{ hasFilters ? '试试调整筛选条件吧' : '来贴第一张零工启事吧！' }}
      </p>
    </div>

    <!-- 卡片列表 -->
    <TransitionGroup v-else name="card-list" tag="div" class="card-stack">
      <GigCard
        v-for="gig in gigs"
        :key="gig.id"
        :gig="gig"
        :reputation-score="getReputationScore(gig.id)"
        :already-endorsed="checkEndorsed(gig.id)"
        @endorse="(gigId) => $emit('endorse', gigId)"
        @contact="(gig) => $emit('contact', gig)"
        @toggle-complete="(gigId) => $emit('toggleComplete', gigId)"
        @delete="(gigId) => $emit('delete', gigId)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import GigCard from './GigCard.vue'

defineProps({
  gigs: { type: Array, required: true },
  activeCount: { type: Number, default: undefined },
  hasFilters: { type: Boolean, default: false },
  getReputationScore: { type: Function, required: true },
  checkEndorsed: { type: Function, required: true },
})

defineEmits(['endorse', 'contact', 'toggleComplete', 'delete'])
</script>

<style scoped>
.gig-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.list-stats {
  font-size: 14px;
  color: #8d6e63;
  padding: 0 4px;
}
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #fffef7;
  border: 2px dashed #e8dcc8;
  border-radius: 12px;
}
.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
}
.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: #5d4037;
  margin: 0 0 8px;
}
.empty-desc {
  font-size: 14px;
  color: #a1887f;
  margin: 0;
}
.card-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 列表动画 */
.card-list-enter-active {
  transition: all 0.4s ease;
}
.card-list-leave-active {
  transition: all 0.3s ease;
}
.card-list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.card-list-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
.card-list-move {
  transition: transform 0.3s ease;
}
</style>

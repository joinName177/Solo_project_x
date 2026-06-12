<template>
  <div class="leaderboard">
    <div class="leaderboard-header">
      <h2 class="leaderboard-title">🏆 手艺排行榜</h2>
      <div class="sort-tabs">
        <button
          v-for="s in sortOptions"
          :key="s.key"
          class="sort-tab"
          :class="{ active: sortType === s.key }"
          @click="sortType = s.key"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div v-if="ranking.length === 0" class="empty-state">
      <p>📭 暂无排行数据</p>
      <p class="empty-hint">手艺人完成接单并获得评价后将出现在排行榜上</p>
    </div>

    <div v-else class="rank-list">
      <div
        v-for="(item, idx) in ranking"
        :key="item.id"
        class="rank-item"
        :class="getRankClass(idx)"
        @click="$emit('select', item.id)"
      >
        <div class="rank-number">
          <span v-if="idx === 0">🥇</span>
          <span v-else-if="idx === 1">🥈</span>
          <span v-else-if="idx === 2">🥉</span>
          <span v-else>{{ idx + 1 }}</span>
        </div>
        <div class="rank-info">
          <span class="rank-name">{{ item.name }}</span>
          <span class="rank-type">{{ getCraftLabel(item.craftType) }}</span>
        </div>
        <div class="rank-stats">
          <span class="rank-orders">📦 {{ item.orderCount || 0 }}单</span>
          <span class="rank-rating">⭐ {{ item.avgRating?.toFixed(1) || '0.0' }}</span>
          <span class="rank-score">🔥 {{ item.compositeScore?.toFixed(1) || '0' }}分</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CRAFT_TYPES, RANK_SORT } from '../../utils/constants'

const props = defineProps({
  compositeRanking: { type: Array, default: () => [] },
  ordersRanking: { type: Array, default: () => [] },
  ratingRanking: { type: Array, default: () => [] }
})

defineEmits(['select'])

const sortOptions = [
  { key: RANK_SORT.COMPREHENSIVE, label: '🏆 综合' },
  { key: RANK_SORT.ORDERS, label: '📦 接单量' },
  { key: RANK_SORT.RATING, label: '⭐ 评分' }
]

const sortType = ref(RANK_SORT.COMPREHENSIVE)

const ranking = computed(() => {
  switch (sortType.value) {
    case RANK_SORT.ORDERS: return props.ordersRanking
    case RANK_SORT.RATING: return props.ratingRanking
    default: return props.compositeRanking
  }
})

function getRankClass(idx) {
  if (idx === 0) return 'rank-gold'
  if (idx === 1) return 'rank-silver'
  if (idx === 2) return 'rank-bronze'
  return ''
}

function getCraftLabel(key) {
  return CRAFT_TYPES.find((t) => t.key === key)?.label || '其他'
}
</script>

<style scoped>
.leaderboard {
  background: linear-gradient(135deg, #fef9f0, #fdf5e6);
  border: 2px solid #e8d5b0;
  border-radius: 16px;
  padding: 1.25rem;
}
.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.leaderboard-title {
  margin: 0;
  font-size: 1.2rem;
  color: #8b4513;
}
.sort-tabs {
  display: flex;
  gap: 0.25rem;
}
.sort-tab {
  padding: 4px 12px;
  border: 1px solid #e0d5c1;
  border-radius: 14px;
  background: #fff;
  font-size: 0.8rem;
  color: #5d4037;
  cursor: pointer;
  transition: all 0.2s;
}
.sort-tab.active {
  background: #e67e22;
  color: #fff;
  border-color: #e67e22;
}
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #8d6e63;
}
.empty-hint {
  font-size: 0.82rem;
  color: #aaa;
}
.rank-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rank-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: #fffdf7;
  border: 1px solid #f0e6d3;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.rank-item:hover {
  border-color: #e67e22;
  box-shadow: 0 2px 8px rgba(230,126,34,0.1);
  transform: translateX(4px);
}
.rank-gold { border-left: 4px solid #f1c40f; }
.rank-silver { border-left: 4px solid #bdc3c7; }
.rank-bronze { border-left: 4px solid #e67e22; }
.rank-number {
  font-size: 1.3rem;
  width: 36px;
  text-align: center;
  color: #8d6e63;
  font-weight: 700;
  flex-shrink: 0;
}
.rank-info {
  flex: 1;
  min-width: 0;
}
.rank-name {
  display: block;
  font-weight: 600;
  color: #4e342e;
  font-size: 0.95rem;
}
.rank-type {
  font-size: 0.72rem;
  color: #e67e22;
  background: #fef5e7;
  padding: 1px 6px;
  border-radius: 4px;
}
.rank-stats {
  display: flex;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: #8d6e63;
  flex-shrink: 0;
}
.rank-score {
  color: #e67e22;
  font-weight: 700;
}
</style>

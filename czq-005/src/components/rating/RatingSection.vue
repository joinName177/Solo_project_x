<template>
  <div v-if="ratings.length > 0" class="rating-section">
    <h4 class="section-title">⭐ 村民评价 ({{ ratings.length }})</h4>
    <div class="rating-list">
      <div v-for="r in ratings" :key="r.id" class="rating-item">
        <div class="rating-item-header">
          <span class="rating-reviewer">{{ r.reviewer }}</span>
          <span class="rating-stars">{{ '★'.repeat(r.score) }}{{ '☆'.repeat(5 - r.score) }}</span>
          <span class="rating-date">{{ formatDate(r.createdAt) }}</span>
        </div>
        <p v-if="r.comment" class="rating-comment">{{ r.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '../../utils/helpers'

defineProps({
  ratings: { type: Array, default: () => [] }
})
</script>

<style scoped>
.rating-section {
  background: #fdfaf5;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.section-title {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: #5d4037;
}
.rating-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}
.rating-item {
  background: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #f0e6d3;
}
.rating-item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}
.rating-reviewer {
  font-weight: 600;
  color: #5d4037;
}
.rating-stars {
  color: #f39c12;
  font-size: 0.85rem;
}
.rating-date {
  margin-left: auto;
  color: #aaa;
  font-size: 0.75rem;
}
.rating-comment {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: #4e342e;
  line-height: 1.5;
}
</style>

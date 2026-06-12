<template>
  <div class="craftsman-card" :class="{ busy: craftsman.status === 'busy' }" @click="showDetail">
    <!-- 状态标签 -->
    <span class="status-tag" :class="statusClass">{{ statusLabel }}</span>

    <!-- 头部信息 -->
    <div class="card-header">
      <span class="craft-icon">{{ craftIcon }}</span>
      <div class="card-title-group">
        <h3 class="craft-name">{{ craftsman.name }}</h3>
        <span class="craft-type">{{ craftLabel }}</span>
      </div>
    </div>

    <!-- 服务范围与定价 -->
    <div class="card-body">
      <div class="info-row">
        <span class="info-label">📍 服务范围：</span>
        <span class="info-value">{{ craftsman.serviceArea.join('、') }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">💰 收费标准：</span>
        <span class="info-value pricing">{{ craftsman.pricing }}</span>
      </div>
      <div class="info-row" v-if="craftsman.description">
        <span class="info-label">📝 简介：</span>
        <span class="info-value">{{ truncate(craftsman.description, 30) }}</span>
      </div>
    </div>

    <!-- 评分与接单 -->
    <div class="card-footer">
      <StarRating
        :model-value="avgRating"
        :count="craftsman.ratings?.length || 0"
        readonly
      />
      <span class="order-count">已接{{ craftsman.orderCount || 0 }}单</span>
    </div>

    <!-- 作品缩略图 -->
    <div v-if="craftsman.photos?.length" class="card-photos">
      <img
        v-for="(photo, idx) in craftsman.photos.slice(0, 2)"
        :key="idx"
        :src="photo"
        alt="作品照片"
        class="photo-thumb"
        @click.stop
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StarRating from '../common/StarRating.vue'
import { CRAFT_TYPES, STATUS_MAP } from '../../utils/constants'
import { calcAverageRating, truncate } from '../../utils/helpers'

const props = defineProps({
  craftsman: { type: Object, required: true }
})

const emit = defineEmits(['click'])

const craftLabel = computed(() => {
  return CRAFT_TYPES.find((t) => t.key === props.craftsman.craftType)?.label || '其他'
})

const craftIcon = computed(() => {
  return CRAFT_TYPES.find((t) => t.key === props.craftsman.craftType)?.icon || '🛠️'
})

const statusLabel = computed(() => STATUS_MAP[props.craftsman.status]?.label || '')
const statusClass = computed(() => STATUS_MAP[props.craftsman.status]?.className || '')

const avgRating = computed(() => calcAverageRating(props.craftsman.ratings || []))

function showDetail() {
  emit('click', props.craftsman.id)
}
</script>

<style scoped>
.craftsman-card {
  background: #fffdf7;
  border: 2px solid #f0e6d3;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}
.craftsman-card:hover {
  border-color: #e67e22;
  box-shadow: 0 4px 16px rgba(230, 126, 34, 0.15);
  transform: translateY(-2px);
}
.craftsman-card.busy {
  opacity: 0.75;
  background: #f9f9f9;
}
.status-tag {
  position: absolute;
  top: 0;
  right: 0;
  padding: 3px 14px;
  font-size: 0.75rem;
  border-radius: 0 10px 0 10px;
  font-weight: 600;
}
.status-available {
  background: #27ae60;
  color: #fff;
}
.status-busy {
  background: #95a5a6;
  color: #fff;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}
.craft-icon {
  font-size: 2rem;
}
.craft-name {
  margin: 0;
  font-size: 1.05rem;
  color: #4e342e;
}
.craft-type {
  font-size: 0.78rem;
  color: #e67e22;
  font-weight: 600;
  background: #fef5e7;
  padding: 1px 8px;
  border-radius: 4px;
}
.card-body {
  margin-bottom: 0.5rem;
}
.info-row {
  display: flex;
  font-size: 0.82rem;
  margin-bottom: 3px;
  line-height: 1.5;
}
.info-label {
  color: #8d6e63;
  flex-shrink: 0;
}
.info-value {
  color: #4e342e;
}
.pricing {
  color: #d35400;
  font-weight: 600;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px dashed #f0e6d3;
}
.order-count {
  font-size: 0.78rem;
  color: #8d6e63;
  background: #fef5e7;
  padding: 2px 8px;
  border-radius: 10px;
}
.card-photos {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.photo-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #f0e6d3;
}
</style>

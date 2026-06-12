<template>
  <Modal
    :model-value="modelValue && !!craftsman"
    :title="craftsman ? '🧑‍🔧 手艺人详情' : ''"
    wide
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div v-if="craftsman" class="detail">
      <!-- 基本信息 -->
      <div class="detail-header">
        <span class="detail-icon">{{ craftIcon }}</span>
        <div>
          <h3 class="detail-name">{{ craftsman.name }}</h3>
          <span class="detail-type">{{ craftLabel }}</span>
          <span class="status-tag" :class="statusClass">{{ statusLabel }}</span>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="detail-section">
        <div class="detail-row">
          <span class="detail-label">📞 联系电话：</span>
          <a :href="'tel:' + craftsman.phone" class="detail-phone">{{ craftsman.phone }}</a>
        </div>
        <div class="detail-row">
          <span class="detail-label">📍 服务范围：</span>
          <span>{{ craftsman.serviceArea.join('、') }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">💰 收费标准：</span>
          <span class="detail-pricing">{{ craftsman.pricing }}</span>
        </div>
        <div class="detail-row" v-if="craftsman.description">
          <span class="detail-label">📝 简介：</span>
          <span>{{ craftsman.description }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">📅 入驻时间：</span>
          <span>{{ formatDate(craftsman.createdAt) }}</span>
        </div>
      </div>

      <!-- 作品照片 -->
      <div v-if="craftsman.photos?.length" class="detail-section">
        <h4 class="section-title">📷 作品展示</h4>
        <div class="photo-grid">
          <img
            v-for="(photo, idx) in craftsman.photos"
            :key="idx"
            :src="photo"
            :alt="'作品' + (idx + 1)"
            class="photo-full"
            @click="previewPhoto = photo"
          />
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="detail-actions">
        <button
          class="btn"
          :class="craftsman.status === 'available' ? 'btn-warning' : 'btn-success'"
          @click="$emit('toggleStatus', craftsman.id)"
        >
          {{ craftsman.status === 'available' ? '🔴 标记忙碌' : '🟢 标记可接单' }}
        </button>
        <button class="btn btn-primary" @click="$emit('completeOrder', craftsman.id)">
          ✅ 完成一单
        </button>
        <button class="btn btn-outline" @click="$emit('rate', craftsman.id)">
          ⭐ 评价
        </button>
        <button class="btn btn-danger-outline" @click="$emit('delete', craftsman.id)">
          🗑️ 删除
        </button>
      </div>

      <!-- 评价列表 -->
      <RatingSection :ratings="craftsman.ratings || []" />
    </div>

    <!-- 照片预览 -->
    <Teleport to="body">
      <div v-if="previewPhoto" class="photo-overlay" @click="previewPhoto = null">
        <img :src="previewPhoto" alt="作品大图" class="photo-large" />
      </div>
    </Teleport>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../common/Modal.vue'
import RatingSection from '../rating/RatingSection.vue'
import { CRAFT_TYPES, STATUS_MAP } from '../../utils/constants'
import { formatDate } from '../../utils/helpers'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  craftsman: { type: Object, default: null }
})

defineEmits(['update:modelValue', 'toggleStatus', 'completeOrder', 'rate', 'delete'])

const previewPhoto = ref(null)

const craftLabel = computed(() => {
  if (!props.craftsman) return ''
  return CRAFT_TYPES.find((t) => t.key === props.craftsman.craftType)?.label || '其他'
})
const craftIcon = computed(() => {
  if (!props.craftsman) return ''
  return CRAFT_TYPES.find((t) => t.key === props.craftsman.craftType)?.icon || '🛠️'
})
const statusLabel = computed(() => STATUS_MAP[props.craftsman?.status]?.label || '')
const statusClass = computed(() => STATUS_MAP[props.craftsman?.status]?.className || '')
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.detail-icon {
  font-size: 2.5rem;
}
.detail-name {
  margin: 0;
  font-size: 1.2rem;
  color: #4e342e;
}
.detail-type {
  font-size: 0.8rem;
  color: #e67e22;
  background: #fef5e7;
  padding: 2px 10px;
  border-radius: 10px;
  margin-right: 0.5rem;
}
.status-tag {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 600;
}
.status-available { background: #27ae60; color: #fff; }
.status-busy { background: #95a5a6; color: #fff; }
.detail-section {
  background: #fdfaf5;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.detail-row {
  display: flex;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: #4e342e;
  align-items: baseline;
}
.detail-label {
  flex-shrink: 0;
  color: #8d6e63;
}
.detail-phone {
  color: #2980b9;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
}
.detail-pricing {
  color: #d35400;
  font-weight: 600;
}
.section-title {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: #5d4037;
}
.photo-grid {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.photo-full {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e0d5c1;
  transition: transform 0.2s;
}
.photo-full:hover {
  transform: scale(1.05);
}
.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.photo-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
}
.photo-large {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
}
</style>

<template>
  <button
    class="crop-card"
    :class="{ 'crop-card--selected': selected }"
    @click="$emit('select', crop.id)"
  >
    <span class="crop-card__icon">{{ crop.icon }}</span>
    <span class="crop-card__name">{{ crop.name }}</span>
    <span class="crop-card__badge" v-if="crop.category">{{ crop.category }}</span>
  </button>
</template>

<script setup>
/**
 * 作物卡片组件
 * 用于作物选择网格中的单个作物项
 */
defineProps({
  crop: { type: Object, required: true },
  selected: { type: Boolean, default: false }
})

defineEmits(['select'])
</script>

<style scoped>
.crop-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md) var(--space-sm);
  border-radius: var(--radius-lg);
  border: 3px solid transparent;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  cursor: pointer;
  min-width: 80px;
}

.crop-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.crop-card:active { transform: scale(0.95); }

.crop-card--selected {
  border-color: var(--color-accent);
  background: #F1F8E9;
}

.crop-card__icon { font-size: 2rem; line-height: 1; }

.crop-card__name {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-soil-dark);
}

.crop-card__badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  background: var(--color-beige);
  color: var(--color-text-light);
}
</style>

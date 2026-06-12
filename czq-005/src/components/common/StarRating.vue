<template>
  <div class="star-rating" :class="{ readonly }">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= displayValue, hover: star <= hoverIndex }"
      @click="handleClick(star)"
      @mouseenter="handleHover(star)"
      @mouseleave="handleLeave"
    >
      {{ star <= displayValue ? '★' : '☆' }}
    </span>
    <span v-if="showValue" class="rating-value">{{ displayValue.toFixed(1) }}</span>
    <span v-if="count > 0" class="rating-count">({{ count }}条)</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false },
  showValue: { type: Boolean, default: true },
  count: { type: Number, default: 0 },
  size: { type: String, default: 'md' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const hoverIndex = ref(0)

const displayValue = computed(() => {
  if (!props.readonly && hoverIndex.value > 0) return hoverIndex.value
  return props.modelValue
})

function handleClick(star) {
  if (props.readonly) return
  emit('update:modelValue', star)
  emit('change', star)
}

function handleHover(star) {
  if (props.readonly) return
  hoverIndex.value = star
}

function handleLeave() {
  hoverIndex.value = 0
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.star {
  font-size: var(--star-size, 1.25rem);
  color: #ddd;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
  user-select: none;
}
.star.filled,
.star.hover {
  color: #f39c12;
}
.star:hover {
  transform: scale(1.2);
}
.readonly .star {
  cursor: default;
}
.readonly .star:hover {
  transform: none;
}
.rating-value {
  margin-left: 4px;
  font-weight: 700;
  color: #e67e22;
  font-size: 0.95rem;
}
.rating-count {
  margin-left: 2px;
  font-size: 0.8rem;
  color: #999;
}
</style>

<template>
  <div class="status-bar">
    <div class="attr-item" v-for="attr in attributes" :key="attr.key">
      <div class="attr-header">
        <span class="attr-icon">{{ attr.icon }}</span>
        <span class="attr-label">{{ attr.label }}</span>
        <span class="attr-value" :class="attr.valueClass">{{ attr.value }}</span>
      </div>
      <div class="bar-track">
        <div
          class="bar-fill"
          :class="attr.barClass"
          :style="{ width: attr.percent + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ATTR_KEYS, ATTR_LABELS, ATTR_MIN, ATTR_MAX } from '../utils/constants.js'

const props = defineProps({
  attrs: { type: Object, required: true }
})

/**
 * 根据数值返回颜色类名
 */
function getValueClass(value) {
  if (value >= 70) return 'text-good'
  if (value >= 40) return 'text-warn'
  return 'text-bad'
}

function getBarClass(value) {
  if (value >= 70) return 'bar-good'
  if (value >= 40) return 'bar-warn'
  return 'bar-bad'
}

const attributes = computed(() => [
  {
    key: ATTR_KEYS.STAMINA,
    icon: '⚡',
    label: ATTR_LABELS[ATTR_KEYS.STAMINA],
    value: props.attrs[ATTR_KEYS.STAMINA],
    percent: ((props.attrs[ATTR_KEYS.STAMINA] - ATTR_MIN) / (ATTR_MAX - ATTR_MIN)) * 100,
    valueClass: getValueClass(props.attrs[ATTR_KEYS.STAMINA]),
    barClass: getBarClass(props.attrs[ATTR_KEYS.STAMINA])
  },
  {
    key: ATTR_KEYS.RATING,
    icon: '⭐',
    label: ATTR_LABELS[ATTR_KEYS.RATING],
    value: props.attrs[ATTR_KEYS.RATING],
    percent: ((props.attrs[ATTR_KEYS.RATING] - ATTR_MIN) / (ATTR_MAX - ATTR_MIN)) * 100,
    valueClass: getValueClass(props.attrs[ATTR_KEYS.RATING]),
    barClass: getBarClass(props.attrs[ATTR_KEYS.RATING])
  },
  {
    key: ATTR_KEYS.EFFICIENCY,
    icon: '⚙️',
    label: ATTR_LABELS[ATTR_KEYS.EFFICIENCY],
    value: props.attrs[ATTR_KEYS.EFFICIENCY],
    percent: ((props.attrs[ATTR_KEYS.EFFICIENCY] - ATTR_MIN) / (ATTR_MAX - ATTR_MIN)) * 100,
    valueClass: getValueClass(props.attrs[ATTR_KEYS.EFFICIENCY]),
    barClass: getBarClass(props.attrs[ATTR_KEYS.EFFICIENCY])
  }
])
</script>

<style scoped>
.status-bar {
  display: flex;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 140, 0, 0.15);
  border-radius: 10px;
}

.attr-item {
  flex: 1;
  min-width: 0;
}

.attr-header {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  font-size: 12px;
}

.attr-icon {
  font-size: 14px;
}

.attr-label {
  color: rgba(255, 255, 255, 0.6);
  flex: 1;
}

.attr-value {
  font-weight: 700;
  font-size: 13px;
}

.text-good { color: #4ade80; }
.text-warn { color: #fbbf24; }
.text-bad { color: #f87171; }

.bar-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease, background 0.4s ease;
}

.bar-good { background: linear-gradient(90deg, #22c55e, #4ade80); }
.bar-warn { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
.bar-bad { background: linear-gradient(90deg, #ef4444, #f87171); }
</style>

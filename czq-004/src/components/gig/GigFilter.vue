<!--
  筛选栏组件
  职责：提供工作类型、零工类型、进行中/全部 的筛选按钮
  纯展示组件，筛选逻辑由 useFilter composable 提供
-->
<template>
  <div class="filter-bar">
    <!-- 工作类型筛选 -->
    <div class="filter-group">
      <span class="filter-label">工作类型：</span>
      <div class="filter-chips">
        <Badge
          v-for="wt in workTypes"
          :key="wt"
          :variant="selectedWorkType === wt ? wtVariant(wt) : 'default'"
          :icon="workTypeIcons[wt]"
          :clickable="true"
          @click="$emit('selectWorkType', wt)"
        >
          {{ wt }}
        </Badge>
      </div>
    </div>

    <!-- 零工类型筛选 -->
    <div class="filter-group">
      <span class="filter-label">信息类型：</span>
      <div class="filter-chips">
        <Badge
          variant="demand"
          :icon="selectedGigType === 'demand' ? '✓ ' : ''"
          :clickable="true"
          @click="$emit('selectGigType', 'demand')"
        >
          找人干活
        </Badge>
        <Badge
          variant="supply"
          :icon="selectedGigType === 'supply' ? '✓ ' : ''"
          :clickable="true"
          @click="$emit('selectGigType', 'supply')"
        >
          我会干
        </Badge>
      </div>
    </div>

    <!-- 状态筛选 -->
    <div class="filter-actions">
      <label class="toggle-label">
        <input
          type="checkbox"
          :checked="showActiveOnly"
          @change="$emit('toggleActiveOnly')"
        />
        <span>仅看进行中</span>
      </label>
      <button
        v-if="hasActiveFilters"
        class="btn-reset"
        @click="$emit('reset')"
      >
        清除筛选
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Badge from '../common/Badge.vue'
import { WORK_TYPES, WORK_TYPE_ICONS, WORK_TYPE_VARIANT } from '../../utils/constants.js'

const props = defineProps({
  selectedWorkType: { type: String, default: '' },
  selectedGigType: { type: String, default: '' },
  showActiveOnly: { type: Boolean, default: false },
})

defineEmits(['selectWorkType', 'selectGigType', 'toggleActiveOnly', 'reset'])

const workTypes = WORK_TYPES
const workTypeIcons = WORK_TYPE_ICONS

function wtVariant(wt) {
  return WORK_TYPE_VARIANT[wt] || 'default'
}

const hasActiveFilters = computed(() => {
  return props.selectedWorkType || props.selectedGigType || props.showActiveOnly
})
</script>

<style scoped>
.filter-bar {
  background: #fffef7;
  border: 2px solid #e8dcc8;
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-label {
  font-size: 14px;
  color: #8d6e63;
  font-weight: 600;
  white-space: nowrap;
}
.filter-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}
.toggle-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #5d4037;
  cursor: pointer;
  user-select: none;
}
.btn-reset {
  background: none;
  border: 1px solid #bcaaa4;
  color: #8d6e63;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-reset:hover {
  background: #efebe9;
  border-color: #8d6e63;
}
</style>

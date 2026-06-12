<template>
  <div class="diary-list">
    <!-- 日期筛选 -->
    <div class="diary-list__filter">
      <input
        type="date"
        :value="filterDate"
        @change="onFilterChange"
        class="date-input"
      />
      <BigButton variant="outline" @click="$emit('clear-filter')" v-if="filterDate">
        清除筛选
      </BigButton>
    </div>

    <!-- 统计 -->
    <p class="diary-list__count">
      共 <strong>{{ entries.length }}</strong> 条记录
      <span v-if="filterDate">（{{ filteredCount }} 条匹配）</span>
    </p>

    <!-- 记录列表 -->
    <div v-if="displayEntries.length > 0">
      <DiaryEntry
        v-for="entry in displayEntries"
        :key="entry.id"
        :entry="entry"
        @delete="$emit('delete', $event)"
      />
    </div>

    <!-- 空状态 -->
    <div v-else class="diary-list__empty card">
      <span class="diary-list__empty-icon">📒</span>
      <p>{{ filterDate ? '该日期暂无记录' : '还没有农田日记记录' }}</p>
      <p class="text-light">使用"病害识别"功能，将结果保存到日记中</p>
      <BigButton variant="accent" @click="$router.push('/analyzer')">
        🔍 开始识别
      </BigButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DiaryEntry from './DiaryEntry.vue'
import BigButton from '@/components/common/BigButton.vue'

const props = defineProps({
  entries: { type: Array, default: () => [] },
  filterDate: { type: String, default: null }
})

const emit = defineEmits(['set-filter', 'clear-filter', 'delete'])

const displayEntries = computed(() => {
  if (!props.filterDate) return props.entries
  return props.entries.filter(e => e.date === props.filterDate)
})

const filteredCount = computed(() => displayEntries.value.length)

function onFilterChange(e) {
  emit('set-filter', e.target.value)
}
</script>

<style scoped>
.diary-list { }

.diary-list__filter {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  align-items: center;
}

.date-input {
  flex: 1;
  min-height: var(--btn-min-height);
  font-size: var(--font-md);
}

.diary-list__count {
  font-size: var(--font-sm);
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.diary-list__empty {
  text-align: center;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.diary-list__empty-icon {
  font-size: 4rem;
}

.text-light {
  color: var(--color-text-light);
  font-size: var(--font-sm);
}
</style>

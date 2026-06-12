<template>
  <div class="diary-entry card">
    <div class="diary-entry__header">
      <span class="diary-entry__icon">{{ entry.method === 'image' ? '📸' : '🔍' }}</span>
      <div class="diary-entry__info">
        <h3 class="diary-entry__disease">{{ entry.diseaseName || '未识别' }}</h3>
        <p class="diary-entry__meta">
          {{ entry.cropName }} · {{ entry.date }}
          <span class="diary-entry__method-badge">
            {{ entry.method === 'image' ? '图像识别' : '症状匹配' }}
          </span>
        </p>
      </div>
      <button class="diary-entry__delete" @click="$emit('delete', entry.id)" title="删除记录">
        🗑️
      </button>
    </div>

    <!-- 缩略图 -->
    <img v-if="entry.image" :src="entry.image" class="diary-entry__image" alt="叶片照片" />

    <!-- 备注 -->
    <p v-if="entry.notes" class="diary-entry__notes">📝 {{ entry.notes }}</p>
  </div>
</template>

<script setup>
/**
 * 单条农田日记记录卡片
 */
defineProps({
  entry: { type: Object, required: true }
})

defineEmits(['delete'])
</script>

<style scoped>
.diary-entry { margin-bottom: var(--space-md); }

.diary-entry__header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.diary-entry__icon { font-size: 2rem; flex-shrink: 0; }

.diary-entry__info { flex: 1; min-width: 0; }
.diary-entry__disease {
  font-size: var(--font-lg);
  color: var(--color-soil-dark);
}
.diary-entry__meta {
  font-size: var(--font-sm);
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
.diary-entry__method-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  background: var(--color-beige);
}

.diary-entry__delete {
  font-size: 1.5rem;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.diary-entry__delete:hover { opacity: 1; }

.diary-entry__image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-top: var(--space-md);
}

.diary-entry__notes {
  margin-top: var(--space-sm);
  font-size: var(--font-sm);
  color: var(--color-text);
  line-height: 1.6;
}
</style>

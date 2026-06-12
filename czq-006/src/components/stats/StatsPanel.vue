<template>
  <div class="stats-panel">
    <div class="stats-village-select">
      <label>🏘️ 选择村庄：</label>
      <select v-model="selectedVillage" class="village-select">
        <option value="">全部村庄</option>
        <option v-for="v in villages" :key="v" :value="v">{{ v }}</option>
      </select>
    </div>

    <div class="stats-cards">
      <div class="stat-card total">
        <div class="stat-number">{{ stats.total }}</div>
        <div class="stat-label">📚 藏书总数</div>
      </div>
      <div class="stat-card available">
        <div class="stat-number">{{ stats.available }}</div>
        <div class="stat-label">✅ 可借阅</div>
      </div>
      <div class="stat-card borrowed">
        <div class="stat-number">{{ stats.borrowed }}</div>
        <div class="stat-label">📖 已借出</div>
      </div>
    </div>

    <div class="stats-category">
      <h3>📊 热门分类分布</h3>
      <div class="category-bars">
        <div v-for="c in sortedCategories" :key="c.name" class="category-bar-row">
          <span class="category-name">{{ c.name }}</span>
          <div class="category-bar-track">
            <div
              class="category-bar-fill"
              :style="{ width: barWidth(c.count), background: c.color }"
            ></div>
          </div>
          <span class="category-count">{{ c.count }}本</span>
        </div>
      </div>
      <div v-if="!stats.total" class="empty-hint">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { bookStore } from '../../stores/bookStore.js'
import { CATEGORIES, CATEGORY_COLORS } from '../../utils/constants.js'

const villages = bookStore.villages
const selectedVillage = ref('')

const statsComputed = computed(() => bookStore.statsByVillage(selectedVillage.value).value)

const stats = computed(() => statsComputed.value)

const sortedCategories = computed(() => {
  return CATEGORIES
    .map(name => ({
      name,
      count: statsComputed.value.categoryCount[name] || 0,
      color: CATEGORY_COLORS[name]
    }))
    .sort((a, b) => b.count - a.count)
})

const maxCount = computed(() => {
  return Math.max(...sortedCategories.value.map(c => c.count), 1)
})

function barWidth(count) {
  return (count / maxCount.value * 100) + '%'
}
</script>

<style scoped>
.stats-panel { display: flex; flex-direction: column; gap: 1.5rem; }

.stats-village-select {
  display: flex; align-items: center; gap: 0.5rem;
  background: #faf3eb; padding: 0.8rem 1rem; border-radius: 12px; border: 1px solid #d4b896;
}
.village-select {
  padding: 0.4rem 0.8rem; border: 2px solid #d4b896; border-radius: 8px;
  background: #fff; color: #5D3A1A; font-size: 0.9rem;
}

.stats-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.stat-card {
  text-align: center; padding: 1.5rem 1rem; border-radius: 14px;
  border: 2px solid #d4b896; background: #fef9f2;
  box-shadow: 2px 3px 8px rgba(139,90,43,.12);
}
.stat-card.total     { border-color: #8B5E3C; }
.stat-card.available { border-color: #556B2F; }
.stat-card.borrowed  { border-color: #CD853F; }
.stat-number { font-size: 2.5rem; font-weight: bold; }
.stat-card.total .stat-number     { color: #5D3A1A; }
.stat-card.available .stat-number { color: #2e7d32; }
.stat-card.borrowed .stat-number  { color: #bf360c; }
.stat-label  { color: #8B5E3C; margin-top: 0.3rem; font-weight: bold; }

.stats-category {
  background: #fef9f2; border: 2px solid #d4b896; border-radius: 14px;
  padding: 1.2rem 1.5rem;
}
.stats-category h3 { margin: 0 0 1rem; color: #4A2C0A; font-family: "KaiTi","楷体",serif; }

.category-bars { display: flex; flex-direction: column; gap: 0.7rem; }
.category-bar-row {
  display: grid; grid-template-columns: 5rem 1fr 3rem; align-items: center; gap: 0.8rem;
}
.category-name { font-weight: bold; color: #5D3A1A; font-size: 0.9rem; text-align: right; }
.category-count { color: #8B5E3C; font-size: 0.85rem; }
.category-bar-track {
  height: 22px; background: #f0e0cc; border-radius: 11px; overflow: hidden;
}
.category-bar-fill {
  height: 100%; border-radius: 11px; min-width: 4px; transition: width .5s ease;
}

.empty-hint { text-align: center; color: #999; padding: 1rem; }
</style>

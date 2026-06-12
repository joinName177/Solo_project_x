<template>
  <div class="symptom-selector">
    <!-- 作物选择 -->
    <div class="section">
      <h3 class="section-label">1️⃣ 选择作物</h3>
      <div class="crop-grid">
        <CropCard
          v-for="crop in crops"
          :key="crop.id"
          :crop="crop"
          :selected="selectedCropId === crop.id"
          @select="selectCrop"
        />
      </div>
    </div>

    <!-- 症状选择 -->
    <div class="section" v-if="selectedCropId">
      <h3 class="section-label">2️⃣ 选择症状（可多选）</h3>
      <div class="symptom-grid">
        <button
          v-for="s in symptomTypes"
          :key="s.id"
          class="symptom-chip"
          :class="{ 'symptom-chip--active': isSelected(s.id) }"
          @click="toggleSymptom(s.id)"
        >
          <span class="symptom-chip__icon">{{ s.icon }}</span>
          <span class="symptom-chip__name">{{ s.name }}</span>
        </button>
      </div>
    </div>

    <!-- 匹配结果 -->
    <div v-if="matchResults.length > 0" class="section animate-fade-in">
      <h3 class="section-label">3️⃣ 匹配结果</h3>

      <div
        v-for="(match, idx) in matchResults"
        :key="match.disease.id"
        class="match-card card"
      >
        <div class="match-card__header">
          <span class="match-card__rank" v-if="idx === 0">最佳匹配</span>
          <h4 class="match-card__name">{{ match.disease.name }}（{{ match.matchRate }}%匹配）</h4>
        </div>

        <p class="match-card__desc">{{ match.disease.symptomDetail }}</p>

        <div class="match-card__symptoms">
          <span class="tag tag--match" v-for="sid in match.matchedSymptoms" :key="sid">
            ✅ {{ getSymptomName(sid) }}
          </span>
          <span class="tag tag--miss" v-for="sid in match.unmatchedSymptoms" :key="sid">
            ➖ {{ getSymptomName(sid) }}
          </span>
        </div>

        <details class="match-card__advice">
          <summary>💡 防治建议</summary>
          <pre class="advice-text">{{ match.disease.advice }}</pre>
        </details>

        <BigButton variant="secondary" block @click="$emit('save-to-diary', match)">
          💾 保存到农田日记
        </BigButton>
      </div>
    </div>

    <!-- 无匹配 -->
    <div v-else-if="hasSelection" class="section card">
      <p class="text-center">😕 暂无匹配的病害，请调整症状选择</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CropCard from '@/components/common/CropCard.vue'
import BigButton from '@/components/common/BigButton.vue'

const props = defineProps({
  crops: { type: Array, required: true },
  selectedCropId: { type: String, default: null },
  selectedSymptoms: { type: Array, default: () => [] },
  matchResults: { type: Array, default: () => [] },
  symptomTypes: { type: Array, required: true }
})

const emit = defineEmits(['select-crop', 'toggle-symptom', 'save-to-diary'])

const hasSelection = computed(() =>
  props.selectedCropId && props.selectedSymptoms.length > 0
)

function selectCrop(id) { emit('select-crop', id) }
function toggleSymptom(id) { emit('toggle-symptom', id) }
function isSelected(id) { return props.selectedSymptoms.includes(id) }
function getSymptomName(id) { return props.symptomTypes.find(s => s.id === id)?.name || id }
</script>

<style scoped>
.symptom-selector { display: flex; flex-direction: column; gap: var(--space-xl); }

.section { }
.section-label {
  font-size: var(--font-lg);
  color: var(--color-soil-dark);
  margin-bottom: var(--space-md);
  font-weight: 700;
}

.crop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: var(--space-sm);
}

.symptom-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.symptom-chip {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  border-radius: 30px;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  font-weight: 600;
  font-size: var(--font-sm);
  transition: all 0.2s;
}
.symptom-chip:hover { border-color: var(--color-sand); }
.symptom-chip:active { transform: scale(0.95); }
.symptom-chip--active {
  background: var(--color-green-field);
  color: #FFF;
  border-color: var(--color-green-field);
}
.symptom-chip__icon { font-size: 1.2rem; }

/* 匹配卡片 */
.match-card {
  margin-bottom: var(--space-md);
}
.match-card__header { display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-sm); }
.match-card__rank {
  font-size: var(--font-xs);
  background: var(--color-accent);
  color: #FFF;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 700;
}
.match-card__name { font-size: var(--font-lg); color: var(--color-soil-dark); }
.match-card__desc {
  font-size: var(--font-sm);
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  line-height: 1.7;
}
.match-card__symptoms { display: flex; flex-wrap: wrap; gap: var(--space-xs); margin-bottom: var(--space-sm); }
.tag {
  font-size: var(--font-xs);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}
.tag--match { background: #E8F5E9; color: #2E7D32; }
.tag--miss { background: var(--color-beige); color: var(--color-text-light); }

.match-card__advice { margin-bottom: var(--space-sm); }
.match-card__advice summary { font-weight: 600; cursor: pointer; color: var(--color-soil-light); }
.advice-text {
  white-space: pre-wrap;
  font-family: inherit;
  font-size: var(--font-sm);
  background: var(--color-beige);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  margin-top: var(--space-sm);
  line-height: 1.8;
}

.text-center { text-align: center; color: var(--color-text-light); }
</style>

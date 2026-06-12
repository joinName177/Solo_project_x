<template>
  <div class="result" v-if="result">
    <!-- 分析摘要 -->
    <div class="result__summary card animate-fade-in">
      <h2 class="result__header">🔬 分析结果</h2>
      <div class="result__stats">
        <div class="stat">
          <span class="stat__label">健康区域</span>
          <span class="stat__value stat__value--green">{{ result.analysis.anomaly.healthyPercent }}%</span>
        </div>
        <div class="stat">
          <span class="stat__label">异常区域</span>
          <span class="stat__value stat__value--warn">{{ result.analysis.anomaly.diseasedPercent }}%</span>
        </div>
        <div class="stat">
          <span class="stat__label">纹理特征</span>
          <span class="stat__value">{{ textureLabel }}</span>
        </div>
      </div>
    </div>

    <!-- 匹配结果列表 -->
    <div class="result__matches card animate-fade-in" v-if="result.matches.length > 0">
      <h3 class="result__subtitle">📋 可能的病害（按匹配度排序）</h3>

      <div
        v-for="(match, idx) in result.matches"
        :key="match.disease.id"
        class="match-item"
        :class="{ 'match-item--top': idx === 0 }"
      >
        <div class="match-item__header">
          <span class="match-item__rank">#{{ idx + 1 }}</span>
          <div class="match-item__info">
            <h4 class="match-item__name">{{ match.disease.name }}</h4>
            <p class="match-item__desc">{{ match.disease.description }}</p>
          </div>
          <div class="match-item__score">
            <span class="score-badge" :class="scoreClass(match.score)">
              {{ match.score }}分
            </span>
          </div>
        </div>

        <div class="match-item__detail">
          <p><strong>🔍 匹配依据：</strong>{{ match.matchDetails }}</p>
          <p><strong>📝 症状特征：</strong>{{ match.disease.symptomDetail }}</p>
          <p><strong>🌤️ 发病条件：</strong>{{ match.disease.conditions }}</p>
        </div>

        <details class="match-item__advice">
          <summary><strong>💡 防治建议</strong></summary>
          <pre class="advice-text">{{ match.disease.advice }}</pre>
        </details>

        <!-- 保存到日记按钮 -->
        <BigButton
          variant="secondary"
          block
          @click="$emit('save-to-diary', match)"
        >
          💾 保存到农田日记
        </BigButton>
      </div>
    </div>

    <!-- 无匹配结果 -->
    <div v-else class="result__empty card">
      <p>😕 未匹配到高置信度病害</p>
      <p class="text-light">建议尝试手动选择症状进行匹配</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BigButton from '@/components/common/BigButton.vue'

const props = defineProps({
  result: { type: Object, default: null }
})

defineEmits(['save-to-diary'])

const textureLabelMap = {
  'spotted/rough': '斑点状/粗糙',
  'mottled': '斑驳状',
  'smooth': '光滑'
}
const textureLabel = computed(() => textureLabelMap[props.result?.analysis?.texture?.textureType] || '未知')

function scoreClass(score) {
  if (score >= 70) return 'score-high'
  if (score >= 50) return 'score-mid'
  return 'score-low'
}
</script>

<style scoped>
.result { display: flex; flex-direction: column; gap: var(--space-lg); }

.result__header {
  font-size: var(--font-xl);
  color: var(--color-soil-dark);
  margin-bottom: var(--space-md);
}

.result__stats {
  display: flex;
  gap: var(--space-md);
  justify-content: space-around;
}
.stat { text-align: center; }
.stat__label { font-size: var(--font-sm); color: var(--color-text-light); display: block; }
.stat__value { font-size: var(--font-xl); font-weight: 800; display: block; }
.stat__value--green { color: var(--color-green-field); }
.stat__value--warn { color: var(--color-rust); }

.result__subtitle {
  font-size: var(--font-lg);
  color: var(--color-soil-dark);
  margin-bottom: var(--space-md);
}

.match-item {
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  transition: border-color 0.2s;
}
.match-item--top {
  border-color: var(--color-accent);
  background: #F1F8E9;
}

.match-item__header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

.match-item__rank {
  font-size: var(--font-sm);
  font-weight: 800;
  background: var(--color-soil);
  color: #FFF;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.match-item__info { flex: 1; }
.match-item__name { font-size: var(--font-lg); color: var(--color-soil-dark); }
.match-item__desc { font-size: var(--font-sm); color: var(--color-text-light); }

.score-badge {
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: var(--font-sm);
}
.score-high { background: #E8F5E9; color: #2E7D32; }
.score-mid { background: #FFF3E0; color: #E65100; }
.score-low { background: var(--color-beige); color: var(--color-text-light); }

.match-item__detail {
  font-size: var(--font-sm);
  line-height: 1.8;
  color: var(--color-text);
  margin: var(--space-sm) 0;
}
.match-item__detail p { margin-bottom: var(--space-xs); }

.match-item__advice {
  margin: var(--space-sm) 0;
}
.match-item__advice summary {
  font-size: var(--font-sm);
  cursor: pointer;
  color: var(--color-soil-light);
}

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

.result__empty {
  text-align: center;
  font-size: var(--font-lg);
  color: var(--color-text);
  padding: var(--space-xl);
}
.text-light { color: var(--color-text-light); font-size: var(--font-sm); }
</style>

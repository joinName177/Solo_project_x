<template>
  <div class="home">
    <!-- Hero -->
    <div class="home__hero gradient-earth">
      <div class="home__hero-content">
        <h1 class="home__hero-title">🌿 农作物病害识别助手</h1>
        <p class="home__hero-subtitle">拍一拍，识别作物病害；记一记，守护农田健康</p>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="home__actions">
      <router-link to="/analyzer" class="home__action-card home__action-card--primary">
        <span class="home__action-icon">📸</span>
        <span class="home__action-label">图像识别</span>
        <span class="home__action-desc">拍摄叶片照片，智能识别病害</span>
      </router-link>

      <router-link to="/analyzer?tab=symptom" class="home__action-card home__action-card--secondary">
        <span class="home__action-icon">🔍</span>
        <span class="home__action-label">症状匹配</span>
        <span class="home__action-desc">选择作物和症状，匹配病害</span>
      </router-link>

      <router-link to="/diary" class="home__action-card home__action-card--tertiary">
        <span class="home__action-icon">📒</span>
        <span class="home__action-label">农田日记</span>
        <span class="home__action-desc">{{ diaryCount }} 条记录</span>
      </router-link>
    </div>

    <!-- 功能说明 -->
    <div class="home__features">
      <h2 class="section-title">核心功能</h2>
      <div class="feature-grid">
        <div class="feature-item" v-for="f in features" :key="f.title">
          <span class="feature-item__icon">{{ f.icon }}</span>
          <h3 class="feature-item__title">{{ f.title }}</h3>
          <p class="feature-item__desc">{{ f.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 注意事项 -->
    <div class="home__disclaimer card">
      <p>⚠️ <strong>免责声明：</strong>本工具通过图像分析和症状匹配提供病害参考建议，识别结果仅供参考，不构成农药处方。具体防治方案和农药使用请咨询当地农业技术推广站的专业技术人员。</p>
    </div>
  </div>
</template>

<script setup>
import { useFarmDiary } from '@/composables/useFarmDiary'

const diary = useFarmDiary()
const diaryCount = diary.entryCount

const features = [
  { icon: '📸', title: '拍照识别', desc: '上传作物叶片照片，通过Canvas像素分析识别颜色异常和纹理特征' },
  { icon: '🔍', title: '症状匹配', desc: '手动选择作物和症状组合，系统匹配最可能的病害及防治建议' },
  { icon: '📒', title: '农田日记', desc: '记录每次检查结果，按日期归档，支持导出PDF/图片' },
  { icon: '🔒', title: '隐私安全', desc: '所有数据保存在浏览器本地，不上传服务器，保护您的农田数据' },
  { icon: '📱', title: '户外适用', desc: '大按钮设计，户外阳光下也能轻松操作' },
  { icon: '📚', title: '30种病害库', desc: '涵盖水稻、小麦、玉米、苹果、番茄等10种作物30种常见病害' }
]
</script>

<style scoped>
.home { display: flex; flex-direction: column; gap: var(--space-xl); }

/* Hero */
.home__hero {
  border-radius: var(--radius-xl);
  padding: var(--space-xl) var(--space-lg);
  color: #FFF;
  margin: calc(-1 * var(--space-md));
  margin-bottom: 0;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}
.home__hero-content { text-align: center; }
.home__hero-title { font-size: var(--font-xxl); font-weight: 800; margin-bottom: var(--space-sm); }
.home__hero-subtitle { font-size: var(--font-md); opacity: 0.9; }

/* 快捷入口卡片 */
.home__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}
.home__action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-lg) var(--space-md);
  border-radius: var(--radius-lg);
  text-decoration: none;
  text-align: center;
  transition: all 0.3s;
  box-shadow: var(--shadow-sm);
}
.home__action-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.home__action-card--primary { background: #E8F5E9; color: #2E7D32; }
.home__action-card--secondary { background: #FFF3E0; color: #E65100; }
.home__action-card--tertiary { background: #F3E5F5; color: #6A1B9A; grid-column: span 2; }

.home__action-icon { font-size: 2.5rem; }
.home__action-label { font-size: var(--font-lg); font-weight: 700; }
.home__action-desc { font-size: var(--font-xs); opacity: 0.8; }

/* 功能列表 */
.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}
.feature-item {
  text-align: center;
  padding: var(--space-md);
}
.feature-item__icon { font-size: 2rem; display: block; margin-bottom: var(--space-xs); }
.feature-item__title { font-size: var(--font-sm); color: var(--color-soil-dark); font-weight: 700; }
.feature-item__desc { font-size: var(--font-xs); color: var(--color-text-light); }

/* 声明 */
.home__disclaimer {
  font-size: var(--font-sm);
  color: var(--color-text-light);
  line-height: 1.7;
}
</style>

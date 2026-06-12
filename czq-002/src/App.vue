<template>
  <div class="app-shell">
    <!-- 顶部公告栏标题 -->
    <header class="app-header">
      <div class="header-inner">
        <h1 class="app-title">🏘️ 农机租赁共享信息板</h1>
        <p class="app-subtitle">—— 村委会公告栏 · 信息免费发布 ——</p>
      </div>
    </header>

    <!-- 标签导航 -->
    <nav class="app-nav">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['nav-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- 内容区 -->
    <main class="app-main">
      <InfoBoard
        v-show="activeTab === 'board'"
        @contact="handleContact"
      />
      <MachineryGuide v-show="activeTab === 'guide'" />
    </main>

    <!-- 联系卡片弹窗 -->
    <ContactCard
      :visible="contactVisible"
      :item="contactItem"
      @close="contactVisible = false"
    />

    <!-- 底部 -->
    <footer class="app-footer">
      <p>📍 村级农机租赁共享信息板 | 数据存储在本地浏览器 | 信息仅供参考</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InfoBoard from './components/bulletin/InfoBoard.vue'
import MachineryGuide from './components/guide/MachineryGuide.vue'
import ContactCard from './components/contact/ContactCard.vue'

const activeTab = ref('board')

const tabs = [
  { key: 'board', label: '📋 信息板' },
  { key: 'guide', label: '📖 农机科普' }
]

// 联系卡片状态
const contactVisible = ref(false)
const contactItem = ref(null)

function handleContact(item) {
  contactItem.value = item
  contactVisible.value = true
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ---- 顶部 ---- */
.app-header {
  background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
  color: #fff;
  text-align: center;
  padding: 24px 20px 18px;
  border-bottom: 4px solid #d4a574;
  position: relative;
  overflow: hidden;
}

/* 模拟木纹纹理 */
.app-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 3px,
    rgba(0,0,0,0.03) 3px,
    rgba(0,0,0,0.03) 6px
  );
  pointer-events: none;
}

.header-inner {
  position: relative;
  z-index: 1;
}

.app-title {
  margin: 0;
  font-size: 32px;
  letter-spacing: 4px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.app-subtitle {
  margin: 8px 0 0 0;
  font-size: 16px;
  opacity: 0.85;
  letter-spacing: 2px;
}

/* ---- 导航 ---- */
.app-nav {
  display: flex;
  justify-content: center;
  gap: 0;
  background: #fffbe6;
  border-bottom: 3px solid #d4a574;
}

.nav-btn {
  padding: 14px 40px;
  font-size: 19px;
  background: transparent;
  border: none;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  color: #8b4513;
  font-weight: bold;
  transition: all 0.2s;
  font-family: inherit;
}

.nav-btn:hover {
  background: #fff3cd;
}

.nav-btn.active {
  border-bottom-color: #d32f2f;
  color: #d32f2f;
  background: #fff;
}

/* ---- 主体 ---- */
.app-main {
  flex: 1;
  padding: 20px 24px 40px;
  background: #fdf5e6;
  background-image:
    radial-gradient(circle, #d4a574 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ---- 底部 ---- */
.app-footer {
  text-align: center;
  padding: 14px;
  background: #5c3317;
  color: #d4a574;
  font-size: 13px;
  letter-spacing: 1px;
}
</style>

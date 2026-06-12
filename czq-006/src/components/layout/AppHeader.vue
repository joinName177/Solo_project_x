<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="header-brand" @click="$emit('tab-change', 'home')">
        <span class="brand-icon">📚</span>
        <h1 class="brand-title">乡村图书漂流角</h1>
      </div>
      <nav class="header-nav">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['nav-btn', { active: currentTab === tab.key }]"
          @click="$emit('tab-change', tab.key)"
        >
          <span class="nav-icon">{{ tab.icon }}</span>
          <span class="nav-label">{{ tab.label }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineProps({
  currentTab: { type: String, default: 'home' }
})

defineEmits(['tab-change'])

const tabs = [
  { key: 'home',   label: '图书总览', icon: '📋' },
  { key: 'add',    label: '登记图书', icon: '📝' },
  { key: 'borrow', label: '借阅管理', icon: '📖' },
  { key: 'stats',  label: '数据统计', icon: '📊' },
  { key: 'stars',  label: '阅读之星', icon: '⭐' }
]
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #5D3A1A 0%, #8B5E3C 100%);
  color: #f5e6d3;
  padding: 0 1.5rem;
  box-shadow: 0 3px 12px rgba(0,0,0,.3);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
}
.brand-icon { font-size: 2rem; }
.brand-title {
  font-size: 1.4rem;
  font-family: "KaiTi", "楷体", serif;
  letter-spacing: 2px;
}
.header-nav { display: flex; gap: 0.25rem; flex-wrap: wrap; }
.nav-btn {
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);
  color: #e8d5c4;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all .2s;
}
.nav-btn:hover { background: rgba(255,255,255,.18); color: #fff; }
.nav-btn.active {
  background: #f5e6d3;
  color: #5D3A1A;
  border-color: #f5e6d3;
  font-weight: bold;
}
.nav-icon { font-size: 1.1rem; }
</style>

<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="header-brand">
        <span class="brand-icon">🔧</span>
        <div class="brand-text">
          <h1 class="brand-title">农村手艺人接单板</h1>
          <p class="brand-subtitle">—— 便民服务墙 · 找手艺，就到这儿来 ——</p>
        </div>
      </div>
      <nav class="header-nav">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="nav-btn"
          :class="{ active: activeTab === tab.key }"
          @click="$emit('update:activeTab', tab.key)"
        >
          <span class="nav-icon">{{ tab.icon }}</span>
          <span class="nav-label">{{ tab.label }}</span>
          <span v-if="tab.count !== undefined" class="nav-badge">{{ tab.count }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineProps({
  activeTab: { type: String, default: 'board' },
  tabs: { type: Array, default: () => [] }
})

defineEmits(['update:activeTab'])
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #e67e22, #d35400);
  color: #fff;
  padding: 0;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem 0;
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}
.brand-icon {
  font-size: 2.25rem;
}
.brand-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.brand-subtitle {
  margin: 2px 0 0;
  font-size: 0.8rem;
  opacity: 0.85;
}
.header-nav {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
}
.nav-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s;
  position: relative;
}
.nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}
.nav-btn.active {
  background: #faf3e0;
  color: #8b4513;
  font-weight: 600;
}
.nav-icon {
  font-size: 1.1rem;
}
.nav-badge {
  background: #e74c3c;
  color: #fff;
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}
</style>

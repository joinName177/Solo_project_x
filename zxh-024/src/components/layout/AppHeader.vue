<template>
  <header class="app-header">
    <div class="app-header__inner">
      <router-link to="/" class="app-header__brand">
        <span class="app-header__logo">🌿</span>
        <h1 class="app-header__title">病害识别助手</h1>
      </router-link>
      <nav class="app-header__nav">
        <router-link to="/analyzer" class="nav-link" active-class="nav-link--active">
          <span class="nav-link__icon">🔍</span>
          <span>识别</span>
        </router-link>
        <router-link to="/diary" class="nav-link" active-class="nav-link--active">
          <span class="nav-link__icon">📒</span>
          <span>日记</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
/**
 * 应用顶栏 - 品牌和主导航
 * 固定顶部，大地色渐变背景
 */
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, var(--color-soil) 0%, #6D4C41 100%);
  box-shadow: var(--shadow-md);
}

.app-header__inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  min-height: 56px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: #FFF;
}

.app-header__logo { font-size: 1.5rem; }
.app-header__title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: #FFF;
  letter-spacing: 1px;
}

.app-header__nav {
  display: flex;
  gap: var(--space-sm);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-sm);
  transition: all 0.2s;
}
.nav-link:hover { background: rgba(255,255,255,0.15); color: #FFF; }
.nav-link--active {
  background: rgba(255,255,255,0.25);
  color: #FFF;
}
.nav-link__icon { font-size: 1.1rem; }
</style>

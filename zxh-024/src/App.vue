<template>
  <div id="app-root">
    <AppHeader />
    <main class="page-container">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="app-footer">
      <p>🌿 农作物病害识别助手 — 识别结果仅供参考，具体防治请咨询当地农技站</p>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<style>
/* 页面切换动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 页脚 */
.app-footer {
  text-align: center;
  padding: var(--space-lg) var(--space-md);
  color: var(--color-text-light);
  font-size: var(--font-xs);
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-xl);
  background: var(--color-surface);
}

.app-footer p { margin: 0; }
</style>

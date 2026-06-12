<template>
  <div class="machinery-guide">
    <h2 class="guide-title">📖 常用农机科普</h2>
    <p class="guide-subtitle">了解常见农机的用途和参考租价，帮您合理定价与选择</p>

    <div class="guide-cards">
      <div
        v-for="machine in MACHINERY_GUIDE"
        :key="machine.type"
        class="guide-card"
        :class="machine.type"
      >
        <div class="guide-card-header">
          <span class="guide-icon">{{ machine.icon }}</span>
          <h3>{{ machine.name }}</h3>
          <span class="guide-price">{{ machine.priceRange }}</span>
        </div>
        <p class="guide-usage">{{ machine.usage }}</p>
        <div class="guide-tip">
          <span class="tip-icon">💡</span>
          <span>{{ machine.tips }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MACHINERY_GUIDE } from '../../core/constants.js'
</script>

<style scoped>
.machinery-guide {
  max-width: 1000px;
  margin: 0 auto;
}

.guide-title {
  text-align: center;
  font-size: 26px;
  color: #8b4513;
  margin: 0 0 6px 0;
}

.guide-subtitle {
  text-align: center;
  font-size: 16px;
  color: #999;
  margin: 0 0 24px 0;
}

.guide-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 18px;
}

.guide-card {
  background: #fffef5;
  border: 2px solid #d4a574;
  border-radius: 10px;
  padding: 20px 24px;
  transition: transform 0.2s;
}

.guide-card:hover {
  transform: translateY(-3px);
}

.guide-card.tractor { border-left: 5px solid #8b6914; }
.guide-card.harvester { border-left: 5px solid #d4a017; }
.guide-card.seeder { border-left: 5px solid #2e7d32; }
.guide-card.drone { border-left: 5px solid #1565c0; }

.guide-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.guide-icon {
  font-size: 36px;
}

.guide-card-header h3 {
  margin: 0;
  font-size: 22px;
  color: #5c3317;
  flex: 1;
}

.guide-price {
  background: #d32f2f;
  color: #fff;
  padding: 4px 14px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: bold;
}

.guide-usage {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin: 0 0 14px 0;
  text-indent: 2em;
}

.guide-tip {
  display: flex;
  gap: 6px;
  padding: 10px 14px;
  background: #fffbe6;
  border-radius: 6px;
  font-size: 14px;
  color: #8b4513;
  line-height: 1.6;
}

.tip-icon {
  flex-shrink: 0;
}
</style>

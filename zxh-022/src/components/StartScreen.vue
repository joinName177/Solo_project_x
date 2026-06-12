<template>
  <div class="start-screen">
    <div class="logo-area">
      <div class="logo-icon">🛵</div>
      <h1 class="game-title">快递小哥求生记</h1>
      <p class="game-subtitle">文字交互版</p>
    </div>

    <div class="menu-buttons">
      <button class="btn btn-primary" @click="$emit('start')">
        📦 开始新游戏
      </button>
      <button
        v-if="hasSave"
        class="btn btn-secondary"
        @click="$emit('continue')"
      >
        ▶️ 继续游戏
      </button>
      <button
        v-if="hasSave"
        class="btn btn-danger-text"
        @click="$emit('delete')"
      >
        🗑️ 删除存档
      </button>
    </div>

    <div class="intro-box">
      <h3>📋 游戏说明</h3>
      <ul>
        <li>你是一名快递员，将在<strong>10个随机场景</strong>中做出选择</li>
        <li>每个场景有 <strong>10秒</strong> 限时，超时将自动选择</li>
        <li>你的选择会影响 <strong>体力值</strong>、<strong>客户好评度</strong>、<strong>效率值</strong></li>
        <li>10个场景后，根据三项属性评定你的<strong>职业等级</strong></li>
        <li>支持<strong>多周目</strong>游玩，不同选择可能触发<strong>隐藏结局</strong>！</li>
        <li>进度自动保存在浏览器中 📂</li>
      </ul>
    </div>

    <div class="version-info">v1.0 | 共{{ totalScenarios }}个场景随机抽取</div>
  </div>
</template>

<script setup>
import { TOTAL_SCENARIOS } from '../utils/constants.js'

defineProps({
  hasSave: { type: Boolean, default: false }
})

defineEmits(['start', 'continue', 'delete'])

const totalScenarios = TOTAL_SCENARIOS

</script>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 30px 20px;
  gap: 25px;
}

.logo-area {
  text-align: center;
}

.logo-icon {
  font-size: 80px;
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.game-title {
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 140, 0, 0.6), 0 2px 4px rgba(0,0,0,0.5);
  margin: 10px 0 5px;
}

.game-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 6px;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}

.intro-box {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px 20px;
  max-width: 400px;
  width: 100%;
}

.intro-box h3 {
  color: #FF8C00;
  margin: 0 0 10px;
  font-size: 16px;
}

.intro-box ul {
  margin: 0;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  line-height: 1.8;
}

.intro-box li strong {
  color: #FFB347;
}

.version-info {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}
</style>

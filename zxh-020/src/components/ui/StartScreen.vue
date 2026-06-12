<template>
  <div class="start-screen">
    <div class="start-content">
      <div class="logo-area">
        <div class="logo-icon">🚲</div>
        <h1 class="title">共享单车摆放大师</h1>
        <p class="subtitle">城市文明，从我做起</p>
      </div>

      <div class="rules-box">
        <h3>📋 游戏规则</h3>
        <ul>
          <li>将散落的共享单车拖拽或点击放入<strong>绿色停车框</strong></li>
          <li>✅ 正确摆放 <strong>+10分</strong>，❌ 未放入停车框 <strong>-5分</strong></li>
          <li>🚨 <strong>违停举报</strong>：盲道/绿化带上的违规单车需优先处理，<strong>双倍积分</strong></li>
          <li>⏱️ 限时完成，达到一定分数解锁新场景</li>
        </ul>
      </div>

      <div class="scene-select-area">
        <h3>🗺️ 选择场景</h3>
        <SceneSelect
          :scenes="scenes"
          :selected-id="selectedSceneId"
          :new-unlock="newUnlock"
          @select="$emit('select-scene', $event)"
        />
      </div>

      <button class="start-btn" @click="$emit('start')">
        <span class="btn-icon">🎮</span>
        开始游戏
      </button>

      <p class="tip">💡 提示：可以拖拽单车，也可以点击单车再点击目标位置</p>
    </div>
  </div>
</template>

<script setup>
import SceneSelect from './SceneSelect.vue'

defineProps({
  scenes: { type: Array, required: true },
  selectedSceneId: { type: String, default: 'subway' },
  newUnlock: { type: String, default: null },
})

defineEmits(['start', 'select-scene'])
</script>

<style scoped>
.start-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 20px;
}

.start-content {
  max-width: 520px;
  width: 100%;
  text-align: center;
}

.logo-area {
  margin-bottom: 24px;
}

.logo-icon {
  font-size: 72px;
  animation: bounce 2s ease-in-out infinite;
}

.title {
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  margin: 12px 0 4px;
  text-shadow: 0 2px 10px rgba(0, 150, 255, 0.4);
}

.subtitle {
  font-size: 16px;
  color: #8ab4f8;
  margin: 0;
}

.rules-box {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 20px;
  text-align: left;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.rules-box h3 {
  color: #ffd54f;
  margin: 0 0 10px;
  font-size: 16px;
}

.rules-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rules-box li {
  color: #ccc;
  font-size: 14px;
  padding: 4px 0;
  line-height: 1.6;
}

.rules-box li strong {
  color: #fff;
}

.scene-select-area {
  margin-bottom: 20px;
}

.scene-select-area h3 {
  color: #8ab4f8;
  font-size: 16px;
  margin: 0 0 10px;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 48px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
  margin-bottom: 16px;
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(76, 175, 80, 0.6);
}

.start-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 24px;
}

.tip {
  color: #666;
  font-size: 13px;
  margin: 0;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>

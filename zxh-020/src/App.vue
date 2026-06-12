<template>
  <div class="app-container">
    <!-- 开始界面 -->
    <StartScreen
      v-if="gamePhase === 'start'"
      :scenes="sceneList"
      :selected-scene-id="currentSceneId"
      :new-unlock="newUnlock"
      @select-scene="onSelectScene"
      @start="onStartGame"
    />

    <!-- 游戏进行中 -->
    <div v-else-if="gamePhase === 'playing' || gamePhase === 'ending'" class="game-screen">
      <!-- 顶部HUD -->
      <div class="hud">
        <div class="hud-left">
          <div class="scene-badge">{{ currentScene.name }}</div>
          <ScoreBoard
            :score="scoring.score.value"
            :correct-count="scoring.correctCount.value"
            :wrong-count="scoring.wrongCount.value"
            :combo="scoring.combo.value"
          />
        </div>
        <div class="hud-right">
          <GameTimer
            :formatted-time="timer.formattedTime.value"
            :progress="timer.progress.value"
            :is-urgent="timer.isUrgent.value"
          />
          <button class="btn-quit" @click="onQuitGame">退出</button>
        </div>
      </div>

      <!-- 游戏面板 -->
      <div class="board-wrapper">
        <GameBoard
          :scene="currentScene"
          :bikes="bikes"
          :messages="messageQueue"
          @place-bike="onPlaceBike"
        />
      </div>

      <!-- 特殊事件提示 -->
      <SpecialEvent
        :active="specialEventActive"
        :zone-type="specialEventBike?.zoneType || 'blind_lane'"
      />

      <!-- 即将结束覆盖 -->
      <div v-if="gamePhase === 'ending'" class="ending-overlay">
        <div class="ending-text">⏰ 时间到！正在统计成绩...</div>
      </div>
    </div>

    <!-- 游戏结束界面 -->
    <GameOverScreen
      v-if="gamePhase === 'ended'"
      :score="gameResult?.score || 0"
      :correct-count="gameResult?.correctCount || 0"
      :wrong-count="gameResult?.wrongCount || 0"
      :special-handled="gameResult?.specialHandled || 0"
      :unplaced-count="gameResult?.unplacedCount || 0"
      :scene-name="gameResult?.sceneName || ''"
      :new-unlock="newUnlock"
      @certificate="showCertificate = true"
      @retry="onRetry"
      @home="onGoHome"
    />

    <!-- 证书弹窗 -->
    <CertificateModal
      v-if="showCertificate"
      :score="gameResult?.score || 0"
      :correct-count="gameResult?.correctCount || 0"
      :special-handled="gameResult?.specialHandled || 0"
      :scene-name="gameResult?.sceneName || ''"
      @close="showCertificate = false"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useGameState } from './composables/useGameState.js'

// 组件
import StartScreen from './components/ui/StartScreen.vue'
import GameOverScreen from './components/ui/GameOverScreen.vue'
import CertificateModal from './components/ui/CertificateModal.vue'
import ScoreBoard from './components/ui/ScoreBoard.vue'
import GameTimer from './components/ui/GameTimer.vue'
import SpecialEvent from './components/ui/SpecialEvent.vue'
import GameBoard from './components/game/GameBoard.vue'

// 游戏状态
const {
  gamePhase,
  currentSceneId,
  currentScene,
  bikes,
  sceneList,
  specialEventBike,
  specialEventActive,
  newUnlock,
  messageQueue,
  timer,
  scoring,
  startGame,
  endGame,
  placeBike,
  goToStart,
} = useGameState()

const showCertificate = ref(false)
const gameResult = ref(null)

function onSelectScene(sceneId) {
  currentSceneId.value = sceneId
}

function onStartGame() {
  const success = startGame(currentSceneId.value)
  if (!success) {
    alert('该场景尚未解锁，请先在其他场景中获得足够分数！')
  }
}

function onPlaceBike(bikeId, x, y) {
  placeBike(bikeId, x, y)
}

function onQuitGame() {
  const result = endGame()
  gameResult.value = result
}

function onRetry() {
  showCertificate.value = false
  gameResult.value = null
  startGame(currentSceneId.value)
}

function onGoHome() {
  showCertificate.value = false
  gameResult.value = null
  goToStart()
}

// 监听计时器结束
watch(
  () => timer.isTimeUp.value,
  (timeUp) => {
    if (timeUp && gamePhase.value === 'playing') {
      const result = endGame()
      gameResult.value = result
    }
  }
)
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  background: #1a1a2e;
}

.game-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 12px 20px;
  background: linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%);
}

/* HUD */
.hud {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 920px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.hud-left,
.hud-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.scene-badge {
  background: rgba(255, 255, 255, 0.1);
  color: #8ab4f8;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-quit {
  padding: 6px 14px;
  font-size: 13px;
  color: #999;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-quit:hover {
  color: #f44336;
  border-color: rgba(244, 67, 54, 0.4);
}

/* 游戏面板容器 */
.board-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 920px;
}

/* 结束覆盖 */
.ending-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 900;
}

.ending-text {
  font-size: 28px;
  color: #ffd54f;
  font-weight: bold;
  animation: blink 0.8s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>

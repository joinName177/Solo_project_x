<template>
  <div class="cockpit">
    <!-- 背景装饰 -->
    <div class="bg-decor">
      <div class="bg-grid"></div>
      <div class="bg-glow"></div>
    </div>

    <!-- 顶部仪表盘 -->
    <header class="dashboard">
      <div class="dash-left">
        <span class="dash-icon">🛵</span>
        <span class="dash-title">快递小哥求生记</span>
      </div>
      <div class="dash-right">
        <span class="dash-badge">PARCEL SIM</span>
        <span class="dash-round" v-if="state.round > 1">W{{ state.round }}</span>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <StartScreen
        v-if="state.gameState === 'start'"
        :has-save="hasSave"
        @start="onStart"
        @continue="onContinue"
        @delete="onDelete"
      />

      <GameScreen
        v-else-if="state.gameState === 'playing'"
        :attrs="state.attrs"
        :time-left="timeLeft"
        :progress="progress"
        :current-scenario="currentScenario"
        :history="state.history"
        :round="state.round"
        @choose="onChoose"
      />

      <ResultScreen
        v-else-if="state.gameState === 'result'"
        :rating="state.rating"
        :is-hidden-ending="state.isHiddenEnding"
        :attrs="state.attrs"
        :history="state.history"
        :round="state.round"
        @new-round="onNewRound"
        @menu="onBackToMenu"
      />
    </main>

    <!-- 底部状态栏 -->
    <footer class="footer-bar">
      <span>⚡ 电量 100%</span>
      <span>📡 信号 良好</span>
      <span>📦 已保存</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { GAME_STATE } from './utils/constants.js'
import { useGame } from './composables/useGame.js'
import { useTimer } from './composables/useTimer.js'
import StartScreen from './components/StartScreen.vue'
import GameScreen from './components/GameScreen.vue'
import ResultScreen from './components/ResultScreen.vue'

const {
  state,
  currentScenario,
  progress,
  startNewGame,
  continueGame,
  makeChoice,
  handleTimeout: gameTimeout,
  startNewRound,
  backToMenu,
  checkHasSave,
  deleteSave
} = useGame()

const hasSave = ref(checkHasSave())

// ---- 计时器 ----
const { timeLeft, startTimer, stopTimer } = useTimer(() => {
  if (state.gameState === GAME_STATE.PLAYING) {
    gameTimeout()
    if (state.gameState === GAME_STATE.PLAYING) {
      startTimer()
    }
  }
})

// ---- 事件处理（纯胶水层） ----
function refreshSaveStatus() {
  hasSave.value = checkHasSave()
}

function onStart() {
  startNewGame()
  refreshSaveStatus()
  startTimer()
}

function onContinue() {
  const ok = continueGame()
  if (ok) {
    refreshSaveStatus()
    startTimer()
  }
}

function onDelete() {
  deleteSave()
  refreshSaveStatus()
}

function onChoose(index) {
  makeChoice(index)
  if (state.gameState === GAME_STATE.PLAYING) {
    startTimer()
  } else {
    stopTimer()
    refreshSaveStatus()
  }
}

function onNewRound() {
  startNewRound()
  startTimer()
}

function onBackToMenu() {
  stopTimer()
  backToMenu()
  refreshSaveStatus()
}

// ---- 游戏状态变更时的副作用 ----
watch(() => state.gameState, (newVal) => {
  if (newVal === GAME_STATE.RESULT || newVal === GAME_STATE.START) {
    stopTimer()
    refreshSaveStatus()
  }
})

onMounted(() => refreshSaveStatus())
</script>

<style scoped>
.cockpit {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ---- 背景装饰 ---- */
.bg-decor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 140, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 140, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-glow {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(255, 140, 0, 0.08) 0%, transparent 70%);
}

/* ---- 仪表盘 ---- */
.dashboard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid rgba(255, 140, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 10;
  flex-shrink: 0;
}

.dash-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dash-icon { font-size: 24px; }

.dash-title {
  font-size: 16px;
  font-weight: 800;
  color: #FFB347;
  letter-spacing: 2px;
}

.dash-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dash-badge {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 3px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.dash-round {
  font-size: 11px;
  font-weight: 700;
  color: #FF8C00;
  background: rgba(255, 140, 0, 0.15);
  padding: 2px 8px;
  border-radius: 10px;
}

/* ---- 主内容区 ---- */
.main-content {
  flex: 1;
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
}

/* ---- 底部状态栏 ---- */
.footer-bar {
  display: flex;
  justify-content: space-around;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 140, 0, 0.15);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  z-index: 10;
  flex-shrink: 0;
}
</style>

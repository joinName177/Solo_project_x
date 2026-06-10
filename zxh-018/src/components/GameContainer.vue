<template>
  <div class="game-container">
    <GameHUD
      :phase="phase"
      :time="timeRemaining"
      :score="score"
      :fixedCount="fixedCount"
      :totalFloors="TOTAL_FLOORS"
      :rainyMode="rainyMode"
      @start="startGame"
      @restart="restartGame"
      @toggleRainy="toggleRainyMode"
    />

    <div class="building-container">
      <BuildingSection
        :lights="lights"
        :activeFloorId="activeFloorId"
        :showSpareBulb="phase === 'playing'"
        :requiredClicks="getRequiredClicks()"
        :sliderTarget="getSliderTarget()"
        @activateFloor="setActiveFloor"
        @repairLight="handleRepair"
      />
    </div>

    <GameOverModal
      :visible="phase === 'won' || phase === 'lost'"
      :result="phase === 'won' ? 'won' : 'lost'"
      :score="score"
      :fixedCount="fixedCount"
      :totalFloors="TOTAL_FLOORS"
      @restart="restartGame"
    />

    <RainOverlay :active="rainyMode && phase === 'playing'" />
  </div>
</template>

<script setup>
import { GAME_CONFIG } from '../config/gameConfig.js'
import { useGameState } from '../composables/useGameState.js'
import { useTimer } from '../composables/useTimer.js'

import GameHUD from './GameHUD.vue'
import BuildingSection from './BuildingSection.vue'
import GameOverModal from './GameOverModal.vue'
import RainOverlay from './RainOverlay.vue'

const TOTAL_FLOORS = GAME_CONFIG.TOTAL_FLOORS

const {
  lights,
  score,
  phase,
  rainyMode,
  activeFloorId,
  fixedCount,
  initGame,
  repairLight,
  timeout,
  resetGame,
  toggleRainyMode,
  setActiveFloor,
  getRequiredClicks,
  getSliderTarget,
} = useGameState()

const { timeRemaining, start: startTimer, reset: resetTimer } = useTimer(timeout)

function startGame() {
  initGame()
  startTimer()
}

function restartGame() {
  resetGame()
  resetTimer()
  initGame()
  startTimer()
}

function handleRepair(floorId) {
  repairLight(floorId)
}
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0D1B2A 0%, #1B2838 50%, #0D1B2A 100%);
  position: relative;
  overflow: hidden;
}

.building-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  overflow-y: auto;
}
</style>

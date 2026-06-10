<template>
  <div class="game-board">
    <!-- Start Screen -->
    <div v-if="!gameStarted" class="start-screen">
      <div class="start-title">🛒 超市收银员</div>
      <div class="start-subtitle">找零挑战</div>
      <div class="start-desc">
        在倒计时内，组合出正确的找零金额！<br>
        面额按钮：1元 · 5元 · 10元 · 20元
      </div>
      <button class="start-btn" @click="startGame()">开始游戏</button>
    </div>

    <!-- Game Screen -->
    <div v-else class="game-screen">
      <ScoreBoard
        :score="score.score.value"
        :level="score.level.value"
        :streak="score.streak.value"
        :bestStreak="score.bestStreak.value"
      />

      <TimerBar
        :remaining="timer.remaining.value"
        :total="timer.total.value"
      />

      <div v-if="saleBadge" class="sale-badge">
        🏪 大促模式 {{ score.saleCompleted.value }}/{{ score.saleTotal.value }}
      </div>

      <CustomerPanel
        v-if="customer.customer.value"
        :customer="customer.customer.value"
        :items="order.items.value"
        :totalPrice="order.totalPrice.value"
        :payment="order.payment.value"
      />

      <ChangeInput
        :selected="selected"
        :totalSelected="totalSelected"
        :target="order.changeDue.value"
        @undo="undo()"
        @clear="clearSelected"
      />

      <div class="denom-section">
        <DenominationPad
          :denominations="DENOMINATIONS"
          :isDisabled="isDenomDisabled"
          @select="selectDenomination"
        />
      </div>

      <div class="hint-text">
        组合出 <strong>¥{{ (order.payment.value - order.totalPrice.value).toFixed(2) }}</strong> 找零
      </div>

      <!-- Overpaid fix button -->
      <div v-if="feedback === 'overpaid_prompt'" class="overpaid-bar">
        <div class="overpaid-text">顾客说多找了2元！请点击修正</div>
        <button class="overpaid-btn" @click="overpaidFix()">确认修正 -2元</button>
      </div>
    </div>

    <FeedbackOverlay :result="feedback" />
    <SaleOverlay :visible="showSaleOverlay" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameState } from '../composables/useGameState.js'
import ScoreBoard from './ScoreBoard.vue'
import TimerBar from './TimerBar.vue'
import CustomerPanel from './CustomerPanel.vue'
import ChangeInput from './ChangeInput.vue'
import DenominationPad from './DenominationPad.vue'
import FeedbackOverlay from './FeedbackOverlay.vue'
import SaleOverlay from './SaleOverlay.vue'

const {
  selected,
  totalSelected,
  feedback,
  gameStarted,
  showSaleOverlay,
  order,
  timer,
  customer,
  score,
  selectDenomination,
  undo,
  isDenomDisabled,
  overpaidFix,
  startGame,
  DENOMINATIONS,
} = useGameState()

const saleBadge = computed(() => score.isSaleMode.value)

function clearSelected() {
  selected.value = []
}
</script>

<style scoped>
.game-board {
  max-width: 420px;
  margin: 0 auto;
  padding: 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.start-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}

.start-title {
  font-size: 36px;
  font-weight: bold;
  color: #4a3728;
}

.start-subtitle {
  font-size: 28px;
  font-weight: bold;
  color: #e65100;
  margin-bottom: 12px;
}

.start-desc {
  font-size: 15px;
  color: #8B7355;
  line-height: 1.6;
}

.start-btn {
  margin-top: 24px;
  padding: 16px 48px;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #ff8a65, #ff7043);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 112, 67, 0.4);
  transition: all 0.2s;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 112, 67, 0.5);
}

.start-btn:active {
  transform: translateY(0);
}

.game-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sale-badge {
  text-align: center;
  padding: 6px;
  background: linear-gradient(90deg, #ff9800, #ff5722);
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  border-radius: 8px;
  margin-bottom: 12px;
  animation: glow 1s infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 4px rgba(255,152,0,0.3); }
  to { box-shadow: 0 0 12px rgba(255,152,0,0.6); }
}

.denom-section {
  background: #fff;
  border: 2px solid #d4c5a9;
  border-radius: 12px;
  margin-bottom: 8px;
}

.hint-text {
  text-align: center;
  font-size: 14px;
  color: #8B7355;
  padding: 8px;
}

.overpaid-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fff3e0;
  border: 2px solid #ff9800;
  border-radius: 12px;
  margin-top: 8px;
  animation: pulse 0.6s infinite alternate;
}

@keyframes pulse {
  from { opacity: 0.8; }
  to { opacity: 1; }
}

.overpaid-text {
  font-size: 14px;
  color: #e65100;
  font-weight: 600;
}

.overpaid-btn {
  padding: 10px 32px;
  font-size: 16px;
  font-weight: bold;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.overpaid-btn:hover {
  background: #f57c00;
}
</style>

<template>
  <transition name="overlay">
    <div v-if="result" class="feedback-overlay" :class="result">
      <div class="feedback-icon">
        <template v-if="result === 'correct'">✓</template>
        <template v-else-if="result === 'overpaid_prompt'">?</template>
        <template v-else-if="result === 'wrong'">✗</template>
        <template v-else-if="result === 'timeout'">⏰</template>
      </div>
      <div class="feedback-text">
        <template v-if="result === 'correct'">找零正确！+10分</template>
        <template v-else-if="result === 'overpaid_prompt'">顾客说：你多找了我2元！<br/><small>请从找零中移除2元</small></template>
        <template v-else-if="result === 'wrong'">找零错误！-5分</template>
        <template v-else-if="result === 'timeout'">时间到！-5分</template>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  result: { type: String, default: null },
})
</script>

<style scoped>
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  z-index: 100;
}

.feedback-overlay.correct {
  background: rgba(46, 125, 50, 0.6);
}

.feedback-overlay.wrong,
.feedback-overlay.timeout {
  background: rgba(198, 40, 40, 0.6);
}

.feedback-icon {
  font-size: 80px;
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.feedback-text {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.feedback-text small {
  font-size: 16px;
  font-weight: normal;
}

.overlay-enter-active {
  transition: opacity 0.3s;
}

.overlay-leave-active {
  transition: opacity 0.3s;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>

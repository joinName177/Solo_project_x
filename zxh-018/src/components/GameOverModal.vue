<template>
  <Transition name="modal">
    <div class="overlay" v-if="visible" @click.self="$emit('restart')">
      <div class="modal" :class="result">
        <div class="modal-icon">{{ result === 'won' ? '🎉' : '⏰' }}</div>
        <h2 class="modal-title">
          {{ result === 'won' ? '全部修好！' : '时间到！' }}
        </h2>
        <div class="stats">
          <div class="stats-row">
            <span>修复完成</span>
            <span>{{ fixedCount }} / {{ totalFloors }} 盏</span>
          </div>
          <div class="stats-row">
            <span>最终得分</span>
            <span class="final-score">{{ score }}</span>
          </div>
        </div>
        <button class="btn-replay" @click="$emit('restart')">
          再来一局
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  result: { type: String, default: 'lost' },
  score: { type: Number, default: 0 },
  fixedCount: { type: Number, default: 0 },
  totalFloors: { type: Number, default: 6 },
})
defineEmits(['restart'])
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #FFC107;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  min-width: 320px;
  box-shadow: 0 0 40px rgba(255, 193, 7, 0.2);
}

.modal.won {
  border-color: #66BB6A;
  box-shadow: 0 0 40px rgba(102, 187, 106, 0.3);
}

.modal-icon {
  font-size: 64px;
  margin-bottom: 12px;
}

.modal-title {
  font-size: 28px;
  margin-bottom: 24px;
  color: #FFD54F;
}

.modal.won .modal-title {
  color: #66BB6A;
}

.stats {
  margin-bottom: 28px;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stats-row:last-child {
  border-bottom: none;
}

.final-score {
  color: #FFD54F;
  font-weight: bold;
  font-size: 24px;
}

.modal.won .final-score {
  color: #66BB6A;
}

.btn-replay {
  padding: 12px 36px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #FFC107, #FFA000);
  color: #1a1a2e;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-replay:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
}

.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.8);
}
</style>

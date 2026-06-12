<!--
  信誉徽章组件
  职责：展示信誉分、提供"点靠谱"按钮
-->
<template>
  <div class="reputation-badge" :title="`信誉分 ${score}`">
    <span class="rep-stars">
      <span v-for="i in starCount" :key="i" class="rep-star">⭐</span>
      <span v-if="score === 0" class="rep-no-star">☆</span>
    </span>
    <span class="rep-score">{{ score }}</span>
    <button
      v-if="!isSelf"
      class="rep-btn"
      :disabled="endorsed"
      @click.stop="$emit('endorse')"
      :title="endorsed ? '已点过靠谱' : '点个靠谱'"
    >
      {{ endorsed ? '已靠谱' : '👍靠谱' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Number, default: 0 },
  endorsed: { type: Boolean, default: false },
  isSelf: { type: Boolean, default: false },
})

defineEmits(['endorse'])

const starCount = computed(() => Math.min(props.score, 5))
</script>

<style scoped>
.reputation-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}
.rep-stars {
  display: inline-flex;
  gap: 1px;
}
.rep-star {
  font-size: 14px;
}
.rep-no-star {
  font-size: 14px;
  opacity: 0.4;
}
.rep-score {
  font-weight: 700;
  color: #e65100;
  min-width: 18px;
  text-align: center;
}
.rep-btn {
  background: #fff3e0;
  border: 1px solid #ffcc80;
  color: #e65100;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 4px;
}
.rep-btn:hover:not(:disabled) {
  background: #ffe0b2;
  border-color: #ff9800;
}
.rep-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>

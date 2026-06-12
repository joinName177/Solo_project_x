<template>
  <Modal :model-value="modelValue" title="⭐ 评价手艺人" @update:model-value="$emit('update:modelValue', $event)">
    <form class="rating-form" @submit.prevent="handleSubmit">
      <p class="rating-target">为 <strong>{{ craftsmanName }}</strong> 评分</p>

      <!-- 星级选择 -->
      <div class="rating-star-select">
        <span class="rating-label">评分：</span>
        <span
          v-for="star in 5"
          :key="star"
          class="rating-star"
          :class="{ active: star <= score }"
          @click="score = star"
        >
          {{ star <= score ? '★' : '☆' }}
        </span>
      </div>

      <!-- 评价内容 -->
      <div class="form-group">
        <label class="form-label">评价内容</label>
        <textarea
          v-model="comment"
          class="form-input form-textarea"
          rows="3"
          placeholder="说说您的服务体验..."
          maxlength="300"
        ></textarea>
      </div>

      <!-- 评价人 -->
      <div class="form-group">
        <label class="form-label">您的称呼</label>
        <input
          v-model="reviewer"
          type="text"
          class="form-input"
          placeholder="选填，默认「匿名村民」"
          maxlength="20"
        />
      </div>

      <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>

      <div class="form-actions">
        <button type="button" class="btn btn-outline" @click="cancel">取消</button>
        <button type="submit" class="btn btn-primary" :disabled="score === 0">提交评价</button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '../common/Modal.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  craftsmanName: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const score = ref(0)
const comment = ref('')
const reviewer = ref('')
const errorMsg = ref('')

function handleSubmit() {
  if (score.value === 0) {
    errorMsg.value = '请选择评分'
    return
  }
  emit('submit', {
    score: score.value,
    comment: comment.value,
    reviewer: reviewer.value
  })
  resetForm()
  emit('update:modelValue', false)
}

function cancel() {
  resetForm()
  emit('update:modelValue', false)
}

function resetForm() {
  score.value = 0
  comment.value = ''
  reviewer.value = ''
  errorMsg.value = ''
}
</script>

<style scoped>
.rating-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rating-target {
  margin: 0;
  font-size: 0.95rem;
  color: #5d4037;
  text-align: center;
}
.rating-star-select {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.rating-label {
  font-size: 0.9rem;
  color: #5d4037;
  margin-right: 0.5rem;
}
.rating-star {
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
  user-select: none;
}
.rating-star.active {
  color: #f39c12;
}
.rating-star:hover {
  transform: scale(1.2);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.form-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: #5d4037;
}
.form-input {
  padding: 0.55rem 0.75rem;
  border: 1.5px solid #e0d5c1;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #4e342e;
  background: #fffdf7;
  outline: none;
}
.form-input:focus {
  border-color: #e67e22;
}
.form-textarea {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}
.form-error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin: 0;
  text-align: center;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>

<!--
  发布零工表单组件
  职责：收集零工需求/供给信息，验证并提交
-->
<template>
  <div class="gig-form-panel">
    <div class="form-toggle">
      <button
        :class="['toggle-btn', { active: form.type === 'demand' }]"
        @click="form.type = 'demand'"
      >
        🔍 找人干活
      </button>
      <button
        :class="['toggle-btn', { active: form.type === 'supply' }]"
        @click="form.type = 'supply'"
      >
        💪 我会干
      </button>
    </div>

    <form class="gig-form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group form-group--title">
          <label class="form-label">标题 <span class="required">*</span></label>
          <input
            v-model="form.title"
            type="text"
            class="form-input"
            placeholder="如：三天摘苹果，日薪100元包午饭"
            maxlength="50"
            required
          />
        </div>

        <div class="form-group form-group--type">
          <label class="form-label">工作类型 <span class="required">*</span></label>
          <select v-model="form.workType" class="form-input" required>
            <option value="" disabled>请选择</option>
            <option v-for="wt in workTypes" :key="wt" :value="wt">{{ workTypeIcons[wt] }} {{ wt }}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">详细描述</label>
        <textarea
          v-model="form.description"
          class="form-input form-textarea"
          rows="3"
          placeholder="描述一下具体工作内容、要求、报酬等..."
          maxlength="300"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">联系人 <span class="required">*</span></label>
          <input
            v-model="form.contact"
            type="text"
            class="form-input"
            placeholder="手机号或房号"
            maxlength="30"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">所在村组 <span class="required">*</span></label>
          <input
            v-model="form.village"
            type="text"
            class="form-input"
            placeholder="如：张家村一组"
            maxlength="30"
            required
          />
        </div>
      </div>

      <div class="form-actions">
        <span class="form-hint">发布后信息将展示在公告板上</span>
        <button type="submit" class="btn-submit" :disabled="!isValid">
          📌 贴到公告板
        </button>
      </div>
    </form>

    <!-- 提交反馈 -->
    <Transition name="toast">
      <div v-if="feedback" :class="['feedback-toast', feedback.success ? 'toast-success' : 'toast-error']">
        {{ feedback.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { WORK_TYPES, WORK_TYPE_ICONS } from '../../utils/constants.js'

const emit = defineEmits(['submit'])

const workTypes = WORK_TYPES
const workTypeIcons = WORK_TYPE_ICONS

const form = reactive({
  type: 'demand',
  title: '',
  workType: '',
  description: '',
  contact: '',
  village: '',
})

const feedback = ref(null)
let feedbackTimer = null

const isValid = computed(() => {
  return form.title.trim() && form.workType && form.contact.trim() && form.village.trim()
})

function resetForm() {
  form.title = ''
  form.workType = ''
  form.description = ''
  form.contact = ''
  form.village = ''
}

function showFeedback(success, message) {
  clearTimeout(feedbackTimer)
  feedback.value = { success, message }
  feedbackTimer = setTimeout(() => {
    feedback.value = null
  }, 2500)
}

function handleSubmit() {
  if (!isValid.value) return

  emit('submit', {
    type: form.type,
    title: form.title.trim(),
    workType: form.workType,
    description: form.description.trim(),
    contact: form.contact.trim(),
    village: form.village.trim(),
  })

  resetForm()
  showFeedback(true, '发布成功！信息已贴到公告板 📌')
}
</script>

<style scoped>
.gig-form-panel {
  background: #fffef7;
  border: 2px solid #e8dcc8;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.form-toggle {
  display: flex;
  gap: 0;
  margin-bottom: 18px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #bcaaa4;
}
.toggle-btn {
  flex: 1;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background: #fafafa;
  color: #8d6e63;
  cursor: pointer;
  transition: all 0.2s;
}
.toggle-btn.active {
  background: #5d4037;
  color: #fff;
}
.gig-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-row {
  display: flex;
  gap: 12px;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-group--title {
  flex: 2;
}
.form-group--type {
  flex: 1;
}
.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #5d4037;
}
.required {
  color: #c62828;
}
.form-input {
  padding: 9px 12px;
  border: 1.5px solid #d7ccc8;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  color: #3e2723;
  background: #fffef7;
  transition: border-color 0.15s;
  outline: none;
}
.form-input:focus {
  border-color: #8d6e63;
  box-shadow: 0 0 0 2px rgba(141,110,99,0.12);
}
.form-input::placeholder {
  color: #bcaaa4;
}
.form-textarea {
  resize: vertical;
  min-height: 60px;
}
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}
.form-hint {
  font-size: 12px;
  color: #a1887f;
}
.btn-submit {
  background: #5d4037;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-submit:hover:not(:disabled) {
  background: #4e342e;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(93,64,55,0.3);
}
.btn-submit:disabled {
  opacity: 0.5;
  cursor: default;
}

/* 反馈提示 */
.feedback-toast {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  z-index: 10;
}
.toast-success {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}
.toast-error {
  background: #fce4ec;
  color: #c62828;
  border: 1px solid #ef9a9a;
}
.toast-enter-active { animation: toastIn 0.3s ease; }
.toast-leave-active { animation: toastOut 0.3s ease; }
@keyframes toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateX(-50%) translateY(0); }
  to   { opacity: 0; transform: translateX(-50%) translateY(10px); }
}

@media (max-width: 520px) {
  .form-row {
    flex-direction: column;
  }
}
</style>

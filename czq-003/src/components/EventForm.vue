<template>
  <div class="event-form" v-if="visible">
    <div class="event-form__overlay" @click="$emit('close')"></div>
    <div class="event-form__panel">
      <h2 class="event-form__title">📋 登记新事件</h2>

      <!-- 事件类型 -->
      <div class="event-form__group">
        <label class="event-form__label">事件类型</label>
        <div class="event-form__type-grid">
          <button
            v-for="(config, key) in EVENT_TYPES"
            :key="key"
            class="event-form__type-btn"
            :class="{
              active: form.eventType === key,
              'type-red': config.category === 'red',
              'type-white': config.category === 'white'
            }"
            @click="form.eventType = key"
          >
            <span class="type-icon">{{ config.icon }}</span>
            <span class="type-label">{{ config.label }}</span>
          </button>
        </div>
      </div>

      <!-- 事主姓名 -->
      <div class="event-form__group">
        <label class="event-form__label">事主姓名 <span class="required">*</span></label>
        <input
          v-model="form.hostName"
          type="text"
          placeholder="请输入事主姓名"
          class="event-form__input"
        />
      </div>

      <!-- 事件日期 -->
      <div class="event-form__group">
        <label class="event-form__label">事件日期 <span class="required">*</span></label>
        <input
          v-model="form.eventDate"
          type="date"
          class="event-form__input"
        />
      </div>

      <!-- 备注 -->
      <div class="event-form__group">
        <label class="event-form__label">备注说明</label>
        <textarea
          v-model="form.notes"
          placeholder="补充信息（如地址、注意事项等）"
          class="event-form__textarea"
          rows="3"
        ></textarea>
      </div>

      <!-- 帮忙事项 -->
      <div class="event-form__group">
        <label class="event-form__label">需要帮忙的事项</label>
        <div class="event-form__help-tags">
          <button
            v-for="ht in DEFAULT_HELP_TYPES"
            :key="ht"
            class="event-form__tag"
            :class="{ active: form.helpItems.includes(ht) }"
            @click="toggleHelpType(ht)"
          >
            {{ ht }}
          </button>
        </div>
        <div class="event-form__custom-help">
          <input
            v-model="customHelp"
            type="text"
            placeholder="添加自定义事项…"
            class="event-form__input"
            @keyup.enter="addCustomHelp"
          />
          <button class="event-form__add-custom-btn" @click="addCustomHelp">＋</button>
        </div>
        <!-- 已选事项预览 -->
        <div v-if="form.helpItems.length > 0" class="event-form__selected">
          <span class="selected-label">已选事项：</span>
          <span
            v-for="(item, idx) in form.helpItems"
            :key="idx"
            class="selected-tag"
          >
            {{ item }}
            <button class="selected-remove" @click="removeHelpItem(idx)">✕</button>
          </span>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="event-form__actions">
        <button class="event-form__cancel-btn" @click="$emit('close')">取消</button>
        <button
          class="event-form__submit-btn"
          :disabled="!isValid"
          @click="handleSubmit"
        >
          ✅ 登记事件
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { EVENT_TYPES, DEFAULT_HELP_TYPES } from '../utils/constants.js'

defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['submit', 'close'])

const customHelp = ref('')

const form = reactive({
  eventType: 'wedding',
  hostName: '',
  eventDate: new Date().toISOString().split('T')[0],
  notes: '',
  helpItems: []
})

const isValid = computed(() =>
  form.hostName.trim() && form.eventDate && form.eventType
)

function toggleHelpType(type) {
  const idx = form.helpItems.indexOf(type)
  if (idx === -1) {
    form.helpItems.push(type)
  } else {
    form.helpItems.splice(idx, 1)
  }
}

function addCustomHelp() {
  const val = customHelp.value.trim()
  if (val && !form.helpItems.includes(val)) {
    form.helpItems.push(val)
    customHelp.value = ''
  }
}

function removeHelpItem(index) {
  form.helpItems.splice(index, 1)
}

function resetForm() {
  form.eventType = 'wedding'
  form.hostName = ''
  form.eventDate = new Date().toISOString().split('T')[0]
  form.notes = ''
  form.helpItems = []
  customHelp.value = ''
}

function handleSubmit() {
  if (!isValid.value) return
  emit('submit', {
    eventType: form.eventType,
    hostName: form.hostName,
    eventDate: form.eventDate,
    notes: form.notes,
    helpItems: [...form.helpItems]
  })
  resetForm()
}
</script>

<style scoped>
.event-form__overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99;
}
.event-form__panel {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 92%; max-width: 560px; max-height: 85vh; overflow-y: auto;
  background: #fffef9; border-radius: 16px; padding: 28px 24px;
  z-index: 100; box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.event-form__title {
  text-align: center; color: #5d4037; margin: 0 0 20px; font-size: 22px;
}
.event-form__group { margin-bottom: 18px; }
.event-form__label {
  display: block; font-weight: 600; color: #4a3728; margin-bottom: 6px; font-size: 15px;
}
.required { color: #c0392b; }
.event-form__input, .event-form__textarea {
  width: 100%; padding: 10px 12px; border: 1px solid #d0c5b5; border-radius: 8px;
  font-size: 15px; outline: none; background: #fff; box-sizing: border-box;
}
.event-form__input:focus, .event-form__textarea:focus { border-color: #8d6e63; }
.event-form__textarea { resize: vertical; font-family: inherit; }

.event-form__type-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.event-form__type-btn {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 12px 8px; border: 2px solid #e0d5c7; border-radius: 10px;
  background: #fff; cursor: pointer; font-size: 15px; transition: all 0.2s;
}
.event-form__type-btn.type-red.active { border-color: #c0392b; background: #fff5f5; }
.event-form__type-btn.type-white.active { border-color: #2c3e50; background: #f5f5f5; }
.type-icon { font-size: 22px; }
.type-label { font-weight: 500; }

.event-form__help-tags {
  display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;
}
.event-form__tag {
  padding: 6px 12px; border: 1px solid #d0c5b5; border-radius: 16px;
  background: #fff; font-size: 13px; cursor: pointer; transition: all 0.2s;
}
.event-form__tag.active { background: #6d4c41; color: #fff; border-color: #6d4c41; }
.event-form__custom-help { display: flex; gap: 6px; }
.event-form__add-custom-btn {
  padding: 10px 16px; border: 1px solid #8d6e63; border-radius: 8px;
  background: #8d6e63; color: #fff; font-size: 18px; cursor: pointer;
}
.event-form__selected { margin-top: 8px; }
.selected-label { font-size: 13px; color: #8d6e63; }
.selected-tag {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 10px; margin: 3px; border-radius: 14px;
  background: #e8d5c4; font-size: 13px; color: #4a3728;
}
.selected-remove {
  border: none; background: transparent; color: #c0392b; font-size: 14px; cursor: pointer;
}
.event-form__actions {
  display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;
}
.event-form__cancel-btn, .event-form__submit-btn {
  padding: 10px 24px; border-radius: 10px; font-size: 16px; cursor: pointer; border: none;
}
.event-form__cancel-btn { background: #e0d5c7; color: #5d4037; }
.event-form__submit-btn { background: #c0392b; color: #fff; }
.event-form__submit-btn:disabled { background: #ccc; cursor: not-allowed; }
</style>

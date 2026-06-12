<template>
  <div class="gift-ref" v-if="visible">
    <div class="gift-ref__overlay" @click="$emit('close')"></div>
    <div class="gift-ref__panel">
      <h2 class="gift-ref__title">💰 随礼行情参考</h2>

      <!-- 当前标准列表 -->
      <div class="gift-ref__list">
        <div
          v-for="ref in giftReferences"
          :key="ref.id"
          class="gift-ref__row"
        >
          <span class="gift-ref__relation">{{ ref.relationship }}</span>
          <span class="gift-ref__amount">
            {{ ref.minAmount }} - {{ ref.maxAmount }} 元
          </span>
          <button class="gift-ref__edit-btn" @click="startEdit(ref)">✎</button>
          <button class="gift-ref__del-btn" @click="deleteGiftReference(ref.id)">✕</button>
        </div>
      </div>

      <!-- 编辑/新增表单 -->
      <div class="gift-ref__form">
        <input
          v-model="editForm.relationship"
          type="text"
          placeholder="关系（如：至亲、邻居…）"
          class="gift-ref__input"
        />
        <input
          v-model.number="editForm.minAmount"
          type="number"
          placeholder="最低金额"
          class="gift-ref__input gift-ref__input--small"
        />
        <span class="gift-ref__dash">—</span>
        <input
          v-model.number="editForm.maxAmount"
          type="number"
          placeholder="最高金额"
          class="gift-ref__input gift-ref__input--small"
        />
        <button class="gift-ref__save-btn" @click="handleSave">
          {{ editingId ? '更新' : '添加' }}
        </button>
      </div>

      <div class="gift-ref__footer">
        <button class="gift-ref__reset-btn" @click="handleReset">重置为默认</button>
        <button class="gift-ref__close-btn" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useGiftReference } from '../composables/useGiftReference.js'

defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const { giftReferences, addGiftReference, updateGiftReference, deleteGiftReference, resetGiftReferences } = useGiftReference()

const editingId = ref('')
const editForm = reactive({
  relationship: '',
  minAmount: 0,
  maxAmount: 0
})

function startEdit(ref) {
  editingId.value = ref.id
  editForm.relationship = ref.relationship
  editForm.minAmount = ref.minAmount
  editForm.maxAmount = ref.maxAmount
}

function handleSave() {
  if (!editForm.relationship.trim() || editForm.minAmount < 0 || editForm.maxAmount < 0) return
  if (editingId.value) {
    updateGiftReference(editingId.value, { ...editForm })
    editingId.value = ''
  } else {
    addGiftReference({ ...editForm })
  }
  editForm.relationship = ''
  editForm.minAmount = 0
  editForm.maxAmount = 0
}

function handleReset() {
  if (confirm('确定重置为默认随礼标准吗？自定义数据将丢失。')) {
    resetGiftReferences()
  }
}
</script>

<style scoped>
.gift-ref__overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99;
}
.gift-ref__panel {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 92%; max-width: 480px; max-height: 85vh; overflow-y: auto;
  background: #fffef9; border-radius: 16px; padding: 28px 24px;
  z-index: 100; box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.gift-ref__title { text-align: center; color: #b8860b; margin: 0 0 20px; font-size: 22px; }
.gift-ref__list { margin-bottom: 16px; }
.gift-ref__row {
  display: flex; align-items: center; gap: 8px; padding: 10px 8px;
  border-bottom: 1px solid #f0e8d8; font-size: 15px;
}
.gift-ref__relation { font-weight: 600; color: #5d4037; min-width: 80px; }
.gift-ref__amount { flex: 1; color: #b8860b; font-weight: 500; }
.gift-ref__edit-btn, .gift-ref__del-btn {
  border: none; background: transparent; cursor: pointer; font-size: 16px; padding: 4px;
}
.gift-ref__edit-btn { color: #8d6e63; }
.gift-ref__del-btn { color: #c0392b; }

.gift-ref__form {
  display: flex; gap: 6px; align-items: center; flex-wrap: wrap;
  padding: 12px; background: #faf6ef; border-radius: 10px; margin-bottom: 16px;
}
.gift-ref__input {
  padding: 8px 10px; border: 1px solid #d0c5b5; border-radius: 6px;
  font-size: 14px; outline: none; flex: 1; min-width: 100px;
}
.gift-ref__input--small { width: 80px; flex: none; }
.gift-ref__dash { color: #8d6e63; }
.gift-ref__save-btn {
  padding: 8px 14px; border: none; border-radius: 6px;
  background: #b8860b; color: #fff; font-size: 14px; cursor: pointer; white-space: nowrap;
}
.gift-ref__footer { display: flex; gap: 10px; justify-content: space-between; }
.gift-ref__reset-btn {
  padding: 8px 16px; border: 1px solid #c0392b; border-radius: 8px;
  background: transparent; color: #c0392b; font-size: 14px; cursor: pointer;
}
.gift-ref__close-btn {
  padding: 8px 24px; border: none; border-radius: 8px;
  background: #8d6e63; color: #fff; font-size: 14px; cursor: pointer;
}
</style>

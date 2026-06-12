<template>
  <div class="help-item" :class="{ claimed: item.claimedBy }">
    <div class="help-item__info">
      <span class="help-item__bullet">{{ item.claimedBy ? '✅' : '⬜' }}</span>
      <span class="help-item__desc">{{ item.description }}</span>
    </div>

    <div v-if="item.claimedBy" class="help-item__claimed">
      已由 <strong>{{ item.claimedBy }}</strong> 认领
      <button
        v-if="canManage"
        class="help-item__unclaim-btn"
        @click="$emit('unclaim', item.id)"
      >
        取消
      </button>
    </div>

    <div v-else class="help-item__actions">
      <input
        v-model="claimerInput"
        type="text"
        placeholder="输入您的姓名认领"
        class="help-item__input"
        @keyup.enter="handleClaim"
      />
      <button
        class="help-item__claim-btn"
        :disabled="!claimerInput.trim()"
        @click="handleClaim"
      >
        认领
      </button>
      <button
        v-if="canManage"
        class="help-item__remove-btn"
        @click="$emit('remove', item.id)"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  canManage: { type: Boolean, default: false }
})

const emit = defineEmits(['claim', 'unclaim', 'remove'])
const claimerInput = ref('')

function handleClaim() {
  if (claimerInput.value.trim()) {
    emit('claim', { itemId: props.item.id, claimerName: claimerInput.value.trim() })
    claimerInput.value = ''
  }
}
</script>

<style scoped>
.help-item {
  padding: 10px 12px;
  margin: 6px 0;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e0d5c7;
  font-size: 15px;
  transition: all 0.2s;
}
.help-item.claimed {
  background: #e8f5e9;
  border-color: #a5d6a7;
}
.help-item__info {
  display: flex;
  align-items: center;
  gap: 8px;
}
.help-item__bullet {
  font-size: 18px;
  flex-shrink: 0;
}
.help-item__desc {
  font-weight: 500;
  color: #4a3728;
}
.help-item__claimed {
  margin-top: 6px;
  font-size: 13px;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 8px;
}
.help-item__unclaim-btn {
  font-size: 12px;
  padding: 2px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  color: #666;
}
.help-item__actions {
  margin-top: 6px;
  display: flex;
  gap: 6px;
  align-items: center;
}
.help-item__input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d0c5b5;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}
.help-item__input:focus {
  border-color: #8d6e63;
}
.help-item__claim-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background: #6d4c41;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}
.help-item__claim-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.help-item__remove-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #c0392b;
  font-size: 16px;
  cursor: pointer;
}
</style>

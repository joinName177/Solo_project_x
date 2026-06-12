<template>
  <div class="help-item-form">
    <select v-model="selectedType" class="help-item-form__select">
      <option value="">-- 选择常用事项 --</option>
      <option v-for="ht in helpTypes" :key="ht" :value="ht">{{ ht }}</option>
    </select>
    <input
      v-model="customDesc"
      type="text"
      placeholder="或手动输入事项…"
      class="help-item-form__input"
      @keyup.enter="handleAdd"
    />
    <button class="help-item-form__btn" @click="handleAdd">确认</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DEFAULT_HELP_TYPES } from '../utils/constants.js'

const emit = defineEmits(['add'])

const helpTypes = DEFAULT_HELP_TYPES
const selectedType = ref('')
const customDesc = ref('')

function handleAdd() {
  const desc = selectedType.value || customDesc.value.trim()
  if (desc) {
    emit('add', desc)
    selectedType.value = ''
    customDesc.value = ''
  }
}
</script>

<style scoped>
.help-item-form {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.help-item-form__select {
  max-width: 160px;
  padding: 6px 10px;
  border: 1px solid #d0c5b5;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: #fff;
}
.help-item-form__input {
  flex: 1;
  min-width: 140px;
  padding: 6px 10px;
  border: 1px solid #d0c5b5;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}
.help-item-form__input:focus,
.help-item-form__select:focus {
  border-color: #8d6e63;
}
.help-item-form__btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background: #8d6e63;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}
</style>

<template>
  <form class="price-form" @submit.prevent="handleSubmit">
    <div class="form-row">
      <div class="form-group">
        <label>作物名称</label>
        <select v-model="form.cropName" required>
          <option value="" disabled>请选择作物</option>
          <optgroup v-for="(crops, cat) in cropOptions" :key="cat" :label="catLabels[cat]">
            <option v-for="c in crops" :key="c" :value="c">{{ c }}</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group">
        <label>价格</label>
        <input
          type="number"
          v-model="form.price"
          step="0.01"
          min="0"
          placeholder="0.00"
          required
        />
      </div>
      <div class="form-group">
        <label>单位</label>
        <select v-model="form.unit">
          <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>日期</label>
        <input type="date" v-model="form.date" required />
      </div>
      <div class="form-group">
        <label>地点</label>
        <input type="text" v-model="form.location" placeholder="如：红旗市场" required maxlength="30" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group flex-1">
        <label>备注（选填）</label>
        <input type="text" v-model="form.note" placeholder="如：品质好、量大" maxlength="50" />
      </div>
      <button type="submit" class="btn-submit">{{ isEditing ? '更新记录' : '添加记录' }}</button>
    </div>
    <button v-if="isEditing" type="button" class="btn-cancel" @click="$emit('cancel')">取消编辑</button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { CATEGORY_CROPS, CATEGORY_LABELS, PRICE_UNITS, DEFAULT_UNIT } from '../utils/constants.js'

const props = defineProps({
  editingRecord: { type: Object, default: null },
})
const emit = defineEmits(['submit', 'cancel'])

const cropOptions = CATEGORY_CROPS
const catLabels = CATEGORY_LABELS
const units = PRICE_UNITS

const isEditing = !!props.editingRecord

const defaultForm = () => ({
  cropName: '',
  price: '',
  unit: DEFAULT_UNIT,
  date: new Date().toISOString().slice(0, 10),
  location: '',
  note: '',
})

const form = reactive(defaultForm())

watch(() => props.editingRecord, (record) => {
  if (record) {
    Object.assign(form, {
      cropName: record.cropName,
      price: record.price,
      unit: record.unit,
      date: record.date,
      location: record.location,
      note: record.note || '',
    })
  } else {
    Object.assign(form, defaultForm())
  }
}, { immediate: true })

function handleSubmit() {
  emit('submit', { ...form })
  Object.assign(form, defaultForm())
}
</script>

<style scoped>
.price-form {
  background: #f9fafb;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px;
}
.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-group.flex-1 { flex: 1; min-width: 120px; }
.form-group label {
  font-size: 0.85em;
  color: #666;
}
.form-group input,
.form-group select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  min-width: 100px;
}
.form-group input:focus,
.form-group select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 2px rgba(76,175,80,0.2);
}
.btn-submit {
  padding: 10px 24px;
  background: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-end;
}
.btn-submit:hover { background: #388E3C; }
.btn-cancel {
  padding: 6px 16px;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 4px;
}
.btn-cancel:hover { background: #ddd; }
</style>

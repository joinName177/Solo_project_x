<template>
  <div class="post-form" v-if="visible">
    <h3 class="form-title">📝 {{ isSupply ? '发布出租信息' : '发布求租信息' }}</h3>

    <div class="type-toggle">
      <button :class="{ active: isSupply }" @click="form.type = 'supply'">📋 出租农机</button>
      <button :class="{ active: !isSupply }" @click="form.type = 'demand'">🔍 求租农机</button>
    </div>

    <div class="form-grid">
      <div class="field">
        <label>农机类型 <span class="required">*</span></label>
        <select v-model="form.machineType">
          <option value="">请选择</option>
          <option v-for="m in MACHINE_TYPES" :key="m.value" :value="m.value">{{ m.label }}</option>
        </select>
      </div>

      <div class="field">
        <label>品牌型号 <span class="required">*</span></label>
        <input v-model="form.brandModel" placeholder="如：东方红LX904" />
      </div>

      <div class="field" v-if="isSupply">
        <label>日租金（元） <span class="required">*</span></label>
        <input v-model.number="form.dailyRent" type="number" placeholder="如：300" min="0" />
      </div>

      <div class="field" v-if="!isSupply">
        <label>使用日期 <span class="required">*</span></label>
        <input v-model="form.useDate" type="date" />
      </div>

      <div class="field" v-if="!isSupply">
        <label>期望租金（元/天）</label>
        <input v-model.number="form.expectedRent" type="number" placeholder="如：250" min="0" />
      </div>

      <div class="field">
        <label>所在村庄 <span class="required">*</span></label>
        <input v-model="form.village" placeholder="如：东庄村" list="village-list" />
        <datalist id="village-list">
          <option v-for="v in VILLAGES" :key="v" :value="v" />
        </datalist>
      </div>

      <div class="field">
        <label>联系方式</label>
        <input v-model="form.contact" placeholder="手机号或微信（选填）" />
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-submit" @click="handleSubmit" :disabled="!isValid">✅ 发布信息</button>
      <button class="btn-cancel" @click="$emit('cancel')">取消</button>
    </div>

    <p class="form-hint">* 标记为已租出/已完成的信息将不再显示在首页</p>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { MACHINE_TYPES, VILLAGES } from '../../core/constants.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  initialType: { type: String, default: 'supply' }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  type: props.initialType,
  machineType: '',
  brandModel: '',
  dailyRent: null,
  useDate: '',
  expectedRent: null,
  village: '',
  contact: ''
})

// 当 initialType 变化时重置表单
watch(() => props.initialType, (val) => {
  form.type = val
})

const isSupply = computed(() => form.type === 'supply')

const isValid = computed(() => {
  if (!form.machineType || !form.brandModel.trim() || !form.village.trim()) return false
  if (isSupply.value) {
    return form.dailyRent > 0
  } else {
    return !!form.useDate
  }
})

function handleSubmit() {
  if (!isValid.value) return
  const data = {
    type: form.type,
    machineType: form.machineType,
    brandModel: form.brandModel.trim(),
    village: form.village.trim(),
    contact: form.contact.trim()
  }
  if (isSupply.value) {
    data.dailyRent = form.dailyRent
  } else {
    data.useDate = form.useDate
    data.expectedRent = form.expectedRent || null
  }
  emit('submit', data)
  resetForm()
}

function resetForm() {
  form.machineType = ''
  form.brandModel = ''
  form.dailyRent = null
  form.useDate = ''
  form.expectedRent = null
  form.village = ''
  form.contact = ''
}

defineExpose({ resetForm })
</script>

<style scoped>
.post-form {
  background: #fffef5;
  border: 3px solid #d4a574;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 20px;
}

.form-title {
  margin: 0 0 16px 0;
  font-size: 22px;
  color: #8b4513;
  text-align: center;
}

.type-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  justify-content: center;
}

.type-toggle button {
  padding: 10px 28px;
  font-size: 17px;
  border: 2px solid #d4a574;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: #8b4513;
  transition: all 0.2s;
}

.type-toggle button.active {
  background: #8b4513;
  color: #fff;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 15px;
  font-weight: bold;
  color: #5c3317;
}

.required { color: #d32f2f; }

.field select,
.field input {
  padding: 9px 12px;
  font-size: 16px;
  border: 2px solid #d4a574;
  border-radius: 6px;
  font-family: inherit;
  background: #fff;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 18px;
}

.btn-submit {
  padding: 10px 32px;
  font-size: 17px;
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-submit:not(:disabled):hover {
  background: #3e9142;
}

.btn-cancel {
  padding: 10px 24px;
  font-size: 17px;
  background: #999;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.form-hint {
  text-align: center;
  color: #999;
  font-size: 13px;
  margin: 12px 0 0 0;
}
</style>

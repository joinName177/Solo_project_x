<template>
  <Modal :model-value="modelValue" title="🧑‍🔧 手艺人入驻" wide @update:model-value="$emit('update:modelValue', $event)">
    <form class="craft-form" @submit.prevent="handleSubmit">
      <!-- 姓名 -->
      <div class="form-group">
        <label class="form-label">姓名 <span class="required">*</span></label>
        <input
          v-model="form.name"
          type="text"
          class="form-input"
          placeholder="请输入您的姓名"
          maxlength="20"
          required
        />
      </div>

      <!-- 手艺类型 -->
      <div class="form-group">
        <label class="form-label">手艺类型 <span class="required">*</span></label>
        <div class="type-grid">
          <button
            v-for="type in craftTypes"
            :key="type.key"
            type="button"
            class="type-option"
            :class="{ selected: form.craftType === type.key }"
            @click="form.craftType = type.key"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-label">{{ type.label }}</span>
          </button>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="form-group">
        <label class="form-label">联系电话 <span class="required">*</span></label>
        <input
          v-model="form.phone"
          type="tel"
          class="form-input"
          placeholder="请输入手机号码"
          maxlength="15"
          required
        />
      </div>

      <!-- 服务范围 -->
      <div class="form-group">
        <label class="form-label">服务范围（村庄） <span class="required">*</span></label>
        <div class="village-tags">
          <button
            v-for="v in villages"
            :key="v"
            type="button"
            class="village-tag"
            :class="{ selected: form.serviceArea.includes(v) }"
            @click="toggleVillage(v)"
          >
            {{ v }}
          </button>
        </div>
        <div class="custom-village">
          <input
            v-model="customVillage"
            type="text"
            class="form-input form-input-sm"
            placeholder="添加其他村庄"
            @keyup.enter.prevent="addCustomVillage"
          />
          <button type="button" class="btn btn-sm btn-outline" @click="addCustomVillage">添加</button>
        </div>
      </div>

      <!-- 收费标准 -->
      <div class="form-group">
        <label class="form-label">收费标准参考 <span class="required">*</span></label>
        <textarea
          v-model="form.pricing"
          class="form-input form-textarea"
          rows="2"
          placeholder="如：修水电50元起、做一套桌椅300元"
          required
        ></textarea>
      </div>

      <!-- 简介 -->
      <div class="form-group">
        <label class="form-label">个人简介</label>
        <textarea
          v-model="form.description"
          class="form-input form-textarea"
          rows="2"
          placeholder="介绍您的手艺经验、从业年限等（选填）"
          maxlength="200"
        ></textarea>
      </div>

      <!-- 作品照片上传 -->
      <div class="form-group">
        <label class="form-label">作品照片（可选，最多3张）</label>
        <div class="photo-upload">
          <div
            v-for="(photo, idx) in form.photos"
            :key="idx"
            class="photo-preview"
          >
            <img :src="photo" alt="作品预览" />
            <button type="button" class="photo-remove" @click="removePhoto(idx)">&times;</button>
          </div>
          <label v-if="form.photos.length < 3" class="photo-add">
            <input type="file" accept="image/*" @change="handlePhotoUpload" hidden />
            <span>+<br>上传照片</span>
          </label>
        </div>
      </div>

      <!-- 错误提示 -->
      <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>

      <!-- 提交按钮 -->
      <div class="form-actions">
        <button type="button" class="btn btn-outline" @click="close">取消</button>
        <button type="submit" class="btn btn-primary" :disabled="!isValid">确认入驻</button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import Modal from '../common/Modal.vue'
import { CRAFT_TYPES, DEFAULT_VILLAGES } from '../../utils/constants'
import { isValidBase64Image } from '../../utils/helpers'

defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const craftTypes = CRAFT_TYPES
const villages = DEFAULT_VILLAGES
const customVillage = ref('')
const errorMsg = ref('')

const form = reactive({
  name: '',
  craftType: '',
  phone: '',
  serviceArea: [],
  pricing: '',
  photos: [],
  description: ''
})

const isValid = computed(() => {
  return form.name.trim() && form.craftType && form.phone.trim() && form.serviceArea.length > 0 && form.pricing.trim()
})

function toggleVillage(village) {
  const idx = form.serviceArea.indexOf(village)
  if (idx === -1) {
    form.serviceArea.push(village)
  } else {
    form.serviceArea.splice(idx, 1)
  }
}

function addCustomVillage() {
  const name = customVillage.value.trim()
  if (!name) return
  if (form.serviceArea.includes(name)) {
    customVillage.value = ''
    return
  }
  form.serviceArea.push(name)
  customVillage.value = ''
}

function handlePhotoUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    errorMsg.value = '图片大小不能超过 2MB'
    return
  }

  const reader = new FileReader()
  reader.onload = (ev) => {
    const base64 = ev.target.result
    if (isValidBase64Image(base64)) {
      form.photos.push(base64)
      errorMsg.value = ''
    } else {
      errorMsg.value = '图片格式不正确'
    }
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

function removePhoto(idx) {
  form.photos.splice(idx, 1)
}

function resetForm() {
  form.name = ''
  form.craftType = ''
  form.phone = ''
  form.serviceArea = []
  form.pricing = ''
  form.photos = []
  form.description = ''
  errorMsg.value = ''
}

function handleSubmit() {
  if (!isValid.value) {
    errorMsg.value = '请填写所有必填项'
    return
  }
  emit('submit', { ...form })
  resetForm()
  emit('update:modelValue', false)
}

function close() {
  resetForm()
  emit('update:modelValue', false)
}
</script>

<style scoped>
.craft-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.form-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #5d4037;
}
.required {
  color: #e74c3c;
}
.form-input {
  padding: 0.55rem 0.75rem;
  border: 1.5px solid #e0d5c1;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #4e342e;
  background: #fffdf7;
  transition: border-color 0.2s;
  outline: none;
}
.form-input:focus {
  border-color: #e67e22;
  box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
}
.form-input-sm {
  padding: 0.35rem 0.6rem;
  font-size: 0.82rem;
  flex: 1;
}
.form-textarea {
  resize: vertical;
  min-height: 50px;
  font-family: inherit;
}
.type-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.4rem;
}
.type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0.5rem 0.25rem;
  border: 1.5px solid #e0d5c1;
  border-radius: 8px;
  background: #fffdf7;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.78rem;
  color: #5d4037;
}
.type-option:hover {
  border-color: #e67e22;
}
.type-option.selected {
  border-color: #e67e22;
  background: #fef5e7;
  color: #d35400;
  font-weight: 600;
}
.type-icon {
  font-size: 1.3rem;
}
.village-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.village-tag {
  padding: 3px 10px;
  border: 1px solid #e0d5c1;
  border-radius: 14px;
  background: #fffdf7;
  cursor: pointer;
  font-size: 0.8rem;
  color: #5d4037;
  transition: all 0.2s;
}
.village-tag.selected {
  background: #e67e22;
  color: #fff;
  border-color: #e67e22;
}
.custom-village {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.35rem;
}
.photo-upload {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.photo-preview {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e0d5c1;
}
.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.photo-remove {
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}
.photo-add {
  width: 80px;
  height: 80px;
  border: 2px dashed #d0c5b1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.7rem;
  color: #8d6e63;
  text-align: center;
  transition: all 0.2s;
}
.photo-add:hover {
  border-color: #e67e22;
  color: #e67e22;
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
  padding-top: 0.5rem;
}
</style>

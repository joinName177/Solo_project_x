<template>
  <div class="uploader">
    <!-- 上传区域 -->
    <div
      class="uploader__zone"
      :class="{ 'uploader__zone--has-image': imagePreview }"
      @click="triggerFileInput"
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="handleDrop"
    >
      <template v-if="!imagePreview">
        <div class="uploader__placeholder">
          <span class="uploader__icon">📸</span>
          <p class="uploader__text">点击或拖拽上传叶片照片</p>
          <p class="uploader__hint">支持 JPG / PNG / WebP，最大 20MB</p>
        </div>
      </template>
      <img v-else :src="imagePreview" class="uploader__preview" alt="叶片预览" />

      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="uploader__input"
        @change="onFileChange"
      />
    </div>

    <!-- 操作按钮 -->
    <div class="uploader__actions" v-if="imagePreview">
      <BigButton variant="accent" :loading="isAnalyzing" @click="$emit('analyze')" block>
        🔬 开始分析
      </BigButton>
      <BigButton variant="outline" @click="clearImage" block>
        🔄 重新上传
      </BigButton>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="uploader__error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BigButton from '@/components/common/BigButton.vue'

const props = defineProps({
  imagePreview: { type: String, default: null },
  isAnalyzing: { type: Boolean, default: false },
  error: { type: String, default: null }
})

const emit = defineEmits(['file-selected', 'analyze'])

const fileInput = ref(null)
const dragOver = ref(false)

function triggerFileInput() {
  if (props.isAnalyzing) return
  fileInput.value?.click()
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (file) emit('file-selected', file)
  // 重置input以允许重复选择同一文件
  e.target.value = ''
}

function handleDrop(e) {
  dragOver.value = false
  const file = e.dataTransfer.files?.[0]
  if (file) emit('file-selected', file)
}

function clearImage() {
  emit('file-selected', null)
}
</script>

<style scoped>
.uploader { display: flex; flex-direction: column; gap: var(--space-md); }

.uploader__zone {
  border: 3px dashed var(--color-border);
  border-radius: var(--radius-lg);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  background: var(--color-surface);
  overflow: hidden;
}
.uploader__zone:hover { border-color: var(--color-accent); background: #F1F8E9; }
.uploader__zone--has-image { border-style: solid; border-color: var(--color-accent); }

.uploader__input { display: none; }

.uploader__placeholder {
  text-align: center;
  padding: var(--space-xl);
}
.uploader__icon { font-size: 3rem; display: block; margin-bottom: var(--space-md); }
.uploader__text { font-size: var(--font-lg); font-weight: 600; color: var(--color-soil-dark); }
.uploader__hint { font-size: var(--font-sm); color: var(--color-text-light); margin-top: var(--space-sm); }

.uploader__preview {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.uploader__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.uploader__error {
  background: #FFF3E0;
  color: var(--color-rust);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  font-weight: 600;
  text-align: center;
}
</style>

<template>
  <div class="analyzer">
    <h2 class="section-title">病害识别</h2>

    <!-- 模式切换 -->
    <div class="mode-tabs">
      <button
        class="mode-tab"
        :class="{ 'mode-tab--active': activeTab === 'image' }"
        @click="activeTab = 'image'"
      >
        📸 图像识别
      </button>
      <button
        class="mode-tab"
        :class="{ 'mode-tab--active': activeTab === 'symptom' }"
        @click="activeTab = 'symptom'"
      >
        🔍 症状匹配
      </button>
    </div>

    <!-- 图像识别面板 -->
    <div v-if="activeTab === 'image'">
      <ImageUploader
        :image-preview="imageAnalysis.imagePreview.value"
        :is-analyzing="imageAnalysis.isAnalyzing.value"
        :error="imageAnalysis.error.value"
        @file-selected="onFileSelected"
        @analyze="onAnalyzeImage"
      />

      <AnalysisResult
        :result="imageAnalysis.analysisResult.value"
        @save-to-diary="onSaveImageResult"
      />
    </div>

    <!-- 症状匹配面板 -->
    <div v-if="activeTab === 'symptom'">
      <SymptomSelector
        :crops="cropList"
        :selected-crop-id="symptomMatch.selectedCropId.value"
        :selected-symptoms="symptomMatch.selectedSymptoms.value"
        :match-results="symptomMatch.matchResults.value"
        :symptom-types="symptomMatch.symptomTypes"
        @select-crop="symptomMatch.selectCrop"
        @toggle-symptom="symptomMatch.toggleSymptom"
        @save-to-diary="onSaveSymptomResult"
      />
    </div>

    <!-- 保存成功提示 -->
    <div v-if="saveNotice" class="save-notice animate-fade-in">✅ {{ saveNotice }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useImageAnalysis } from '@/composables/useImageAnalysis'
import { useSymptomMatch } from '@/composables/useSymptomMatch'
import { useFarmDiary } from '@/composables/useFarmDiary'
import ImageUploader from '@/components/analyzer/ImageUploader.vue'
import AnalysisResult from '@/components/analyzer/AnalysisResult.vue'
import SymptomSelector from '@/components/analyzer/SymptomSelector.vue'
import { crops as cropList, getCropById } from '@/data/crops'

const route = useRoute()
const activeTab = ref(route.query.tab === 'symptom' ? 'symptom' : 'image')

watch(() => route.query.tab, (val) => {
  if (val === 'symptom') activeTab.value = 'symptom'
})

const imageAnalysis = useImageAnalysis()
const symptomMatch = useSymptomMatch()
const diary = useFarmDiary()
const saveNotice = ref(null)

async function onFileSelected(file) {
  if (!file) {
    imageAnalysis.reset()
    return
  }
  await imageAnalysis.loadImage(file)
}

async function onAnalyzeImage() {
  await imageAnalysis.analyze()
}

async function onSaveImageResult(match) {
  const thumbnail = await imageAnalysis.getThumbnail()
  diary.addEntry({
    cropId: match.disease.cropId,
    cropName: getCropName(match.disease.cropId),
    diseaseName: match.disease.name,
    method: 'image',
    notes: '',
    image: thumbnail,
    date: new Date().toISOString().split('T')[0]
  })
  showNotice(`${match.disease.name} 已保存到农田日记`)
}

function onSaveSymptomResult(match) {
  diary.addEntry({
    cropId: symptomMatch.selectedCropId.value,
    cropName: symptomMatch.selectedCrop.value?.name || '',
    diseaseName: match.disease.name,
    method: 'symptom',
    notes: '',
    image: null,
    date: new Date().toISOString().split('T')[0]
  })
  showNotice(`${match.disease.name} 已保存到农田日记`)
}

function showNotice(msg) {
  saveNotice.value = msg
  setTimeout(() => { saveNotice.value = null }, 3000)
}

function getCropName(cropId) {
  return getCropById(cropId)?.name || cropId
}
</script>

<style scoped>
.analyzer { display: flex; flex-direction: column; gap: var(--space-lg); }

.mode-tabs {
  display: flex;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 4px;
  box-shadow: var(--shadow-sm);
}

.mode-tab {
  flex: 1;
  padding: var(--space-md);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: var(--font-md);
  transition: all 0.2s;
  color: var(--color-text-light);
}
.mode-tab--active {
  background: var(--color-soil);
  color: #FFF;
  box-shadow: var(--shadow-sm);
}

.save-notice {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-soil-dark);
  color: #FFF;
  padding: var(--space-md) var(--space-xl);
  border-radius: 30px;
  font-weight: 700;
  z-index: 200;
  box-shadow: var(--shadow-lg);
  white-space: nowrap;
}
</style>

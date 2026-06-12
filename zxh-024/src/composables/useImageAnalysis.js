/**
 * 图像分析 Composable
 *
 * 封装图像上传、Canvas像素分析和病害匹配的响应式状态。
 * 协调 imageAnalyzer 工具函数与 Vue 响应式系统之间的交互。
 */

import { ref, computed } from 'vue'
import { analyzeDiseaseFromImage, createThumbnail } from '@/utils/imageAnalyzer'

export function useImageAnalysis() {
  const imageFile = ref(null)
  const imagePreview = ref(null)      // base64预览
  const isAnalyzing = ref(false)
  const analysisResult = ref(null)    // { analysis, matches }
  const error = ref(null)

  const hasResult = computed(() => analysisResult.value !== null)
  const topMatch = computed(() => {
    if (!analysisResult.value?.matches?.length) return null
    return analysisResult.value.matches[0]
  })

  /**
   * 加载并预览图像文件
   * @param {File} file
   */
  async function loadImage(file) {
    error.value = null
    analysisResult.value = null

    if (!file.type.startsWith('image/')) {
      error.value = '请选择图片文件（JPG/PNG/WebP）'
      return false
    }

    if (file.size > 20 * 1024 * 1024) {
      error.value = '图片大小超过20MB，请压缩后重试'
      return false
    }

    imageFile.value = file
    imagePreview.value = await readFileAsDataURL(file)
    return true
  }

  /**
   * 执行图像分析
   */
  async function analyze() {
    if (!imagePreview.value) {
      error.value = '请先上传图片'
      return
    }

    isAnalyzing.value = true
    error.value = null

    try {
      const img = await loadImageElement(imagePreview.value)
      const result = await analyzeDiseaseFromImage(img)
      analysisResult.value = result
    } catch (e) {
      error.value = '图像分析失败：' + e.message
      console.error('分析失败:', e)
    } finally {
      isAnalyzing.value = false
    }
  }

  /**
   * 创建缩略图用于存储
   * @returns {Promise<string|null>}
   */
  async function getThumbnail() {
    if (!imagePreview.value) return null
    try {
      const img = await loadImageElement(imagePreview.value)
      return await createThumbnail(img)
    } catch {
      return null
    }
  }

  /**
   * 重置状态
   */
  function reset() {
    imageFile.value = null
    imagePreview.value = null
    isAnalyzing.value = false
    analysisResult.value = null
    error.value = null
  }

  return {
    imageFile,
    imagePreview,
    isAnalyzing,
    analysisResult,
    error,
    hasResult,
    topMatch,
    loadImage,
    analyze,
    getThumbnail,
    reset
  }
}

// ---- 内部辅助 ----

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('图片加载失败'))
    img.src = src
  })
}

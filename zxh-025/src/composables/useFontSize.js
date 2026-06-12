/**
 * 字体大小调节 composable
 * 职责：全局字体大小状态，同步到 document.documentElement 和 localStorage
 */
import { ref, watch } from 'vue'
import { loadFontSize, saveFontSize } from '../utils/storage.js'
import { FONT_SIZE_MIN, FONT_SIZE_MAX, FONT_SIZE_DEFAULT } from '../utils/constants.js'

const fontSize = ref(FONT_SIZE_DEFAULT)
let initialized = false

function init() {
  if (initialized) return
  const saved = loadFontSize()
  if (saved !== null) {
    fontSize.value = saved
  }
  applyFontSize(fontSize.value)
  initialized = true
}

function applyFontSize(size) {
  document.documentElement.style.fontSize = size + 'px'
}

watch(fontSize, val => {
  applyFontSize(val)
  saveFontSize(val)
})

function increase() {
  if (fontSize.value < FONT_SIZE_MAX) {
    fontSize.value++
  }
}

function decrease() {
  if (fontSize.value > FONT_SIZE_MIN) {
    fontSize.value--
  }
}

function reset() {
  fontSize.value = FONT_SIZE_DEFAULT
}

export function useFontSize() {
  init()
  return {
    fontSize,
    increase,
    decrease,
    reset,
    min: FONT_SIZE_MIN,
    max: FONT_SIZE_MAX,
  }
}

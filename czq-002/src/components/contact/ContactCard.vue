<template>
  <Teleport to="body">
    <div class="contact-overlay" v-if="visible" @click.self="$emit('close')">
      <div class="contact-card" ref="cardRef">
        <div class="card-inner">
          <div class="card-watermark">🏘️ 村委会农机信息板</div>

          <h2 class="card-title">{{ cardData.title }}</h2>

          <table class="card-table">
            <tr v-for="field in cardData.fields" :key="field.label">
              <td class="t-label">{{ field.label }}</td>
              <td class="t-value">{{ field.value }}</td>
            </tr>
          </table>

          <div class="card-footer">
            <p class="footer-text">
              📍 此信息来自村级农机租赁共享信息板<br />
              <small>信息仅供参考，交易请自行核实</small>
            </p>
          </div>
        </div>

        <div class="card-actions-bar">
          <button class="btn-close" @click="$emit('close')">✕ 关闭</button>
          <button class="btn-screenshot" @click="captureScreenshot">
            📸 截图保存
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { generateContactCard } from '../../core/contactCard.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  item: { type: Object, default: null }
})

defineEmits(['close'])

const cardRef = ref(null)

const cardData = computed(() => {
  if (!props.item) return { title: '', fields: [] }
  return generateContactCard(props.item)
})

/** 截图功能 — 使用 html2canvas 的简化替代方案 */
async function captureScreenshot() {
  // 尝试使用浏览器原生 API
  if (typeof html2canvas !== 'undefined') {
    try {
      const canvas = await html2canvas(cardRef.value, { backgroundColor: '#fffef5' })
      downloadImage(canvas)
      return
    } catch { /* 回退到提示 */ }
  }

  // 回退方案：提示用户使用浏览器截图
  alert('📸 请使用浏览器截图工具截图保存：\n\nWindows: Win + Shift + S\nMac: Cmd + Shift + 4\n\n或在弹窗上右键选择"截图"')
}

function downloadImage(canvas) {
  const link = document.createElement('a')
  link.download = `农机联系卡片_${Date.now()}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.contact-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.contact-card {
  background: #fffef5;
  border: 4px solid #8b4513;
  border-radius: 12px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.card-inner {
  padding: 28px 24px 20px;
  position: relative;
}

.card-watermark {
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 13px;
  color: #d4a574;
  opacity: 0.7;
}

.card-title {
  text-align: center;
  font-size: 24px;
  color: #8b4513;
  margin: 0 0 24px 0;
  padding-bottom: 14px;
  border-bottom: 3px double #d4a574;
}

.card-table {
  width: 100%;
  border-collapse: collapse;
}

.card-table tr {
  border-bottom: 1px dashed #d4a574;
}

.card-table tr:last-child {
  border-bottom: none;
}

.t-label {
  padding: 10px 8px;
  font-size: 15px;
  color: #8b4513;
  font-weight: bold;
  white-space: nowrap;
  width: 90px;
  vertical-align: top;
}

.t-value {
  padding: 10px 8px;
  font-size: 17px;
  color: #333;
  font-weight: 500;
}

.card-footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 2px dashed #d4a574;
  text-align: center;
}

.footer-text {
  font-size: 14px;
  color: #999;
  line-height: 1.8;
  margin: 0;
}

.card-actions-bar {
  display: flex;
  gap: 10px;
  padding: 12px 24px 16px;
  justify-content: center;
  border-top: 1px solid #d4a574;
}

.btn-close {
  padding: 10px 24px;
  font-size: 16px;
  background: #999;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-screenshot {
  padding: 10px 24px;
  font-size: 16px;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-screenshot:hover {
  background: #1976d2;
}
</style>

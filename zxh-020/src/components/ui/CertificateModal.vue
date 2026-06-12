<template>
  <div class="cert-overlay" @click.self="$emit('close')">
    <div class="cert-card">
      <div class="cert-header">
        <h2>🏅 城市文明贡献证书</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="cert-preview">
        <canvas ref="canvasRef" class="cert-canvas"></canvas>
      </div>

      <div class="cert-actions">
        <div class="name-input-area">
          <label>您的名字：</label>
          <input
            v-model="playerName"
            type="text"
            placeholder="请输入名字（可选）"
            maxlength="20"
            class="name-input"
          />
        </div>
        <button class="btn-download" @click="download">
          💾 下载证书图片
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { generateCertificate, downloadCertificate } from '../../utils/certificate.js'

const props = defineProps({
  score: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  specialHandled: { type: Number, required: true },
  sceneName: { type: String, required: true },
})

defineEmits(['close'])

const playerName = ref('')
const canvasRef = ref(null)
const certUrl = ref(null)

async function renderCertificate() {
  if (!canvasRef.value) return
  const url = await generateCertificate({
    playerName: playerName.value || '文明使者',
    score: props.score,
    bikesParked: props.correctCount,
    specialHandled: props.specialHandled,
    sceneName: props.sceneName,
    date: new Date(),
  })

  // 将生成的图片绘制到预览 canvas 上
  const img = new Image()
  img.onload = () => {
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
  }
  img.src = url
  certUrl.value = url
}

function download() {
  if (certUrl.value) {
    downloadCertificate(certUrl.value)
  }
}

watch(playerName, () => {
  renderCertificate()
})

onMounted(() => {
  renderCertificate()
})
</script>

<style scoped>
.cert-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.cert-card {
  background: #1e293b;
  border: 2px solid rgba(200, 164, 92, 0.4);
  border-radius: 20px;
  padding: 24px;
  max-width: 640px;
  width: 95%;
  color: #fff;
  max-height: 90vh;
  overflow-y: auto;
}

.cert-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.cert-header h2 {
  margin: 0;
  font-size: 20px;
  color: #ffd54f;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cert-preview {
  text-align: center;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.cert-canvas {
  max-width: 100%;
  height: auto;
}

.cert-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.name-input-area {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name-input-area label {
  font-size: 14px;
  color: #ccc;
  white-space: nowrap;
}

.name-input {
  flex: 1;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 14px;
  outline: none;
}

.name-input:focus {
  border-color: #c8a45c;
}

.btn-download {
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #c8a45c, #a08040);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(200, 164, 92, 0.4);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

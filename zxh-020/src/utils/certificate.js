/**
 * 城市文明贡献证书生成器
 * 使用 Canvas API 生成证书图片，支持下载
 */

/**
 * 生成证书图片并触发下载
 * @param {object} data - 证书数据
 * @param {string} data.playerName - 玩家名称
 * @param {number} data.score - 最终得分
 * @param {number} data.bikesParked - 正确摆放数量
 * @param {number} data.specialHandled - 特殊事件处理数
 * @param {string} data.sceneName - 场景名称
 * @param {Date} data.date - 日期
 */
export function generateCertificate(data) {
  const width = 800
  const height = 560
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  // 背景
  ctx.fillStyle = '#fffef5'
  ctx.fillRect(0, 0, width, height)

  // 外边框
  ctx.strokeStyle = '#c8a45c'
  ctx.lineWidth = 8
  ctx.strokeRect(20, 20, width - 40, height - 40)

  // 内边框
  ctx.strokeStyle = '#d4b896'
  ctx.lineWidth = 2
  ctx.strokeRect(35, 35, width - 70, height - 70)

  // 顶部装饰
  ctx.fillStyle = '#c8a45c'
  ctx.fillRect(40, 40, width - 80, 6)

  // 标题
  ctx.fillStyle = '#5c3d2e'
  ctx.font = 'bold 36px "KaiTi", "STKaiti", "楷体", serif'
  ctx.textAlign = 'center'
  ctx.fillText('城市文明贡献证书', width / 2, 130)

  // 英文副标题
  ctx.fillStyle = '#a08060'
  ctx.font = '16px "Georgia", serif'
  ctx.fillText('CITY CIVILIZATION CONTRIBUTION CERTIFICATE', width / 2, 160)

  // 分隔线
  ctx.strokeStyle = '#d4b896'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(150, 180)
  ctx.lineTo(650, 180)
  ctx.stroke()

  // 证书内容
  ctx.fillStyle = '#4a3520'
  ctx.font = '20px "KaiTi", "STKaiti", "楷体", serif'
  ctx.textAlign = 'center'

  const playerName = data.playerName || '文明使者'
  const lines = [
    `兹证明 ${playerName} 在"共享单车摆放大师"活动中，`,
    `于${data.sceneName}场景中积极参与城市文明建设，`,
    `共计规范摆放共享单车 ${data.bikesParked} 辆，`,
    `处理违规停放 ${data.specialHandled} 起，`,
    `获得文明积分 ${data.score} 分。`,
    ``,
    `特发此证，以资鼓励！`,
    `感谢您为城市文明做出的贡献。`,
  ]

  let yPos = 220
  for (const line of lines) {
    if (line === '') {
      yPos += 16
      continue
    }
    ctx.fillText(line, width / 2, yPos)
    yPos += 34
  }

  // 日期
  ctx.fillStyle = '#6b5a4b'
  ctx.font = '18px "KaiTi", "STKaiti", "楷体", serif'
  const dateStr = data.date
    ? new Date(data.date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  ctx.fillText(dateStr, width / 2, yPos + 20)

  // 印章效果（右下角圆形）
  const sealX = width - 160
  const sealY = height - 140
  ctx.save()
  ctx.fillStyle = 'rgba(200, 50, 50, 0.75)'
  ctx.beginPath()
  ctx.arc(sealX, sealY, 55, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
  ctx.font = 'bold 16px "KaiTi", "STKaiti", "楷体", serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('城市文明', sealX, sealY - 8)
  ctx.fillText('管理委员会', sealX, sealY + 16)
  ctx.restore()

  // 底部装饰
  ctx.fillStyle = '#c8a45c'
  ctx.fillRect(40, height - 46, width - 80, 6)

  // 转换为下载链接
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      resolve(url)
    }, 'image/png')
  })
}

/**
 * 触发证书下载
 * @param {string} url - blob URL
 * @param {string} filename - 文件名
 */
export function downloadCertificate(url, filename = '城市文明贡献证书.png') {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

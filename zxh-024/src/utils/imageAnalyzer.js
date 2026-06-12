/**
 * 图像分析模块（纯函数）
 *
 * 通过Canvas API对上传的作物叶片图像进行本地像素分析，
 * 提取颜色特征、纹理特征，用于病害初步判断。
 * 所有处理均在浏览器本地完成，不上传服务器。
 */

import { diseases } from '@/data/diseases'

// ---- 颜色空间转换 ----

/** RGB转HSL */
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

/** 计算两颜色之间的欧几里得距离（RGB空间） */
function colorDistance(c1, c2) {
  return Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2)
}

// ---- 像素采样 ----

/**
 * 从Canvas上下文中采样像素数据
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {number} sampleStep - 采样步长（每N个像素采1个）
 * @returns {{r:number,g:number,b:number}[]}
 */
function samplePixels(ctx, width, height, sampleStep = 4) {
  const imageData = ctx.getImageData(0, 0, width, height)
  const pixels = []
  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4
      pixels.push({
        r: imageData.data[idx],
        g: imageData.data[idx + 1],
        b: imageData.data[idx + 2]
      })
    }
  }
  return pixels
}

// ---- 颜色特征提取 ----

/**
 * 提取颜色直方图（简化版，按色相分区）
 * @param {{r:number,g:number,b:number}[]} pixels
 * @returns {Array<{hueRange:string, count:number, percentage:number}>}
 */
function extractColorHistogram(pixels) {
  const bins = {
    'red': 0, 'orange': 0, 'yellow': 0,
    'green': 0, 'cyan': 0, 'blue': 0, 'purple': 0,
    'brown': 0, 'gray': 0
  }
  pixels.forEach(p => {
    const hsl = rgbToHsl(p.r, p.g, p.b)
    if (hsl.s < 15) { bins['gray']++; return }
    if (hsl.h < 20 || hsl.h >= 340) bins['red']++
    else if (hsl.h < 45) bins['orange']++
    else if (hsl.h < 70) bins['yellow']++
    else if (hsl.h < 155) bins['green']++
    else if (hsl.h < 190) bins['cyan']++
    else if (hsl.h < 255) bins['blue']++
    else if (hsl.h < 305) bins['purple']++
    else bins['red']++
  })
  // 将接近褐色的低明度橙/黄归入brown
  const total = pixels.length
  return Object.entries(bins).map(([hueRange, count]) => ({
    hueRange,
    count,
    percentage: Math.round((count / total) * 100)
  }))
}

/**
 * 检测颜色异常区域百分比
 * 健康叶片以绿色为主，病害区域呈现黄/褐/灰/白等异常色
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @returns {{healthyPercent:number, diseasedPercent:number}}
 */
function detectColorAnomaly(ctx, width, height) {
  const pixels = samplePixels(ctx, width, height, 6)
  let healthy = 0, diseased = 0
  pixels.forEach(p => {
    const hsl = rgbToHsl(p.r, p.g, p.b)
    // 绿色区间视为健康
    if (hsl.h >= 70 && hsl.h <= 155 && hsl.s > 15 && hsl.l > 15 && hsl.l < 85) {
      healthy++
    } else if (hsl.s > 10) {
      diseased++
    }
  })
  const total = healthy + diseased || 1
  return {
    healthyPercent: Math.round((healthy / total) * 100),
    diseasedPercent: Math.round((diseased / total) * 100)
  }
}

/**
 * 简易纹理分析 - 基于局部方差
 * 检测叶面是否有斑点、斑块等不规则纹理
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @returns {{textureType:string, roughness:number}}
 */
function analyzeTexture(ctx, width, height) {
  const blockSize = 16
  const blocksX = Math.floor(width / blockSize)
  const blocksY = Math.floor(height / blockSize)
  const blockVariances = []

  for (let by = 0; by < Math.min(blocksY, 20); by++) {
    for (let bx = 0; bx < Math.min(blocksX, 20); bx++) {
      const x = bx * blockSize
      const y = by * blockSize
      const imageData = ctx.getImageData(x, y, blockSize, blockSize)
      const grays = []
      for (let i = 0; i < imageData.data.length; i += 4) {
        grays.push(0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2])
      }
      const mean = grays.reduce((a, b) => a + b, 0) / grays.length
      const variance = grays.reduce((s, v) => s + (v - mean) ** 2, 0) / grays.length
      blockVariances.push(variance)
    }
  }

  const avgVariance = blockVariances.reduce((a, b) => a + b, 0) / (blockVariances.length || 1)
  const textureType = avgVariance > 3000 ? 'spotted/rough' : avgVariance > 1500 ? 'mottled' : 'smooth'

  return { textureType, roughness: Math.round(avgVariance) }
}

// ---- 核心匹配算法 ----

/**
 * 分析上传的图像，匹配最可能的病害
 * @param {HTMLImageElement} img
 * @returns {Promise<{analysis:{colorHistogram:object[], anomaly:{healthyPercent:number,diseasedPercent:number}, texture:{textureType:string,roughness:number}}, matches:Array}>}
 */
export async function analyzeDiseaseFromImage(img) {
  // 创建Canvas进行像素分析
  const canvas = document.createElement('canvas')
  const maxSize = 600
  const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1)
  canvas.width = img.width * ratio
  canvas.height = img.height * ratio
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  // 特征提取
  const pixels = samplePixels(ctx, canvas.width, canvas.height)
  const colorHistogram = extractColorHistogram(pixels)
  const anomaly = detectColorAnomaly(ctx, canvas.width, canvas.height)
  const texture = analyzeTexture(ctx, canvas.width, canvas.height)

  // 与病害库匹配
  const matches = matchDiseaseProfile(colorHistogram, anomaly, texture)

  return {
    analysis: {
      colorHistogram,
      anomaly,
      texture
    },
    matches
  }
}

/**
 * 将图像分析结果与病害库中的颜色特征进行匹配
 * @param {object[]} colorHistogram
 * @param {object} anomaly
 * @param {object} texture
 * @returns {Array<{disease:object, score:number, matchDetails:string}>}
 */
function matchDiseaseProfile(colorHistogram, anomaly, texture) {
  const results = diseases.map(disease => {
    let score = 0
    const details = []

    // 1. 颜色异常程度匹配
    const profile = disease.imageProfile
    if (profile.colorDeviation === 'high' && anomaly.diseasedPercent > 30) {
      score += 30
      details.push('病变区域与病害特征高度吻合')
    } else if (profile.colorDeviation === 'medium' && anomaly.diseasedPercent > 15) {
      score += 20
      details.push('病变区域与病害特征中度吻合')
    } else if (anomaly.diseasedPercent > 10) {
      score += 10
      details.push('检测到一定程度的病变区域')
    }

    // 2. 颜色分布匹配
    const nonGreenPercent = colorHistogram
      .filter(h => h.hueRange !== 'green' && h.hueRange !== 'cyan')
      .reduce((s, h) => s + h.percentage, 0)

    // 褐色/黄色占比高 → 斑点/枯焦类病害
    const brownYellowPercent = colorHistogram
      .filter(h => ['brown', 'yellow', 'orange'].includes(h.hueRange))
      .reduce((s, h) => s + h.percentage, 0)

    if (brownYellowPercent > 20 && profile.spotPattern !== 'powdery_coating') {
      score += 25
      details.push('褐色/黄色异常区域占比较高')
    }

    // 灰色/白色占比高 → 霉层/粉状病害
    const grayPercent = colorHistogram
      .filter(h => h.hueRange === 'gray')
      .reduce((s, c) => s + c.percentage, 0)

    if (grayPercent > 30 && ['powdery_coating', 'gray_fuzzy_mold'].includes(profile.spotPattern)) {
      score += 25
      details.push('灰色区域占比较高，可能存在霉层')
    }

    // 3. 纹理匹配
    if (texture.textureType === 'spotted/rough' && profile.spotPattern.includes('spot')) {
      score += 20
      details.push('叶片纹理呈斑点状')
    } else if (texture.textureType === 'mottled' && profile.spotPattern.includes('patch')) {
      score += 15
      details.push('叶片纹理呈斑驳状')
    } else if (texture.textureType === 'smooth' && profile.spotPattern === 'powdery_coating') {
      score += 15
      details.push('叶片表面光滑，但可能有粉状覆盖')
    }

    return {
      disease,
      score,
      matchDetails: details.length > 0 ? details.join('；') : '特征匹配度较低，建议结合症状进一步判断'
    }
  })

  // 过滤低分结果，按分数降序排列
  return results
    .filter(r => r.score >= 15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

/**
 * 从图片生成base64缩略图
 * @param {HTMLImageElement} img
 * @returns {Promise<string>} base64 data URL (JPEG, quality 0.5)
 */
export async function createThumbnail(img) {
  const canvas = document.createElement('canvas')
  const maxSize = 200
  const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1)
  canvas.width = img.width * ratio
  canvas.height = img.height * ratio
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.5)
}

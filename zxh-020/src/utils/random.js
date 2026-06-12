/**
 * 随机数工具函数
 */

/** 生成 [min, max) 范围内的随机浮点数 */
export function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

/** 生成 [min, max] 范围内的随机整数 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 根据权重对象随机选择一个键，返回该键 */
export function randomWeighted(weightMap) {
  const entries = Object.entries(weightMap)
  const totalWeight = entries.reduce((sum, [, w]) => sum + w, 0)
  let rand = Math.random() * totalWeight
  for (const [key, weight] of entries) {
    rand -= weight
    if (rand <= 0) return key
  }
  return entries[entries.length - 1][0]
}

/** 打乱数组（Fisher-Yates 洗牌） */
export function shuffle(arr) {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** 从数组中随机取一个元素 */
export function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

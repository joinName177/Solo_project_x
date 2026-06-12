/**
 * 碰撞检测工具
 * 用于判断单车是否被放置到停车框内
 */

/**
 * 矩形碰撞检测（点是否在矩形内）
 * @param {number} px - 点的 x 坐标
 * @param {number} py - 点的 y 坐标
 * @param {object} rect - { x, y, width, height }
 * @returns {boolean}
 */
export function isPointInRect(px, py, rect) {
  return (
    px >= rect.x &&
    px <= rect.x + rect.width &&
    py >= rect.y &&
    py <= rect.y + rect.height
  )
}

/**
 * 矩形重叠检测（两个矩形是否有交集）
 * @param {object} rectA - { x, y, width, height }
 * @param {object} rectB - { x, y, width, height }
 * @returns {boolean}
 */
export function isRectOverlap(rectA, rectB) {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  )
}

/**
 * 查找单车落入的停车框
 * @param {number} bikeX - 单车中心 x
 * @param {number} bikeY - 单车中心 y
 * @param {Array} parkingZones - 停车框列表
 * @returns {object|null} 匹配的停车框，或 null
 */
export function findParkingZone(bikeX, bikeY, parkingZones) {
  return parkingZones.find((zone) => isPointInRect(bikeX, bikeY, zone)) || null
}

/**
 * 判断单车是否在特殊区域（盲道/绿化带）内
 * @param {number} bikeX
 * @param {number} bikeY
 * @param {Array} specialZones
 * @returns {object|null}
 */
export function findSpecialZone(bikeX, bikeY, specialZones) {
  return specialZones.find((zone) => isPointInRect(bikeX, bikeY, zone)) || null
}

/**
 * 检查两个矩形是否太近（中心距离小于阈值）
 * @param {object} rectA
 * @param {object} rectB
 * @param {number} minDist - 最小中心距离
 * @returns {boolean}
 */
export function isTooClose(rectA, rectB, minDist = 60) {
  const cxA = rectA.x + rectA.width / 2
  const cyA = rectA.y + rectA.height / 2
  const cxB = rectB.x + rectB.width / 2
  const cyB = rectB.y + rectB.height / 2
  return Math.hypot(cxA - cxB, cyA - cyB) < minDist
}

/**
 * 特殊事件逻辑（违停举报）
 *
 * 职责：
 * - 在盲道/绿化带上随机生成违规停放单车
 * - 管理特殊事件的生命周期（定时触发、超时自动消失）
 * - 与计分模块协作处理积分
 */
import { ref } from 'vue'
import { randomRange, randomWeighted, randomPick } from '../utils/random.js'

// 游戏面板尺寸常量
const BOARD_WIDTH = 900
const BOARD_HEIGHT = 600
const BIKE_SIZE = 40
const SPECIAL_EVENT_TIMEOUT = 30000 // 30秒未处理则超时

export function useSpecialEvent(scoringRef, messageCallback) {
  const specialEventBike = ref(null)
  const specialEventActive = ref(false)
  const specialEventTimer = ref(null)

  let intervalId = null
  let bikeIdCounter = 0

  /**
   * 触发特殊事件：在随机特殊区域生成一辆违规单车
   * @param {object} scene - 当前场景配置
   */
  function trigger(scene) {
    if (!scene || specialEventActive.value) return null

    const zone = randomPick(scene.specialZones)
    if (!zone) return null

    specialEventActive.value = true
    const x = randomRange(zone.x, zone.x + zone.width - BIKE_SIZE)
    const y = randomRange(zone.y, zone.y + zone.height - BIKE_SIZE)
    const color = randomWeighted({ blue: 0.5, yellow: 0.5 })

    const bike = {
      id: ++bikeIdCounter,
      color,
      x: Math.max(0, Math.min(BOARD_WIDTH - BIKE_SIZE, x)),
      y: Math.max(0, Math.min(BOARD_HEIGHT - BIKE_SIZE, y)),
      placed: false,
      isSpecial: true,
      placedInZone: null,
      zoneType: zone.type,
    }

    specialEventBike.value = bike

    // 超时自动消失
    const timeoutId = setTimeout(() => {
      if (specialEventBike.value && !specialEventBike.value.placed) {
        if (scoringRef) {
          scoringRef.handlePlacement('wrong', true)
        }
        if (messageCallback) {
          messageCallback('⏰ 违停单车已超时，自动扣除10分', 'error')
        }
        specialEventBike.value = null
        specialEventActive.value = false
      }
    }, SPECIAL_EVENT_TIMEOUT)
    specialEventTimer.value = timeoutId

    // 发送提示消息
    const zoneLabel = zone.type === 'blind_lane' ? '盲道' : '绿化带'
    if (messageCallback) {
      messageCallback(
        `🚨 违停举报！有单车违规停放在${zoneLabel}上，请优先处理！（双倍积分）`,
        'warning'
      )
    }

    return bike
  }

  /**
   * 处理特殊单车被正确摆放
   */
  function handlePlaced() {
    clearTimer()
    specialEventBike.value = null
    specialEventActive.value = false
  }

  /**
   * 处理特殊单车被错误摆放（移除单车）
   */
  function handleFailed() {
    clearTimer()
    specialEventBike.value = null
    specialEventActive.value = false
  }

  /**
   * 启动定时触发
   * @param {object} scene - 当前场景
   */
  function startScheduler(scene) {
    stopScheduler()
    if (!scene) return
    intervalId = setInterval(() => {
      const bike = trigger(scene)
      if (bike && messageCallback) {
        // bike 需要通过外部机制添加到 bikes 列表
      }
    }, scene.specialEventInterval * 1000)
  }

  /**
   * 停止定时器
   */
  function stopScheduler() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function clearTimer() {
    if (specialEventTimer.value) {
      clearTimeout(specialEventTimer.value)
      specialEventTimer.value = null
    }
  }

  function reset() {
    stopScheduler()
    clearTimer()
    specialEventBike.value = null
    specialEventActive.value = false
  }

  return {
    specialEventBike,
    specialEventActive,
    trigger,
    handlePlaced,
    handleFailed,
    startScheduler,
    stopScheduler,
    reset,
  }
}

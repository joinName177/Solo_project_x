/**
 * 游戏核心状态管理
 *
 * 职责：
 * - 游戏阶段流转（start → playing → ending → ended）
 * - 单车生成与位置管理
 * - 场景切换与解锁检测
 * - 协调计时器、计分、特殊事件等子模块
 *
 * 设计原则：
 * - 子模块（timer, scoring, specialEvent）各自独立，通过接口协作
 * - 组件通过此模块获取状态和方法，不直接操作子模块
 */
import { ref, computed, watch } from 'vue'
import { SCENES, getUnlockedScenes } from '../data/scenes.js'
import { useTimer } from './useTimer.js'
import { useScoring } from './useScoring.js'
import { useSpecialEvent } from './useSpecialEvent.js'
import { findParkingZone } from '../utils/collision.js'
import { randomRange, randomWeighted } from '../utils/random.js'

// 游戏面板尺寸常量
const BOARD_WIDTH = 900
const BOARD_HEIGHT = 600
const BIKE_SIZE = 40

// 模块级共享状态（单例模式，确保所有组件共享同一状态）
const gamePhase = ref('start') // 'start' | 'playing' | 'ending' | 'ended'
const currentSceneId = ref('subway')
const bikes = ref([])
const unlockedScenes = ref(['subway'])
const newUnlock = ref(null)
const messageQueue = ref([])

let bikeIdCounter = 0
let timerInstance = null
let scoringInstance = null
let specialEventInstance = null

export function useGameState() {
  // 延迟初始化，确保单例
  if (!timerInstance) {
    timerInstance = useTimer()
    scoringInstance = useScoring()
    specialEventInstance = useSpecialEvent(scoringInstance, addMessage)
  }

  const timer = timerInstance
  const scoring = scoringInstance
  const specialEvent = specialEventInstance

  const currentScene = computed(() => SCENES[currentSceneId.value])

  // ========== 消息系统 ==========

  /** 添加浮动提示消息，3秒后自动消失 */
  function addMessage(text, type = 'info') {
    const id = Date.now() + Math.random()
    messageQueue.value.push({ id, text, type, timestamp: Date.now() })
    setTimeout(() => {
      messageQueue.value = messageQueue.value.filter((m) => m.id !== id)
    }, 3000)
  }

  // ========== 单车生成 ==========

  /**
   * 在游戏面板上生成一个不与已有元素重叠的随机位置
   */
  function generateBikePosition(existingBikes, scene) {
    const maxAttempts = 100
    for (let i = 0; i < maxAttempts; i++) {
      const x = randomRange(20, BOARD_WIDTH - BIKE_SIZE - 20)
      const y = randomRange(20, BOARD_HEIGHT - BIKE_SIZE - 20)

      // 不在停车框内生成
      const inParkingZone = scene.parkingZones.some(
        (z) =>
          x + BIKE_SIZE > z.x &&
          x < z.x + z.width &&
          y + BIKE_SIZE > z.y &&
          y < z.y + z.height
      )
      if (inParkingZone) continue

      // 不与其他单车重叠
      const overlaps = existingBikes.some(
        (b) => Math.abs(b.x - x) < BIKE_SIZE + 10 && Math.abs(b.y - y) < BIKE_SIZE + 10
      )
      if (overlaps) continue

      return { x, y }
    }
    return {
      x: randomRange(20, BOARD_WIDTH - BIKE_SIZE - 20),
      y: randomRange(20, BOARD_HEIGHT - BIKE_SIZE - 20),
    }
  }

  /** 根据场景配置生成初始单车列表 */
  function spawnBikes(scene) {
    const list = []
    for (let i = 0; i < scene.bikeCount; i++) {
      const color = randomWeighted(scene.bikeColors)
      const pos = generateBikePosition(list, scene)
      list.push({
        id: ++bikeIdCounter,
        color,
        x: pos.x,
        y: pos.y,
        placed: false,
        isSpecial: false,
        placedInZone: null,
      })
    }
    return list
  }

  // ========== 场景解锁 ==========

  function checkUnlocks() {
    const currentScore = scoring.score.value
    for (const scene of Object.values(SCENES)) {
      if (
        currentScore >= scene.unlockScore &&
        !unlockedScenes.value.includes(scene.id) &&
        scene.unlockScore > 0
      ) {
        unlockedScenes.value.push(scene.id)
        newUnlock.value = scene.name
        addMessage(`🎉 恭喜解锁新场景：${scene.name}！`, 'success')
      }
    }
  }

  // ========== 游戏流程控制 ==========

  /** 开始/重新开始游戏 */
  function startGame(sceneId) {
    const sceneIdToUse = sceneId || currentSceneId.value
    const scene = SCENES[sceneIdToUse]
    if (!scene) return false

    const unlockedList = getUnlockedScenes(scoring.score.value || 0)
    if (!unlockedList.find((s) => s.id === sceneIdToUse) && scene.unlockScore > 0) {
      return false
    }

    currentSceneId.value = sceneIdToUse
    scoring.reset()
    specialEvent.reset()
    gamePhase.value = 'playing'
    newUnlock.value = null

    bikes.value = spawnBikes(scene)
    timer.start(scene.gameDuration)
    specialEvent.startScheduler(scene)

    // 特殊事件触发时，将生成的单车添加到列表
    const originalTrigger = specialEvent.trigger
    specialEvent.trigger = (s) => {
      const bike = originalTrigger(s)
      if (bike) {
        bikes.value.push(bike)
      }
      return bike
    }

    watch(
      () => timer.isTimeUp.value,
      (timeUp) => {
        if (timeUp && gamePhase.value === 'playing') {
          endGame()
        }
      },
      { immediate: true }
    )

    return true
  }

  /** 处理单车放置 */
  function placeBike(bikeId, dropX, dropY) {
    if (gamePhase.value !== 'playing') return null

    const bike = bikes.value.find((b) => b.id === bikeId)
    if (!bike || bike.placed) return null

    const scene = currentScene.value
    const zone = findParkingZone(dropX, dropY, scene.parkingZones)

    if (zone) {
      // 正确放入停车框
      bike.placed = true
      bike.placedInZone = zone.id
      bike.x = zone.x + zone.width / 2 - BIKE_SIZE / 2
      bike.y = zone.y + zone.height / 2 - BIKE_SIZE / 2

      const result = scoring.handlePlacement('correct', bike.isSpecial)
      if (bike.isSpecial) specialEvent.handlePlaced()

      addMessage(result.message, 'success')
      checkUnlocks()
      return { bikeId, zoneId: zone.id, result: 'correct', ...result }
    }

    // 未放入停车框
    const result = scoring.handlePlacement('wrong', bike.isSpecial)

    if (bike.isSpecial) {
      bikes.value = bikes.value.filter((b) => b.id !== bikeId)
      specialEvent.handleFailed()
      addMessage(result.message, 'error')
    } else {
      const pos = generateBikePosition(
        bikes.value.filter((b) => b.id !== bikeId),
        scene
      )
      bike.x = pos.x
      bike.y = pos.y
      addMessage(result.message, 'error')
    }

    return { bikeId, zoneId: null, result: 'wrong', ...result }
  }

  /** 结束游戏 */
  function endGame() {
    gamePhase.value = 'ending'
    timer.stop()
    specialEvent.stopScheduler()

    const unplacedCount = bikes.value.filter((b) => !b.placed).length

    setTimeout(() => {
      gamePhase.value = 'ended'
    }, 1500)

    return {
      score: scoring.score.value,
      correctCount: scoring.correctCount.value,
      wrongCount: scoring.wrongCount.value,
      specialHandled: scoring.specialHandled.value,
      unplacedCount,
      sceneName: currentScene.value.name,
      stats: scoring.stats.value,
    }
  }

  /** 返回开始界面 */
  function goToStart() {
    gamePhase.value = 'start'
    timer.reset()
    scoring.reset()
    specialEvent.reset()
    bikes.value = []
    newUnlock.value = null
    messageQueue.value = []
  }

  // ========== 计算属性 ==========

  const sceneList = computed(() =>
    Object.values(SCENES).map((s) => ({
      ...s,
      unlocked: unlockedScenes.value.includes(s.id),
    }))
  )

  const placedCount = computed(() => bikes.value.filter((b) => b.placed).length)
  const remainingCount = computed(() => bikes.value.filter((b) => !b.placed).length)

  // ========== 公开接口 ==========

  return {
    // 状态
    gamePhase,
    currentSceneId,
    currentScene,
    bikes,
    unlockedScenes,
    specialEventBike: specialEvent.specialEventBike,
    specialEventActive: specialEvent.specialEventActive,
    newUnlock,
    messageQueue,

    // 计算属性
    sceneList,
    placedCount,
    remainingCount,

    // 子模块（只读引用）
    timer,
    scoring,

    // 方法
    startGame,
    endGame,
    placeBike,
    goToStart,
    addMessage,

    // 常量
    BOARD_WIDTH,
    BOARD_HEIGHT,
    BIKE_SIZE,
  }
}

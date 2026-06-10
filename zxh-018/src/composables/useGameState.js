import { ref, computed } from 'vue'
import { FAILURE_TYPES, GAME_CONFIG, DIFFICULTY } from '../config/gameConfig.js'

const FAILURE_TYPE_LIST = Object.values(FAILURE_TYPES)

function pickRandomFailure() {
  return FAILURE_TYPE_LIST[Math.floor(Math.random() * FAILURE_TYPE_LIST.length)]
}

function createLight(floor) {
  return {
    id: floor,
    floor,
    failureType: pickRandomFailure(),
    state: 'broken',
  }
}

export function useGameState() {
  const lights = ref([])
  const score = ref(0)
  const phase = ref('idle')
  const rainyMode = ref(false)
  const activeFloorId = ref(null)

  const fixedCount = computed(() =>
    lights.value.filter((l) => l.state === 'fixed').length
  )

  const allFixed = computed(
    () =>
      lights.value.length > 0 &&
      fixedCount.value === GAME_CONFIG.TOTAL_FLOORS
  )

  function getLight(floorId) {
    return lights.value.find((l) => l.id === floorId) || null
  }

  function initGame() {
    lights.value = Array.from({ length: GAME_CONFIG.TOTAL_FLOORS }, (_, i) =>
      createLight(i + 1)
    )
    score.value = 0
    phase.value = 'playing'
    activeFloorId.value = null
  }

  function repairLight(floorId) {
    const light = getLight(floorId)
    if (!light || light.state === 'fixed') return false

    light.state = 'fixed'
    score.value += GAME_CONFIG.POINTS_PER_REPAIR
    activeFloorId.value = null

    if (allFixed.value) {
      score.value += GAME_CONFIG.BONUS_ALL_FIXED
      phase.value = 'won'
    }
    return true
  }

  function applyPenalty() {
    score.value = Math.max(0, score.value + GAME_CONFIG.PENALTY_WRONG_ACTION)
  }

  function timeout() {
    score.value = Math.max(0, score.value + GAME_CONFIG.PENALTY_TIMEOUT)
    phase.value = 'lost'
  }

  function resetGame() {
    phase.value = 'idle'
    score.value = 0
    lights.value = []
    activeFloorId.value = null
    rainyMode.value = false
  }

  function toggleRainyMode() {
    rainyMode.value = !rainyMode.value
  }

  function setActiveFloor(floorId) {
    activeFloorId.value = floorId
  }

  /** Returns required clicks for low-sensitivity repair (affected by rainy mode) */
  function getRequiredClicks() {
    const base = DIFFICULTY.LOW_SENSITIVITY_CLICKS
    return rainyMode.value
      ? Math.round(base * DIFFICULTY.RAINY_MULTIPLIER)
      : base
  }

  /** Returns difficulty-adjusted slider target range */
  function getSliderTarget() {
    const min = DIFFICULTY.DELAYED_OFF_TARGET_MIN
    const max = DIFFICULTY.DELAYED_OFF_TARGET_MAX
    if (!rainyMode.value) return { min, max }
    return {
      min: Math.round(min * DIFFICULTY.RAINY_MULTIPLIER),
      max: Math.round(max * DIFFICULTY.RAINY_MULTIPLIER),
    }
  }

  return {
    lights,
    score,
    phase,
    rainyMode,
    activeFloorId,
    fixedCount,
    allFixed,
    getLight,
    initGame,
    repairLight,
    applyPenalty,
    timeout,
    resetGame,
    toggleRainyMode,
    setActiveFloor,
    getRequiredClicks,
    getSliderTarget,
  }
}

// ============================================================
// 核心游戏状态管理
// ============================================================

import { reactive, computed } from 'vue'
import {
  GAME_STATE,
  ATTR_KEYS,
  INITIAL_ATTRS,
  ATTR_MIN,
  ATTR_MAX,
  SCENARIOS_PER_GAME,
  TOTAL_SCENARIOS,
  getRating,
  checkHiddenEnding
} from '../utils/constants.js'
import { saveGame, loadGame, clearGame, hasSaveData } from './useStorage.js'
import scenarios from '../data/scenarios.js'

// ---- 洗牌算法 ----
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ---- 限制属性范围 ----
function clamp(value) {
  return Math.max(ATTR_MIN, Math.min(ATTR_MAX, value))
}

// ============================================================
// 工厂函数：创建初始状态（纯数据，不包含方法）
// ============================================================
function createInitialState(seedScenarios) {
  return {
    gameState: GAME_STATE.START,
    attrs: { ...INITIAL_ATTRS },
    currentIndex: 0,
    scenarios: seedScenarios,
    history: [],
    rating: null,
    isHiddenEnding: false,
    round: 1,
    timeLeft: 10
  }
}

/**
 * 核心游戏逻辑 composable
 * 返回值是一个 reactive 对象，方便组件直接绑定
 */
export function useGame() {
  const state = reactive(createInitialState([]))

  // ---- 计算属性 ----
  const currentScenario = computed(() => {
    if (state.currentIndex >= state.scenarios.length) return null
    return state.scenarios[state.currentIndex]
  })

  const progress = computed(() => ({
    current: state.currentIndex + 1,
    total: state.scenarios.length,
    percent: state.scenarios.length > 0
      ? Math.round(((state.currentIndex) / state.scenarios.length) * 100)
      : 0
  }))

  const isGameOver = computed(() =>
    state.gameState === GAME_STATE.RESULT
  )

  // ---- 操作方法 ----

  /** 开始新游戏 */
  function startNewGame() {
    const picked = shuffle(scenarios).slice(0, SCENARIOS_PER_GAME)
    Object.assign(state, createInitialState(picked))
    state.gameState = GAME_STATE.PLAYING
    // 不清除 round，保留多周目信息
  }

  /** 从存档继续 */
  function continueGame() {
    const saved = loadGame()
    if (!saved) return false
    Object.assign(state, saved)
    state.gameState = GAME_STATE.PLAYING
    return true
  }

  /** 做出选择 */
  function makeChoice(choiceIndex) {
    const scenario = currentScenario.value
    if (!scenario) return

    const choice = scenario.choices[choiceIndex]
    if (!choice) return

    // 应用属性变化
    const effects = choice.effects
    for (const key of Object.keys(effects)) {
      state.attrs[key] = clamp(state.attrs[key] + effects[key])
    }

    // 记录历史
    state.history.push({
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      choiceIndex,
      choiceText: choice.text,
      isUnconventional: choice.isUnconventional,
      effects: { ...effects }
    })

    // 推进场景
    state.currentIndex++

    // 检查是否结束
    if (state.currentIndex >= state.scenarios.length) {
      endGame()
    }
  }

  /** 超时未选择 */
  function handleTimeout() {
    const scenario = currentScenario.value
    if (!scenario) return

    // 超时：默认选最后一选项（最保守），且属性轻微扣减
    const idx = scenario.choices.length - 1
    const effects = {
      [ATTR_KEYS.STAMINA]: -10,
      [ATTR_KEYS.RATING]: -10,
      [ATTR_KEYS.EFFICIENCY]: -10
    }

    for (const key of Object.keys(effects)) {
      state.attrs[key] = clamp(state.attrs[key] + effects[key])
    }

    state.history.push({
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      choiceIndex: -1,
      choiceText: '⏰ 超时未选择',
      isUnconventional: false,
      effects: { ...effects }
    })

    state.currentIndex++

    if (state.currentIndex >= state.scenarios.length) {
      endGame()
    }
  }

  /** 结束游戏 */
  function endGame() {
    state.gameState = GAME_STATE.RESULT

    const isHidden = checkHiddenEnding(state.attrs, state.history)
    state.isHiddenEnding = isHidden
    state.rating = isHidden ? null : getRating(state.attrs)

    // 自动存档
    saveGameState()
  }

  /** 保存当前进度 */
  function saveGameState() {
    saveGame({
      gameState: state.gameState,
      attrs: { ...state.attrs },
      currentIndex: state.currentIndex,
      scenarios: state.scenarios,
      history: state.history,
      rating: state.rating,
      isHiddenEnding: state.isHiddenEnding,
      round: state.round,
      timeLeft: state.timeLeft
    })
  }

  /** 开始下一周目 */
  function startNewRound() {
    state.round++
    const picked = shuffle(scenarios).slice(0, SCENARIOS_PER_GAME)
    state.gameState = GAME_STATE.PLAYING
    state.attrs = { ...INITIAL_ATTRS }
    state.currentIndex = 0
    state.scenarios = picked
    state.history = []
    state.rating = null
    state.isHiddenEnding = false
    state.timeLeft = 10
  }

  /** 返回主菜单 */
  function backToMenu() {
    state.gameState = GAME_STATE.START
    state.attrs = { ...INITIAL_ATTRS }
    state.currentIndex = 0
    state.scenarios = []
    state.history = []
    state.rating = null
    state.isHiddenEnding = false
    state.timeLeft = 10
  }

  /** 检查是否有存档 */
  function checkHasSave() {
    return hasSaveData()
  }

  /** 删除存档 */
  function deleteSave() {
    clearGame()
  }

  return {
    // 状态
    state,
    // 计算属性
    currentScenario,
    progress,
    isGameOver,
    // 方法
    startNewGame,
    continueGame,
    makeChoice,
    handleTimeout,
    saveGameState,
    startNewRound,
    backToMenu,
    checkHasSave,
    deleteSave
  }
}

// ============================================================
// 游戏常量定义
// ============================================================

/** 游戏状态枚举 */
export const GAME_STATE = {
  START: 'start',
  PLAYING: 'playing',
  RESULT: 'result'
}

/** 属性键名 */
export const ATTR_KEYS = {
  STAMINA: 'stamina',
  RATING: 'rating',
  EFFICIENCY: 'efficiency'
}

/** 属性中文标签 */
export const ATTR_LABELS = {
  [ATTR_KEYS.STAMINA]: '体力值',
  [ATTR_KEYS.RATING]: '客户好评度',
  [ATTR_KEYS.EFFICIENCY]: '效率值'
}

/** 评分等级 */
export const RATINGS = {
  FIVE_STAR: {
    key: 'five_star',
    title: '⭐ 五星快递员',
    subtitle: '你就是快递界的传奇！',
    description: '体力充沛、客户满意、效率拔群——你是所有快递小哥的楷模！',
    icon: '🏆'
  },
  VETERAN: {
    key: 'veteran',
    title: '📦 老练骑手',
    subtitle: '风里来雨里去，稳稳当当。',
    description: '你有丰富的经验，虽然偶尔有小失误，但总体表现优秀。',
    icon: '🛵'
  },
  SURVIVOR: {
    key: 'survivor',
    title: '😮‍💨 社畜本畜',
    subtitle: '勉强活着，不过如此。',
    description: '你像一个真正的打工人——疲惫但坚持着，客户不好不坏，效率马马虎虎。',
    icon: '💼'
  },
  QUIT: {
    key: 'quit',
    title: '🚫 明天就离职',
    subtitle: '这份工作不适合你……',
    description: '体力透支、客户差评如潮、效率低下——也许可以考虑转行？',
    icon: '😵'
  }
}

/** 隐藏结局 */
export const HIDDEN_ENDING = {
  key: 'hidden',
  title: '🌟 隐藏结局：自由骑士',
  subtitle: '你找到了属于自己的节奏！',
  description: '不被规则束缚，用智慧开辟了全新的派送方式。公司改变了管理制度，你成为了城市物流顾问！',
  icon: '🦸',
  /** 触发条件：所有属性 >= 60 且任何选项中出现过某个特殊选择模式 */
  triggerDescription: '需要在游戏中做出至少3次"非主流"选择（即选择不是最安全/最常见的选项）'
}

/** 游戏场景总数 */
export const TOTAL_SCENARIOS = 20

/** 每局游戏场景数 */
export const SCENARIOS_PER_GAME = 10

/** 每题限时（秒） */
export const TIME_LIMIT = 10

/** 初始属性值 */
export const INITIAL_ATTRS = {
  [ATTR_KEYS.STAMINA]: 50,
  [ATTR_KEYS.RATING]: 50,
  [ATTR_KEYS.EFFICIENCY]: 50
}

/** 属性最大最小值 */
export const ATTR_MIN = 0
export const ATTR_MAX = 100

/** localStorage key */
export const STORAGE_KEY = 'delivery_game_save'

/** 属性变化量 */
export const IMPACT = {
  HIGH: 15,
  MEDIUM: 10,
  LOW: 5
}

/** 结局判定规则 */
export function getRating(attrs) {
  const avg = (attrs[ATTR_KEYS.STAMINA] + attrs[ATTR_KEYS.RATING] + attrs[ATTR_KEYS.EFFICIENCY]) / 3
  if (avg >= 80) return RATINGS.FIVE_STAR
  if (avg >= 60) return RATINGS.VETERAN
  if (avg >= 35) return RATINGS.SURVIVOR
  return RATINGS.QUIT
}

/** 检查隐藏结局 */
export function checkHiddenEnding(attrs, history) {
  // 隐藏结局：所有属性 >= 60 且非主流选项 >= 3 次
  const allAbove60 = attrs[ATTR_KEYS.STAMINA] >= 60
    && attrs[ATTR_KEYS.RATING] >= 60
    && attrs[ATTR_KEYS.EFFICIENCY] >= 60
  const unconventional = history.filter(h => h.isUnconventional).length
  return allAbove60 && unconventional >= 3
}

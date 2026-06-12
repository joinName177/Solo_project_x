/**
 * 应用常量定义
 * 集中管理所有硬编码的常量值
 */

/** 零工类型 */
export const GIG_TYPE = {
  DEMAND: 'demand',
  SUPPLY: 'supply',
}

export const GIG_TYPE_LABEL = {
  [GIG_TYPE.DEMAND]: '找人干活',
  [GIG_TYPE.SUPPLY]: '我会干',
}

/** 工作类型分类 */
export const WORK_TYPES = ['种植', '养殖', '建筑', '搬运', '家政', '其他']

export const WORK_TYPE_ICONS = {
  种植: '🌾',
  养殖: '🐓',
  建筑: '🔨',
  搬运: '📦',
  家政: '🏠',
  其他: '🔧',
}

/** 工作类型 → Badge variant 映射 */
export const WORK_TYPE_VARIANT = {
  种植: 'planting',
  养殖: 'breeding',
  建筑: 'building',
  搬运: 'moving',
  家政: 'domestic',
  其他: 'other',
}

/** localStorage 键名 */
export const STORAGE_KEYS = {
  GIGS: 'rural_gig_board_gigs',
  REPUTATION: 'rural_gig_board_reputation',
}

/** 默认数据（种子数据，首次使用时展示） */
export const SEED_GIGS = [
  {
    id: 'seed-1',
    type: GIG_TYPE.DEMAND,
    workType: '种植',
    title: '三天摘苹果',
    description: '果园摘苹果，日薪100元，包午饭，需要3-4人',
    contact: '13812345678',
    village: '张家村一组',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completed: false,
  },
  {
    id: 'seed-2',
    type: GIG_TYPE.SUPPLY,
    workType: '建筑',
    title: '会砌墙，有空闲',
    description: '擅长砌院墙、垒砖，干了20年泥瓦工，附近村都可以去',
    contact: '李师傅-村东头第三家',
    village: '王家村三组',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    completed: false,
  },
  {
    id: 'seed-3',
    type: GIG_TYPE.DEMAND,
    workType: '搬运',
    title: '帮搬一批化肥',
    description: '从镇上搬50袋化肥到村里仓库，工钱200元',
    contact: '15987654321',
    village: '赵家村二组',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    completed: true,
  },
]

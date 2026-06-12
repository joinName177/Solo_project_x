// ============================================================
// 20个游戏场景定义
// 每个场景包含：
//   id, title(场景标题), description(场景描述),
//   choices(选项数组): [{text, effects: {stamina, rating, efficiency}, isUnconventional}]
// ============================================================

import { ATTR_KEYS, IMPACT } from '../utils/constants.js'

const { STAMINA, RATING, EFFICIENCY } = ATTR_KEYS
const { HIGH, MEDIUM, LOW } = IMPACT

/** 所有20个场景 */
const scenarios = [
  // ---- 1 ----
  {
    id: 1,
    title: '没电梯的老小区',
    description: '你到达一栋没有电梯的老小区楼下，收件人住在8楼，而你手上还有30件快递要送。',
    choices: [
      {
        text: '💪 爬楼梯送上去',
        effects: { [STAMINA]: -HIGH, [RATING]: +HIGH, [EFFICIENCY]: -LOW },
        isUnconventional: false
      },
      {
        text: '📦 放进快递柜',
        effects: { [STAMINA]: +LOW, [RATING]: -MEDIUM, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '📞 联系客户改天再送',
        effects: { [STAMINA]: +MEDIUM, [RATING]: -HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: true
      }
    ]
  },

  // ---- 2 ----
  {
    id: 2,
    title: '客户电话打不通',
    description: '你到了客户楼下，但电话一直无人接听，敲门也没人应。包裹上写着"生鲜易腐"。',
    choices: [
      {
        text: '🚪 放在门口拍照留证',
        effects: { [STAMINA]: +LOW, [RATING]: -LOW, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '🏠 带回站点明天再送',
        effects: { [STAMINA]: -LOW, [RATING]: +MEDIUM, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '📱 发短信告知并放物业',
        effects: { [STAMINA]: +LOW, [RATING]: +HIGH, [EFFICIENCY]: +LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 3 ----
  {
    id: 3,
    title: '路遇凶狗',
    description: '你刚推开客户院子的铁门，一只大型犬朝你狂吠着冲过来，龇牙咧嘴！',
    choices: [
      {
        text: '🗣️ 大声呵斥吓退它',
        effects: { [STAMINA]: -LOW, [RATING]: -MEDIUM, [EFFICIENCY]: +LOW },
        isUnconventional: true
      },
      {
        text: '🚶 慢慢后退不激怒',
        effects: { [STAMINA]: +LOW, [RATING]: +LOW, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '📦 用快递挡在前面',
        effects: { [STAMINA]: -MEDIUM, [RATING]: +HIGH, [EFFICIENCY]: -LOW },
        isUnconventional: false
      }
    ]
  },

  // ---- 4 ----
  {
    id: 4,
    title: '电动车没电了',
    description: '行驶到半路，电动车电量报警——只剩5%了！附近没有换电柜，还有8件快递没送。',
    choices: [
      {
        text: '🦵 推着车走完最后一程',
        effects: { [STAMINA]: -HIGH, [RATING]: +HIGH, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      },
      {
        text: '🔌 去路边店铺借充电',
        effects: { [STAMINA]: +MEDIUM, [RATING]: +LOW, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '🆘 呼叫站点救援',
        effects: { [STAMINA]: +HIGH, [RATING]: -MEDIUM, [EFFICIENCY]: -HIGH },
        isUnconventional: true
      }
    ]
  },

  // ---- 5 ----
  {
    id: 5,
    title: '暴雨突至',
    description: '天空突然乌云密布，大雨倾盆而下。你没带雨具，车上的快递眼看要被淋湿。',
    choices: [
      {
        text: '⏳ 找个屋檐等雨停',
        effects: { [STAMINA]: +HIGH, [RATING]: -MEDIUM, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      },
      {
        text: '🌧️ 冒雨继续送',
        effects: { [STAMINA]: -HIGH, [RATING]: +HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '☂️ 路边买件雨衣再送',
        effects: { [STAMINA]: +LOW, [RATING]: +MEDIUM, [EFFICIENCY]: -LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 6 ----
  {
    id: 6,
    title: '地址写错了',
    description: '快递单上的地址模糊不清——"XX路88号"，但这条路上根本没有88号！',
    choices: [
      {
        text: '📞 打电话联系客户确认',
        effects: { [STAMINA]: +LOW, [RATING]: +HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '🧭 凭经验在附近找找',
        effects: { [STAMINA]: -MEDIUM, [RATING]: -LOW, [EFFICIENCY]: -LOW },
        isUnconventional: true
      },
      {
        text: '↩️ 退回站点标记异常',
        effects: { [STAMINA]: +MEDIUM, [RATING]: -HIGH, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      }
    ]
  },

  // ---- 7 ----
  {
    id: 7,
    title: '老人需要帮助',
    description: '送件时，一位老人请你帮忙把他买的米扛上楼，他住在6楼，看起来腿脚不便。',
    choices: [
      {
        text: '🤝 热心帮忙扛上去',
        effects: { [STAMINA]: -HIGH, [RATING]: +HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '🙏 婉拒，表示有急事',
        effects: { [STAMINA]: +MEDIUM, [RATING]: -MEDIUM, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '🏘️ 联系社区志愿者帮忙',
        effects: { [STAMINA]: +LOW, [RATING]: +HIGH, [EFFICIENCY]: -LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 8 ----
  {
    id: 8,
    title: '双11爆仓',
    description: '站点堆满了双11的快递，站长问你能不能加班到晚上10点，帮你把今天的件清完。',
    choices: [
      {
        text: '😤 咬牙加班到深夜',
        effects: { [STAMINA]: -HIGH, [RATING]: +HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '🏃 到点就走，明天再说',
        effects: { [STAMINA]: +HIGH, [RATING]: -MEDIUM, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '🤝 找同事分工合作',
        effects: { [STAMINA]: -LOW, [RATING]: +MEDIUM, [EFFICIENCY]: +HIGH },
        isUnconventional: true
      }
    ]
  },

  // ---- 9 ----
  {
    id: 9,
    title: '客户要求代扔垃圾',
    description: '送完快递，客户笑嘻嘻地问你能不能顺便把门口两袋垃圾带下去。',
    choices: [
      {
        text: '👍 顺手帮忙扔了',
        effects: { [STAMINA]: -LOW, [RATING]: +HIGH, [EFFICIENCY]: -LOW },
        isUnconventional: false
      },
      {
        text: '🙅 礼貌拒绝，不在职责范围',
        effects: { [STAMINA]: +LOW, [RATING]: -MEDIUM, [EFFICIENCY]: +MEDIUM },
        isUnconventional: false
      },
      {
        text: '😏 开玩笑说"加五块钱"',
        effects: { [STAMINA]: +LOW, [RATING]: -LOW, [EFFICIENCY]: +LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 10 ----
  {
    id: 10,
    title: '电梯维修中',
    description: '到了写字楼发现唯一的电梯贴了"维修中"的告示，收件人在15楼。',
    choices: [
      {
        text: '🏃 爬15楼上去',
        effects: { [STAMINA]: -HIGH, [RATING]: +HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '⏰ 等半小时电梯修好',
        effects: { [STAMINA]: +HIGH, [RATING]: -MEDIUM, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      },
      {
        text: '📞 让客户下来取',
        effects: { [STAMINA]: +MEDIUM, [RATING]: -HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: true
      }
    ]
  },

  // ---- 11 ----
  {
    id: 11,
    title: '同行求助',
    description: '路上遇到一位摔倒在地的外卖骑手，他的餐洒了一地，向你求助帮他联系顾客。',
    choices: [
      {
        text: '🤝 停下来帮忙',
        effects: { [STAMINA]: -LOW, [RATING]: +HIGH, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      },
      {
        text: '🙅 自己也很忙，先走了',
        effects: { [STAMINA]: +LOW, [RATING]: -HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '💡 教他用App报备，然后继续送',
        effects: { [STAMINA]: +LOW, [RATING]: +LOW, [EFFICIENCY]: -LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 12 ----
  {
    id: 12,
    title: '客户投诉',
    description: '系统提示有客户投诉你"服务态度不好"，实际上你只是说话声音大了点。',
    choices: [
      {
        text: '😔 主动道歉并送小礼物',
        effects: { [STAMINA]: -LOW, [RATING]: +HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '😤 找客户当面理论',
        effects: { [STAMINA]: -MEDIUM, [RATING]: -HIGH, [EFFICIENCY]: -HIGH },
        isUnconventional: true
      },
      {
        text: '📋 找站长协调处理',
        effects: { [STAMINA]: +LOW, [RATING]: +MEDIUM, [EFFICIENCY]: -LOW },
        isUnconventional: false
      }
    ]
  },

  // ---- 13 ----
  {
    id: 13,
    title: '包裹破损',
    description: '你发现手中的快递包装有破损，里面的商品似乎有轻微损坏的痕迹。',
    choices: [
      {
        text: '📢 主动告知客户并协商赔偿',
        effects: { [STAMINA]: +LOW, [RATING]: +HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '😰 偷偷放门口赶紧走',
        effects: { [STAMINA]: +MEDIUM, [RATING]: -HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: true
      },
      {
        text: '↩️ 退回站点重新包装',
        effects: { [STAMINA]: -LOW, [RATING]: +MEDIUM, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      }
    ]
  },

  // ---- 14 ----
  {
    id: 14,
    title: '小区不让进',
    description: '高档小区的保安拦住你，说快递车不能进小区，让你把快递放门卫室。',
    choices: [
      {
        text: '📝 登记身份步行进入',
        effects: { [STAMINA]: -MEDIUM, [RATING]: +HIGH, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '📦 听保安的放门卫室',
        effects: { [STAMINA]: +HIGH, [RATING]: -LOW, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '😏 趁保安不注意溜进去',
        effects: { [STAMINA]: -LOW, [RATING]: -MEDIUM, [EFFICIENCY]: +HIGH },
        isUnconventional: true
      }
    ]
  },

  // ---- 15 ----
  {
    id: 15,
    title: '午饭时间到了',
    description: '肚子咕咕叫，已经下午两点了还没吃午饭。附近有家面馆，手上还有6件急件。',
    choices: [
      {
        text: '🍜 先吃饱再说',
        effects: { [STAMINA]: +HIGH, [RATING]: -LOW, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '😣 送完再吃',
        effects: { [STAMINA]: -MEDIUM, [RATING]: +HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '🥪 买个面包边送边吃',
        effects: { [STAMINA]: +LOW, [RATING]: +LOW, [EFFICIENCY]: +LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 16 ----
  {
    id: 16,
    title: '快递被偷',
    description: '送完件回来发现车上的一个快递不见了！疑似被人顺手牵羊。',
    choices: [
      {
        text: '🚔 立刻报警处理',
        effects: { [STAMINA]: +LOW, [RATING]: +LOW, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      },
      {
        text: '💰 自掏腰包赔偿客户',
        effects: { [STAMINA]: +LOW, [RATING]: +HIGH, [EFFICIENCY]: +MEDIUM },
        isUnconventional: false
      },
      {
        text: '📞 联系客户坦诚协商',
        effects: { [STAMINA]: +LOW, [RATING]: +MEDIUM, [EFFICIENCY]: -LOW },
        isUnconventional: true
      }
    ]
  },

  // ---- 17 ----
  {
    id: 17,
    title: '偶遇熟人',
    description: '正在派件，突然碰见了多年不见的老同学，他热情地拉着你聊天。',
    choices: [
      {
        text: '😊 聊一会儿叙叙旧',
        effects: { [STAMINA]: +MEDIUM, [RATING]: +LOW, [EFFICIENCY]: -HIGH },
        isUnconventional: false
      },
      {
        text: '👋 打个招呼说有急事',
        effects: { [STAMINA]: +LOW, [RATING]: -LOW, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '🙈 装作没看见绕道走',
        effects: { [STAMINA]: +LOW, [RATING]: -MEDIUM, [EFFICIENCY]: +MEDIUM },
        isUnconventional: true
      }
    ]
  },

  // ---- 18 ----
  {
    id: 18,
    title: '新小区路痴',
    description: '派送区域是刚建成的小区，楼号排列没有规律，导航也定位不准，你迷路了。',
    choices: [
      {
        text: '🗣️ 向小区居民问路',
        effects: { [STAMINA]: +LOW, [RATING]: +MEDIUM, [EFFICIENCY]: -LOW },
        isUnconventional: false
      },
      {
        text: '🗺️ 仔细研究小区平面图',
        effects: { [STAMINA]: +LOW, [RATING]: +LOW, [EFFICIENCY]: -MEDIUM },
        isUnconventional: false
      },
      {
        text: '🎯 凭直觉一栋栋找',
        effects: { [STAMINA]: -HIGH, [RATING]: -LOW, [EFFICIENCY]: -HIGH },
        isUnconventional: true
      }
    ]
  },

  // ---- 19 ----
  {
    id: 19,
    title: '包裹太重',
    description: '这一件快递是个超大箱子，少说有30公斤，收件人住5楼没电梯。',
    choices: [
      {
        text: '🏋️ 分两次搬运',
        effects: { [STAMINA]: -MEDIUM, [RATING]: +HIGH, [EFFICIENCY]: -LOW },
        isUnconventional: false
      },
      {
        text: '💪 一次性硬扛上去',
        effects: { [STAMINA]: -HIGH, [RATING]: +MEDIUM, [EFFICIENCY]: +MEDIUM },
        isUnconventional: true
      },
      {
        text: '🤝 联系客户一起搬',
        effects: { [STAMINA]: -LOW, [RATING]: -LOW, [EFFICIENCY]: +LOW },
        isUnconventional: false
      }
    ]
  },

  // ---- 20 ----
  {
    id: 20,
    title: '客户要求上楼',
    description: '收件人坚持要你送上楼，说家里有婴儿不方便下楼。但公司规定快递只需送到楼下。',
    choices: [
      {
        text: '👍 破例送上楼',
        effects: { [STAMINA]: -MEDIUM, [RATING]: +HIGH, [EFFICIENCY]: -LOW },
        isUnconventional: false
      },
      {
        text: '📋 坚持按规定放楼下',
        effects: { [STAMINA]: +MEDIUM, [RATING]: -HIGH, [EFFICIENCY]: +HIGH },
        isUnconventional: false
      },
      {
        text: '💡 商量放电梯口，客户乘电梯取',
        effects: { [STAMINA]: +LOW, [RATING]: +MEDIUM, [EFFICIENCY]: +LOW },
        isUnconventional: true
      }
    ]
  }
]

export default scenarios

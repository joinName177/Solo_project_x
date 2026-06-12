/**
 * 场景配置数据
 * 每个场景定义了停车框位置、特殊区域、单车数量等参数
 *
 * 坐标系说明：游戏面板 900×600，左上角为原点
 */

export const SCENES = {
  subway: {
    id: 'subway',
    name: '地铁站口',
    description: '早高峰的地铁站口，共享单车乱停乱放现象严重',
    unlockScore: 0,
    bikeCount: 15,
    bikeColors: { blue: 0.5, yellow: 0.5 },
    parkingZones: [
      { id: 'p1', x: 60, y: 70, width: 140, height: 90 },
      { id: 'p2', x: 380, y: 420, width: 140, height: 90 },
      { id: 'p3', x: 660, y: 180, width: 140, height: 90 },
    ],
    // 特殊区域（盲道、绿化带）——违规停放车辆的生成区域
    specialZones: [
      { id: 'blind_lane_1', type: 'blind_lane', x: 250, y: 280, width: 350, height: 28 },
      { id: 'green_belt_1', type: 'green_belt', x: 80, y: 380, width: 90, height: 160 },
    ],
    landmark: { x: 700, y: 480, label: '地铁站', icon: '🚇' },
    gameDuration: 90,
    specialEventInterval: 15,
    buildings: [
      { id: 'b1', x: 10, y: 10, w: 80, h: 120, label: '便利店' },
      { id: 'b2', x: 750, y: 20, w: 120, h: 100, label: '写字楼' },
      { id: 'b3', x: 20, y: 450, w: 100, h: 130, label: '住宅区' },
      { id: 'b4', x: 780, y: 380, w: 100, h: 200, label: '地铁站' },
    ],
  },

  mall: {
    id: 'mall',
    name: '商场门口',
    description: '周末的商场门口人流量大，单车停放更加混乱',
    unlockScore: 100,
    bikeCount: 18,
    bikeColors: { blue: 0.4, yellow: 0.6 },
    parkingZones: [
      { id: 'p1', x: 40, y: 60, width: 140, height: 90 },
      { id: 'p2', x: 250, y: 380, width: 140, height: 90 },
      { id: 'p3', x: 500, y: 100, width: 140, height: 90 },
      { id: 'p4', x: 680, y: 420, width: 140, height: 90 },
    ],
    specialZones: [
      { id: 'blind_lane_1', type: 'blind_lane', x: 300, y: 200, width: 400, height: 28 },
      { id: 'green_belt_1', type: 'green_belt', x: 580, y: 300, width: 80, height: 150 },
      { id: 'green_belt_2', type: 'green_belt', x: 150, y: 480, width: 120, height: 60 },
    ],
    landmark: { x: 450, y: 520, label: '商场', icon: '🏬' },
    gameDuration: 85,
    specialEventInterval: 12,
    buildings: [
      { id: 'b1', x: 10, y: 10, w: 120, h: 80, label: '咖啡店' },
      { id: 'b2', x: 700, y: 20, w: 180, h: 120, label: '商场' },
      { id: 'b3', x: 20, y: 460, w: 80, h: 120, label: '餐厅' },
      { id: 'b4', x: 620, y: 480, w: 100, h: 100, label: '影院' },
    ],
  },

  school: {
    id: 'school',
    name: '学校周边',
    description: '放学时间，校门口被各种单车围得水泄不通',
    unlockScore: 200,
    bikeCount: 17,
    bikeColors: { blue: 0.55, yellow: 0.45 },
    parkingZones: [
      { id: 'p1', x: 50, y: 150, width: 140, height: 90 },
      { id: 'p2', x: 380, y: 50, width: 140, height: 90 },
      { id: 'p3', x: 650, y: 350, width: 140, height: 90 },
    ],
    specialZones: [
      { id: 'blind_lane_1', type: 'blind_lane', x: 100, y: 350, width: 500, height: 28 },
      { id: 'green_belt_1', type: 'green_belt', x: 750, y: 100, width: 70, height: 180 },
    ],
    landmark: { x: 400, y: 500, label: '学校', icon: '🏫' },
    gameDuration: 80,
    specialEventInterval: 10,
    buildings: [
      { id: 'b1', x: 250, y: 10, w: 160, h: 100, label: '教学楼' },
      { id: 'b2', x: 720, y: 20, w: 150, h: 80, label: '体育馆' },
      { id: 'b3', x: 20, y: 350, w: 80, h: 200, label: '图书馆' },
      { id: 'b4', x: 760, y: 480, w: 120, h: 100, label: '食堂' },
    ],
  },

  scenic: {
    id: 'scenic',
    name: '景区入口',
    description: '旅游旺季，景区入口单车堆积如山',
    unlockScore: 300,
    bikeCount: 20,
    bikeColors: { blue: 0.35, yellow: 0.65 },
    parkingZones: [
      { id: 'p1', x: 30, y: 50, width: 140, height: 90 },
      { id: 'p2', x: 230, y: 400, width: 140, height: 90 },
      { id: 'p3', x: 500, y: 60, width: 140, height: 90 },
      { id: 'p4', x: 500, y: 420, width: 140, height: 90 },
      { id: 'p5', x: 730, y: 250, width: 140, height: 90 },
    ],
    specialZones: [
      { id: 'blind_lane_1', type: 'blind_lane', x: 200, y: 250, width: 350, height: 28 },
      { id: 'green_belt_1', type: 'green_belt', x: 50, y: 350, width: 80, height: 150 },
      { id: 'green_belt_2', type: 'green_belt', x: 700, y: 400, width: 100, height: 80 },
    ],
    landmark: { x: 780, y: 530, label: '景区', icon: '🏯' },
    gameDuration: 75,
    specialEventInterval: 8,
    buildings: [
      { id: 'b1', x: 10, y: 10, w: 100, h: 80, label: '售票处' },
      { id: 'b2', x: 650, y: 10, w: 120, h: 90, label: '纪念品店' },
      { id: 'b3', x: 20, y: 400, w: 80, h: 150, label: '游客中心' },
      { id: 'b4', x: 700, y: 470, w: 180, h: 110, label: '景区大门' },
    ],
  },
}

/** 获取所有场景ID列表 */
export function getSceneIds() {
  return Object.keys(SCENES)
}

/** 根据解锁分数获取已解锁的场景 */
export function getUnlockedScenes(currentScore) {
  return Object.values(SCENES)
    .filter((scene) => currentScore >= scene.unlockScore)
    .map((scene) => ({ id: scene.id, name: scene.name, description: scene.description }))
}

/** 获取下一待解锁场景 */
export function getNextLockedScene(currentScore) {
  return Object.values(SCENES).find((scene) => scene.unlockScore > currentScore) || null
}

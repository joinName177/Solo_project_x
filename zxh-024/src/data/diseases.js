/**
 * 农作物病害数据库
 * 包含30种常见病害的特征描述、颜色/纹理配置、关联症状和防治建议
 *
 * 数据来源参考：中国农业出版社《农作物主要病虫害识别与防治》
 * 防治建议仅作为参考，实际用药请咨询当地农技站
 */

export const diseases = [
  // ==================== 水稻 (3种) ====================
  {
    id: 'rice_blast',
    cropId: 'rice',
    name: '稻瘟病',
    description: '水稻重要病害，可危害叶片、茎节、穗颈等多个部位',
    // 图像分析用特征
    imageProfile: {
      dominantColors: [
        { r: 139, g: 69, b: 19, tolerance: 30 },  // 褐色斑点
        { r: 180, g: 130, b: 60, tolerance: 25 }    // 黄褐色
      ],
      spotPattern: 'scattered_elliptical',  // 散生椭圆形斑点
      textureDescriptor: '纺锤形或椭圆形病斑，边缘褐色，中央灰白色',
      colorDeviation: 'high'  // 颜色偏差程度
    },
    // 症状特征
    symptoms: ['leaf_spots', 'blight'],
    symptomDetail: '叶片上出现纺锤形或椭圆形褐色病斑，严重时整叶枯死',
    // 发病条件
    conditions: '高温高湿、多雾多露天气，偏施氮肥',
    // 防治建议（非农药处方）
    advice: '1. 选用抗病品种\n2. 合理施肥，避免偏施氮肥，增施磷钾肥\n3. 科学管水，浅水勤灌\n4. 处理病稻草，减少菌源\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'rice_sheath_blight',
    cropId: 'rice',
    name: '水稻纹枯病',
    description: '俗称"花脚杆"，主要危害叶鞘和叶片',
    imageProfile: {
      dominantColors: [
        { r: 160, g: 180, b: 140, tolerance: 30 },  // 灰绿色
        { r: 140, g: 120, b: 80, tolerance: 25 }     // 暗褐色
      ],
      spotPattern: 'cloud_like_patch',  // 云纹状斑块
      textureDescriptor: '云纹状大斑，边缘模糊，中央灰绿色至灰白色',
      colorDeviation: 'medium'
    },
    symptoms: ['leaf_spots', 'mold_layer'],
    symptomDetail: '叶鞘上出现云纹状大斑，边缘褐色，中间灰绿色，湿度大时有白色菌丝',
    conditions: '高温高湿、田间郁蔽、通风不良',
    advice: '1. 合理密植，改善田间通风透光\n2. 科学水肥管理，适时晒田\n3. 清除田间菌核\n4. 打捞浪渣减少菌源\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'rice_bacterial_blight',
    cropId: 'rice',
    name: '水稻白叶枯病',
    description: '细菌性病害，导致叶片干枯发白',
    imageProfile: {
      dominantColors: [
        { r: 210, g: 200, b: 150, tolerance: 30 },  // 黄白色
        { r: 180, g: 170, b: 100, tolerance: 25 }    // 枯黄色
      ],
      spotPattern: 'edge_inward',  // 叶缘向内扩展
      textureDescriptor: '叶缘开始黄白色波纹状扩展，干枯卷曲',
      colorDeviation: 'high'
    },
    symptoms: ['yellowing', 'blight', 'water_soaked'],
    symptomDetail: '叶尖或叶缘开始出现黄白色水渍状斑点，沿叶脉扩展，最终叶片干枯发白',
    conditions: '台风暴雨后、田间淹水、偏施氮肥',
    advice: '1. 选用抗病品种\n2. 种子消毒处理\n3. 防止大水漫灌，避免串灌\n4. 发现病株及时清除\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 小麦 (3种) ====================
  {
    id: 'wheat_rust',
    cropId: 'wheat',
    name: '小麦锈病',
    description: '分为条锈、叶锈和秆锈三种，以条锈危害最大',
    imageProfile: {
      dominantColors: [
        { r: 200, g: 120, b: 30, tolerance: 30 },   // 锈黄色
        { r: 180, g: 80, b: 20, tolerance: 25 }      // 锈红色
      ],
      spotPattern: 'striped_pustules',  // 条状疱状突起
      textureDescriptor: '鲜黄色或锈红色疱状突起，排列成条状，表皮破裂散出锈粉',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'powdery'],
    symptomDetail: '叶片上出现鲜黄色或锈红色的疱状斑点（夏孢子堆），排列成虚线状',
    conditions: '多雨多雾、温暖潮湿、品种感病',
    advice: '1. 选用抗锈病品种\n2. 合理施肥，增施磷钾肥\n3. 适期播种，避免过密\n4. 清除田间自生麦苗\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'wheat_powdery_mildew',
    cropId: 'wheat',
    name: '小麦白粉病',
    description: '叶片表面覆盖白色粉状霉层',
    imageProfile: {
      dominantColors: [
        { r: 220, g: 220, b: 220, tolerance: 35 },  // 白色
        { r: 180, g: 190, b: 170, tolerance: 30 }    // 灰绿色
      ],
      spotPattern: 'powdery_coating',  // 粉状覆盖
      textureDescriptor: '白色粉末状霉层覆盖叶面，后期变为灰白色',
      colorDeviation: 'medium'
    },
    symptoms: ['powdery', 'mold_layer', 'yellowing'],
    symptomDetail: '叶片表面出现白色粉状霉斑，严重时叶片变黄枯死',
    conditions: '田间郁蔽、通风透光差、偏施氮肥',
    advice: '1. 选用抗病品种\n2. 合理密植，改善通风透光\n3. 平衡施肥，控制氮肥用量\n4. 清除病残体\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'wheat_scab',
    cropId: 'wheat',
    name: '小麦赤霉病',
    description: '危害穗部，产生红色霉层',
    imageProfile: {
      dominantColors: [
        { r: 200, g: 100, b: 120, tolerance: 30 },  // 赤粉色
        { r: 160, g: 80, b: 60, tolerance: 25 }      // 赤褐色
      ],
      spotPattern: 'spike_rot',  // 穗部腐烂
      textureDescriptor: '穗部出现粉红色或桔红色霉层，籽粒干瘪',
      colorDeviation: 'high'
    },
    symptoms: ['mold_layer', 'blight'],
    symptomDetail: '穗部出现粉红色霉层，受害小穗枯黄，籽粒干瘪变色',
    conditions: '抽穗扬花期遇连续阴雨、高温高湿',
    advice: '1. 选用抗病或耐病品种\n2. 合理排灌，降低田间湿度\n3. 处理病残体\n4. 适期收获，及时晾晒\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 玉米 (3种) ====================
  {
    id: 'corn_northern_leaf_blight',
    cropId: 'corn',
    name: '玉米大斑病',
    description: '叶片产生大型梭形枯斑',
    imageProfile: {
      dominantColors: [
        { r: 130, g: 110, b: 70, tolerance: 30 },   // 灰褐色
        { r: 160, g: 150, b: 100, tolerance: 25 }    // 黄褐色
      ],
      spotPattern: 'large_fusiform',  // 大型梭形斑
      textureDescriptor: '大型梭形或长条状枯斑，边缘黄绿色，中央灰褐色',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'blight'],
    symptomDetail: '叶片出现大型梭形灰褐色枯斑，严重时叶片大面积枯死',
    conditions: '中温高湿、多雾多露、连作地块',
    advice: '1. 选用抗病杂交种\n2. 合理密植，改善通风\n3. 增施有机肥和磷钾肥\n4. 轮作倒茬，减少菌源\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'corn_southern_leaf_blight',
    cropId: 'corn',
    name: '玉米小斑病',
    description: '叶片产生密集小型病斑',
    imageProfile: {
      dominantColors: [
        { r: 150, g: 120, b: 70, tolerance: 30 },   // 黄褐色
        { r: 100, g: 80, b: 50, tolerance: 25 }      // 暗褐色
      ],
      spotPattern: 'dense_small_spots',  // 密集小斑点
      textureDescriptor: '密集小型椭圆形斑点，边缘紫褐色，中央黄褐色',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'yellowing'],
    symptomDetail: '叶片密布小型椭圆形黄褐色斑点，严重时叶片变黄枯死',
    conditions: '高温多湿、偏施氮肥、连作',
    advice: '1. 选用抗病品种\n2. 合理施肥，增施磷钾肥\n3. 清理田间病残体\n4. 与豆类等非寄主作物轮作\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'corn_rust',
    cropId: 'corn',
    name: '玉米锈病',
    description: '叶片产生锈色孢子堆',
    imageProfile: {
      dominantColors: [
        { r: 190, g: 120, b: 40, tolerance: 30 },   // 锈橙色
        { r: 170, g: 90, b: 30, tolerance: 25 }      // 锈褐色
      ],
      spotPattern: 'scattered_pustules',  // 散生疱状突起
      textureDescriptor: '散生或聚生的锈色疱状突起，表皮破裂散出锈粉',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'powdery'],
    symptomDetail: '叶片两面散生锈褐色疱状突起，破裂后散出锈色粉末',
    conditions: '高温高湿、多雨季节、品种感病',
    advice: '1. 选用抗锈病品种\n2. 合理密植，通风透光\n3. 加强肥水管理\n4. 清除田间病残体\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 苹果 (3种) ====================
  {
    id: 'apple_alternaria_blotch',
    cropId: 'apple',
    name: '苹果斑点落叶病',
    description: '叶片出现褐色坏死斑点，导致早期落叶',
    imageProfile: {
      dominantColors: [
        { r: 120, g: 70, b: 40, tolerance: 30 },    // 深褐色
        { r: 180, g: 80, b: 120, tolerance: 25 }     // 紫褐色
      ],
      spotPattern: 'ringed_spots',  // 轮纹状斑点
      textureDescriptor: '圆形或近圆形褐色斑点，有同心轮纹，边缘紫褐色',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'perforation'],
    symptomDetail: '叶片出现褐色圆形斑点，有同心轮纹，严重时病斑穿孔，叶片脱落',
    conditions: '春夏季多雨、树势衰弱、通风不良',
    advice: '1. 增施有机肥，增强树势\n2. 合理修剪，改善通风透光\n3. 清扫落叶，减少越冬菌源\n4. 果树休眠期刮除老翘皮\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'apple_ring_rot',
    cropId: 'apple',
    name: '苹果轮纹病',
    description: '危害枝干和果实，产生轮纹状病斑',
    imageProfile: {
      dominantColors: [
        { r: 110, g: 60, b: 30, tolerance: 30 },    // 暗褐色
        { r: 140, g: 100, b: 70, tolerance: 25 }     // 棕褐色
      ],
      spotPattern: 'concentric_rings',  // 同心轮纹
      textureDescriptor: '圆形或不规则形暗褐色病斑，有明显的同心轮纹',
      colorDeviation: 'medium'
    },
    symptoms: ['leaf_spots', 'blight'],
    symptomDetail: '叶片病斑近圆形，褐色至暗褐色，有明显同心轮纹',
    conditions: '温暖多雨、树势衰弱、伤口多',
    advice: '1. 加强栽培管理，增强树势\n2. 刮除枝干病斑\n3. 清除枯枝落叶和病果\n4. 套袋保护果实\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'apple_anthracnose',
    cropId: 'apple',
    name: '苹果炭疽病',
    description: '危害果实为主，也可危害叶片',
    imageProfile: {
      dominantColors: [
        { r: 100, g: 50, b: 20, tolerance: 30 },    // 黑褐色
        { r: 160, g: 100, b: 60, tolerance: 25 }     // 褐色
      ],
      spotPattern: 'sunken_lesions',  // 凹陷病斑
      textureDescriptor: '圆形褐色凹陷病斑，边缘清晰，中央有黑色小点',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'blight'],
    symptomDetail: '叶片病斑圆形褐色，边缘深色，中央有时可见黑色小点',
    conditions: '高温多雨、雾露重、树势衰弱',
    advice: '1. 清除树上和地面的病果病枝\n2. 合理修剪，通风透光\n3. 加强肥水管理\n4. 果树休眠期喷石硫合剂\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 番茄 (3种) ====================
  {
    id: 'tomato_early_blight',
    cropId: 'tomato',
    name: '番茄早疫病',
    description: '叶片产生轮纹状褐色病斑',
    imageProfile: {
      dominantColors: [
        { r: 140, g: 100, b: 50, tolerance: 30 },   // 褐色
        { r: 180, g: 160, b: 80, tolerance: 25 }     // 黄褐色
      ],
      spotPattern: 'concentric_rings',  // 同心轮纹
      textureDescriptor: '圆形褐色病斑，有明显的同心轮纹，周围有黄色晕圈',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'yellowing'],
    symptomDetail: '叶片出现圆形褐色轮纹状病斑，有黄色晕圈，严重时叶片枯黄',
    conditions: '温暖多湿、连续阴雨、植株衰弱',
    advice: '1. 选用抗病品种\n2. 合理密植，及时整枝打杈\n3. 轮作倒茬，避免连作\n4. 增施有机肥和磷钾肥\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'tomato_late_blight',
    cropId: 'tomato',
    name: '番茄晚疫病',
    description: '低温高湿型病害，危害严重',
    imageProfile: {
      dominantColors: [
        { r: 80, g: 100, b: 60, tolerance: 30 },    // 暗绿色
        { r: 120, g: 80, b: 40, tolerance: 25 }      // 暗褐色
      ],
      spotPattern: 'water_soaked_patches',  // 水渍状斑块
      textureDescriptor: '水渍状不规则大斑，暗绿色至褐色，湿度大时有白色霉层',
      colorDeviation: 'high'
    },
    symptoms: ['water_soaked', 'leaf_spots', 'mold_layer'],
    symptomDetail: '叶缘或叶尖出现水渍状暗绿色大斑，扩展快，湿度大时背面有白色霉层',
    conditions: '低温高湿、多雾多露、连续阴雨',
    advice: '1. 选用抗病品种\n2. 加强通风，降低棚内湿度\n3. 发现中心病株立即清除\n4. 合理灌溉，避免叶面结露\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'tomato_gray_mold',
    cropId: 'tomato',
    name: '番茄灰霉病',
    description: '产生大量灰色霉层，危害花和果实',
    imageProfile: {
      dominantColors: [
        { r: 180, g: 170, b: 160, tolerance: 30 },  // 灰色
        { r: 140, g: 130, b: 110, tolerance: 25 }    // 灰褐色
      ],
      spotPattern: 'gray_fuzzy_mold',  // 灰色绒毛状霉
      textureDescriptor: '灰色绒毛状霉层覆盖病部，组织软腐',
      colorDeviation: 'medium'
    },
    symptoms: ['mold_layer', 'blight', 'water_soaked'],
    symptomDetail: '叶片出现水渍状浅褐色大斑，湿度大时覆盖灰色霉层',
    conditions: '低温高湿、光照不足、通风不良',
    advice: '1. 加强通风透光，降低湿度\n2. 及时清理病叶、病果\n3. 科学浇水，避免大水漫灌\n4. 增施磷钾肥，增强抗病力\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 黄瓜 (3种) ====================
  {
    id: 'cucumber_downy_mildew',
    cropId: 'cucumber',
    name: '黄瓜霜霉病',
    description: '黄瓜最严重的病害之一，俗称"跑马干"',
    imageProfile: {
      dominantColors: [
        { r: 180, g: 190, b: 110, tolerance: 30 },  // 黄绿色
        { r: 140, g: 150, b: 80, tolerance: 25 }     // 黄褐色
      ],
      spotPattern: 'angular_patches',  // 多角形斑块
      textureDescriptor: '多角形黄绿色斑，受叶脉限制，背面有紫灰色霉层',
      colorDeviation: 'medium'
    },
    symptoms: ['leaf_spots', 'yellowing', 'mold_layer'],
    symptomDetail: '叶片出现多角形黄绿色斑点，受叶脉限制，湿度大时背面有紫灰色霉层',
    conditions: '高温高湿、昼夜温差大、叶面有水滴',
    advice: '1. 选用抗病品种\n2. 加强通风，降低湿度\n3. 科学灌水，避免忽干忽湿\n4. 及时摘除老叶病叶\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'cucumber_powdery_mildew',
    cropId: 'cucumber',
    name: '黄瓜白粉病',
    description: '叶片覆盖白色粉状物',
    imageProfile: {
      dominantColors: [
        { r: 230, g: 230, b: 220, tolerance: 35 },  // 白色
        { r: 190, g: 200, b: 170, tolerance: 30 }    // 灰绿色
      ],
      spotPattern: 'powdery_coating',  // 粉状覆盖
      textureDescriptor: '白色粉状斑，渐扩大连片覆盖全叶，后期出现小黑点',
      colorDeviation: 'medium'
    },
    symptoms: ['powdery', 'yellowing'],
    symptomDetail: '叶片正面出现白色粉状小斑点，逐渐扩展至全叶，叶片变黄枯死',
    conditions: '高温干旱、植株郁蔽、光照不足',
    advice: '1. 选用抗白粉病品种\n2. 合理密植，通风透光\n3. 加强水肥管理，防止植株徒长\n4. 及时清除病叶\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'cucumber_fusarium_wilt',
    cropId: 'cucumber',
    name: '黄瓜枯萎病',
    description: '土传维管束病害，整株萎蔫枯死',
    imageProfile: {
      dominantColors: [
        { r: 170, g: 180, b: 120, tolerance: 30 },  // 萎黄色
        { r: 130, g: 100, b: 60, tolerance: 25 }     // 褐色
      ],
      spotPattern: 'wilt_pattern',  // 萎蔫型
      textureDescriptor: '叶片从下向上逐渐萎蔫变黄，茎基部维管束变褐',
      colorDeviation: 'medium'
    },
    symptoms: ['yellowing', 'curling', 'blight'],
    symptomDetail: '下部叶片先变黄萎蔫，逐渐向上发展，茎基部变褐，维管束褐色',
    conditions: '连作地、土壤酸化、高温高湿',
    advice: '1. 嫁接栽培（以黑籽南瓜为砧木）\n2. 轮作倒茬，至少3年以上\n3. 土壤消毒处理\n4. 加强排水，防止积水\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 马铃薯 (3种) ====================
  {
    id: 'potato_late_blight',
    cropId: 'potato',
    name: '马铃薯晚疫病',
    description: '历史上导致爱尔兰大饥荒的毁灭性病害',
    imageProfile: {
      dominantColors: [
        { r: 70, g: 90, b: 50, tolerance: 30 },     // 暗绿色
        { r: 100, g: 70, b: 40, tolerance: 25 }      // 暗褐色
      ],
      spotPattern: 'water_soaked_patches',  // 水渍状斑块
      textureDescriptor: '水渍状不规则斑，暗绿色转黑褐色，湿度大时有白色霉轮',
      colorDeviation: 'high'
    },
    symptoms: ['water_soaked', 'leaf_spots', 'blight'],
    symptomDetail: '叶缘出现水渍状暗绿色斑点，扩展为黑褐色大斑，背面有白色霉圈',
    conditions: '多雾多露、阴雨连绵、温度适宜',
    advice: '1. 选用抗病品种\n2. 选用无病种薯\n3. 合理灌溉，避免田间积水\n4. 培土覆盖，减少薯块感染\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'potato_early_blight',
    cropId: 'potato',
    name: '马铃薯早疫病',
    description: '叶片出现轮纹状枯斑',
    imageProfile: {
      dominantColors: [
        { r: 150, g: 120, b: 60, tolerance: 30 },   // 黄褐色
        { r: 100, g: 70, b: 30, tolerance: 25 }      // 暗褐色
      ],
      spotPattern: 'concentric_rings',  // 同心轮纹
      textureDescriptor: '圆形或近圆形暗褐色斑，有同心轮纹，边缘清晰',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'yellowing'],
    symptomDetail: '叶片出现圆形暗褐色同心轮纹斑，周围有黄绿色晕圈',
    conditions: '高温干旱、植株衰弱、缺肥',
    advice: '1. 增施有机肥和磷钾肥\n2. 合理灌溉，避免干旱\n3. 轮作倒茬\n4. 清除田间病残体\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'potato_scab',
    cropId: 'potato',
    name: '马铃薯疮痂病',
    description: '危害薯块表面，形成木栓化疮痂',
    imageProfile: {
      dominantColors: [
        { r: 180, g: 150, b: 110, tolerance: 30 },  // 褐黄色
        { r: 140, g: 100, b: 60, tolerance: 25 }     // 褐色
      ],
      spotPattern: 'corky_lesions',  // 木栓化病斑
      textureDescriptor: '薯块表面形成圆形或不规则形木栓化疮痂状病斑',
      colorDeviation: 'medium'
    },
    symptoms: ['leaf_spots'],
    symptomDetail: '地上部症状不明显，主要危害薯块，表面形成褐色疮痂状粗糙斑',
    conditions: '土壤偏碱性、干旱、连作',
    advice: '1. 选用无病种薯\n2. 轮作倒茬\n3. 酸性土壤可减轻发病\n4. 保持土壤湿润\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 葡萄 (3种) ====================
  {
    id: 'grape_downy_mildew',
    cropId: 'grape',
    name: '葡萄霜霉病',
    description: '危害叶片和果实，背面产生白色霜霉',
    imageProfile: {
      dominantColors: [
        { r: 170, g: 180, b: 100, tolerance: 30 },  // 黄绿色
        { r: 220, g: 220, b: 220, tolerance: 30 }    // 白色（霉层）
      ],
      spotPattern: 'angular_patches',  // 多角形斑块
      textureDescriptor: '多角形黄绿色至褐色斑，背面有白色霜状霉层',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'yellowing', 'mold_layer'],
    symptomDetail: '叶片出现多角形黄绿色斑点，背面有白色霜状霉层',
    conditions: '多雨高湿、雾露重、通风不良',
    advice: '1. 合理修剪，保持通风透光\n2. 清理落叶和病枝\n3. 加强排水\n4. 避雨栽培\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'grape_powdery_mildew',
    cropId: 'grape',
    name: '葡萄白粉病',
    description: '叶片和果实覆盖白色粉状物',
    imageProfile: {
      dominantColors: [
        { r: 225, g: 225, b: 215, tolerance: 35 },  // 灰白色
        { r: 170, g: 160, b: 140, tolerance: 30 }    // 灰褐色
      ],
      spotPattern: 'powdery_coating',  // 粉状覆盖
      textureDescriptor: '叶片正面出现灰白色粉状斑，组织褪绿变褐',
      colorDeviation: 'medium'
    },
    symptoms: ['powdery', 'curling', 'yellowing'],
    symptomDetail: '叶片正面出现灰白色粉状斑，严重时叶片卷曲、变黄枯焦',
    conditions: '干旱多风、枝叶过密、光照不足',
    advice: '1. 合理修剪，通风透光\n2. 增施磷钾肥\n3. 清除病枝病叶\n4. 合理灌溉，保持湿度\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'grape_black_spot',
    cropId: 'grape',
    name: '葡萄黑痘病',
    description: '危害嫩叶、嫩梢和幼果',
    imageProfile: {
      dominantColors: [
        { r: 80, g: 60, b: 40, tolerance: 30 },     // 黑褐色
        { r: 140, g: 100, b: 80, tolerance: 25 }     // 红褐色
      ],
      spotPattern: 'sunken_spots',  // 凹陷斑点
      textureDescriptor: '圆形红褐色至黑褐色凹陷斑点，边缘暗紫色',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'perforation', 'curling'],
    symptomDetail: '嫩叶出现红褐色至黑褐色凹陷小斑点，病斑可穿孔，叶片皱缩畸形',
    conditions: '多雨高湿、幼嫩组织多、通风不良',
    advice: '1. 选用抗病品种\n2. 合理修剪，清除病枝\n3. 加强肥水管理\n4. 冬季清园消毒\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 大豆 (3种) ====================
  {
    id: 'soybean_rust',
    cropId: 'soybean',
    name: '大豆锈病',
    description: '叶片产生锈色孢子堆',
    imageProfile: {
      dominantColors: [
        { r: 190, g: 130, b: 50, tolerance: 30 },   // 锈褐色
        { r: 160, g: 90, b: 30, tolerance: 25 }      // 深锈色
      ],
      spotPattern: 'scattered_pustules',  // 散生疱状突起
      textureDescriptor: '散生锈褐色疱状突起，表皮破裂散出锈粉',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'yellowing', 'powdery'],
    symptomDetail: '叶片散生锈褐色小疱斑，破裂后散出锈色粉末，叶片变黄脱落',
    conditions: '多雨高湿、温度适宜、品种感病',
    advice: '1. 选用抗锈病品种\n2. 合理密植，通风透光\n3. 轮作倒茬\n4. 清除田间病残体\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'soybean_downy_mildew',
    cropId: 'soybean',
    name: '大豆霜霉病',
    description: '叶片出现黄绿色斑块，背面有霉层',
    imageProfile: {
      dominantColors: [
        { r: 190, g: 200, b: 120, tolerance: 30 },  // 黄绿色
        { r: 210, g: 210, b: 200, tolerance: 30 }    // 灰白色霉
      ],
      spotPattern: 'irregular_patches',  // 不规则斑块
      textureDescriptor: '不规则黄绿色斑，边缘不明显，背面有灰白色霉层',
      colorDeviation: 'medium'
    },
    symptoms: ['leaf_spots', 'yellowing', 'mold_layer'],
    symptomDetail: '叶片出现不规则黄绿色褪绿斑，背面有灰白色至淡紫色霉层',
    conditions: '多雨高湿、低温、密植',
    advice: '1. 选用抗病品种\n2. 合理密植\n3. 轮作倒茬\n4. 种子处理\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'soybean_gray_spot',
    cropId: 'soybean',
    name: '大豆灰斑病',
    description: '叶片产生灰色坏死斑点',
    imageProfile: {
      dominantColors: [
        { r: 170, g: 160, b: 150, tolerance: 30 },  // 灰色
        { r: 120, g: 100, b: 70, tolerance: 25 }     // 灰褐色
      ],
      spotPattern: 'round_gray_spots',  // 圆形灰斑
      textureDescriptor: '圆形或近圆形灰色至灰褐色斑，边缘褐色，中央灰色',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'perforation'],
    symptomDetail: '叶片出现圆形灰色至灰褐色斑点，边缘褐色清晰，后期可穿孔',
    conditions: '多雨高湿、温暖、偏施氮肥',
    advice: '1. 选用抗病品种\n2. 合理施肥，增施磷钾肥\n3. 轮作倒茬\n4. 清除病残体\n⚠️ 具体农药使用请咨询当地农技站'
  },

  // ==================== 柑橘 (3种) ====================
  {
    id: 'citrus_canker',
    cropId: 'citrus',
    name: '柑橘溃疡病',
    description: '细菌性检疫病害，产生木栓化溃疡斑',
    imageProfile: {
      dominantColors: [
        { r: 170, g: 140, b: 80, tolerance: 30 },   // 黄褐色
        { r: 130, g: 100, b: 60, tolerance: 25 }     // 暗褐色
      ],
      spotPattern: 'raised_corky_spots',  // 隆起木栓化斑
      textureDescriptor: '圆形或近圆形隆起斑，木栓化，中央凹陷开裂，有黄色晕圈',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'water_soaked'],
    symptomDetail: '叶片出现黄色针头状小点，扩大为木栓化隆起斑，周围有黄色晕圈',
    conditions: '高温多雨、台风季节、伤口多',
    advice: '1. 严格检疫，选用无病苗木\n2. 防风林带减少风害\n3. 合理修剪，清除病枝病叶\n4. 加强肥水管理\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'citrus_scab',
    cropId: 'citrus',
    name: '柑橘疮痂病',
    description: '危害嫩叶嫩梢，产生疮痂状突起',
    imageProfile: {
      dominantColors: [
        { r: 150, g: 120, b: 70, tolerance: 30 },   // 黄褐色
        { r: 180, g: 160, b: 100, tolerance: 25 }    // 淡褐色
      ],
      spotPattern: 'warty_protrusions',  // 疣状突起
      textureDescriptor: '叶片出现疣状突起，叶面扭曲畸形，淡褐色至黄褐色',
      colorDeviation: 'medium'
    },
    symptoms: ['leaf_spots', 'curling'],
    symptomDetail: '嫩叶出现黄褐色疣状突起，叶片扭曲畸形、皱缩',
    conditions: '阴雨多湿、气温适中、嫩梢抽生期',
    advice: '1. 选用抗病品种\n2. 合理修剪，统一放梢\n3. 加强肥水管理\n4. 清除病枝病叶\n⚠️ 具体农药使用请咨询当地农技站'
  },
  {
    id: 'citrus_anthracnose',
    cropId: 'citrus',
    name: '柑橘炭疽病',
    description: '叶片枯死脱落，枝梢枯死',
    imageProfile: {
      dominantColors: [
        { r: 120, g: 90, b: 50, tolerance: 30 },    // 暗褐色
        { r: 160, g: 130, b: 90, tolerance: 25 }     // 黄褐色
      ],
      spotPattern: 'necrotic_patches',  // 坏死斑块
      textureDescriptor: '不规则暗褐色坏死斑，边缘深褐色，中央有小黑点',
      colorDeviation: 'high'
    },
    symptoms: ['leaf_spots', 'blight', 'yellowing'],
    symptomDetail: '叶尖或叶缘出现暗褐色不规则病斑，严重时叶片枯死脱落',
    conditions: '树势衰弱、低温冻害、干旱或积水',
    advice: '1. 加强栽培管理，增强树势\n2. 合理施肥，增施有机肥\n3. 及时灌溉和排水\n4. 防冻防旱\n⚠️ 具体农药使用请咨询当地农技站'
  }
]

/**
 * 根据作物ID获取该作物的所有病害
 * @param {string} cropId
 * @returns {object[]}
 */
export function getDiseasesByCropId(cropId) {
  return diseases.filter(d => d.cropId === cropId)
}

/**
 * 根据病害ID获取病害信息
 * @param {string} id
 * @returns {object|undefined}
 */
export function getDiseaseById(id) {
  return diseases.find(d => d.id === id)
}

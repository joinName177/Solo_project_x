/**
 * 内置宠物表情包库
 * 按 [宠物类型][情绪] 组织，每项包含：表情符号、翻译文本候选
 */
const memeLibrary = {
  cat: {
    happy: {
      emoji: '😸',
      texts: [
        '喵的，今天罐头怎么还没开！',
        '铲屎的，今天心情不错，多摸两下！',
        '呼噜呼噜～这日子过得真舒坦～',
        '喵生巅峰！阳光正好，鱼干管够！',
        '嘿嘿，刚抓了只大蟑螂，送你当礼物！',
      ],
    },
    hungry: {
      emoji: '🙀',
      texts: [
        '喵！！！饭呢？？？本喵的碗空了！！',
        '铲屎官！你看看现在几点了！晚开饭3分钟了！',
        '饿死喵了……再不给吃的我就拆家了……',
        '盯——（用眼神杀人的猫）',
        '我要吃罐罐！现在！立刻！马上！',
      ],
    },
    play: {
      emoji: '😺',
      texts: [
        '来玩！来玩！那个逗猫棒呢？快拿出来！',
        '别刷手机了，陪本喵玩会儿！',
        '我在地上打滚了，看到了吗？意思是想玩！',
        '冲啊！那个小红点我一定能抓到！！',
        '喵喵喵！快扔那个球球！',
      ],
    },
    angry: {
      emoji: '😾',
      texts: [
        '别碰我！本喵现在心情不好！',
        '呵，你刚才是不是摸了别的猫？',
        '走开！再靠近我挠你哦！',
        '我的地盘我做主！那个纸箱是我的！',
        '今天洗澡了……此仇不共戴天！！',
      ],
    },
    scared: {
      emoji: '😿',
      texts: [
        '外面是什么声音！！好可怕！！',
        '快抱紧我！！那个吸尘器又来了！！',
        '有人按门铃！！我先躲床底下！！',
        '不要不要不要……我不要去看兽医……',
        '打雷了！！！铲屎的你在哪！！',
      ],
    },
    pet: {
      emoji: '😻',
      texts: [
        '摸摸摸！不要停！继续继续！',
        '对～就是那个位置～铲屎的技术越来越好了～',
        '呼噜噜噜噜……再摸一下我就睡着……zzz',
        '快摸我！不然我就用头拱你的手了！',
        '好舒服～你是世界上最好的铲屎官～',
      ],
    },
  },
  dog: {
    happy: {
      emoji: '🐶',
      texts: [
        '汪汪！今天太开心了！尾巴要摇断了！',
        '嗨起来！！出去遛弯咯！！',
        '主人主人主人！！你回来了！！我好想你！！',
        '哈哈哈哈哈哈今天吃到了肉肉！！',
        '开心到飞起！快来跟我一起蹦！',
      ],
    },
    hungry: {
      emoji: '🐕',
      texts: [
        '汪！我的碗呢？本汪的饭呢？？',
        '用最无辜的眼神看着你……能给我点吃的吗？',
        '我坐好了！握手也会！现在可以给零食了吗？',
        '饿……这个字怎么写来着……汪反正是饿了！',
        '呜～呜～开饭时间到了！！',
      ],
    },
    play: {
      emoji: '🐩',
      texts: [
        '球球！！快扔球球！！我准备好了！！',
        '飞盘飞盘飞盘飞盘飞盘！！',
        '出去玩！出去玩！出去玩！重要的事说三遍！',
        '我叼着绳绳来了，你懂的！去公园！',
        '跑起来跑起来！本汪今天要跑10公里！',
      ],
    },
    angry: {
      emoji: '🐕‍🦺',
      texts: [
        '汪！！谁动了我的骨头！！',
        '快递员又来了！！汪汪汪汪汪！！',
        '不想洗澡！！死也不洗！！',
        '哼！你今天出门没带我！我生气了！',
        '那是我的玩具！！不准碰！！',
      ],
    },
    scared: {
      emoji: '🐕',
      texts: [
        '呜……打雷了……我要钻到主人怀里……',
        '那个烟花什么时候停啊……好可怕……',
        '去医院？不不不不不我不要！！',
        '吸尘器！！它是怪物！！我要保护主人！！但是腿软……',
        '主人不要丢下我……我会乖乖的……',
      ],
    },
    pet: {
      emoji: '🦮',
      texts: [
        '摸头！！摸头！！汪最爱的就是摸头！！',
        '对对对就是耳朵后面……太享受了……',
        '主人的手是世界上最好的东西！',
        '翻肚皮了！这是最高礼遇！快摸摸！',
        '摸我摸我！你看我的尾巴都摇成螺旋桨了！',
      ],
    },
  },
};

/** 随机翻译语料（无厘头模式） */
const randomTexts = [
  '你上厕所为什么要关门？我又不会偷看！',
  '说实话，你的厨艺不如罐头。',
  '我今天看到一只鸟，它骂我，我就追了它三条街。',
  '你知道吗，那个沙发角是我故意挠的，因为你在那儿坐太久了。',
  '我做梦梦见我在追一个巨大的肉丸子……然后醒了，发现是你的脚。',
  '如果我是人，我一定先学会开冰箱。',
  '其实我会说话，只是懒得理你。',
  '那个快递箱是我的，里面的东西你拿走。',
  '你知道吗，你不在家的时候，我开了个party，邻居的猫也来了。',
  '你的袜子味道不错，下次多买几双。',
  '我今天在地板上发现了一个超好吃的面包屑，你掉的。',
  '窗外的松鼠又在挑衅我，我需要出去跟它谈谈。',
  '说实话，我觉得你比别的铲屎官好那么一点点。一点点。',
  '我数了，你今天摸了我37下，比昨天少了5下，请解释一下。',
  '那个吸尘器肯定是外星来的，我跟它打过一架了。',
];

/** 按情绪获取随机翻译文字 */
function getRandomText(petType, emotion) {
  const texts = memeLibrary[petType]?.[emotion]?.texts;
  if (!texts || texts.length === 0) return '……（沉默）';
  return texts[Math.floor(Math.random() * texts.length)];
}

/** 获取随机无厘头翻译 */
function getRandomFunnyText() {
  return randomTexts[Math.floor(Math.random() * randomTexts.length)];
}

/** 按宠物类型和情绪获取表情符号 */
function getMemeEmoji(petType, emotion) {
  return memeLibrary[petType]?.[emotion]?.emoji || '🐾';
}

/** 获取随机宠物类型 */
function getRandomPetType() {
  return Math.random() < 0.5 ? 'cat' : 'dog';
}

/** 获取随机情绪 */
function getRandomEmotion() {
  const emotions = ['happy', 'hungry', 'play', 'angry', 'scared', 'pet'];
  return emotions[Math.floor(Math.random() * emotions.length)];
}

/** 情绪标签映射 */
const emotionLabels = {
  happy: { zh: '开心', icon: '😊' },
  hungry: { zh: '饿了', icon: '🍖' },
  play: { zh: '想玩', icon: '⚽' },
  angry: { zh: '生气', icon: '💢' },
  scared: { zh: '害怕', icon: '😱' },
  pet: { zh: '求摸', icon: '✋' },
};

/** 宠物类型标签映射 */
const petTypeLabels = {
  cat: { zh: '猫', icon: '🐱' },
  dog: { zh: '狗', icon: '🐶' },
};

export {
  memeLibrary,
  randomTexts,
  getRandomText,
  getRandomFunnyText,
  getMemeEmoji,
  getRandomPetType,
  getRandomEmotion,
  emotionLabels,
  petTypeLabels,
};

/**
 * 预设食材库 — 30种常见食材
 * 每个食材包含 id、名称、emoji图标、分类
 */
export const CATEGORIES = {
  vegetable: '蔬菜',
  meat: '肉类',
  tofu: '豆制品',
  egg_dairy: '蛋奶',
  staple: '主食',
  seasoning: '调味',
};

export const ingredients = [
  // 蔬菜 (8种)
  { id: 'tomato', name: '西红柿', emoji: '🍅', category: 'vegetable' },
  { id: 'onion', name: '洋葱', emoji: '🧅', category: 'vegetable' },
  { id: 'green_pepper', name: '青椒', emoji: '🫑', category: 'vegetable' },
  { id: 'potato', name: '土豆', emoji: '🥔', category: 'vegetable' },
  { id: 'carrot', name: '胡萝卜', emoji: '🥕', category: 'vegetable' },
  { id: 'cabbage', name: '白菜', emoji: '🥬', category: 'vegetable' },
  { id: 'broccoli', name: '西兰花', emoji: '🥦', category: 'vegetable' },
  { id: 'cucumber', name: '黄瓜', emoji: '🥒', category: 'vegetable' },

  // 肉类 (6种)
  { id: 'chicken_breast', name: '鸡胸肉', emoji: '🍗', category: 'meat' },
  { id: 'pork_belly', name: '五花肉', emoji: '🥓', category: 'meat' },
  { id: 'egg', name: '鸡蛋', emoji: '🥚', category: 'egg_dairy' },
  { id: 'beef', name: '牛肉', emoji: '🥩', category: 'meat' },
  { id: 'shrimp', name: '虾仁', emoji: '🦐', category: 'meat' },
  { id: 'sausage', name: '火腿肠', emoji: '🌭', category: 'meat' },

  // 豆制品 (4种)
  { id: 'tofu', name: '豆腐', emoji: '🧈', category: 'tofu' },
  { id: 'firm_tofu', name: '老豆腐', emoji: '🫘', category: 'tofu' },
  { id: 'tofu_skin', name: '豆腐皮', emoji: '📜', category: 'tofu' },
  { id: 'edamame', name: '毛豆', emoji: '🫛', category: 'tofu' },

  // 蛋奶 (3种)
  { id: 'milk', name: '牛奶', emoji: '🥛', category: 'egg_dairy' },
  { id: 'cheese', name: '芝士', emoji: '🧀', category: 'egg_dairy' },

  // 主食 (5种)
  { id: 'rice', name: '米饭', emoji: '🍚', category: 'staple' },
  { id: 'overnight_rice', name: '隔夜饭', emoji: '🍙', category: 'staple' },
  { id: 'noodle', name: '面条', emoji: '🍜', category: 'staple' },
  { id: 'bread', name: '面包', emoji: '🍞', category: 'staple' },
  { id: 'flour', name: '面粉', emoji: '🌾', category: 'staple' },

  // 调味/其他 (4种)
  { id: 'garlic', name: '大蒜', emoji: '🧄', category: 'seasoning' },
  { id: 'ginger', name: '生姜', emoji: '🫚', category: 'seasoning' },
  { id: 'scallion', name: '葱', emoji: '🧅', category: 'seasoning' },
  { id: 'chili', name: '辣椒', emoji: '🌶️', category: 'seasoning' },
];

/** 按分类分组的食材 */
export const ingredientsByCategory = ingredients.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {});

/** 通过 id 快速查找食材 */
export const ingredientMap = Object.fromEntries(
  ingredients.map((i) => [i.id, i])
);

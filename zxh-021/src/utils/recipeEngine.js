/**
 * 菜谱推荐引擎
 *
 * 纯函数模块，负责：
 * - 根据已选食材计算菜谱匹配分数
 * - 根据评分权重调整排序
 * - 支持"救命模式"（仅推荐无需额外食材的菜谱）
 */
import { ingredientMap } from '../data/ingredients';

/**
 * 计算单道菜谱的匹配分数
 * @param {object} recipe - 菜谱对象
 * @param {Set<string>} selectedIds - 已选食材 id 集合
 * @param {object} ratingWeights - 评分权重 { recipeId: number }
 * @returns {{ recipe: object, score: number, matched: string[], missing: string[], matchedOptional: string[] }}
 */
export function scoreRecipe(recipe, selectedIds, ratingWeights = {}) {
  const required = recipe.ingredients;
  const optional = recipe.optional || [];

  const matched = required.filter((id) => selectedIds.has(id));
  const missing = required.filter((id) => !selectedIds.has(id));
  const matchedOptional = optional.filter((id) => selectedIds.has(id));

  // 基础分 = 已匹配必需食材 / 总必需食材
  const baseScore = required.length > 0 ? matched.length / required.length : 0;

  // 可选食材加分（每个可选匹配 +0.08）
  const optionalBonus = matchedOptional.length * 0.08;

  // 评分权重调整（-0.3 ~ +0.3）
  const ratingAdjust = ratingWeights[recipe.id] || 0;

  const score = baseScore + optionalBonus + ratingAdjust;

  return {
    recipe,
    score: Math.max(0, Math.min(1, score)),
    matched,
    missing,
    matchedOptional,
  };
}

/**
 * 根据已选食材获取推荐菜谱
 * @param {Array} allRecipes - 所有菜谱（内置 + 自定义）
 * @param {Set<string>} selectedIds - 已选食材 id 集合
 * @param {object} ratingWeights - 评分权重
 * @param {object} options - { emergencyMode: boolean, limit: number }
 * @returns {Array<{recipe, score, matched, missing, matchedOptional}>}
 */
export function getRecommendations(
  allRecipes,
  selectedIds,
  ratingWeights = {},
  options = {}
) {
  const { emergencyMode = false, limit = 3 } = options;

  let scored = allRecipes
    .map((r) => scoreRecipe(r, selectedIds, ratingWeights))
    .filter((s) => s.matched.length > 0); // 至少要匹配一个必需食材

  if (emergencyMode) {
    // 救命模式：只推荐无需额外食材的菜谱
    scored = scored.filter((s) => s.missing.length === 0);
  }

  // 排序：分数降序，同分按评分权重降序
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (ratingWeights[b.recipe.id] || 0) - (ratingWeights[a.recipe.id] || 0);
  });

  return scored.slice(0, limit);
}

/**
 * 根据已选食材获取缺失食材的统计（用于购物建议）
 * @param {Array} recommendations - getRecommendations 的返回结果
 * @returns {Array<{id, name, emoji, count}>}
 */
export function getMissingStats(recommendations) {
  const countMap = {};
  recommendations.forEach(({ missing }) => {
    missing.forEach((id) => {
      if (!countMap[id]) {
        const ing = ingredientMap[id];
        countMap[id] = { id, name: ing?.name || id, emoji: ing?.emoji || '📦', count: 0 };
      }
      countMap[id].count++;
    });
  });
  return Object.values(countMap).sort((a, b) => b.count - a.count);
}

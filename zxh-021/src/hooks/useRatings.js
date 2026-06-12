import { useLocalStorage } from './useLocalStorage';

/** 评分类型对应的权重 */
const RATING_WEIGHTS = {
  yummy: 0.15,   // 好吃 → 推荐权重提升
  ok: 0,         // 一般 → 不变
  dark: -0.2,    // 黑暗料理 → 降低权重
};

/**
 * 菜谱评分 hook
 * 管理评分数据和评分权重，持久化到 localStorage
 */
export function useRatings() {
  const [ratings, setRatings] = useLocalStorage('fridge_ratings', {});

  /** 为菜谱评分 */
  const rateRecipe = (recipeId, rating) => {
    setRatings((prev) => ({ ...prev, [recipeId]: rating }));
  };

  /** 删除某菜谱的评分 */
  const clearRating = (recipeId) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[recipeId];
      return next;
    });
  };

  /** 获取某菜谱的评分 */
  const getRating = (recipeId) => ratings[recipeId] || null;

  /** 生成评分权重表，供推荐引擎使用 */
  const getRatingWeights = () => {
    const weights = {};
    Object.entries(ratings).forEach(([id, rating]) => {
      weights[id] = RATING_WEIGHTS[rating] || 0;
    });
    return weights;
  };

  return { ratings, rateRecipe, clearRating, getRating, getRatingWeights };
}
